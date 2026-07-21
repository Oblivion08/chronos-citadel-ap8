# Chronos Citadel — AP 8

Isang mobile-friendly learning adventure para sa Araling Panlipunan 8, Unang Termino.

## Kasalukuyang features

- Sampung weekly realms mula Heograpiya hanggang Asian Exploration
- Comic-based lesson viewer
- Iba-ibang mini-game: sequencing, matching, word scramble, at Fact o Bluff
- 5-item boss quiz bawat linggo
- Section dropdown para sa 8-ABRAHAM, 8-ISAAC, 8-MOSES, 8-EZEKIEL, 8-ISAIAH, at 9-JEREMIAH
- Background music, Chronos intro, correct/wrong feedback, unlock, at victory sounds
- Sequential unlocking ng mga linggo
- Stars, coins, rank, score, at continue-game progress
- Local device auto-save kapag wala pang Firebase configuration
- Optional Firebase Anonymous Authentication at Cloud Firestore sync
- Responsive interface para sa phone, tablet, at laptop
- Vercel-ready single-page app configuration

## Patakbuhin sa computer

```bash
npm install
npm run dev
```

## Firebase setup

1. Gumawa ng Firebase web app.
2. I-enable ang **Anonymous** provider sa Authentication.
3. Gumawa ng Cloud Firestore database.
4. Kopyahin ang `.env.example` bilang `.env.local`.
5. Ilagay ang Firebase web configuration values.

Suggested Firestore rules habang classroom testing:

```text
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /players/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## Vercel deployment

- Framework preset: **Vite**
- Build command: `npm run build`
- Output directory: `dist`
- Idagdag sa Vercel ang parehong `VITE_FIREBASE_*` environment variables.
