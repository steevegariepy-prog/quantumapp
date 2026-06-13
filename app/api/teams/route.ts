import { created, ok } from '@/lib/api'; import { demoTeam } from '@/lib/mock-data';
export async function GET(){ return ok([demoTeam]); }
export async function POST(request: Request){ const body=await request.json(); return created({ ...demoTeam, id: crypto.randomUUID(), name: body.name ?? 'New Crew', inviteCode: Math.random().toString(36).slice(2,8).toUpperCase() }); }
