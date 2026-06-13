import { created } from '@/lib/api';
export async function POST(request: Request) { const body = await request.json(); return created({ id: crypto.randomUUID(), email: body.email, username: body.username, profileComplete: true, token: 'demo-jwt-replace-with-supabase-auth' }); }
