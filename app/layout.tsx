import './globals.css';
import type { Metadata } from 'next';
export const metadata: Metadata = { title: 'IRL Quest Platform', description: 'Mobile-first real-world multiplayer quest MVP' };
export default function RootLayout({ children }: { children: React.ReactNode }) { return <html lang="en"><body>{children}</body></html>; }
