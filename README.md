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

## Google authentication

Set these environment variables before running the app:

```bash
GOOGLE_CLIENT_ID=your-google-oauth-client-id
GOOGLE_CLIENT_SECRET=your-google-oauth-client-secret
AUTH_SECRET=generate-a-long-random-secret
NEXTAUTH_URL=http://localhost:3000
# Optional when deploying behind a custom callback URL:
GOOGLE_REDIRECT_URI=http://localhost:3000/api/auth/callback/google
```

Create the OAuth client in Google Cloud Console and add `/api/auth/callback/google` as an authorized redirect URI. User profiles are automatically created on first login and stored in `.data/users.json` for this MVP; use `supabase/schema.sql` for the production database shape.
