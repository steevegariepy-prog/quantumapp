import { getSessionUser } from '@/lib/auth';
import { updateUserProfile } from '@/lib/user-store';
import { z } from 'zod';

const updateSchema = z.object({
  username: z.string().trim().min(2).max(24).regex(/^[a-zA-Z0-9_-]+$/, 'Use only letters, numbers, underscores, and hyphens.'),
  bio: z.string().trim().max(280).default(''),
});

export async function GET() {
  const user = await getSessionUser();
  if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });
  return Response.json({ user });
}

export async function PATCH(request: Request) {
  const user = await getSessionUser();
  if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

  const parsed = updateSchema.safeParse(await request.json());
  if (!parsed.success) return Response.json({ error: parsed.error.flatten() }, { status: 400 });

  const updated = await updateUserProfile(user.id, parsed.data);
  return Response.json({ user: updated });
}
