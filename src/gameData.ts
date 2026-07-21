export type Question = {
  prompt: string
  choices: string[]
  answer: number
  explanation: string
}

export type Level = {
  week: number
  realm: string
  title: string
  subtitle: string
  image: string
  color: string
  icon: string
  orderPrompt: string
  orderItems: string[]
  miniGame: 'order' | 'match' | 'scramble' | 'fact'
  miniTitle: string
  matchPairs?: { left: string; right: string }[]
  scramble?: { clue: string; answer: string }
  facts?: { statement: string; answer: boolean }[]
  questions: Question[]
}

export const levels: Level[] = [
  {
    week: 1,
    realm: 'Kaharian ng Heograpiya',
    title: 'Ang Kalikasan, Ang Ating Tahanan',
    subtitle: 'Kontinente, Pangaea, anyong lupa at tubig, at limang tema ng heograpiya',
    image: '/lessons/week-1.png', color: '#4fc3f7', icon: '🌍',
    orderPrompt: 'Ayusin ang mga kontinente mula pinakamalaki hanggang pinakamaliit.',
    orderItems: ['Asya', 'Aprika', 'Hilagang Amerika', 'Timog Amerika', 'Antarktika', 'Europa', 'Australia'],
    miniGame: 'order', miniTitle: 'Ayusin ang Kontinente',
    questions: [
      { prompt: 'Ano ang tawag sa dating nag-iisang malaking kalupaan?', choices: ['Gondwana', 'Pangaea', 'Panthalassa', 'Laurasia'], answer: 1, explanation: 'Pangaea ang superkontinenteng kalauna\'y nagkahiwa-hiwalay.' },
      { prompt: 'Sino ang nagpanukala ng Continental Drift Theory noong 1912?', choices: ['Alfred Wegener', 'Charles Darwin', 'Isaac Newton', 'Marco Polo'], answer: 0, explanation: 'Ipinanukala ni Alfred Wegener ang Continental Drift Theory.' },
      { prompt: 'Alin ang tumutukoy sa kinaroroonan ng isang lugar?', choices: ['Interaksyon', 'Lokasyon', 'Paggalaw', 'Rehiyon'], answer: 1, explanation: 'Lokasyon ang nagsasabi kung saan matatagpuan ang isang lugar.' },
      { prompt: 'Aling anyong tubig ang umaagos mula bundok patungo sa dagat?', choices: ['Ilog', 'Karagatan', 'Lawa', 'Look'], answer: 0, explanation: 'Ang ilog ay umaagos at karaniwang nagtatapos sa dagat.' },
      { prompt: 'Alin ang pinaka-pinagtibay na paliwanag sa paggalaw ng mga kontinente?', choices: ['Land Bridge', 'Plate Tectonics', 'Pangaea Map', 'Topograpiya'], answer: 1, explanation: 'Ipinapaliwanag ng Plate Tectonics ang patuloy na paggalaw ng crustal plates.' },
    ],
  },
  {
    week: 2,
    realm: 'Lambak ng mga Kabihasnan',
    title: 'Mga Kabihasnan sa Malalaking Ilog',
    subtitle: 'Mesopotamia, Indus, Huang He, at Sinaunang Egypt',
    image: '/lessons/week-2.png', color: '#f7c948', icon: '🏺',
    orderPrompt: 'Ayusin mula kanluran patungong silangan ang mga kabihasnang ito.',
    orderItems: ['Egypt', 'Mesopotamia', 'Indus', 'Huang He'],
    miniGame: 'match', miniTitle: 'Ipares ang Ilog at Kabihasnan',
    matchPairs: [{ left: 'Tigris at Euphrates', right: 'Mesopotamia' }, { left: 'Indus', right: 'Harappa' }, { left: 'Nile', right: 'Egypt' }],
    questions: [
      { prompt: 'Sa pagitan ng anong mga ilog umusbong ang Mesopotamia?', choices: ['Ganges at Indus', 'Nile at Congo', 'Tigris at Euphrates', 'Yangtze at Huang He'], answer: 2, explanation: 'Ang Mesopotamia ay nangangahulugang lupain sa pagitan ng Tigris at Euphrates.' },
      { prompt: 'Ano ang natatanging katangian ng mga lungsod ng Indus?', choices: ['Maayos na drainage', 'Malalaking piramide', 'Oracle bones', 'Ziggurat'], answer: 0, explanation: 'Kilala ang Harappa at Mohenjo-daro sa planadong lungsod at drainage system.' },
      { prompt: 'Aling ilog ang tinawag na “Sorrow of China”?', choices: ['Ganges', 'Huang He', 'Indus', 'Nile'], answer: 1, explanation: 'Madalas na pagbaha ng Huang He ang nagdulot ng malaking pinsala.' },
      { prompt: 'Bakit tinawag na “Regalo ng Ilog Nile” ang Egypt?', choices: ['Dahil sa maalat na tubig', 'Dahil sa mayamang lupang dulot ng baha', 'Dahil sa maraming barko', 'Dahil sa malamig na klima'], answer: 1, explanation: 'Nag-iiwan ang pagbaha ng Nile ng matabang lupa para sa pagsasaka.' },
      { prompt: 'Ano ang sinaunang sistema ng pagsulat ng Sumerian?', choices: ['Cuneiform', 'Hieroglyphics', 'Pictograph', 'Sanskrit'], answer: 0, explanation: 'Cuneiform ang sistemang pagsulat na ginamit ng mga Sumerian.' },
    ],
  },
  {
    week: 3,
    realm: 'Dagat ng Mediterraneo',
    title: 'Minoan, Mycenaean, at Kabihasnan sa Amerika',
    subtitle: 'Sinaunang kabihasnan sa Mediterraneo, Mesoamerica, Andes, at Pacific',
    image: '/lessons/week-3.png', color: '#ff8a65', icon: '⛵',
    orderPrompt: 'Ayusin ayon sa pagsisimula: mula pinakamaaga hanggang pinakahuli.',
    orderItems: ['Minoan', 'Mycenaean', 'Olmec', 'Maya', 'Aztec', 'Inca'],
    miniGame: 'scramble', miniTitle: 'Mix and Fix',
    scramble: { clue: 'Kabihasnang umusbong sa pulo ng Crete.', answer: 'MINOAN' },
    questions: [
      { prompt: 'Saan umusbong ang kabihasnang Minoan?', choices: ['Crete', 'Mainland Greece', 'Rome', 'Sicily'], answer: 0, explanation: 'Sa pulo ng Crete umusbong ang Minoan civilization.' },
      { prompt: 'Ano ang mahalagang ambag ng Minoan?', choices: ['Aqueduct', 'Kalakalan sa Mediterraneo', 'Piramide', 'Roman law'], answer: 1, explanation: 'Mahuhusay na mandaragat at mangangalakal ang mga Minoan.' },
      { prompt: 'Aling kabihasnan ang gumamit ng quipu sa pagtatala?', choices: ['Aztec', 'Inca', 'Maya', 'Olmec'], answer: 1, explanation: 'Quipu ang tali-taling panulat at talaan ng mga Inca.' },
      { prompt: 'Sino ang tinatawag na “Ina ng mga Kabihasnan” sa Mesoamerica?', choices: ['Aztec', 'Inca', 'Maya', 'Olmec'], answer: 3, explanation: 'Olmec ang itinuturing na mother culture ng Mesoamerica.' },
      { prompt: 'Ano ang mahalagang lakas ng mga Polynesian?', choices: ['Cuneiform', 'Paglalayag at nabigasyon', 'Paggawa ng bakal', 'Pagtatayo ng ziggurat'], answer: 1, explanation: 'Mahuhusay silang mandaragat na gumamit ng bituin at kalikasan sa paglalayag.' },
    ],
  },
  {
    week: 4,
    realm: 'Piramide ng Lipunan',
    title: 'Mga Sinaunang Lipunan',
    subtitle: 'Sumerian, Egyptian, Varna, Greek, Sparta, at Athens',
    image: '/lessons/week-4.png', color: '#ab8cff', icon: '🏛️',
    orderPrompt: 'Ayusin ang Varna mula pinakamataas hanggang pinakamababa.',
    orderItems: ['Brahmin', 'Kshatriya', 'Vaishya', 'Shudra'],
    miniGame: 'fact', miniTitle: 'Fact o Bluff',
    facts: [{ statement: 'Ang Pharaoh ang pinakamataas na pinuno sa Egypt.', answer: true }, { statement: 'Ang Sparta ay kilala sa demokrasya at malayang sining.', answer: false }, { statement: 'Ang Brahmin ay pangkat ng mga pari at guro.', answer: true }],
    questions: [
      { prompt: 'Sino ang namuno sa mga lungsod-estado ng Sumer?', choices: ['Hari', 'Pari', 'Pharaoh', 'Senador'], answer: 0, explanation: 'Hari ang pinuno, habang mahalaga rin ang papel ng mga pari.' },
      { prompt: 'Sino ang nasa pinakamataas na antas ng lipunang Egyptian?', choices: ['Eskribang', 'Manggagawa', 'Pari', 'Pharaoh'], answer: 3, explanation: 'Ang Pharaoh ang itinuturing na hari at diyos ng Egypt.' },
      { prompt: 'Aling Varna ang binubuo ng mga pari at guro?', choices: ['Brahmin', 'Kshatriya', 'Shudra', 'Vaishya'], answer: 0, explanation: 'Brahmin ang pangkat ng mga pari at guro.' },
      { prompt: 'Anong lungsod-estado ang nakatuon sa disiplina at militar?', choices: ['Athens', 'Corinth', 'Sparta', 'Thebes'], answer: 2, explanation: 'Kilala ang Sparta sa lipunang militarista.' },
      { prompt: 'Ano ang pangunahing ambag ng Athens?', choices: ['Caste system', 'Demokrasya', 'Piramide', 'Ziggurat'], answer: 1, explanation: 'Sa Athens umunlad ang sinaunang demokrasya.' },
    ],
  },
  {
    week: 5,
    realm: 'Templo ng Paniniwala',
    title: 'Zoroastrianismo at Sinaunang Relihiyon',
    subtitle: 'Hinduismo, Judaismo, Kristiyanismo, Islam, at Budismo',
    image: '/lessons/week-5.png', color: '#ef7fb2', icon: '🕯️',
    orderPrompt: 'Ayusin ayon sa pag-usbong: mula pinakamatanda hanggang pinakabago.',
    orderItems: ['Hinduismo', 'Judaismo', 'Zoroastrianismo', 'Budismo', 'Kristiyanismo', 'Islam'],
    miniGame: 'match', miniTitle: 'Ipares ang Relihiyon at Aklat',
    matchPairs: [{ left: 'Judaismo', right: 'Torah' }, { left: 'Islam', right: 'Qur’an' }, { left: 'Kristiyanismo', right: 'Biblia' }],
    questions: [
      { prompt: 'Sino ang propeta ng Zoroastrianismo?', choices: ['Abraham', 'Confucius', 'Muhammad', 'Zarathustra'], answer: 3, explanation: 'Si Zarathustra o Zoroaster ang propetang kaugnay ng Zoroastrianismo.' },
      { prompt: 'Ano ang banal na aklat ng Judaismo?', choices: ['Biblia', 'Qur’an', 'Torah', 'Vedas'], answer: 2, explanation: 'Torah o Tanakh ang banal na kasulatan ng Judaismo.' },
      { prompt: 'Ano ang pangunahing konsepto ng Hinduismo tungkol sa gawa at bunga?', choices: ['Karma', 'Nirvana', 'Ren', 'Shahada'], answer: 0, explanation: 'Karma ang kaisipang may bunga ang kilos ng tao.' },
      { prompt: 'Ilan ang pangunahing haligi ng Islam?', choices: ['Apat', 'Lima', 'Pito', 'Sampu'], answer: 1, explanation: 'May Limang Haligi ng Islam.' },
      { prompt: 'Sino ang sentro ng pananampalatayang Kristiyano?', choices: ['Abraham', 'Hesus Kristo', 'Moses', 'Siddhartha Gautama'], answer: 1, explanation: 'Si Hesus Kristo ang Anak ng Diyos at Tagapagligtas sa Kristiyanismo.' },
    ],
  },
  {
    week: 6,
    realm: 'Hardin ng Karunungan',
    title: 'Confucianism, Shintoism, at Buddhism',
    subtitle: 'Mga aral, paniniwala, at ambag sa kabihasnan',
    image: '/lessons/week-6.png', color: '#74d680', icon: '⛩️',
    orderPrompt: 'Ayusin mula kanluran patungong silangan ang pinagmulan ng mga paniniwala.',
    orderItems: ['Buddhism — India', 'Confucianism — China', 'Shintoism — Japan'],
    miniGame: 'scramble', miniTitle: 'Buo-Salita',
    scramble: { clue: 'Pilosopong Tsino na nagbigay-diin sa tamang asal at paggalang.', answer: 'CONFUCIUS' },
    questions: [
      { prompt: 'Sino ang nagtatag ng Confucianism?', choices: ['Confucius', 'Lao Tzu', 'Mencius', 'Siddhartha'], answer: 0, explanation: 'Si Confucius o Kong Fuzi ang nagtatag ng Confucianism.' },
      { prompt: 'Ano ang mahalagang pagpapahalaga sa Shintoism?', choices: ['Kami at kalikasan', 'Caste system', 'Limang Haligi', 'Monotheism'], answer: 0, explanation: 'Iginagalang sa Shinto ang kami at mga elemento ng kalikasan.' },
      { prompt: 'Ano ang layunin ng Buddhism?', choices: ['Maging emperador', 'Makamit ang Nirvana', 'Magtayo ng shrine', 'Palawakin ang teritoryo'], answer: 1, explanation: 'Layunin ng Budismo na wakasan ang pagdurusa at makamit ang Nirvana.' },
      { prompt: 'Ano ang “Ren” sa Confucianism?', choices: ['Kabutihan at pagmamalasakit', 'Kalayaan sa paglalakbay', 'Labanang militar', 'Ritwal ng paglilibing'], answer: 0, explanation: 'Ang Ren ay kabutihan, malasakit, at makataong pakikitungo.' },
      { prompt: 'Saan matatagpuan ang sagradong lugar na Jinja?', choices: ['Buddhism', 'Confucianism', 'Shintoism', 'Zoroastrianism'], answer: 2, explanation: 'Jinja ang tawag sa Shinto shrine.' },
    ],
  },
  {
    week: 7,
    realm: 'Kuta ng Pagbabago',
    title: 'Mahahalagang Pangyayari noong Ika-15 at Ika-16 Siglo',
    subtitle: 'Constantinople, Renaissance, Repormasyon, at Kontra-Repormasyon',
    image: '/lessons/week-7.png', color: '#ffb64d', icon: '📜',
    orderPrompt: 'Ayusin ang mga pangyayari ayon sa panahon.',
    orderItems: ['Pagsasara ng Constantinople — 1453', 'Renaissance', 'Repormasyon — 1517', 'Kontra-Repormasyon'],
    miniGame: 'fact', miniTitle: 'Fact o Bluff',
    facts: [{ statement: 'Nasakop ang Constantinople noong 1453.', answer: true }, { statement: 'Si Martin Luther ang nanguna sa Repormasyon.', answer: true }, { statement: 'Ang Renaissance ay nangangahulugang sagradong digmaan.', answer: false }],
    questions: [
      { prompt: 'Sino ang namuno sa pagsakop sa Constantinople noong 1453?', choices: ['Charlemagne', 'Martin Luther', 'Mehmed II', 'Napoleon'], answer: 2, explanation: 'Pinamunuan ni Sultan Mehmed II ang Ottoman sa pagsakop.' },
      { prompt: 'Ano ang kahulugan ng Renaissance?', choices: ['Dakilang paglalayag', 'Muling pagsilang', 'Reporma sa batas', 'Sagradong digmaan'], answer: 1, explanation: 'Ang Renaissance ay nangangahulugang muling pagsilang.' },
      { prompt: 'Sino ang nagpaskil ng 95 Theses noong 1517?', choices: ['Erasmus', 'Gutenberg', 'Martin Luther', 'Raphael'], answer: 2, explanation: 'Pinuna ni Martin Luther ang maling gawain ng Simbahang Katoliko.' },
      { prompt: 'Ano ang mahalagang pagpupulong ng Kontra-Repormasyon?', choices: ['Council of Trent', 'Diet of Worms', 'Magna Carta', 'Peace of Westphalia'], answer: 0, explanation: 'Sa Council of Trent pinagtibay ang mga reporma ng Simbahang Katoliko.' },
      { prompt: 'Ano ang diwang nagbibigay-halaga sa kakayahan ng tao?', choices: ['Feudalismo', 'Humanismo', 'Merkantilismo', 'Nasyonalismo'], answer: 1, explanation: 'Humanismo ang pangunahing kaisipang umunlad sa Renaissance.' },
    ],
  },
  {
    week: 8,
    realm: 'Dagat ng Paggalugad',
    title: 'Panahon ng Paggalugad',
    subtitle: 'Mga dahilan, manlalakbay, ruta, at bagong kaalaman',
    image: '/lessons/week-8-9.png', color: '#46c9b5', icon: '🧭',
    orderPrompt: 'Ayusin ayon sa taon ng kanilang paglalakbay.',
    orderItems: ['Christopher Columbus — 1492', 'Vasco da Gama — 1498', 'Ferdinand Magellan — 1519'],
    miniGame: 'match', miniTitle: 'Ipares ang Manlalakbay at Ambag',
    matchPairs: [{ left: 'Columbus', right: '1492' }, { left: 'Vasco da Gama', right: 'Ruta patungong India' }, { left: 'Magellan', right: 'Unang paglalayag paikot ng mundo' }],
    questions: [
      { prompt: 'Ano ang pangunahing nagtulak sa Europe na humanap ng bagong ruta sa Asya?', choices: ['Pagsara ng ruta sa Constantinople', 'Pagbagsak ng Rome', 'Pagbuo ng United Nations', 'Pagtuklas ng kuryente'], answer: 0, explanation: 'Naging mahirap ang rutang pangkalakalan matapos mapasakamay ng Ottoman ang Constantinople.' },
      { prompt: 'Sino ang nakarating sa India sa pag-ikot sa Africa?', choices: ['Columbus', 'Da Gama', 'Magellan', 'Zheng He'], answer: 1, explanation: 'Si Vasco da Gama ang nakarating sa India sa rutang palibot ng Africa.' },
      { prompt: 'Sino ang nanguna sa unang paglalayag na nakapaligid sa mundo?', choices: ['Columbus', 'Da Gama', 'Magellan', 'Polo'], answer: 2, explanation: 'Ekspedisyon ni Magellan ang unang nakapaglayag paikot sa mundo.' },
      { prompt: 'Alin ang nakatulong sa tumpak na paglalayag?', choices: ['Astrolabe at compass', 'Printing press at telescope', 'Steam engine at train', 'Telegraph at radio'], answer: 0, explanation: 'Compass at astrolabe ang mahalagang kagamitang nabigasyon.' },
      { prompt: 'Ano ang merkantilismo?', choices: ['Patakarang nagpaparami ng yaman ng bansa', 'Relihiyosong kilusan', 'Sistemang walang pamahalaan', 'Teorya ng kontinente'], answer: 0, explanation: 'Layunin ng merkantilismo na palakasin ang bansa sa pag-ipon ng yaman at kalakalan.' },
    ],
  },
  {
    week: 9,
    realm: 'Anino ng Kolonyalismo',
    title: 'Kolonyalismo sa America',
    subtitle: 'Pananakop, pagbabago, at epekto sa mga katutubo',
    image: '/lessons/week-8-9.png', color: '#ef6d6d', icon: '⛵',
    orderPrompt: 'Ayusin mula dahilan patungo sa kinahinatnan.',
    orderItems: ['Paghahanap ng bagong ruta', 'Pagdating ng mga manlalakbay', 'Pagtatatag ng kolonya', 'Pagbabago sa katutubong pamumuhay'],
    miniGame: 'scramble', miniTitle: 'Buo-Salita',
    scramble: { clue: 'Pananaig at pamamahala ng isang bansa sa ibang lupain.', answer: 'KOLONYALISMO' },
    questions: [
      { prompt: 'Ano ang kolonyalismo?', choices: ['Pag-aaral ng mapa', 'Pananaig at pamamahala ng isang bansa sa iba', 'Paglalakbay para sa turismo', 'Pakikipagpalitan nang pantay'], answer: 1, explanation: 'Kolonyalismo ang pagtatatag ng kontrol ng isang makapangyarihang bansa sa ibang lupain.' },
      { prompt: 'Alin ang naging epekto sa mga katutubo sa America?', choices: ['Ganap na pagkawala ng pagbabago', 'Pagbabago sa pamumuhay at kultura', 'Pag-unlad na walang pinsala', 'Pagtigil ng lahat ng kalakalan'], answer: 1, explanation: 'Nabago ang populasyon, kabuhayan, kultura, at pamamahala ng mga katutubo.' },
      { prompt: 'Anong relihiyon ang pinalaganap ng maraming Europeo?', choices: ['Buddhism', 'Christianity', 'Hinduism', 'Shintoism'], answer: 1, explanation: 'Pinalaganap ng mga misyonero ang Kristiyanismo.' },
      { prompt: 'Ano ang isa sa hinangad ng mananakop?', choices: ['Kayamanan at likas na yaman', 'Pagbaba ng produksyon', 'Pagsara ng rutang pandagat', 'Pagwawakas ng kalakalan'], answer: 0, explanation: 'Hinangad ng mga bansang Europeo ang lupa, ginto, produkto, at yamang likas.' },
      { prompt: 'Aling bansa ang kabilang sa mga nanakop sa America?', choices: ['France', 'India', 'Japan', 'Thailand'], answer: 0, explanation: 'Kabilang ang Spain, Portugal, England, France, at Netherlands.' },
    ],
  },
  {
    week: 10,
    realm: 'Silangang Karagatan',
    title: 'Mga Asyano sa Panahon ng Paggalugad',
    subtitle: 'Ibn Battuta, Zheng He, Mughal Empire, at Tokugawa Japan',
    image: '/lessons/week-10.png', color: '#56a8ff', icon: '🐉',
    orderPrompt: 'Ayusin mula pinakamaagang manlalakbay o pamumuno.',
    orderItems: ['Ibn Battuta — 1304–1369', 'Zheng He — 1405–1433', 'Mughal Empire — 1526–1857', 'Sakoku — 1630s'],
    miniGame: 'fact', miniTitle: 'Fact o Bluff',
    facts: [{ statement: 'Si Ibn Battuta ay nagmula sa Morocco.', answer: true }, { statement: 'Si Zheng He ay isang manlalakbay mula Japan.', answer: false }, { statement: 'Ang Sakoku ay patakaran ng Japan na naglimita sa dayuhan.', answer: true }],
    questions: [
      { prompt: 'Saan nagmula si Ibn Battuta?', choices: ['China', 'India', 'Japan', 'Morocco'], answer: 3, explanation: 'Si Ibn Battuta ay isang Muslim na manlalakbay mula Morocco.' },
      { prompt: 'Sino ang namuno sa malalaking paglalayag ng Ming China?', choices: ['Babur', 'Ibn Battuta', 'Tokugawa', 'Zheng He'], answer: 3, explanation: 'Pinamunuan ni Zheng He ang pitong malalaking paglalayag.' },
      { prompt: 'Sino ang nagtatag ng Mughal Empire sa India?', choices: ['Akbar', 'Babur', 'Shah Jahan', 'Zheng He'], answer: 1, explanation: 'Itinatag ni Babur ang Mughal Empire noong 1526.' },
      { prompt: 'Ano ang Sakoku?', choices: ['Patakarang sarado ang Japan sa dayuhan', 'Ruta ng kalakalan sa India', 'Sistema ng pagsulat sa China', 'Teorya sa paglalayag'], answer: 0, explanation: 'Sakoku ang patakaran ng Tokugawa na naglimita sa pagpasok ng mga dayuhan.' },
      { prompt: 'Ano ang ipinakita ng mga paglalayag ni Zheng He?', choices: ['Kahusayan ng mga Asyano sa nabigasyon', 'Kawalan ng ugnayan ng Asia', 'Paghina ng paggawa ng barko', 'Pagtigil ng kalakalan'], answer: 0, explanation: 'Ipinakita nito ang husay sa paggawa ng barko, paglalayag, at diplomasya.' },
    ],
  },
]
