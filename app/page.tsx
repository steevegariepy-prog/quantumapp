const experiences = [
  { title: 'INDICE VIDÉO', text: "Regarde un Short YouTube et trouve l'indice caché", image: 'https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=600&q=80', icon: '▶' },
  { title: 'ÉNIGME IA', text: "Résous une énigme unique générée par l'IA", image: 'https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&w=600&q=80', icon: '◎' },
  { title: 'MISSION AR', text: "Active la réalité augmentée et découvre l'indice", image: 'https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=600&q=80', icon: '△' }
];

const teams = [
  ['1', 'LES EXPLORATEURS', '12 450', 'bg-[#ffc400] text-black'],
  ['2', 'TEAM NOMADE', '9 820', 'bg-[#d8d8e0] text-black'],
  ['3', 'AVENTURIERS 2.0', '8 310', 'bg-gradient-to-br from-[#ffb13b] to-[#ff6826] text-black'],
  ['4', 'LES INCORRUPTIBLES', '7 600', 'border border-[#6b4a00] text-[#8d7b59]']
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#020200] pb-36 text-[#fff8ea]">
      <header className="sticky top-0 z-20 flex h-24 items-center justify-between bg-black/95 px-9 shadow-[0_1px_0_rgba(246,189,36,.18)] backdrop-blur">
        <button className="grid h-[74px] w-[74px] place-items-center rounded-full border border-[#6b4a00] text-5xl leading-none text-[#f6bd24] shadow-[0_0_22px_rgba(246,189,36,.11)]" aria-label="Menu">≡</button>
        <div className="flex items-center gap-5">
          <button className="grid h-[74px] w-[74px] place-items-center rounded-full border border-[#6b4a00] text-4xl text-[#f6bd24]" aria-label="Notifications">♟</button>
          <div className="relative h-[68px] w-[68px] overflow-hidden rounded-full border border-black bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80')" }}>
            <span className="absolute bottom-0 right-0 h-6 w-6 rounded-full border-4 border-black bg-emerald-500" />
          </div>
        </div>
      </header>

      <section className="relative min-h-[760px] overflow-hidden border-b border-[#5e4200] bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=90')" }}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_22%,rgba(246,189,36,.2),transparent_22rem),linear-gradient(180deg,rgba(0,0,0,.06),rgba(0,0,0,.18)_34%,#020200_96%)]" />
        <div className="relative mx-auto flex max-w-[430px] flex-col items-center px-7 pb-12 pt-20 text-center">
          <div className="relative mb-12 grid h-[390px] w-full place-items-center">
            <div className="absolute h-[320px] w-[320px] rounded-full bg-[radial-gradient(circle,#243f2a_0%,#142417_58%,transparent_70%)] opacity-90 blur-sm" />
            <div className="quest-serif hero-shadow relative text-center font-black leading-[.82] text-[#d9a635] drop-shadow-2xl">
              <div className="mx-auto mb-[-10px] grid h-28 w-28 place-items-center rounded-full border-4 border-[#7c5c1a] bg-[#21180a] text-6xl">✵</div>
              <div className="text-[74px]">WORLD</div>
              <div className="text-[82px]">QUEST</div>
              <div className="mx-auto mt-2 w-64 rounded-[40px] border-4 border-[#84621a] bg-[#123033] py-2 text-[46px] tracking-[.18em] text-[#e8b94a]">LIVE</div>
            </div>
          </div>
          <h1 className="quest-serif hero-shadow text-[44px] font-black uppercase leading-tight tracking-wide">LE MONDE DEVIENT TON TERRAIN DE JEU</h1>
          <p className="mt-8 text-[25px] font-medium italic leading-relaxed text-[#d9a635]">Explore, résous, découvre,<br />surpasse et deviens la légende&nbsp;!</p>
        </div>
      </section>

      <section className="mx-auto max-w-[430px] px-4 py-8">
        <article className="relative overflow-hidden rounded-[28px] border border-[#6b4a00] bg-cover bg-center p-7 shadow-[0_20px_60px_rgba(0,0,0,.65)]" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?auto=format&fit=crop&w=1000&q=90')" }}>
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/20" />
          <div className="relative space-y-5">
            <p className="quest-serif quest-track text-xl font-black text-[#f6bd24]">AVENTURE DU JOUR</p>
            <h2 className="quest-serif max-w-[280px] text-[40px] font-black uppercase leading-[1.05]">LE TRÉSOR OUBLIÉ DE XIBALBA</h2>
            <p className="flex items-start gap-4 text-[25px] leading-relaxed text-[#efe7d9]"><span className="text-[#f6bd24]">⌖</span>Lieu : Playa del Carmen,<br />Mexique</p>
            <p className="text-[25px]">Difficulté : <span className="text-[#f6bd24]">★★★★</span><span className="text-[#5b4b22]">☆</span></p>
            <button className="quest-serif flex w-full items-center justify-between rounded-[26px] bg-gradient-to-r from-[#ffd047] to-[#e4a000] px-7 py-5 text-[25px] font-black uppercase tracking-[.22em] text-black shadow-[0_10px_24px_rgba(246,189,36,.24)]">Commencer l’aventure <span className="text-5xl leading-none">→</span></button>
            <p className="flex items-center gap-4 text-xl text-[#d8d1c4]"><span className="text-3xl text-[#f6bd24]">◷</span>Fin de l'aventure dans : <b className="text-[#f6bd24]">02h&nbsp;&nbsp;:&nbsp;&nbsp;45m&nbsp;&nbsp;:&nbsp;&nbsp;21s</b></p>
          </div>
        </article>
      </section>

      <section className="mx-auto max-w-[430px] px-4 py-10">
        <h2 className="quest-serif quest-track mb-8 text-center text-[25px] font-black text-[#f6bd24]">UNE SEULE AVENTURE, 7 EXPÉRIENCES</h2>
        <div className="grid grid-cols-3 gap-3">
          {experiences.map((item) => (
            <article key={item.title} className="overflow-hidden rounded-[22px] border border-[#5e4200] bg-[#070400] text-center shadow-[0_0_24px_rgba(0,0,0,.55)]">
              <div className="relative h-44 bg-cover bg-center" style={{ backgroundImage: `url(${item.image})` }}>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#070400]" />
                <span className="absolute inset-0 grid place-items-center text-4xl text-[#f6bd24]">{item.icon}</span>
              </div>
              <div className="px-3 pb-5">
                <h3 className="quest-serif text-[18px] font-black text-[#f6bd24]">{item.title}</h3>
                <p className="mt-2 text-[15px] leading-snug text-[#a99a7f]">{item.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[430px] px-4 pb-8">
        <div className="overflow-hidden rounded-[28px] border border-[#5e4200] bg-[#070400]">
          <div className="flex items-center justify-between border-b border-[#3b2900] p-5">
            <h2 className="quest-serif quest-track text-[22px] font-black text-[#f6bd24]">MEILLEURES ÉQUIPES</h2>
            <button className="rounded-full border border-[#7d5900] px-5 py-2 text-sm font-black uppercase text-[#f6bd24]">Voir le classement</button>
          </div>
          {teams.map(([rank, name, score, tone]) => (
            <div key={name} className="flex items-center gap-5 border-b border-[#2a1d00] p-5 last:border-b-0">
              <span className={`grid h-14 w-14 place-items-center rounded-full quest-serif text-2xl font-black ${tone}`}>{rank}</span>
              <strong className="quest-serif flex-1 text-[22px] uppercase tracking-wide">{name}</strong>
              <span className="font-mono text-[24px] font-black text-[#f6bd24]">{score} <small className="text-base text-[#a99a7f]">pts</small></span>
            </div>
          ))}
        </div>
      </section>

      <nav className="fixed bottom-0 left-1/2 z-30 grid h-[128px] w-full max-w-[430px] -translate-x-1/2 grid-cols-4 border-t border-[#5e4200] bg-black/95 px-6 pt-4 shadow-[0_-18px_50px_rgba(0,0,0,.85)]">
        {['⌾|ACCUEIL', '♮|AVENTURES', '♧|ÉQUIPES', '♙|PROFIL'].map((raw, index) => {
          const [icon, label] = raw.split('|');
          return <a key={label} className={`flex flex-col items-center gap-2 ${index === 0 ? 'text-[#f6bd24]' : 'text-[#9b927f]'}`} href={index === 3 ? '/profile' : index === 2 ? '/teams/t1' : index === 1 ? '/quests/neon-downtown' : '/'}><span className={`grid h-16 w-16 place-items-center rounded-full text-4xl ${index === 0 ? 'bg-[#f6bd24] text-black shadow-[0_0_28px_rgba(246,189,36,.45)]' : ''}`}>{icon}</span><span className="quest-serif text-sm uppercase tracking-[.28em]">{label}</span></a>;
        })}
      </nav>
    </main>
  );
}
