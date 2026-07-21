import { useEffect, useMemo, useState } from 'react'
import { levels, type Level } from './gameData'
import type { SavedProgress } from './firebase'

type Screen = 'gate' | 'map' | 'level' | 'order' | 'quiz' | 'result'

const emptyProgress: SavedProgress = {
  player: '', section: '', stars: 0, coins: 0, completed: [], scores: {},
}

const localKey = 'chronos-citadel-ap8-progress-v1'
const sections = ['8-ABRAHAM', '8-ISAAC', '8-MOSES', '8-EZEKIEL', '8-ISAIAH', '9-JEREMIAH']
const firebaseConfigured = Boolean(
  import.meta.env.VITE_FIREBASE_API_KEY &&
  import.meta.env.VITE_FIREBASE_PROJECT_ID &&
  import.meta.env.VITE_FIREBASE_APP_ID,
)

function readLocal(): SavedProgress {
  try {
    const raw = localStorage.getItem(localKey)
    return raw ? { ...emptyProgress, ...JSON.parse(raw) } : emptyProgress
  } catch {
    return emptyProgress
  }
}

const soundFiles = { chronos: '/sounds/chronos.mp3', adventure: '/sounds/adventure.mp3', correct: '/sounds/correct.mp3', wrong: '/sounds/wrong.mp3', unlock: '/sounds/unlock.mp3', victory: '/sounds/victory.mp3' }
let backgroundMusic: HTMLAudioElement | null = null
function playSound(kind: keyof typeof soundFiles, volume = 0.55) {
  try {
    const sound = new Audio(soundFiles[kind])
    sound.volume = volume
    void sound.play()
  } catch { /* sound is optional */ }
}

function startBackgroundMusic() {
  backgroundMusic ??= new Audio(soundFiles.adventure)
  backgroundMusic.loop = true
  backgroundMusic.volume = 0.18
  void backgroundMusic.play()
}

export default function App() {
  const [screen, setScreen] = useState<Screen>('gate')
  const [progress, setProgress] = useState<SavedProgress>(() => readLocal())
  const [player, setPlayer] = useState(progress.player)
  const [section, setSection] = useState(progress.section)
  const [active, setActive] = useState(0)
  const [cloud, setCloud] = useState<'connecting' | 'cloud' | 'local'>('connecting')
  const [question, setQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [picked, setPicked] = useState<number | null>(null)
  const [orderPicks, setOrderPicks] = useState<string[]>([])
  const [lessonViewed, setLessonViewed] = useState(false)
  const [muted, setMuted] = useState(false)

  const current = levels[active]
  const unlocked = Math.min(10, Math.max(1, progress.completed.length + 1))
  const totalPossible = levels.length * 3

  useEffect(() => {
    let alive = true
    async function start() {
      if (!firebaseConfigured) { setCloud('local'); return }
      try {
        const { connectCloud, loadCloudProgress } = await import('./firebase')
        await connectCloud()
        const remote = await loadCloudProgress()
        if (alive && remote) {
          setProgress(remote)
          setPlayer(remote.player)
          setSection(remote.section)
        }
        if (alive) setCloud('cloud')
      } catch {
        if (alive) setCloud('local')
      }
    }
    start()
    return () => { alive = false }
  }, [])

  useEffect(() => {
    localStorage.setItem(localKey, JSON.stringify(progress))
    if (cloud === 'cloud') {
      import('./firebase')
        .then(({ saveCloudProgress }) => saveCloudProgress(progress))
        .catch(() => setCloud('local'))
    }
  }, [progress, cloud])

  const rank = useMemo(() => {
    if (progress.completed.length === 10) return 'Chronos Master'
    if (progress.completed.length >= 7) return 'Time Guardian'
    if (progress.completed.length >= 4) return 'History Keeper'
    return 'Chronos Cadet'
  }, [progress.completed.length])

  const go = (next: Screen) => setScreen(next)

  useEffect(() => {
    if (!backgroundMusic) return
    if (muted) backgroundMusic.pause()
    else void backgroundMusic.play()
  }, [muted])

  function enterGame(e: React.FormEvent) {
    e.preventDefault()
    if (!player.trim() || !section) return
    setProgress(p => ({ ...p, player: player.trim(), section }))
    if (!muted) { playSound('chronos', 0.45); startBackgroundMusic() }
    go('map')
  }

  function openLevel(index: number) {
    if (index + 1 > unlocked) return
    setActive(index)
    setLessonViewed(false)
    setOrderPicks([])
    go('level')
  }

  function startQuiz() {
    setQuestion(0); setScore(0); setPicked(null); go('quiz')
  }

  function selectAnswer(index: number) {
    if (picked !== null) return
    setPicked(index)
    if (index === current.questions[question].answer) {
      setScore(s => s + 1)
      if (!muted) playSound('correct')
    } else if (!muted) playSound('wrong')
  }

  function nextQuestion() {
    if (question < current.questions.length - 1) {
      setQuestion(q => q + 1); setPicked(null)
    } else finishLevel()
  }

  function finishLevel() {
    const finalScore = score + (picked === current.questions[question].answer ? 0 : 0)
    const passed = finalScore >= 3
    if (passed) {
      if (!muted) { playSound('unlock'); setTimeout(() => playSound('victory', 0.45), 350) }
      setProgress(p => {
        const first = !p.completed.includes(current.week)
        return {
          ...p,
          completed: first ? [...p.completed, current.week].sort((a, b) => a - b) : p.completed,
          stars: p.stars + (first ? Math.min(3, Math.max(1, finalScore - 2)) : 0),
          coins: p.coins + (first ? finalScore * 20 : 5),
          scores: { ...p.scores, [current.week]: Math.max(p.scores[current.week] || 0, finalScore) },
        }
      })
    }
    go('result')
  }

  function chooseOrder(item: string) {
    if (orderPicks.includes(item)) return
    const next = [...orderPicks, item]
    setOrderPicks(next)
    const correct = current.orderItems[next.length - 1] === item
    if (!correct) {
      if (!muted) playSound('wrong')
      setTimeout(() => setOrderPicks([]), 550)
    } else {
      if (!muted) playSound('correct')
      if (next.length === current.orderItems.length) setTimeout(startQuiz, 700)
    }
  }

  function resetProgress() {
    if (!confirm('I-reset ang lahat ng stars, coins, at natapos na linggo?')) return
    const fresh = { ...emptyProgress, player: progress.player, section: progress.section }
    setProgress(fresh)
    go('map')
  }

  if (screen === 'gate') return (
    <main className="gate">
      <div className="starscape" />
      <section className="gate-card">
        <div className="crest">⌛</div>
        <p className="eyebrow">ARALING PANLIPUNAN 8 • UNANG TERMINO</p>
        <h1>CHRONOS<br/><span>CITADEL</span></h1>
        <p className="intro">Buksan ang sampung tarangkahan ng kasaysayan. Sagutan ang mga hamon, tipunin ang Chrono Stars, at iligtas ang daloy ng panahon!</p>
        <form onSubmit={enterGame}>
          <label>Pangalan ng Manlalakbay<input value={player} onChange={e => setPlayer(e.target.value)} placeholder="Ilagay ang pangalan" autoFocus /></label>
          <label>Seksyon<select value={section} onChange={e => setSection(e.target.value)} required><option value="">Piliin ang section</option>{sections.map(item => <option value={item} key={item}>{item}</option>)}</select></label>
          <button className="primary" type="submit">{progress.player ? 'IPAGPATULOY ANG LARO' : 'SIMULAN ANG PAGLALAKBAY'} <b>→</b></button>
        </form>
        <div className="save-note"><i className={cloud} /> {cloud === 'cloud' ? 'Cloud save ay aktibo' : cloud === 'connecting' ? 'Kinokonekta ang save…' : 'Auto-save sa device ay aktibo'}</div>
      </section>
    </main>
  )

  return (
    <main className="app-shell">
      <header className="topbar">
        <button className="brand" onClick={() => go('map')}><span>⌛</span><b>CHRONOS CITADEL</b></button>
        <div className="stats">
          <span title="Chrono Stars">⭐ {progress.stars}/{totalPossible}</span>
          <span title="Chrono Coins">🪙 {progress.coins}</span>
          <button className="sound" onClick={() => setMuted(m => !m)} aria-label="Toggle sound">{muted ? '🔇' : '🔊'}</button>
        </div>
      </header>

      {screen === 'map' && <WorldMap progress={progress} unlocked={unlocked} rank={rank} openLevel={openLevel} reset={resetProgress} cloud={cloud} />}
      {screen === 'level' && <LevelBrief level={current} viewed={lessonViewed} onView={() => setLessonViewed(true)} onOrder={() => go('order')} onBack={() => go('map')} />}
      {screen === 'order' && <MiniMission level={current} picks={orderPicks} choose={chooseOrder} onBack={() => go('level')} onComplete={startQuiz} muted={muted} />}
      {screen === 'quiz' && <Quiz level={current} number={question} score={score} picked={picked} select={selectAnswer} next={nextQuestion} />}
      {screen === 'result' && <Result level={current} score={score} complete={score >= 3} onMap={() => go('map')} retry={startQuiz} />}
    </main>
  )
}

function WorldMap({ progress, unlocked, rank, openLevel, reset, cloud }: { progress: SavedProgress; unlocked: number; rank: string; openLevel: (i: number) => void; reset: () => void; cloud: string }) {
  return <div className="map-page">
    <section className="hero-panel">
      <div><p className="eyebrow">MALIGAYANG PAGBABALIK, {progress.player.toUpperCase()}!</p><h2>Ang Mapa ng Sampung Tarangkahan</h2><p>Bawat linggo ay may tatlong hamon: Suri-Aral, Ayusin ang Panahon, at Boss Battle.</p></div>
      <div className="player-rank"><small>KASALUKUYANG RANGGO</small><strong>{rank}</strong><span>{progress.completed.length}/10 tarangkahan</span></div>
    </section>
    <section className="map-path" aria-label="Mga linggo">
      {levels.map((level, index) => {
        const done = progress.completed.includes(level.week)
        const locked = level.week > unlocked
        return <button key={level.week} className={`level-node ${done ? 'done' : ''} ${locked ? 'locked' : ''}`} style={{'--level-color': level.color} as React.CSSProperties} onClick={() => openLevel(index)} disabled={locked}>
          <span className="node-line" />
          <span className="node-orb">{locked ? '🔒' : done ? '✓' : level.icon}</span>
          <span className="node-copy"><small>LINGGO {level.week}</small><b>{level.realm}</b><em>{done ? `⭐ ${progress.scores[level.week] || 0}/5 • Natapos` : locked ? 'Tapusin muna ang naunang linggo' : 'Bukas na ang tarangkahan'}</em></span>
        </button>
      })}
    </section>
    <footer><span><i className={cloud} /> {cloud === 'cloud' ? 'Naka-save sa cloud' : 'Naka-save sa device'}</span><button onClick={reset}>I-reset ang progress</button></footer>
  </div>
}

function LevelBrief({ level, viewed, onView, onOrder, onBack }: { level: Level; viewed: boolean; onView: () => void; onOrder: () => void; onBack: () => void }) {
  const [comicOpen, setComicOpen] = useState(false)
  const openComic = () => { onView(); setComicOpen(true) }
  return <div className="mission-page">
    <button className="back" onClick={onBack}>← Bumalik sa Mapa</button>
    <section className="level-banner" style={{'--level-color': level.color} as React.CSSProperties}>
      <div><p className="eyebrow">LINGGO {level.week} • {level.realm}</p><h2>{level.title}</h2><p>{level.subtitle}</p></div><div className="big-icon">{level.icon}</div>
    </section>
    <section className="mission-grid">
      <article className={viewed ? 'mission complete' : 'mission'}><span>01</span><h3>Suri-Aral</h3><p>Basahin at siyasatin ang comic lesson bago tumuloy sa hamon.</p><button onClick={openComic}>Buksan ang Comic</button></article>
      <article className={!viewed ? 'mission locked-card' : 'mission'}><span>02</span><h3>{level.miniTitle}</h3><p>{level.miniGame === 'match' ? 'Ipares ang magkakaugnay na konsepto.' : level.miniGame === 'scramble' ? 'Buuin ang salitang tinutukoy ng clue.' : level.miniGame === 'fact' ? 'Tukuyin kung tama o mali ang pahayag.' : 'Piliin ang mga konsepto sa tamang pagkakasunod-sunod.'}</p><button disabled={!viewed} onClick={onOrder}>{viewed ? 'Simulan ang Hamon' : 'Tapusin muna ang Suri-Aral'}</button></article>
      <article className="mission boss"><span>03</span><h3>Boss Battle</h3><p>Limang tanong. Kailangan ng 3 tamang sagot upang mabuksan ang susunod na gate.</p><b>🔒 Bubukas pagkatapos ng Hamon 02</b></article>
    </section>
    {comicOpen && <div className="comic-modal" role="dialog" aria-modal="true"><div><button onClick={() => setComicOpen(false)} className="close" aria-label="Close">×</button><img src={level.image} alt={`Comic lesson para sa Linggo ${level.week}`} /><button className="primary" onClick={onOrder}>NABASA KO NA — TUMULOY</button></div></div>}
  </div>
}

function MiniMission({ level, picks, choose, onBack, onComplete, muted }: { level: Level; picks: string[]; choose: (item: string) => void; onBack: () => void; onComplete: () => void; muted: boolean }) {
  if (level.miniGame === 'match' && level.matchPairs) return <MatchMission level={level} pairs={level.matchPairs} onBack={onBack} onComplete={onComplete} muted={muted} />
  if (level.miniGame === 'scramble' && level.scramble) return <ScrambleMission level={level} clue={level.scramble.clue} answer={level.scramble.answer} onBack={onBack} onComplete={onComplete} muted={muted} />
  if (level.miniGame === 'fact' && level.facts) return <FactMission level={level} facts={level.facts} onBack={onBack} onComplete={onComplete} muted={muted} />
  return <div className="challenge-page">
    <button className="back" onClick={onBack}>← Bumalik</button>
    <p className="eyebrow">HAMON 02 • {level.miniTitle.toUpperCase()}</p><h2>{level.orderPrompt}</h2><p className="hint">Piliin isa-isa ang sagot sa tamang pagkakasunod-sunod. Magre-reset kapag nagkamali.</p>
    <div className="order-progress">{level.orderItems.map((_, i) => <span className={i < picks.length ? 'filled' : ''} key={i}>{i < picks.length ? i + 1 : '?'}</span>)}</div>
    <div className="order-options">{[...level.orderItems].sort((a, b) => a.localeCompare(b)).map(item => <button disabled={picks.includes(item)} onClick={() => choose(item)} key={item}>{item}</button>)}</div>
  </div>
}

function MatchMission({ level, pairs, onBack, onComplete, muted }: { level: Level; pairs: {left: string; right: string}[]; onBack: () => void; onComplete: () => void; muted: boolean }) {
  const [chosen, setChosen] = useState<string | null>(null)
  const [matched, setMatched] = useState<string[]>([])
  const [message, setMessage] = useState('Piliin muna ang nasa kaliwa, pagkatapos ang katapat nito sa kanan.')
  const selectLeft = (item: string) => { if (!matched.includes(item)) setChosen(item) }
  const selectRight = (right: string) => {
    if (!chosen) { setMessage('Pumili muna ng nasa kaliwang column.'); return }
    const correct = pairs.find(pair => pair.left === chosen)?.right === right
    if (!correct) { if (!muted) playSound('wrong'); setMessage('Hindi magkatapat. Subukan ulit!'); return }
    const next = [...matched, chosen]
    if (!muted) playSound('correct')
    setMatched(next); setChosen(null); setMessage('Tama!')
    if (next.length === pairs.length) setTimeout(onComplete, 550)
  }
  return <div className="challenge-page">
    <button className="back" onClick={onBack}>← Bumalik</button><p className="eyebrow">HAMON 02 • {level.miniTitle.toUpperCase()}</p><h2>Ipares ang tamang sagot</h2><p className="hint">{message}</p>
    <div className="match-grid"><div>{pairs.map(pair => <button className={`${chosen === pair.left ? 'selected' : ''} ${matched.includes(pair.left) ? 'matched' : ''}`} disabled={matched.includes(pair.left)} onClick={() => selectLeft(pair.left)} key={pair.left}>{pair.left}</button>)}</div><div>{[...pairs].sort((a,b) => a.right.localeCompare(b.right)).map(pair => <button className={matched.includes(pair.left) ? 'matched' : ''} disabled={matched.includes(pair.left)} onClick={() => selectRight(pair.right)} key={pair.right}>{pair.right}</button>)}</div></div>
  </div>
}

function ScrambleMission({ level, clue, answer, onBack, onComplete, muted }: { level: Level; clue: string; answer: string; onBack: () => void; onComplete: () => void; muted: boolean }) {
  const [value, setValue] = useState('')
  const [message, setMessage] = useState('Gamitin ang clue upang mabuo ang salita.')
  const scrambled = useMemo(() => answer.split('').sort((a, b) => (a > b ? -1 : 1)).join(' • '), [answer])
  const submit = (e: React.FormEvent) => { e.preventDefault(); if (value.trim().toUpperCase() === answer) { if (!muted) playSound('correct'); setMessage('Tama! Magaling.'); setTimeout(onComplete, 500) } else { if (!muted) playSound('wrong'); setMessage('Hindi pa iyon. Basahin muli ang clue.') } }
  return <div className="challenge-page"><button className="back" onClick={onBack}>← Bumalik</button><p className="eyebrow">HAMON 02 • {level.miniTitle.toUpperCase()}</p><h2>Bumuo ng Salita</h2><div className="scramble-card"><b>{scrambled}</b><p>{clue}</p><form onSubmit={submit}><input value={value} onChange={event => setValue(event.target.value)} placeholder="I-type ang sagot" autoFocus/><button className="primary">Suriin ang Sagot</button></form><em>{message}</em></div></div>
}

function FactMission({ level, facts, onBack, onComplete, muted }: { level: Level; facts: {statement: string; answer: boolean}[]; onBack: () => void; onComplete: () => void; muted: boolean }) {
  const [index, setIndex] = useState(0)
  const [message, setMessage] = useState('Piliin kung Fact o Bluff ang pahayag.')
  const choose = (answer: boolean) => {
    if (answer !== facts[index].answer) { if (!muted) playSound('wrong'); setMessage('Bluff! Basahin muli at subukan ulit.') ; return }
    if (!muted) playSound('correct')
    if (index === facts.length - 1) { setMessage('Lahat tama!'); setTimeout(onComplete, 550) } else { setIndex(i => i + 1); setMessage('Tama! Susunod na pahayag.') }
  }
  return <div className="challenge-page"><button className="back" onClick={onBack}>← Bumalik</button><p className="eyebrow">HAMON 02 • {level.miniTitle.toUpperCase()}</p><h2>Fact o Bluff?</h2><div className="fact-card"><small>{index + 1} / {facts.length}</small><p>{facts[index].statement}</p><div><button onClick={() => choose(true)}>✓ FACT</button><button onClick={() => choose(false)}>✕ BLUFF</button></div><em>{message}</em></div></div>
}

function Quiz({ level, number, score, picked, select, next }: { level: Level; number: number; score: number; picked: number | null; select: (i: number) => void; next: () => void }) {
  const q = level.questions[number]
  return <div className="quiz-page">
    <div className="quiz-head"><span>BOSS BATTLE • LINGGO {level.week}</span><b>{number + 1} / {level.questions.length}</b></div>
    <div className="progress-bar"><i style={{width: `${((number + 1) / level.questions.length) * 100}%`, background: level.color}} /></div>
    <section className="question-card"><div className="boss-avatar">{level.icon}</div><p className="eyebrow">CHRONOS QUESTION</p><h2>{q.prompt}</h2>
      <div className="choices">{q.choices.map((choice, i) => {
        const state = picked === null ? '' : i === q.answer ? 'correct' : i === picked ? 'wrong' : 'dim'
        return <button className={state} onClick={() => select(i)} key={choice}><span>{String.fromCharCode(65 + i)}</span>{choice}</button>
      })}</div>
      {picked !== null && <div className={picked === q.answer ? 'feedback good' : 'feedback bad'}><b>{picked === q.answer ? 'Tama! Nadagdagan ang iyong Chrono Energy.' : 'Hindi iyon ang tamang sagot.'}</b><p>{q.explanation}</p><button onClick={next}>{number === level.questions.length - 1 ? 'Tingnan ang Resulta' : 'Susunod na Tanong'} →</button></div>}
    </section>
    <div className="score-chip">Tamang sagot: {score}</div>
  </div>
}

function Result({ level, score, complete, onMap, retry }: { level: Level; score: number; complete: boolean; onMap: () => void; retry: () => void }) {
  const stars = Math.min(3, Math.max(0, score - 2))
  return <div className="result-page"><section className={complete ? 'result-card victory' : 'result-card'}>
    <div className="result-icon">{complete ? '🏆' : '⏳'}</div><p className="eyebrow">LINGGO {level.week} • RESULTA</p><h2>{complete ? 'Nabuksan ang Tarangkahan!' : 'Kulang pa ang Chrono Energy'}</h2>
    <div className="stars">{[0,1,2].map(i => <span className={i < stars ? 'earned' : ''} key={i}>★</span>)}</div><strong>{score} / 5</strong>
    <p>{complete ? 'Mahusay! Napanatili mo ang daloy ng kasaysayan at nabuksan ang susunod na linggo.' : 'Kailangan ng hindi bababa sa 3 tamang sagot. Balikan ang comic at subukan muli.'}</p>
    <div className="result-actions"><button onClick={retry}>Subukan Muli</button><button className="primary" onClick={onMap}>Bumalik sa Mapa</button></div>
  </section></div>
}
