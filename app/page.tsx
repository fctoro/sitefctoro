'use client'

import { resolveCmsImage } from '@/lib/utils'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { heroSlides, newsCards, playerCards } from '@/lib/joueur'
import { INTRO_SESSION_KEY } from '@/lib/site-session'
import { sponsors } from '@/lib/sponsors'
import { NewsBarcaGrid } from '@/components/news-barca-grid'
import VisionSection from '@/components/vision-section'
import { HomeNavbar } from '@/components/home-navbar'
import { supabase } from '@/lib/supabase'
import { AnimatedCounter } from '@/components/animated-counter'
import {
  RiArrowLeftSLine,
  RiArrowRightLine,
  RiArrowRightSLine,
  RiFlashlightLine,
  RiShieldStarLine,
  RiTrophyLine,
} from '@remixicon/react'

const eliteShowcaseImage = '/home/elite-showcase-optimized.jpg'

const eliteFocusPoints = [
  {
    label: 'Passage vers Élite',
    icon: RiShieldStarLine,
  },
  {
    label: 'Rythme et discipline',
    icon: RiFlashlightLine,
  },
  {
    label: 'Prêt pour la compétition',
    icon: RiTrophyLine,
  },
]

const eliteStaffCards = [
  {
    eyebrow: 'Staff Élite',
    title: 'Encadrement terrain',
    description: 'Le groupe est accompagné de près pour installer des séances plus exigeantes et plus lisibles.',
    image: '/home/staff-direction-optimized.jpg',
    alt: 'Staff Élite FC TORO pendant une séance',
  },
  {
    eyebrow: 'Staff Élite',
    title: 'Lecture du jeu',
    description: 'Le staff affine les détails tactiques, le tempo collectif et la qualité des prises de décision.',
    image: '/home/staff-field-optimized.jpg',
    alt: 'Staff FC TORO sur le terrain',
  },
  {
    eyebrow: 'Staff Élite',
    title: 'Suivi quotidien',
    description: 'Préparation, correction et progression sont suivies au plus près pour chaque cycle de travail.',
    image: '/home/staff-support-optimized.jpg',
    alt: 'Encadrement FC TORO Élite',
  },
]

export default function HomePage() {
  const [showIntro, setShowIntro] = useState(false)
  const [introReady, setIntroReady] = useState(false)
  const [activeHero, setActiveHero] = useState(0)
  const [players, setPlayers] = useState(playerCards)
  const [allNews, setAllNews] = useState(newsCards)
  const playerRailRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    async function loadData() {
      // Load Players
      const { data: playersData } = await supabase
        .from('club_players')
        .select('*')
        
      if (playersData && playersData.length > 0) {
        setPlayers(playersData.map((p) => {
          return {
            name: `${p.first_name || ''} ${p.last_name || ''}`.trim() || 'Joueur',
            role: p.position || 'Joueur',
            image: resolveCmsImage(p.photo_url) || '/placeholder-user.jpg'
          };
        }))
      }

      // Load News
      const { data: cmsArticles } = await supabase
        .from('articles')
        .select('*')
        .eq('status', 'published')
        .order('published_at', { ascending: false })

      if (cmsArticles && cmsArticles.length > 0) {
        const formattedCmsArticles = cmsArticles.map((a: any) => ({
          title: a.title_fr,
          slug: a.slug,
          excerpt: a.excerpt_fr || '',
          image: resolveCmsImage(a.cover_image),
          category: a.category,
          dateLabel: a.published_at ? new Date(a.published_at).toLocaleDateString('fr-FR') : '',
          intro: a.excerpt_fr || '',
          content: [a.content_fr || ''],
          keyPoints: []
        }))
        setAllNews([...formattedCmsArticles, ...newsCards])
      }
    }
    loadData()
  }, [])

  useEffect(() => {
    const hasSeenIntro = window.sessionStorage.getItem(INTRO_SESSION_KEY) === 'true'

    if (hasSeenIntro) {
      setShowIntro(false)
      setIntroReady(true)
      return
    }

    window.sessionStorage.setItem(INTRO_SESSION_KEY, 'true')
    setShowIntro(true)
    setIntroReady(true)
  }, [])

  useEffect(() => {
    if (!introReady || showIntro) return

    const interval = window.setInterval(() => {
      setActiveHero((prev) => (prev + 1) % heroSlides.length)
    }, 4200)

    return () => window.clearInterval(interval)
  }, [introReady, showIntro])

  const handleIntroEnd = () => {
    setShowIntro(false)
    window.scrollTo({ top: 0, behavior: 'auto' })
  }

  const slidePlayers = (direction: 'left' | 'right') => {
    const rail = playerRailRef.current
    if (!rail) return

    const firstCard = rail.querySelector<HTMLElement>('[data-player-card="true"]')
    const step = firstCard ? firstCard.clientWidth + 10 : Math.round(rail.clientWidth * 0.66)

    rail.scrollBy({
      left: direction === 'left' ? -step : step,
      behavior: 'smooth',
    })
  }

  const activeHeroSlide = heroSlides[activeHero]
  const activeHeroTitle =
    activeHero === 1
      ? 'Flag Day approche. Consultez le classement et suivez le tournoi du 18 mai 2026.'
      : activeHero === 2
        ? 'FC TORO Elite structure la transition vers un niveau plus exigeant et plus ambitieux.'
        : activeHeroSlide.title

  if (!introReady) {
    return <div className="min-h-screen bg-[#f2f2f4]" aria-hidden="true" />
  }

  if (showIntro) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-white px-4">
        <video
          className="w-full max-w-[260px] object-contain sm:max-w-[280px]"
          autoPlay
          muted
          playsInline
          preload="metadata"
          onEnded={handleIntroEnd}
        >
          <source src="/Accueil.mp4" type="video/mp4" />
        </video>
      </div>
    )
  }

  return (
    <div className="toro-site-shell min-h-screen overflow-x-hidden bg-[#f2f2f4] text-[#0a1d3a]">
      <HomeNavbar />

      <main className="pt-[116px] lg:pt-[78px]">
        <section className="toro-hero-section relative overflow-hidden border-b border-[#d6dce4] bg-[#0f2a4b]">
          <div className="absolute inset-0">
            <Image
              src={activeHeroSlide.image}
              alt={activeHeroTitle}
              fill
              sizes="100vw"
              className="toro-hero-media object-cover opacity-82 transition-opacity duration-500"
              priority={activeHero === 0}
            />
          </div>

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_40%,rgba(7,150,211,0.35),transparent_45%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,18,40,0.85)_0%,rgba(6,18,40,0.35)_48%,rgba(6,18,40,0.88)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,19,43,0.1)_0%,rgba(7,19,43,0.74)_100%)]" />

          <div className="relative mx-auto grid min-h-[calc(100svh-116px)] max-w-[1100px] items-end px-4 pb-0 pt-5 sm:min-h-[calc(100svh-98px)] sm:px-6 lg:min-h-[calc(100svh-74px)] lg:px-8 lg:pt-8">
            <div className="relative z-10 max-w-[560px] pb-7 sm:pb-14">
              <p className="inline-flex items-center rounded bg-[#ef233c] px-5 py-2 text-sm font-black uppercase tracking-[0.1em] text-white">
                {activeHeroSlide.label}
              </p>
              <h1 className="mt-4 text-[2rem] font-black uppercase leading-[0.95] text-white drop-shadow-[0_2px_0_rgba(0,0,0,0.25)] sm:mt-6 lg:text-5xl">
                {activeHeroTitle}
              </h1>
              <Link
                href={activeHeroSlide.href}
                className="toro-cta mt-6 inline-flex items-center border border-white/70 px-6 py-2.5 text-sm font-bold uppercase tracking-[0.08em] text-white transition-colors hover:bg-white hover:text-[#0a1d3a] sm:mt-8 sm:px-7 sm:py-3"
              >
                {activeHeroSlide.cta}
              </Link>

              <div className="mt-4 flex items-center gap-2 sm:mt-6">
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

            <div className="toro-panel relative z-10 rounded-t-2xl border border-white/20 border-b-0 bg-[rgba(7,19,43,0.45)] p-3 backdrop-blur-xl sm:p-5">
              <div className="grid grid-cols-4 divide-x divide-white/15">
                <AnimatedCounter to={500} label="Joueurs" />
                <AnimatedCounter to={100} label="Trophées" />
                <AnimatedCounter to={14} label="Ans" />
                <div className="flex flex-col items-center justify-center p-1 sm:p-2 h-full">
                  <p className="text-[1.1rem] sm:text-[1.3rem] font-black tracking-tighter text-white leading-none">
                    2012
                  </p>
                  <p className="mt-1 text-[7px] sm:text-[9px] font-black uppercase tracking-[0.15em] text-white/50 whitespace-nowrap">
                    Création
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="club" className="px-4 py-10 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[1260px] space-y-8">
            <article className="relative isolate overflow-hidden rounded-[32px] border border-[#dbe5f2] bg-white shadow-[0_26px_60px_rgba(10,29,58,0.1)]">
              <div className="pointer-events-none absolute left-1/2 top-1/2 hidden h-[300px] w-[180px] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(circle,rgba(239,35,60,0.2)_0%,rgba(239,35,60,0.08)_34%,transparent_74%)] blur-3xl xl:block" />
              <div className="grid gap-0 xl:grid-cols-[1.08fr_0.92fr]">
                <div className="relative min-h-[380px] bg-[#0f2a4b] xl:min-h-[520px]">
                  <Image
                    src={eliteShowcaseImage}
                    alt="Equipe Elite FC TORO"
                    fill
                    sizes="(min-width: 1280px) 52vw, 100vw"
                    className="object-cover object-[44%_center]"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,18,40,0.14)_12%,rgba(6,18,40,0.88)_100%)]" />
                  <div className="absolute inset-y-0 right-0 hidden w-24 bg-[linear-gradient(90deg,transparent,rgba(10,29,58,0.58))] xl:block" />
                  <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-8">
                    <p className="text-[11px] font-black uppercase tracking-[0.2em] text-[#ff8c9a]">
                      Projet Elite
                    </p>
                    <h3 className="mt-3 text-[clamp(1.85rem,3.5vw,3.1rem)] font-black uppercase leading-[0.9] tracking-[-0.05em]">
                      FC TORO Elite
                    </h3>
                    <p className="mt-3 max-w-[580px] text-sm leading-relaxed text-white/76 sm:text-base">
                      Une equipe pensee pour hausser le rythme, la discipline et la lecture du jeu.
                    </p>
                  </div>
                </div>

                <div className="relative z-10 overflow-hidden border-t border-[#c91c34] bg-[linear-gradient(180deg,#ef233c_0%,#d91933_55%,#b90f28_100%)] p-6 text-white sm:p-8 xl:-ml-16 xl:my-8 xl:mr-8 xl:rounded-[28px] xl:border xl:border-[#ff8b99]/45 xl:p-10 xl:shadow-[0_24px_44px_rgba(10,29,58,0.18)] xl:border-t">
                  <div className="relative z-10">
                    <p className="text-[11px] font-black uppercase tracking-[0.18em] text-[#ffd5db]">
                      Transition & ambition
                    </p>
                    <h3 className="mt-3 text-[clamp(1.7rem,3.1vw,2.7rem)] font-black uppercase leading-[0.92] tracking-[-0.05em] text-white">
                      Le projet Élite prend le relais.
                    </h3>

                    <div className="mt-5 space-y-4 text-[15px] leading-relaxed text-white/88">
                      <p>
                        FC TORO Élite relie l'académie à un cadre plus exigeant pour accompagner les meilleurs profils
                        vers la compétition et une progression plus structurée.
                      </p>
                      <p>
                        Le groupe avance avec un travail plus précis sur le tempo, la discipline collective et la maturité
                        tactique, afin de préparer la prochaine marche du parcours FC TORO.
                      </p>
                    </div>

                    <div className="mt-6 grid gap-3 sm:grid-cols-3">
                      {eliteFocusPoints.map((item) => (
                        <div
                          key={item.label}
                          className="flex items-center gap-3 rounded-xl border border-white/18 bg-white/10 px-3 py-3 backdrop-blur-sm"
                        >
                          <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/16 text-white">
                            <item.icon className="h-4 w-4" />
                          </div>
                          <p className="text-[12px] font-black uppercase leading-[1.15] text-white">
                            {item.label}
                          </p>
                        </div>
                      ))}
                    </div>

                    <Link
                      href="/elite"
                      className="mt-7 inline-flex w-fit items-center gap-1.5 rounded-full bg-white px-4 py-2 text-[11px] font-black uppercase tracking-[0.14em] text-[#b90f28] transition-all hover:bg-[#ffe3e7] hover:pr-5"
                    >
                      Decouvrir
                      <RiArrowRightLine className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </article>

            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-[11px] font-black uppercase tracking-[0.18em] text-[#1f4ea1]">
                  Staff Elite
                </p>
                <h4 className="mt-2 text-[clamp(1.5rem,2.4vw,2.15rem)] font-black uppercase leading-[0.92] tracking-[-0.04em] text-[#0d2d62]">
                  Les visages qui accompagnent le groupe.
                </h4>
              </div>

              <p className="max-w-[520px] text-sm leading-relaxed text-[#526887] sm:text-base">
                Le staff encadre le projet Elite au quotidien avec une presence terrain forte, un suivi precis et une
                exigence claire autour de la progression du groupe.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {eliteStaffCards.map((card) => (
                <article
                  key={card.title}
                  className="overflow-hidden rounded-[28px] bg-[#0f2a4b] shadow-[0_20px_40px_rgba(10,29,58,0.18)]"
                >
                  <div className="relative h-[380px] lg:h-[420px]">
                    <Image
                      src={card.image}
                      alt={card.alt}
                      fill
                      sizes="(min-width: 1024px) 30vw, 100vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,19,43,0)_15%,rgba(7,19,43,0.3)_45%,rgba(7,19,43,0.95)_100%)]" />
                    <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-8">
                      <p className="text-[11px] font-black uppercase tracking-[0.2em] text-[#ef233c]">
                        {card.eyebrow}
                      </p>
                      <h5 className="mt-2 text-[1.7rem] font-black uppercase leading-[0.92] drop-shadow-md">
                        {card.title}
                      </h5>
                      <p className="mt-3 text-[15px] font-medium leading-relaxed text-white/80">{card.description}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="joueurs" className="pb-10">
          <div className="w-full bg-[linear-gradient(108deg,#ef233c_0%,#d11b34_55%,#a80f2a_100%)] px-4 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-7">
            <div className="mx-auto w-full max-w-[1920px]">
              <div className="mb-3 flex items-center justify-between gap-3">
                <h3 className="text-left text-[1.2rem] font-black uppercase leading-none tracking-tight text-white sm:text-[1.45rem]">
                  Joueurs FC Toro
                </h3>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => slidePlayers('left')}
                    aria-label="Voir les joueurs precedents"
                    className="grid h-9 w-9 place-items-center rounded-full text-white/70 transition-colors hover:text-white"
                  >
                    <RiArrowLeftSLine className="h-7 w-7" />
                  </button>
                  <button
                    type="button"
                    onClick={() => slidePlayers('right')}
                    aria-label="Voir les joueurs suivants"
                    className="grid h-9 w-9 place-items-center rounded-full text-white transition-colors hover:text-[#ffe2e7]"
                  >
                    <RiArrowRightSLine className="h-7 w-7" />
                  </button>
                </div>
              </div>

              <div
                ref={playerRailRef}
                className="flex gap-2.5 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:snap-x sm:snap-mandatory"
              >
                {players.map((player, idx) => (
                  <article
                    data-player-card="true"
                    key={`${player.name}-${idx}`}
                    className="group relative h-[266px] min-w-[43%] overflow-hidden rounded-[12px] bg-[#0f2a4b] sm:h-[316px] sm:min-w-[220px] sm:snap-start lg:h-[356px] lg:min-w-[252px]"
                  >
                    <Image
                      src={player.image}
                      alt={player.name}
                      fill
                      sizes="(min-width: 1536px) 16vw, (min-width: 1280px) 18vw, (min-width: 768px) 27vw, 58vw"
                      className="object-cover transition-transform duration-500 sm:group-hover:scale-[1.04]"
                      onError={(e) => {
                        e.currentTarget.srcset = '';
                        e.currentTarget.src = '/placeholder-user.jpg';
                      }}
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,8,18,0.08)_36%,rgba(4,8,18,0.9)_100%)]" />
                    <div className="absolute inset-x-0 bottom-0 z-10 p-3 text-white sm:p-3.5">
                      <p className="text-[11px] font-black uppercase tracking-[0.12em] text-white/88">{player.role}</p>
                      <p className="mt-1 text-[1.08rem] font-black uppercase leading-[0.94] sm:text-[1.45rem] lg:text-[1.7rem]">
                        {player.name}
                      </p>
                      <p className="mt-2 inline-flex items-center text-[11px] font-black uppercase tracking-[0.08em] text-white/92">
                        Voir profil <RiArrowRightSLine className="ml-0.5 h-4 w-4" />
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="actualites" className="px-4 pb-11 sm:px-6 lg:px-8">
          <NewsBarcaGrid
            items={allNews}
            eyebrow="Actualités du club"
            heading="ACTUALITÉS"
            ctaHref="/actualites"
            ctaLabel="Voir toute l'actualité"
            limit={4}
          />
        </section>

        <VisionSection />

        <section id="sponsors" className="bg-white px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[1100px] overflow-hidden">
            <h4 className="mb-8 text-center text-xs font-black uppercase tracking-[0.12em] text-[#0a1d3a]">
              Partenaires officiels
            </h4>

            <div className="relative overflow-hidden py-4">
              <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-12 bg-gradient-to-r from-white to-transparent sm:w-24" />
              <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-12 bg-gradient-to-l from-white to-transparent sm:w-24" />

              <motion.div
                initial={{ x: 0 }}
                animate={{ x: '-50%' }}
                transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
                className="flex w-max items-center gap-10 sm:gap-14 md:gap-20"
              >
                {[...sponsors, ...sponsors].map((s, idx) => (
                  <div
                    key={idx}
                    className="shrink-0 transition-transform duration-300 hover:scale-105"
                  >
                    <Image
                      src={s.logo}
                      alt={s.name}
                      width={120}
                      height={60}
                      className="h-7 w-auto object-contain md:h-10"
                    />
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
