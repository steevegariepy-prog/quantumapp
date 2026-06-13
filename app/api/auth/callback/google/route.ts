import { consumeOAuthState, createSessionCookie } from '@/lib/auth';
import { upsertGoogleUser } from '@/lib/user-store';

type GoogleTokenResponse = { access_token: string; id_token?: string };
type GoogleUserInfo = { sub: string; email: string; email_verified: boolean; name?: string; picture?: string };

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');
  const redirectUri = process.env.GOOGLE_REDIRECT_URI || `${process.env.NEXTAUTH_URL || url.origin}/api/auth/callback/google`;

  if (!code || !(await consumeOAuthState(state))) {
    return Response.json({ error: 'Invalid OAuth callback.' }, { status: 400 });
  }

  const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      code,
      client_id: process.env.GOOGLE_CLIENT_ID || '',
      client_secret: process.env.GOOGLE_CLIENT_SECRET || '',
      redirect_uri: redirectUri,
      grant_type: 'authorization_code',
    }),
  });

  if (!tokenResponse.ok) {
    return Response.json({ error: 'Could not exchange Google authorization code.' }, { status: 401 });
  }

  const token = (await tokenResponse.json()) as GoogleTokenResponse;
  const userInfoResponse = await fetch('https://openidconnect.googleapis.com/v1/userinfo', {
    headers: { Authorization: `Bearer ${token.access_token}` },
  });

  if (!userInfoResponse.ok) {
    return Response.json({ error: 'Could not load Google profile.' }, { status: 401 });
  }

  const googleUser = (await userInfoResponse.json()) as GoogleUserInfo;
  if (!googleUser.email_verified) {
    return Response.json({ error: 'Google email must be verified.' }, { status: 403 });
  }

  const profile = await upsertGoogleUser({
    id: googleUser.sub,
    email: googleUser.email,
    name: googleUser.name || googleUser.email.split('@')[0],
    profileImage: googleUser.picture || '',
  });

  await createSessionCookie({ sub: profile.id, email: profile.email });
  return Response.redirect(new URL('/profile', url.origin));
}
