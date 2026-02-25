'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import {
  RiArrowRightLine,
  RiCalendarEventLine,
  RiMedalLine,
  RiPlayCircleLine,
  RiShieldStarLine,
  RiTrophyLine,
} from '@remixicon/react'

const navItems = ['Actualites', 'Videos', 'Calendrier', 'Alertes Matchs', 'Contact']

const standings = [
  { rank: 1, team: 'Racing Club de Lens', pts: 52 },
  { rank: 2, team: 'Olympique Lyonnais', pts: 45 },
  { rank: 3, team: 'FC TORO', pts: 40, highlight: true },
  { rank: 4, team: 'LOSC Lille', pts: 37 },
  { rank: 5, team: 'Stade Rennais FC', pts: 37 },
]

const newsCards = [
  {
    title: 'FC TORO - Dernieres places',
    category: 'Billetterie',
    image: '/toro1.png',
    large: true,
  },
  {
    title: 'Promo billetterie: -40%',
    category: 'Billetterie',
    image: '/toro.png',
  },
  {
    title: 'La seance du 24 fevrier 2026',
    category: 'Entrainement',
    image: '/toro.webp',
  },
  {
    title: 'Communique officiel',
    category: 'Club',
    image: '/fc-toro-logo.png',
  },
  {
    title: 'Le succes de la saison 2013-14',
    category: 'Retro',
    image: '/slg.webp',
  },
]

const heroSlides = [
  {
    label: 'Feminine',
    title: 'La prise du vel',
    cta: 'Voir la suite',
    image: '/toro1.png',
  },
  {
    label: 'Academie',
    title: 'Le futur commence ici',
    cta: 'Decouvrir',
    image: '/toro.png',
  },
  {
    label: 'Equipe Pro',
    title: 'Mission victoire',
    cta: 'Voir l actu',
    image: '/toro.webp',
  },
]

const trophies = [
  { icon: RiTrophyLine, label: 'Ligue des Champions', value: '1' },
  { icon: RiShieldStarLine, label: 'Championnat', value: '11' },
  { icon: RiMedalLine, label: 'Coupes Nationales', value: '10' },
]

const sponsors = [
  { name: 'Coca-Cola', logo: '/sponsors/coca-cola.svg' },
  { name: 'INTERSPORT', logo: '/sponsors/intersport.svg' },
  { name: 'McDonalds', logo: '/sponsors/mcdonalds.svg' },
  { name: 'eToro', logo: '/sponsors/etoro.svg' },
  { name: 'ONET', logo: '/sponsors/onet.svg' },
  { name: 'PUMA', logo: '/sponsors/puma.svg' },
  { name: 'HEIWA', logo: '/sponsors/heiwa.svg' },
  { name: 'OKI', logo: '/sponsors/oki.svg' },
]

export default function HomePage() {
  const [showIntro, setShowIntro] = useState(true)
  const [activeHero, setActiveHero] = useState(0)

  useEffect(() => {
    if (showIntro) return
    const interval = window.setInterval(() => {
      setActiveHero((prev) => (prev + 1) % heroSlides.length)
    }, 4200)
    return () => window.clearInterval(interval)
  }, [showIntro])

  const handleIntroEnd = () => {
    setShowIntro(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (showIntro) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-white px-4">
        <video
          className="w-full max-w-[260px] object-contain sm:max-w-[280px]"
          autoPlay
          muted
          playsInline
          preload="auto"
          onEnded={handleIntroEnd}
        >
          <source src="/Accueil.mp4" type="video/mp4" />
        </video>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#eceff3] text-[#0a1d3a]">
      <header className="border-b border-[#d6dce4] bg-white">
       

        <div className="mx-auto flex max-w-[1360px] items-center gap-6 px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/fc-toro-logo.png" alt="FC TORO" width={50} height={50} className="h-10 w-auto" priority />
            <div>
              <p className="text-lg font-black uppercase tracking-tight text-[#0a1d3a]">FC TORO</p>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#ef233c]">Mache sou yo</p>
            </div>
          </Link>

          <nav className="ml-auto hidden items-center gap-7 lg:flex">
            {navItems.map((item) => (
              <Link key={item} href="#" className="text-sm font-bold uppercase tracking-[0.06em] text-[#0a1d3a] transition-colors hover:text-[#ef233c]">
                {item}
              </Link>
            ))}
            <Link href="/inscription" className="text-sm font-bold uppercase tracking-[0.06em] text-[#e51f36] transition-colors hover:text-[#ef233c]">
              Rejoindre
            </Link>
          </nav>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden border-b border-[#d6dce4] bg-[#0f2a4b]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_40%,rgba(7,150,211,0.35),transparent_45%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,18,40,0.85)_0%,rgba(6,18,40,0.35)_48%,rgba(6,18,40,0.88)_100%)]" />

          <div className="relative mx-auto grid min-h-[620px] max-w-[1360px] items-end px-4 pb-0 pt-8 sm:px-6 lg:px-8">
            <motion.div
              key={activeHero}
              initial={{ opacity: 0.25, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.55 }}
              className="absolute inset-0"
            >
              <Image
                src={heroSlides[activeHero].image}
                alt={heroSlides[activeHero].title}
                fill
                sizes="100vw"
                className="object-cover opacity-70"
                priority
              />
            </motion.div>

            <div className="relative z-10 max-w-[620px] pb-14">
              <p className="inline-flex items-center rounded bg-[#ef233c] px-5 py-2 text-sm font-black uppercase tracking-[0.1em] text-white">
                {heroSlides[activeHero].label}
              </p>
              <h1 className="mt-6 text-5xl font-black uppercase leading-[0.95] text-white drop-shadow-[0_2px_0_rgba(0,0,0,0.25)] sm:text-7xl">
                {heroSlides[activeHero].title}
              </h1>
              <Link href="#" className="mt-8 inline-flex items-center border border-white/70 px-7 py-3 text-sm font-bold uppercase tracking-[0.08em] text-white transition-colors hover:bg-white hover:text-[#0a1d3a]">
                {heroSlides[activeHero].cta}
              </Link>

              <div className="mt-6 flex items-center gap-2">
                {heroSlides.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setActiveHero(index)}
                    className={`h-2.5 rounded-full transition-all ${activeHero === index ? 'w-8 bg-white' : 'w-2.5 bg-white/45 hover:bg-white/70'}`}
                    aria-label={`Slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            <div className="relative z-10 grid gap-4 border-t border-white/25 bg-[rgba(7,19,43,0.82)] p-5 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="flex items-center gap-4">
                <Image src="/fc-toro-logo.png" alt="FC TORO" width={44} height={44} className="h-11 w-auto" />
                <p className="text-3xl font-black text-white">2 - 0</p>
                <p className="text-sm font-bold uppercase tracking-[0.08em] text-white/85">Vivre le match</p>
              </div>
              <div className="grid grid-cols-3 gap-2 text-xs font-bold uppercase tracking-[0.08em] text-white">
                <div className="border border-white/25 p-3">Seance du 24 fev</div>
                <div className="border border-white/25 p-3">Promo billetterie</div>
                <div className="border border-white/25 p-3">La prise du vel</div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-[1360px] gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              className="rounded bg-[#f2f5f8] p-6"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-5xl font-black uppercase leading-[0.9] text-[#16357c]">Prochain match a domicile</h2>
                <Link href="/club/calendrier" className="text-xs font-black uppercase tracking-[0.08em] text-[#0a1d3a]">
                  Voir le calendrier <RiArrowRightLine className="ml-1 inline h-4 w-4" />
                </Link>
              </div>

              <div className="mt-6 rounded border border-[#d4dde7] bg-white p-6">
                <div className="flex items-center justify-between border-b border-[#d4dde7] pb-2 text-sm">
                  <p className="font-black uppercase text-[#0a1d3a]">Ligue 1 | J24</p>
                  <p className="text-[#4a5c78]">Stade FC TORO</p>
                </div>

                <div className="mt-6 grid items-center gap-4 text-center sm:grid-cols-3">
                  <div>
                    <Image src="/fc-toro-logo.png" alt="FC TORO" width={80} height={80} className="mx-auto h-20 w-auto" />
                    <p className="mt-2 text-xl font-black uppercase text-[#0a1d3a]">FC TORO</p>
                  </div>
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.08em] text-[#0a1d3a]">Dimanche 20:45</p>
                    <p className="mt-1 text-4xl font-black text-black">01/03/2026</p>
                    <p className="mt-2 inline-flex rounded bg-[#ef233c] px-3 py-1 text-sm font-black uppercase text-white">Ligue 1+</p>
                  </div>
                  <div>
                    <Image src="/slg.webp" alt="Adversaire" width={80} height={80} className="mx-auto h-20 w-auto rounded" />
                    <p className="mt-2 text-xl font-black uppercase text-[#0a1d3a]">SLG Academie</p>
                  </div>
                </div>

                <div className="mt-5 grid gap-2 sm:grid-cols-2">
                  <button className="rounded border border-[#ef233c] px-4 py-2.5 text-sm font-bold text-[#0a1d3a]">Fiche de match</button>
                  <button className="rounded border border-[#ef233c] px-4 py-2.5 text-sm font-bold text-[#0a1d3a]">Parions sport</button>
                </div>
                <button className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded bg-[#ef233c] px-4 py-2.5 text-sm font-black uppercase text-white">
                  <RiCalendarEventLine className="h-4 w-4" /> Billetterie
                </button>
              </div>
            </motion.article>

            <motion.article
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              className="rounded bg-[#f2f5f8] p-6"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-5xl font-black uppercase leading-[0.95] text-[#16357c]">Classement Ligue 1</h2>
                <Link href="#" className="text-xs font-black uppercase tracking-[0.08em] text-[#0a1d3a]">
                  Classement complet <RiArrowRightLine className="ml-1 inline h-4 w-4" />
                </Link>
              </div>

              <div className="mt-6 space-y-1">
                {standings.map((row) => (
                  <div key={row.team} className={`grid grid-cols-[46px_1fr_auto] items-center gap-3 px-3 py-3 ${row.highlight ? 'bg-[#b8def1]' : 'bg-transparent'}`}>
                    <p className="text-2xl font-black text-black">{row.rank}</p>
                    <p className="text-xl font-black uppercase text-[#0a1d3a]">{row.team}</p>
                    <p className="text-lg font-black text-black">{row.pts} PTS</p>
                  </div>
                ))}
              </div>
            </motion.article>
          </div>
        </section>

        <section className="px-4 pb-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[1360px]">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-5xl font-black uppercase text-[#0a1d3a]">Actualites</h3>
              <Link href="#" className="text-xs font-black uppercase tracking-[0.08em] text-[#0a1d3a]">
                Voir toutes les actus <RiArrowRightLine className="ml-1 inline h-4 w-4" />
              </Link>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {newsCards.map((card) => (
                <article key={card.title} className={card.large ? 'md:col-span-2' : ''}>
                  <div className="relative h-[210px] overflow-hidden bg-[#0f2a4b] md:h-[250px]">
                    <Image src={card.image} alt={card.title} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover opacity-90" />
                  </div>
                  <div className="bg-white px-4 py-4">
                    <p className="inline-flex bg-[#ef233c] px-3 py-1 text-xs font-black uppercase tracking-[0.08em] text-white">{card.category}</p>
                    <h4 className="mt-3 text-3xl font-black uppercase leading-tight text-[#0a1d3a]">{card.title}</h4>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-[#17395f] px-4 py-14 sm:px-6 lg:px-8">
          <div className="absolute left-[-120px] top-[-100px] h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle_at_center,rgba(7,150,211,0.65),rgba(7,150,211,0)_70%)]" />

          <div className="relative mx-auto grid max-w-[1360px] gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <h3 className="text-4xl font-black uppercase text-white">Histoire du club</h3>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <article className="border border-white/25 p-3 text-white">
                  <Image src="/toro.webp" alt="Histoire 1" width={420} height={210} className="h-36 w-full object-cover" />
                  <p className="mt-3 text-lg font-black uppercase">La generation toro prend le relais...</p>
                </article>
                <article className="border border-white/25 p-3 text-white">
                  <Image src="/toro1.png" alt="Histoire 2" width={420} height={210} className="h-36 w-full object-cover" />
                  <p className="mt-3 text-lg font-black uppercase">Guide du centre de formation...</p>
                </article>
              </div>
            </div>

            <div>
              <h3 className="text-4xl font-black uppercase text-white">Palmares</h3>
              <div className="mt-5 grid grid-cols-3 gap-3">
                {trophies.map((item) => (
                  <div key={item.label} className="border border-[#ef233c]/45 bg-[#0f2a4b]/70 p-4 text-center text-white">
                    <item.icon className="mx-auto h-9 w-9 text-[#ef233c]" />
                    <p className="mt-2 text-3xl font-black">{item.value}</p>
                    <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.08em] text-slate-200">{item.label}</p>
                  </div>
                ))}
              </div>
              <button className="mt-5 inline-flex items-center gap-2 border border-white/35 px-4 py-2 text-xs font-black uppercase tracking-[0.08em] text-white">
                <RiPlayCircleLine className="h-4 w-4" /> Decouvrir le club
              </button>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-white">
        <section className="px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[1360px]">
            <h4 className="text-center text-xs font-black uppercase tracking-[0.12em] text-[#0a1d3a]">Partenaires officiels</h4>
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
              {sponsors.map((sponsor) => (
                <div key={sponsor.name} className="grid h-16 place-items-center rounded border border-[#d7dde6] bg-white px-2">
                  <Image src={sponsor.logo} alt={sponsor.name} width={140} height={52} className="h-10 w-auto object-contain" />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[linear-gradient(120deg,#16357c,#ef233c)] px-4 py-9 text-white sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-[1360px] flex-wrap items-center justify-between gap-5">
            <div className="flex items-center gap-4">
              <Image src="/fc-toro-logo.png" alt="Logo FC TORO" width={54} height={54} className="h-[54px] w-auto object-contain" />
              <div>
                <p className="text-sm font-black uppercase tracking-[0.08em]">L application officielle du FC TORO</p>
                <p className="mt-1 text-xs">Suivez FC TORO partout avec l app mobile.</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="rounded border border-white/70 px-4 py-2 text-xs font-bold uppercase">App Store</button>
              <button className="rounded border border-white/70 px-4 py-2 text-xs font-bold uppercase">Google Play</button>
            </div>
          </div>
        </section>

        <section className="px-4 py-6 sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-[1360px] flex-wrap items-center justify-center gap-4 text-xs font-semibold uppercase tracking-[0.08em] text-[#0a1d3a]">
            <div className="flex items-center gap-4">
              <Link href="#">Mentions</Link>
              <Link href="#">Plan du site</Link>
              <Link href="#">Cookies</Link>
            </div>
          </div>
        </section>
      </footer>
    </div>
  )
}
