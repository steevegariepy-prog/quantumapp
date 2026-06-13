import Link from 'next/link';
import { ProfileEditor } from './ProfileEditor';
import { requireSessionUser } from '@/lib/auth';

export default async function Profile() {
  const user = await requireSessionUser();
  return (
    <main className="premium-app-shell premium-profile-page">
      <header className="premium-topbar">
        <Link className="premium-icon-button" href="/" aria-label="Back home">‹</Link>
        <p className="premium-topbar-title">Profil</p>
        <span className="premium-icon-button muted">✦</span>
      </header>
      <ProfileEditor user={user} />
    </main>
  );
}
