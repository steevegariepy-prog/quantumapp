import { createOAuthState } from '@/lib/auth';

export async function GET() {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const redirectUri = process.env.GOOGLE_REDIRECT_URI || `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/auth/callback/google`;

  if (!clientId) {
    return Response.json({ error: 'GOOGLE_CLIENT_ID is required to start Google sign-in.' }, { status: 500 });
  }

  const state = await createOAuthState();
  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: 'code',
    scope: 'openid email profile',
    prompt: 'select_account',
    state,
  });

  return Response.redirect(`https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`);
}
