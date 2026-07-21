import { initializeApp } from 'firebase/app'
import { getAuth, signInAnonymously } from 'firebase/auth'
import { doc, getDoc, getFirestore, setDoc } from 'firebase/firestore'

export type SavedProgress = {
  player: string
  section: string
  stars: number
  coins: number
  completed: number[]
  scores: Record<number, number>
}

const config = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

export const firebaseEnabled = Boolean(config.apiKey && config.projectId && config.appId)

let uid = ''
let db: ReturnType<typeof getFirestore> | null = null

export async function connectCloud() {
  if (!firebaseEnabled) return false
  const app = initializeApp(config)
  const auth = getAuth(app)
  db = getFirestore(app)
  const credential = await signInAnonymously(auth)
  uid = credential.user.uid
  return true
}

export async function loadCloudProgress(): Promise<SavedProgress | null> {
  if (!db || !uid) return null
  const snapshot = await getDoc(doc(db, 'players', uid))
  return snapshot.exists() ? (snapshot.data() as SavedProgress) : null
}

export async function saveCloudProgress(progress: SavedProgress) {
  if (!db || !uid) return
  await setDoc(doc(db, 'players', uid), { ...progress, updatedAt: new Date().toISOString() }, { merge: true })
}
