# Face Appia

Face Appia is a Next.js application for real-time face detection, analytics, and mood estimation using face-api.js and Firebase.

## Getting Started

### 1. Install dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

### 2. Configure Firebase

Edit `src/firebase.config.ts` with your Firebase project credentials.

### 3. Run the development server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to use the app.

---

## Project Structure

- `src/app/` — Main Next.js app directory
- `src/dashboard/` — Dashboard components and face detection logic
- `src/context/` — React context for live camera state
- `src/lib/` — Utility functions
- `src/types.d.ts` — TypeScript types
- `src/firebase.config.ts` — Firebase configuration

---

## Features

- Real-time face detection and mood estimation using face-api.js
- Distance estimation from camera
- Duplicate detection prevention
- Analytics dashboard (people count, mood, gender, etc.)
- Technical Q&A section
- Firebase integration for detection history

---

## Deployment

To deploy, follow the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) or use [Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

---

## License

MIT

---
