import { promises as fs } from 'fs';
import path from 'path';

export type UserStats = {
  logic: number;
  gps: number;
  social: number;
  tech: number;
  speed: number;
  leadership: number;
};

export type UserProfile = {
  id: string;
  email: string;
  name: string;
  profileImage: string;
  username: string;
  bio: string;
  stats: UserStats;
  createdAt: string;
  lastLogin: string;
};

type UserDatabase = { users: UserProfile[] };

const dataDir = path.join(process.cwd(), '.data');
const dbPath = path.join(dataDir, 'users.json');

export const defaultStats: UserStats = {
  logic: 50,
  gps: 50,
  social: 50,
  tech: 50,
  speed: 50,
  leadership: 50,
};

function slugifyUsername(value: string) {
  const slug = value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '').slice(0, 24);
  return slug || 'quester';
}

async function readDb(): Promise<UserDatabase> {
  try {
    const raw = await fs.readFile(dbPath, 'utf8');
    return JSON.parse(raw) as UserDatabase;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') return { users: [] };
    throw error;
  }
}

async function writeDb(db: UserDatabase) {
  await fs.mkdir(dataDir, { recursive: true });
  await fs.writeFile(dbPath, JSON.stringify(db, null, 2));
}

function uniqueUsername(base: string, users: UserProfile[], currentUserId?: string) {
  let candidate = slugifyUsername(base);
  let suffix = 1;
  while (users.some((user) => user.id !== currentUserId && user.username === candidate)) {
    suffix += 1;
    candidate = `${slugifyUsername(base).slice(0, 20)}-${suffix}`;
  }
  return candidate;
}

export async function getUserProfile(id: string) {
  const db = await readDb();
  return db.users.find((user) => user.id === id) ?? null;
}

export async function upsertGoogleUser(input: { id: string; email: string; name: string; profileImage: string }) {
  const db = await readDb();
  const now = new Date().toISOString();
  const existing = db.users.find((user) => user.id === input.id);

  if (existing) {
    existing.email = input.email;
    existing.name = input.name;
    existing.profileImage = input.profileImage;
    existing.lastLogin = now;
    await writeDb(db);
    return existing;
  }

  const profile: UserProfile = {
    id: input.id,
    email: input.email,
    name: input.name,
    profileImage: input.profileImage,
    username: uniqueUsername(input.name || input.email.split('@')[0], db.users),
    bio: '',
    stats: defaultStats,
    createdAt: now,
    lastLogin: now,
  };

  db.users.push(profile);
  await writeDb(db);
  return profile;
}

export async function updateUserProfile(id: string, input: { username: string; bio: string }) {
  const db = await readDb();
  const profile = db.users.find((user) => user.id === id);
  if (!profile) return null;

  profile.username = uniqueUsername(input.username, db.users, id);
  profile.bio = input.bio.trim().slice(0, 280);
  await writeDb(db);
  return profile;
}
