import { created } from '@/lib/api'; import { reputationFromFeedback } from '@/lib/scoring';
export async function POST(request: Request){ const feedback=await request.json(); return created({ ...feedback, reputationPreview: reputationFromFeedback(80, Array.isArray(feedback)?feedback:[feedback]) }); }
