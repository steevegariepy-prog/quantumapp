import { ProfileEditor } from './ProfileEditor';
import { requireSessionUser } from '@/lib/auth';

export default async function Profile() {
  const user = await requireSessionUser();
  return <main className="mx-auto min-h-screen max-w-md p-4 pb-10 pt-6"><ProfileEditor user={user} /></main>;
}
