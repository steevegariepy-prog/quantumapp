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
        setMessage(typeof data.error === 'string' ? data.error : 'Could not save profile.');
        return;
      }
      setProfile(data.user);
      setForm({ username: data.user.username, bio: data.user.bio });
      setIsEditing(false);
      setMessage('Profile saved.');
    });
  }

  return (
    <div className="space-y-4">
      <section className="glass overflow-hidden rounded-[2rem] p-5 shadow-2xl shadow-black/30">
        <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
          {profile.profileImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={profile.profileImage} alt="Profile" className="h-24 w-24 rounded-3xl border border-white/15 object-cover" />
          ) : (
            <div className="grid h-24 w-24 place-items-center rounded-3xl bg-neon text-3xl font-black text-asphalt">
              {profile.name.charAt(0).toUpperCase()}
            </div>
          )}
          <div className="flex-1">
            <p className="text-sm uppercase tracking-[0.25em] text-neon">Player profile</p>
            <h1 className="mt-1 text-3xl font-black">{profile.username}</h1>
            <p className="mt-1 text-sm text-white/60">{profile.email}</p>
            <p className="mt-3 text-white/75">{profile.bio || 'No bio yet. Tell your team what kind of quester you are.'}</p>
          </div>
        </div>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <button onClick={() => setIsEditing(true)} className="rounded-2xl bg-white px-5 py-3 font-black text-asphalt">Edit profile</button>
          <form action="/api/auth/signout" method="post">
            <button className="w-full rounded-2xl border border-white/15 px-5 py-3 font-bold text-white/80 sm:w-auto">Sign out</button>
          </form>
        </div>
      </section>

      {isEditing && (
        <section className="glass rounded-[2rem] p-5">
          <h2 className="text-xl font-black">Edit profile</h2>
          <label className="mt-4 block text-sm font-bold text-white/70">Username</label>
          <input value={form.username} onChange={(event) => setForm({ ...form, username: event.target.value })} className="mt-2 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 outline-none focus:border-neon" />
          <label className="mt-4 block text-sm font-bold text-white/70">Bio</label>
          <textarea value={form.bio} onChange={(event) => setForm({ ...form, bio: event.target.value })} rows={4} className="mt-2 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 outline-none focus:border-neon" />
          <button onClick={saveProfile} disabled={isPending} className="mt-4 rounded-2xl bg-neon px-5 py-3 font-black text-asphalt disabled:opacity-60">{isPending ? 'Saving...' : 'Save changes'}</button>
        </section>
      )}

      {message && <p className="rounded-2xl border border-white/10 bg-white/5 p-3 text-sm text-white/75">{message}</p>}

      <section className="glass rounded-[2rem] p-5">
        <h2 className="text-xl font-black">Stats</h2>
        {Object.entries(profile.stats).map(([key, value]) => (
          <div key={key} className="mt-4">
            <div className="flex justify-between text-sm capitalize"><span>{key}</span><span>{value}</span></div>
            <div className="mt-2 h-2 rounded bg-white/10"><div className="h-2 rounded bg-neon" style={{ width: `${value}%` }} /></div>
          </div>
        ))}
      </section>

      <section className="glass rounded-[2rem] p-5">
        <h2 className="text-xl font-black">Team</h2>
        <p className="mt-2 text-white/60">No active team yet. Team membership will appear here when squads launch.</p>
      </section>
    </div>
  );
}
