import Link from 'next/link';
import { quests } from '@/lib/mock-data';

const navigation = [
  { href: '/', icon: '◉', label: 'Accueil', active: true },
  { href: `/quests/${quests[0].id}`, icon: '◇', label: 'Aventures' },
  { href: '/teams/t1', icon: '♟', label: 'Équipes' },
  { href: '/profile', icon: '♙', label: 'Profil' },
];

export default function Home() {
  const quest = quests[0];

  return (
    <main className="premium-app-shell">
      <header className="premium-topbar">
        <button className="premium-icon-button" aria-label="Open menu">☰</button>
        <div className="premium-topbar-actions">
          <button className="premium-icon-button" aria-label="Notifications">♢</button>
          <Link className="premium-avatar-link" href="/profile" aria-label="Open profile">
            <span className="premium-avatar">Q</span>
            <span className="premium-status-dot" />
          </Link>
        </div>
      </header>

      <section className="premium-hero">
        <div className="premium-hero-art" aria-hidden="true">
          <div className="premium-sun" />
          <div className="premium-jungle premium-jungle-left" />
          <div className="premium-jungle premium-jungle-right" />
          <div className="premium-explorers">
            <span />
            <span />
            <span />
            <span />
          </div>
        </div>

        <div className="premium-logo-badge">
          <div className="premium-compass">✦</div>
          <p>World</p>
          <p>Quest</p>
          <span>Live</span>
        </div>

        <div className="premium-hero-copy">
          <p className="premium-kicker">IRL Quest Platform</p>
          <h1>Le monde devient ton terrain de jeu</h1>
          <p>Explore, résous, découvre, surpasse et deviens la légende.</p>
        </div>
      </section>

      <section className="premium-mission-card">
        <div>
          <p className="premium-kicker">Mission active</p>
          <h2>{quest.title}</h2>
          <p>{quest.city} · {quest.durationHours}h · {quest.teamSize} joueurs · {quest.maxTeams} équipes</p>
        </div>
        <Link href={`/quests/${quest.id}`}>Démarrer</Link>
      </section>

      <nav className="premium-bottom-nav" aria-label="Primary navigation">
        {navigation.map((item) => (
          <Link key={item.href} className={item.active ? 'active' : ''} href={item.href}>
            <span>{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </nav>
    </main>
  );
}
