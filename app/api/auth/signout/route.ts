import { clearSessionCookie } from '@/lib/auth';

export async function POST(request: Request) {
  await clearSessionCookie();
  return Response.redirect(new URL('/', request.url), 303);
}
