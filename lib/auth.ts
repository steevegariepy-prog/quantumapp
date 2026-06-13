import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getUserProfile, type UserProfile } from './user-store';

const sessionCookie = 'quantum_session';
const stateCookie = 'quantum_oauth_state';
const maxAge = 60 * 60 * 24 * 30;

type SessionPayload = { sub: string; email: string; exp: number };

function base64url(input: string | Buffer) {
  return Buffer.from(input).toString('base64url');
}

function secret() {
  return process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET || 'development-only-change-me';
}

async function sign(value: string) {
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(secret()), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const signature = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(value));
  return base64url(Buffer.from(signature));
}

async function verify(value: string, signature: string) {
  return (await sign(value)) === signature;
}

export async function createSessionCookie(payload: Omit<SessionPayload, 'exp'>) {
  const body = base64url(JSON.stringify({ ...payload, exp: Math.floor(Date.now() / 1000) + maxAge }));
  const signature = await sign(body);
  (await cookies()).set(sessionCookie, `${body}.${signature}`, { httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production', path: '/', maxAge });
}

export async function clearSessionCookie() {
  (await cookies()).delete(sessionCookie);
}

export async function getSessionUser(): Promise<UserProfile | null> {
  const token = (await cookies()).get(sessionCookie)?.value;
  if (!token) return null;
  const [body, signature] = token.split('.');
  if (!body || !signature || !(await verify(body, signature))) return null;
  const payload = JSON.parse(Buffer.from(body, 'base64url').toString('utf8')) as SessionPayload;
  if (payload.exp < Math.floor(Date.now() / 1000)) return null;
  return getUserProfile(payload.sub);
}

export async function requireSessionUser() {
  const user = await getSessionUser();
  if (!user) redirect('/api/auth/signin');
  return user;
}

export async function createOAuthState() {
  const state = crypto.randomUUID();
  (await cookies()).set(stateCookie, state, { httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production', path: '/', maxAge: 600 });
  return state;
}

export async function consumeOAuthState(state: string | null) {
  const store = await cookies();
  const expected = store.get(stateCookie)?.value;
  store.delete(stateCookie);
  return Boolean(state && expected && state === expected);
}
