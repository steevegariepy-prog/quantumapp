# IRL Quest Platform

Production-ready MVP scaffold for a mobile-first real-world multiplayer quest game.

## Stack
- Next.js App Router + React + TypeScript
- Tailwind CSS mobile-first UI
- Next API routes for auth, teams, quests, missions, feedback, realtime SSE
- Supabase/PostgreSQL schema in `supabase/schema.sql`
- Google Maps-ready map mock and GPS radius validation

## Run
```bash
npm install
npm run dev
```

## Core scoring
`TeamScore = sum(player scores) + cooperation bonus - domination penalty`
