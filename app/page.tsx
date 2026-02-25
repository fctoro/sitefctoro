'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import {
  RiArrowRightLine,
  RiCalendarEventLine,
  RiShieldCheckLine,
  RiSparkling2Line,
  RiTeamLine,
  RiTrophyLine,
  RiVipCrown2Line,
} from '@remixicon/react'
import { Header } from './header'
import { Button } from '../components/ui/button'

const heroStats = [
  { value: '11', label: 'Titres nationaux' },
  { value: '124', label: 'Joueurs formes' },
  { value: '48K', label: 'Supporters actifs' },
]

const pillars = [
  {
    icon: RiTeamLine,
    title: 'Academie structurante',
    description: 'De U7 a U19, nous formons des joueurs complets avec exigence et methode.',
  },
  {
    icon: RiShieldCheckLine,
    title: 'Culture de discipline',
    description: 'Un cadre pro, un collectif fort et une intensite constante a chaque seance.',
  },
  {
    icon: RiTrophyLine,
    title: 'Ambition de titres',
    description: 'Chaque saison est construite pour performer, gagner et representer Haiti.',
  },
]

const highlights = [
  { title: 'Classement', value: '1re place', note: '61 points en Ligue Elite' },
  { title: 'Difference', value: '+38 buts', note: 'Meilleure defense du championnat' },
  { title: 'Forme', value: '7 victoires', note: 'Serie en cours a domicile' },
]

const clubOverviewCards = [
  {
    title: 'Depuis 2012',
    description:
      'FC TORO, founded on September 1st 2012, is now one of the leading football clubs in Haiti for boys and girls from 2 to 19 years old.',
  },
  {
    title: 'Formation complete',
    description:
      'Our players receive diversified training all year: individual skill development, communication, team play, leadership and composure under pressure.',
  },
  {
    title: 'Ambition continue',
    description:
      'With staff, parents and sponsors, our players train without interruption and compete in events like Vertieres Cup and Flag Day Tournament.',
  },
]

export default function HomePage() {
  const [showIntro, setShowIntro] = useState(true)

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
    <div className="min-h-screen bg-[#eef2f6] text-[#0f172a]">
      <Header />

      <main className="relative overflow-hidden pb-20">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-44 top-[-9rem] h-[24rem] w-[24rem] rounded-full bg-primary/18 blur-3xl" />
          <div className="absolute -right-36 top-14 h-[22rem] w-[22rem] rounded-full bg-secondary/16 blur-3xl" />
          <div className="absolute left-1/2 top-[34rem] h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
          <div
            className="absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage:
                'repeating-linear-gradient(90deg, rgba(15,23,42,0.35) 0, rgba(15,23,42,0.35) 1px, transparent 1px, transparent 40px)',
            }}
          />
        </div>

        <section className="relative border-b border-zinc-200/80">

          <div className="relative mx-auto grid max-w-[1360px] gap-10 px-4 pb-10 pt-6 sm:px-6 lg:grid-cols-[1.08fr_0.92fr] lg:px-8 lg:pt-8">
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              className="space-y-8"
            >
              <p className="inline-flex items-center gap-2 rounded-full border border-zinc-300 bg-white/90 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-700">
                <RiSparkling2Line className="h-4 w-4 text-primary" />
                Saison 2026 - FC TORO Haiti
              </p>

              <div className="space-y-5">
                <h1 className="max-w-3xl text-5xl font-semibold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
                  Le club qui met la ville en mouvement
                </h1>
                <p className="max-w-2xl text-base leading-relaxed text-zinc-600 sm:text-lg">
                  FC TORO rassemble la passion, le travail et la fierte locale. Nous construisons une equipe
                  competitive aujourd hui et une generation solide pour demain.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <Link href="/inscription">
                  <Button className="h-12 rounded-full bg-primary px-7 text-base font-semibold text-white shadow-[0_14px_40px_rgba(237,28,36,0.35)] hover:bg-primary/90">
                    Rejoindre le club
                    <RiArrowRightLine className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/club/calendrier">
                  <Button
                    variant="outline"
                    className="h-12 rounded-full border-zinc-300 bg-white px-7 text-base font-semibold text-zinc-900 hover:bg-zinc-100"
                  >
                    Voir le calendrier
                  </Button>
                </Link>
                <Link href="/club/calendrier#evenements">
                  <Button
                    variant="outline"
                    className="h-12 rounded-full border-zinc-300 bg-white px-6 text-base font-semibold text-zinc-900 hover:bg-zinc-100"
                  >
                    <RiCalendarEventLine className="mr-2 h-4 w-4 text-primary" />
                    Evenements
                  </Button>
                </Link>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                {heroStats.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-2xl border border-zinc-200/80 bg-white/85 px-4 py-5 shadow-sm backdrop-blur-[2px]"
                  >
                    <p className="text-3xl font-semibold tracking-tight text-primary">{item.value}</p>
                    <p className="mt-1 text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">{item.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.aside
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.62, delay: 0.08 }}
              className="relative"
            >
              <div className="relative px-2 pt-4 sm:px-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-600">Match center</p>
                  <div className="flex items-center gap-2">
                    <span className="rounded-full border border-zinc-300 bg-white px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-zinc-600">
                      Categorie U15
                    </span>
                    <span className="rounded-full border border-zinc-300 bg-white px-2.5 py-1 text-xs font-semibold text-zinc-700">
                      J-4
                    </span>
                  </div>
                </div>
                <h2 className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-2 text-2xl font-semibold text-zinc-900 sm:text-3xl">
                  <span className="inline-flex items-center gap-2">
                    <span className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full border border-zinc-300">
                      <Image src="/fc-toro-logo.png" alt="FC TORO" fill sizes="32px" className="object-cover" />
                    </span>
                    FC TORO
                  </span>
                  <span className="text-zinc-500">vs</span>
                  <span className="inline-flex items-center gap-2">
                    <span className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full border border-zinc-300">
                      <Image src="/slg.webp" alt="SLG Academie" fill sizes="32px" className="object-cover" />
                    </span>
                    SLG Academie
                  </span>
                </h2>

                <div className="relative mx-auto mt-5 h-[280px] w-full max-w-[600px] sm:h-[350px] lg:ml-auto lg:mr-0 lg:max-w-[660px]">
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(237,28,36,0.22),transparent_64%)] blur-xl" />
                  <div className="absolute inset-y-0 left-0 w-[52%] sm:w-[50%]">
                    <Image
                      src="/toro.png"
                      alt="Joueur FC TORO gauche"
                      fill
                      sizes="(min-width: 1024px) 340px, (min-width: 640px) 280px, 44vw"
                      className="object-contain object-left p-1 drop-shadow-[0_20px_35px_rgba(0,0,0,0.35)] mix-blend-darken contrast-125 saturate-110 scale-[1.02]"
                      priority
                    />
                  </div>
                  <div className="absolute inset-y-0 right-0 w-[50%] sm:w-[48%]">
                    <Image
                      src="/toro1.png"
                      alt="Joueur FC TORO droite"
                      fill
                      sizes="(min-width: 1024px) 320px, (min-width: 640px) 260px, 42vw"
                      className="object-contain object-right p-1 drop-shadow-[0_20px_35px_rgba(0,0,0,0.35)] mix-blend-darken contrast-125 saturate-110 scale-[0.96] translate-x-1"
                    />
                  </div>
                </div>
              </div>
            </motion.aside>
          </div>
        </section>

        <section className="px-4 pt-8 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45 }}
            className="mx-auto max-w-[1360px]"
          >
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">Football Club Toro</p>
                <h3 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl">
                  FC TORO
                </h3>
              </div>
              <Link
                href="/club/about"
                className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-700 transition-colors hover:text-primary"
              >
                En savoir plus
                <RiArrowRightLine className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-3">
              {clubOverviewCards.map((item) => (
                <article
                  key={item.title}
                  className="rounded-2xl border border-zinc-200/80 bg-white/85 p-5 shadow-sm backdrop-blur-[2px]"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">{item.title}</p>
                  <p className="mt-3 text-sm leading-relaxed text-zinc-700">{item.description}</p>
                </article>
              ))}
            </div>
          </motion.div>
        </section>

        <section className="px-4 pt-10 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[1360px]">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">Identite</p>
                <h3 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl">
                  ADN du <span className="text-primary">club</span>
                </h3>
              </div>
              <Link
                href="/club/about"
                className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-700 transition-colors hover:text-primary"
              >
                Voir le projet sportif
                <RiArrowRightLine className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {pillars.map((item, index) => (
                <motion.article
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.45, delay: index * 0.08 }}
                  className="rounded-2xl border border-zinc-200/80 bg-white/85 p-6 shadow-sm backdrop-blur-[2px] transition-all hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-primary/35 bg-primary/10">
                    <item.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h4 className="mt-5 text-xl font-semibold text-zinc-900">{item.title}</h4>
                  <p className="mt-3 text-sm leading-relaxed text-zinc-600">{item.description}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 pt-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[1360px] overflow-hidden rounded-[28px] border border-zinc-200/80 bg-white/85 text-zinc-900 shadow-[0_24px_70px_rgba(15,23,42,0.16)] backdrop-blur-[2px]">
            <div className="grid gap-8 px-6 py-10 lg:grid-cols-[0.92fr_1.08fr] lg:px-10">
              <div>
                <p className="inline-flex items-center gap-2 rounded-full border border-zinc-300 bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-700">
                  <RiVipCrown2Line className="h-4 w-4 text-primary" />
                  Bloc performance
                </p>
                <h3 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                  Une equipe construite pour durer
                </h3>
                <p className="mt-4 max-w-lg text-sm leading-relaxed text-zinc-600 sm:text-base">
                  Staff technique, cellule analytique et groupe competitif: chaque unite pousse dans la meme direction.
                  C est cette coherence qui fait la difference semaine apres semaine.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                {highlights.map((item) => (
                  <div key={item.title} className="rounded-2xl border border-zinc-200 bg-white p-5">
                    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.17em] text-zinc-500">{item.title}</p>
                    <p className="mt-3 text-2xl font-semibold text-zinc-900">{item.value}</p>
                    <p className="mt-2 text-sm text-zinc-600">{item.note}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 pt-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[1360px] rounded-[28px] border border-zinc-200/80 bg-white/85 px-6 py-10 shadow-sm backdrop-blur-[2px] sm:px-10">
            <div className="grid items-center gap-6 lg:grid-cols-[1fr_auto]">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">Communaute</p>
                <h3 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl">
                  Entre dans la famille <span className="text-primary">FC TORO</span>
                </h3>
                <p className="mt-3 max-w-2xl text-sm text-zinc-600 sm:text-base">
                  Inscriptions ouvertes pour la nouvelle session academie et programme supporters. Rejoins un cadre
                  exigeant, une ambiance forte et une vision claire.
                </p>
              </div>

              <Link href="/inscription">
                <Button className="h-12 rounded-full bg-primary px-8 text-base font-semibold text-white hover:bg-primary/90">
                  Devenir membre
                  <RiArrowRightLine className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-zinc-200/80 bg-transparent">
        <div className="mx-auto flex max-w-[1360px] flex-col gap-3 px-4 py-8 text-sm text-zinc-600 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>(c) 2026 FC TORO Haiti. Tous droits reserves.</p>
          <p className="font-semibold uppercase tracking-[0.2em] text-primary">Mache Sou Yo</p>
        </div>
      </footer>
    </div>
  )
}
