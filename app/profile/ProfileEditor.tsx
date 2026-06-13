'use client';

import { useState, useTransition } from 'react';
import type { UserProfile } from '@/lib/user-store';

type Props = { user: UserProfile };

export function ProfileEditor({ user }: Props) {
  const [profile, setProfile] = useState(user);
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({ username: user.username, bio: user.bio });
  const [message, setMessage] = useState('');
  const [isPending, startTransition] = useTransition();

  function saveProfile() {
    setMessage('');
    startTransition(async () => {
      const response = await fetch('/api/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (!response.ok) {
        setMessage(typeof data.error === 'string' ? data.error : 'Impossible de sauvegarder le profil.');
        return;
      }
      setProfile(data.user);
      setForm({ username: data.user.username, bio: data.user.bio });
      setIsEditing(false);
      setMessage('Profil sauvegardé.');
    });
  }

  return (
    <div className="premium-profile-stack">
      <section className="premium-profile-card">
        <div className="premium-profile-glow" />
        <div className="premium-profile-header">
          {profile.profileImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={profile.profileImage} alt="Profile" className="premium-profile-photo" />
          ) : (
            <div className="premium-profile-photo premium-profile-initial">{profile.name.charAt(0).toUpperCase()}</div>
          )}
          <div>
            <p className="premium-kicker">Profil aventurier</p>
            <h1>{profile.username}</h1>
            <p>{profile.email}</p>
          </div>
        </div>

        <p className="premium-profile-bio">{profile.bio || 'Ajoute une bio pour dire à ton équipe quel type de légende tu veux devenir.'}</p>

        <div className="premium-profile-actions">
          <button onClick={() => setIsEditing(true)}>Edit profile</button>
          <form action="/api/auth/signout" method="post">
            <button className="secondary">Sign out</button>
          </form>
        </div>
      </section>

      {isEditing && (
        <section className="premium-panel">
          <p className="premium-kicker">Personnalisation</p>
          <h2>Modifier le profil</h2>
          <label>Username</label>
          <input value={form.username} onChange={(event) => setForm({ ...form, username: event.target.value })} />
          <label>Bio</label>
          <textarea value={form.bio} onChange={(event) => setForm({ ...form, bio: event.target.value })} rows={4} />
          <button onClick={saveProfile} disabled={isPending}>{isPending ? 'Saving...' : 'Save changes'}</button>
        </section>
      )}

      {message && <p className="premium-message">{message}</p>}

      <section className="premium-panel">
        <p className="premium-kicker">Progression</p>
        <h2>Stats</h2>
        <div className="premium-stats-grid">
          {Object.entries(profile.stats).map(([key, value]) => (
            <div key={key} className="premium-stat-row">
              <div><span>{key}</span><strong>{value}</strong></div>
              <div className="premium-stat-track"><span style={{ width: `${value}%` }} /></div>
            </div>
          ))}
        </div>
      </section>

      <section className="premium-panel premium-team-panel">
        <p className="premium-kicker">Escouade</p>
        <h2>Team</h2>
        <p>No active team yet. Team membership will appear here when squads launch.</p>
      </section>
    </div>
  );
}
