import { ok } from '@/lib/api'; import { quests } from '@/lib/mock-data';
export async function GET(){ return ok(quests); }
