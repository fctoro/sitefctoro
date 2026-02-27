'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { heroSlides, newsCards, playerCards } from '@/lib/joueur'
import { sponsors } from '@/lib/sponsors'
import {
  RiAppStoreFill,
  RiArrowDownSLine,
  RiArrowLeftSLine,
  RiArrowRightLine,
  RiArrowRightSLine,
  RiCalendarEventLine,
  RiCloseLine,
  RiGooglePlayFill,
  RiMedalLine,
  RiMenuLine,
  RiShieldStarLine,
  RiTrophyLine,
} from '@remixicon/react'

type NavSubLink = {
  label: string
  href: string
}

type NavSubSection = {
  title: string
  links: NavSubLink[]
}

type NavSpotlight = {
  image: string
  name: string
  role: string
  href: string
}

type NavItem = {
  label: string
  href?: string
  accent?: boolean
  submenu?: {
    intro: string
    backdropImage: string
    sections: NavSubSection[]
    spotlight: NavSpotlight
  }
}

const navItems: NavItem[] = [
  { label: 'Actualites', href: '#actualites' },
  {
    label: 'Club',
    submenu: {
      intro: 'Identite FC TORO, infrastructures et vie du club.',
      backdropImage: '/joueur/extracted/583167774_18542869372012336_2307311757000245016_n.jpg',
      sections: [
        {
          title: 'Le club',
          links: [
            { label: 'Histoire du club', href: '#club' },
            { label: 'Vision et valeurs', href: '#club' },
          ],
        },
        {
          title: 'Contact',
          links: [
            { label: 'Contact officiel', href: '#footer' },
          ],
        },
      ],
      spotlight: {
        image: '/joueur/extracted/634150827_18560832649012336_7495873752742897530_n.jpg',
        name: 'Ruben Alexis',
        role: 'Capitaine',
        href: '#joueurs',
      },
    },
  },
  {
    label: 'Equipe',
    href: '#joueurs',
  },
  { label: 'Calendrier', href: '/club/calendrier' },
  { label: 'Evenements', href: '/club/calendrier#evenements' },
  {
    label: 'Rejoindre',
    accent: true,
    submenu: {
      intro: 'Inscription, stages et integration au club.',
      backdropImage: '/joueur/extracted/560435029_18532793887012336_3999511270054224397_n.jpg',
      sections: [
        {
          title: 'Parcours joueur',
          links: [
            { label: 'Inscription joueur', href: '/inscription' },
            { label: 'Voir les stages', href: '/inscription#stages' },
            { label: 'Rejoindre le club', href: '/inscription#rejoindre' },
          ],
        },
        {
          title: 'Opportunites',
          links: [
            { label: 'Devenir partenaire', href: '#footer' },
            { label: 'Benevolat matchday', href: '/inscription#benevolat' },
            { label: 'Contacter recrutement', href: '#footer' },
          ],
        },
      ],
      spotlight: {
        image: '/joueur/extracted/560435029_18532793887012336_3999511270054224397_n.jpg',
        name: 'Theo Basile',
        role: 'Rejoindre FC TORO',
        href: '/inscription',
      },
    },
  },
  { label: 'Contact', href: '#footer' },
]

const linkDescriptionMap: Record<string, string> = {
  'Inscription joueur': 'Dossier rapide et parcours d integration accompagne.',
  'Voir les stages': 'Calendrier des camps intensifs et pre-inscription.',
  'Rejoindre le club': 'Tests de detection, suivi et integration continue.',
  'Devenir partenaire': 'Associez votre marque a un projet sportif fort.',
  'Benevolat matchday': 'Contribuez aux jours de match et activations club.',
  'Contacter recrutement': 'Parlez directement avec l equipe recrutement.',
  'Histoire du club': 'Parcours, jalons majeurs et ADN FC TORO.',
  'Vision et valeurs': 'Discipline, identite et ambition long terme.',
  'Installations': 'Terrains, equipements et environnement d entrainement.',
  'Actualites club': 'Les dernieres informations officielles du club.',
  'Calendrier complet': 'Toutes les rencontres et evenements a venir.',
  'Contact officiel': 'Acces direct aux canaux du club.',
  'Equipe Pro': 'Effectif principal et dynamique competitive.',
  'Staff technique': 'Encadrement tactique et performance.',
  'Performance et suivi': 'Developpement, data et progression joueur.',
  U13: 'Fondamentaux techniques et intelligence de jeu.',
  U15: 'Transition tactique, rythme et discipline collective.',
  U17: 'Progression competitive et maitrise des phases de jeu.',
  U19: 'Preparation haut niveau et responsabilisation.',
  U21: 'Passerelle vers le groupe pro et performance continue.',
}

const getLinkDescription = (label: string) =>
  linkDescriptionMap[label] ?? 'Decouvrir le programme FC TORO.'

const clubStats = [
  { icon: RiCalendarEventLine, target: 2012, label: 'Creation du club' },
  { icon: RiShieldStarLine, target: 2015, label: 'Section filles lancee' },
  { icon: RiTrophyLine, target: 19, prefix: '2-', label: 'Age des joueuses et joueurs' },
  { icon: RiMedalLine, target: 12, label: 'Mois d activite competitive' },
]

const mobilePrimaryLinks: Array<{ label: string; href: string; accent?: boolean }> = [
  { label: 'Actualites', href: '#actualites' },
  { label: 'Club', href: '#club' },
  { label: 'Equipe', href: '#joueurs' },
  { label: 'Calendrier', href: '/club/calendrier' },
  { label: 'Evenements', href: '/club/calendrier#evenements' },
]

export default function HomePage() {
  const [showIntro, setShowIntro] = useState(true)
  const [activeHero, setActiveHero] = useState(0)
  const [activeDesktopMenu, setActiveDesktopMenu] = useState<string | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [statCounts, setStatCounts] = useState(() => clubStats.map(() => 0))
  const [statsStarted, setStatsStarted] = useState(false)
  const playerRailRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (showIntro) return
    const interval = window.setInterval(() => {
      setActiveHero((prev) => (prev + 1) % heroSlides.length)
    }, 4200)
    return () => window.clearInterval(interval)
  }, [showIntro])

  useEffect(() => {
    if (!statsStarted) return

    const durationMs = 2800
    const targets = clubStats.map((item) => item.target)
    let frameId = 0
    let startTime = 0
    const delayMs = 220
    const timeoutId = window.setTimeout(() => {
      startTime = performance.now()
      frameId = window.requestAnimationFrame(tick)
    }, delayMs)

    const tick = (now: number) => {
      const rawProgress = Math.min((now - startTime) / durationMs, 1)
      const easedProgress = 1 - Math.pow(1 - rawProgress, 3)

      setStatCounts(targets.map((target) => Math.round(target * easedProgress)))

      if (rawProgress < 1) {
        frameId = window.requestAnimationFrame(tick)
      }
    }

    return () => {
      window.clearTimeout(timeoutId)
      window.cancelAnimationFrame(frameId)
    }
  }, [statsStarted])

  const handleIntroEnd = () => {
    setShowIntro(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const slidePlayers = (direction: 'left' | 'right') => {
    const rail = playerRailRef.current
    if (!rail) return
    const step = Math.round(rail.clientWidth * 0.76)
    rail.scrollBy({
      left: direction === 'left' ? -step : step,
      behavior: 'smooth',
    })
  }

  const activeDesktopItem = navItems.find(
    (item) => item.label === activeDesktopMenu && item.submenu,
  )

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
    <div className="toro-site-shell min-h-screen overflow-x-hidden bg-[#f2f2f4] text-[#0a1d3a]">
      <header
        className="toro-topbar fixed inset-x-0 top-0 z-[300] overflow-visible bg-white/92 shadow-[0_6px_20px_rgba(10,29,58,0.06)] backdrop-blur"
        onMouseLeave={() => setActiveDesktopMenu(null)}
      >
       

        <div className="mx-auto flex max-w-[1100px] items-center gap-6 px-4 py-3.5 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/fc-toro-logo.png" alt="FC TORO" width={50} height={50} className="h-10 w-auto" priority />
            <div>
              <p className="text-lg font-black uppercase tracking-tight text-[#0a1d3a]">FC TORO</p>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#ef233c]">Mache sou yo</p>
            </div>
          </Link>

          <nav className="ml-auto hidden items-center gap-2 lg:flex">
            {navItems.map((item) => {
              const itemTone = item.accent
                ? 'text-[#ef233c] hover:text-[#ff3f5c]'
                : 'text-[#0a1d3a] hover:text-[#ef233c]'

              if (!item.submenu) {
                return (
                  <Link
                    key={item.label}
                    href={item.href ?? '#'}
                    onMouseEnter={() => setActiveDesktopMenu(null)}
                    className={`px-2 py-2 text-sm font-black uppercase tracking-[0.06em] transition-colors ${itemTone}`}
                  >
                    {item.label}
                  </Link>
                )
              }

              return (
                <div key={item.label} className="relative">
                  <button
                    type="button"
                    onMouseEnter={() => setActiveDesktopMenu(item.label)}
                    onFocus={() => setActiveDesktopMenu(item.label)}
                    onClick={() =>
                      setActiveDesktopMenu((prev) => (prev === item.label ? null : item.label))
                    }
                    aria-expanded={activeDesktopMenu === item.label}
                    className={`inline-flex items-center gap-1 px-2 py-2 text-sm font-black uppercase tracking-[0.06em] transition-colors ${itemTone}`}
                  >
                    {item.label}
                    <RiArrowDownSLine
                      className={`h-4 w-4 transition-transform duration-200 ${activeDesktopMenu === item.label ? 'rotate-180' : ''}`}
                    />
                  </button>
                </div>
              )
            })}
          </nav>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={mobileMenuOpen}
            className="ml-auto inline-flex items-center justify-center rounded-[8px] border border-[#d7deea] bg-white p-2 text-[#0a1d3a] transition-colors hover:border-[#1a4ea3] hover:text-[#1a4ea3] lg:hidden"
          >
            {mobileMenuOpen ? <RiCloseLine className="h-5 w-5" /> : <RiMenuLine className="h-5 w-5" />}
          </button>
        </div>

        <nav className="border-t border-[#e5e7ee] lg:hidden" aria-label="Navigation inline mobile">
          <div className="mx-auto grid max-w-[1100px] grid-cols-5 px-0">
            {mobilePrimaryLinks.map((item) => (
              <Link
                key={`quick-${item.label}`}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex h-10 min-w-0 items-center justify-center border-r border-[#e5e7ee] text-center text-[10px] font-black uppercase tracking-[0.07em] transition-colors duration-200 last:border-r-0 sm:text-[12px] ${
                  item.accent ? 'text-[#ef233c] hover:text-[#ff3f5c]' : 'text-[#0a1d3a] hover:text-[#ef233c]'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>

        <div className="toro-tricolor-bar" aria-hidden="true">
          <div className="toro-tricolor-track" />
        </div>

        <AnimatePresence>
          {activeDesktopItem?.submenu && (
            <motion.div
              key={`mega-menu-${activeDesktopItem.label}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 14 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="absolute left-0 right-0 top-[calc(100%-1px)] z-[220] hidden overflow-hidden lg:block"
            >
              <div className="relative mx-auto w-full max-w-[1720px] px-6 py-5">
                <div className="rounded-[12px] bg-[#0a2347] p-6 shadow-[0_16px_30px_rgba(10,29,58,0.24)]">
                    <div className="grid grid-cols-[minmax(0,2fr)_minmax(300px,1fr)] gap-7 xl:gap-8">
                    <div>
                      <p className="text-[11px] font-black uppercase tracking-[0.16em] text-[#E30613]">
                        {activeDesktopItem.label}
                      </p>
                      <h3 className="mt-2 text-[clamp(1.75rem,2.2vw,2.75rem)] font-black leading-[1.04] text-white">
                        {activeDesktopItem.submenu.intro}
                      </h3>
                      <span className="mt-3 inline-flex rounded-[8px] bg-[linear-gradient(90deg,rgba(24,80,170,0.86),rgba(227,6,19,0.86))] px-6 py-2 text-xl font-black uppercase tracking-[0.08em] text-white/95">
                        {activeDesktopItem.label === 'Equipe'
                          ? 'Academie'
                          : activeDesktopItem.label === 'Club'
                            ? 'Club officiel'
                            : 'Supporters'}
                      </span>

                      <div className="mt-7">
                        <p className="text-sm font-black uppercase tracking-[0.1em] text-white">
                          {activeDesktopItem.submenu.sections[0].title}
                        </p>

                        {activeDesktopItem.label === 'Equipe' ? (
                          <div className="mt-3 grid grid-cols-2 gap-4 xl:grid-cols-3 2xl:grid-cols-5">
                            {activeDesktopItem.submenu.sections[0].links.map((link) => (
                              <Link
                                key={`desktop-left-${activeDesktopItem.label}-${link.label}`}
                                href={link.href}
                                className="group flex min-h-[168px] flex-col rounded-[14px] border border-[#2f4f85] bg-[#102c5b] p-4 text-white shadow-[0_10px_18px_rgba(0,0,0,0.18)] transition-[transform,border-color,box-shadow,color,background-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-[#E30613] hover:bg-[#143265] hover:shadow-[0_14px_24px_rgba(0,0,0,0.24)]"
                              >
                                <div className="flex items-start justify-between gap-2">
                                  <p className="text-[10px] font-black uppercase tracking-[0.1em] text-white/76">
                                    Categorie
                                  </p>
                                  <span className="rounded-full bg-[#E30613] px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.08em] text-white">
                                    {link.label}
                                  </span>
                                </div>
                                <h4 className="mt-3 text-[1.8rem] font-black uppercase leading-[1.02] text-white">
                                  {link.label}
                                </h4>
                                <p className="mt-2 text-sm text-white/80">
                                  {getLinkDescription(link.label)}
                                </p>
                                <p className="mt-auto inline-flex items-center text-xs font-black uppercase tracking-[0.08em] text-[#8fb8ff] transition-colors group-hover:text-[#E30613]">
                                  Voir l equipe <RiArrowRightLine className="ml-1 h-4 w-4" />
                                </p>
                              </Link>
                            ))}
                          </div>
                        ) : (
                          <div className="mt-3 grid grid-cols-3 gap-4">
                            {activeDesktopItem.submenu.sections[0].links.map((link) => (
                              <Link
                                key={`desktop-left-${activeDesktopItem.label}-${link.label}`}
                                href={link.href}
                                className="group rounded-[8px] border border-[#2f4f85] bg-[#102c5b] p-4 text-white transition-[transform,background-color,border-color,color,box-shadow] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-[#E30613]/70 hover:bg-[#143265] hover:shadow-[0_12px_22px_rgba(0,0,0,0.2)]"
                              >
                                <p className="text-lg font-black uppercase leading-[1.04] text-white transition-colors group-hover:text-[#E30613]">
                                  {link.label}
                                </p>
                                <p className="mt-2 text-sm text-white/80">
                                  {getLinkDescription(link.label)}
                                </p>
                                <p className="mt-4 inline-flex items-center text-xs font-black uppercase tracking-[0.08em] text-[#8fb8ff] transition-colors group-hover:text-[#E30613]">
                                  Explorer <RiArrowRightLine className="ml-1 h-4 w-4" />
                                </p>
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="mt-8">
                        <p className="text-sm font-black uppercase tracking-[0.1em] text-white">
                          {activeDesktopItem.submenu.sections[1].title}
                        </p>

                        <div className="mt-3 grid grid-cols-3 gap-4">
                          {activeDesktopItem.submenu.sections[1].links.map((link) => (
                            <Link
                              key={`desktop-right-${activeDesktopItem.label}-${link.label}`}
                              href={link.href}
                              className="group rounded-[8px] border border-[#2f4f85] bg-[#102c5b] p-3.5 text-white transition-[transform,background-color,border-color,color,box-shadow] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-[#E30613]/65 hover:bg-[#143265] hover:shadow-[0_10px_20px_rgba(0,0,0,0.18)]"
                            >
                              <div className="flex items-start justify-between gap-3">
                                <div>
                                  <p className="text-base font-black uppercase leading-[1.05] text-white transition-colors group-hover:text-[#E30613]">
                                    {link.label}
                                  </p>
                                  <p className="mt-1 text-xs text-white/80">
                                    {getLinkDescription(link.label)}
                                  </p>
                                </div>
                                <RiArrowRightSLine className="mt-0.5 h-5 w-5 text-[#8fb8ff] transition-colors group-hover:text-[#E30613]" />
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>

                    <aside className="rounded-[8px] border border-[#2f4f85] bg-[#102c5b] p-4 text-white">
                      <div className="flex items-center gap-3 border-b border-[#2f4f85] pb-3">
                        <Image
                          src="/fc-toro-logo.png"
                          alt="FC TORO"
                          width={42}
                          height={42}
                          className="h-10 w-10 object-contain"
                        />
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-[0.12em] text-white/76">
                            FC TORO
                          </p>
                          <p className="text-lg font-black uppercase text-white">
                            Parcours joueur
                          </p>
                        </div>
                      </div>

                      <Link
                        href={activeDesktopItem.submenu.spotlight.href}
                        className="group mt-4 block overflow-hidden rounded-[8px] border border-[#2f4f85]"
                      >
                        <div className="relative h-[230px]">
                          <Image
                            src={activeDesktopItem.submenu.spotlight.image}
                            alt={activeDesktopItem.submenu.spotlight.name}
                            fill
                            sizes="(min-width: 1280px) 26vw, 100vw"
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,22,46,0.12)_0%,rgba(8,22,46,0.82)_100%)]" />
                        </div>
                        <div className="bg-[#0a2347] p-3">
                          <p className="text-[10px] font-black uppercase tracking-[0.12em] text-white/76">
                            Joueur en lumiere
                          </p>
                          <p className="mt-1 text-xl font-black uppercase leading-[1.03] text-white">
                            {activeDesktopItem.submenu.spotlight.name}
                          </p>
                          <p className="mt-1 text-sm text-white/80">
                            {activeDesktopItem.submenu.spotlight.role}
                          </p>
                        </div>
                      </Link>
                    </aside>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <AnimatePresence initial={false}>
        {mobileMenuOpen && (
          <>
            <motion.button
              type="button"
              aria-label="Fermer le menu mobile"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-x-0 bottom-0 top-[116px] z-[240] bg-[#0a1d3a]/22 lg:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.nav
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-x-0 bottom-0 top-[116px] z-[260] border-t border-[#d7deea] bg-white lg:hidden"
              aria-label="Navigation mobile"
            >
              <div className="mx-auto h-full max-w-[1100px] overflow-y-auto px-4 py-2 sm:px-6 sm:py-3">
                <div className="space-y-2 text-right">
                  {navItems
                    .filter((item) => item.submenu)
                    .flatMap((item) =>
                      item.submenu!.sections.map((section) => ({
                        itemLabel: item.label,
                        itemAccent: item.accent,
                        section,
                      })),
                    )
                    .map(({ itemLabel, itemAccent, section }) => (
                      <div key={`mobile-full-${itemLabel}-${section.title}`} className="border-b border-[#e6ebf3] pb-2">
                        <p
                          className={`text-[11px] font-black uppercase tracking-[0.11em] ${
                            itemAccent ? 'text-[#ef233c]' : 'text-[#5b6f91]'
                          }`}
                        >
                          {section.title}
                        </p>

                        <div className="mt-1.5 space-y-1">
                          {section.links.map((link) => (
                            <Link
                              key={`mobile-full-${itemLabel}-${section.title}-${link.label}`}
                              href={link.href}
                              onClick={() => setMobileMenuOpen(false)}
                              className="block text-sm font-semibold uppercase leading-tight tracking-[0.06em] text-[#2e436a] transition-colors duration-200 hover:text-[#ef233c]"
                            >
                              {link.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>

      <main className="pt-[116px] lg:pt-[78px]">
        <section className="toro-hero-section relative overflow-hidden border-b border-[#d6dce4] bg-[#0f2a4b]">
          <motion.div
            key={activeHero}
            initial={{ opacity: 0.2, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="absolute inset-0"
          >
            <Image
              src={heroSlides[activeHero].image}
              alt={heroSlides[activeHero].title}
              fill
              sizes="100vw"
              className="toro-hero-media object-cover opacity-82"
              priority
            />
          </motion.div>

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_40%,rgba(7,150,211,0.35),transparent_45%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,18,40,0.85)_0%,rgba(6,18,40,0.35)_48%,rgba(6,18,40,0.88)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,19,43,0.1)_0%,rgba(7,19,43,0.74)_100%)]" />

          <div className="relative mx-auto grid min-h-[calc(100svh-116px)] max-w-[1100px] items-end px-4 pb-0 pt-5 sm:min-h-[calc(100svh-98px)] sm:px-6 lg:min-h-[calc(100svh-74px)] lg:px-8 lg:pt-8">
            <div className="relative z-10 max-w-[560px] pb-7 sm:pb-14">
              <p className="inline-flex items-center rounded bg-[#ef233c] px-5 py-2 text-sm font-black uppercase tracking-[0.1em] text-white">
                {heroSlides[activeHero].label}
              </p>
              <h1 className="mt-4 text-[2.35rem] font-black uppercase leading-[0.95] text-white drop-shadow-[0_2px_0_rgba(0,0,0,0.25)] sm:mt-6 sm:text-5xl">
                {heroSlides[activeHero].title}
              </h1>
              <Link href="#" className="toro-cta mt-6 inline-flex items-center border border-white/70 px-6 py-2.5 text-sm font-bold uppercase tracking-[0.08em] text-white transition-colors hover:bg-white hover:text-[#0a1d3a] sm:mt-8 sm:px-7 sm:py-3">
                {heroSlides[activeHero].cta}
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

            <div className="toro-panel relative z-10 grid gap-3 rounded-t-2xl border border-white/25 border-b-0 bg-[rgba(7,19,43,0.78)] p-3 backdrop-blur-md sm:p-5 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="flex items-center gap-2.5 sm:gap-4">
                <Image src="/fc-toro-logo.png" alt="FC TORO" width={40} height={40} className="h-9 w-auto sm:h-11" />
                <p className="text-2xl font-black text-white sm:text-3xl">2 - 0</p>
                <p className="text-xs font-bold uppercase tracking-[0.08em] text-white/85 sm:text-sm">Vivre le match</p>
              </div>
              <div className="grid grid-cols-3 gap-1.5 text-[10px] font-bold uppercase tracking-[0.08em] text-white sm:gap-2 sm:text-xs">
                <div className="border border-white/25 p-2 sm:p-3">Seance du 24 fev</div>
                <div className="border border-white/25 p-2 sm:p-3">Promo billetterie</div>
                <div className="border border-white/25 p-2 sm:p-3">La prise du vel</div>
              </div>
            </div>
          </div>
        </section>

        <section id="club" className="px-4 py-10 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[1260px]">
            <div className="grid gap-6 lg:grid-cols-[0.82fr_1.18fr] lg:gap-8">
              <aside className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                <article className="group relative h-[350px] overflow-hidden rounded-[16px] bg-[#0f2a4b] sm:h-[390px]">
                  <Image
                    src={playerCards[4].image}
                    alt="Portrait FC TORO"
                    fill
                    sizes="(min-width: 1024px) 30vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,18,40,0.1)_35%,rgba(6,18,40,0.86)_100%)]" />
                  <div className="absolute bottom-0 left-0 right-0 p-3.5 text-white">
                    <p className="text-[11px] font-black uppercase tracking-[0.12em] text-white/85">Depuis 2012</p>
                    <p className="mt-1 text-[1.8rem] font-black uppercase leading-[0.9]">FC TORO</p>
                  </div>
                </article>

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-1 lg:grid-cols-2">
                  <article className="group relative h-[170px] overflow-hidden rounded-[14px] bg-[#0f2a4b]">
                    <Image
                      src={playerCards[11].image}
                      alt="Esprit academie FC TORO"
                      fill
                      sizes="(min-width: 1024px) 16vw, 50vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,18,40,0.06)_30%,rgba(6,18,40,0.82)_100%)]" />
                    <p className="absolute bottom-2.5 left-2.5 text-[10px] font-black uppercase tracking-[0.1em] text-white">Esprit academie</p>
                  </article>
                  <article className="group relative h-[170px] overflow-hidden rounded-[14px] bg-[#0f2a4b]">
                    <Image
                      src={playerCards[12].image}
                      alt="Programme filles FC TORO"
                      fill
                      sizes="(min-width: 1024px) 16vw, 50vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,18,40,0.06)_30%,rgba(6,18,40,0.82)_100%)]" />
                    <p className="absolute bottom-2.5 left-2.5 text-[10px] font-black uppercase tracking-[0.1em] text-white">Programme filles</p>
                  </article>
                </div>
              </aside>

              <article>
                <p className="text-[11px] font-black uppercase tracking-[0.14em] text-[#1f4ea1]">A propos</p>
                <h3 className="mt-2 text-[clamp(1.9rem,3.2vw,3rem)] font-black uppercase leading-[0.9] text-[#0d2d62]">
                  Football Club Toro
                </h3>

                <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-[#445b7f]">
                  <p>
                    FC TORO, cree le 1er septembre 2012, est devenu l un des clubs de football references en Haiti
                    pour les filles et les garcons de 2 a 19 ans.
                  </p>
                  <p>
                    Initialement dedie aux garcons, le club a ouvert ses programmes aux filles en janvier 2015. Depuis
                    2018 jusqu a aujourd hui, FC TORO poursuit et renforce ses activites malgre les circonstances
                    exceptionnelles qui touchent notre pays et le monde.
                  </p>
                  <p>
                    Tout au long de l annee, nos joueurs et joueuses suivent une formation diversifiee pour ameliorer
                    la technique individuelle, la communication, l esprit d equipe, le leadership et la maitrise sous
                    pression et en competition.
                  </p>
                  <p>
                    Grace a l engagement du staff, au soutien des parents et sponsors, et a la motivation des enfants,
                    le club continue de progresser et de participer a des tournois competitifs comme la Vertieres Cup
                    au Cap-Haitien et le Flag Day Tournament.
                  </p>
                </div>

                <motion.div
                  onViewportEnter={() => setStatsStarted(true)}
                  viewport={{ once: true, amount: 0.25 }}
                  className="mt-6 grid gap-3 sm:grid-cols-2"
                >
                  {clubStats.map((item, index) => (
                    <article
                      key={item.label}
                      className="rounded-2xl bg-[linear-gradient(130deg,#f5f8ff_0%,#eef4fd_100%)] p-3.5 shadow-[0_8px_16px_rgba(10,29,58,0.06)]"
                    >
                      <div className="flex items-center gap-3">
                        <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#1f4ea1] text-white">
                          <item.icon className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-[1.55rem] font-black leading-none text-[#0d2d62]">
                            {item.prefix ?? ''}
                            {statCounts[index]}
                          </p>
                          <p className="mt-1 text-[11px] font-black uppercase tracking-[0.08em] text-[#4e6488]">{item.label}</p>
                        </div>
                      </div>
                    </article>
                  ))}
                </motion.div>
              </article>
            </div>
          </div>
        </section>

        <section id="joueurs" className="pb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            viewport={{ once: true, amount: 0.2 }}
            className="w-full bg-[linear-gradient(108deg,#ef233c_0%,#d11b34_55%,#a80f2a_100%)] px-4 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-7"
          >
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
                className="flex snap-x snap-mandatory gap-2.5 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              >
                {playerCards.map((player, index) => (
                  <motion.article
                    key={player.name}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.38, ease: 'easeOut', delay: index * 0.04 }}
                    viewport={{ once: true, amount: 0.3 }}
                    className="group relative h-[266px] min-w-[43%] snap-start overflow-hidden rounded-[12px] bg-[#0f2a4b] sm:h-[316px] sm:min-w-[220px] lg:h-[356px] lg:min-w-[252px]"
                  >
                    <Image
                      src={player.image}
                      alt={player.name}
                      fill
                      sizes="(min-width: 1536px) 16vw, (min-width: 1280px) 18vw, (min-width: 768px) 27vw, 58vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
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
                  </motion.article>
                ))}
              </div>
            </div>
          </motion.div>
        </section>

        <section id="actualites" className="px-4 pb-11 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[1240px]">
            <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-[11px] font-black uppercase tracking-[0.16em] text-[#1d4ea1]">A la une du club</p>
                <h3 className="toro-fusion-title mt-1 text-2xl font-black uppercase text-[#0a1d3a] sm:text-[2rem]">
                  Actualites
                </h3>
                <p className="mt-1.5 max-w-[620px] text-sm text-[#5d6f8f]">
                  Les infos FC TORO en format plus court, plus clair et plus fluide.
                </p>
              </div>
              <Link
                href="#"
                className="inline-flex items-center rounded-full border border-[#cfd9ea] bg-white px-3.5 py-1.5 text-[11px] font-black uppercase tracking-[0.08em] text-[#0a1d3a] transition-colors duration-300 hover:border-[#1f3f8f] hover:text-[#1f3f8f]"
              >
                Voir toutes les actus <RiArrowRightLine className="ml-1 inline h-4 w-4" />
              </Link>
            </div>

            <div className="grid items-start gap-3 lg:grid-cols-[1.03fr_0.97fr]">
              <div className="grid gap-3">
                <motion.article
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, ease: 'easeOut' }}
                  viewport={{ once: true, amount: 0.2 }}
                  className="group overflow-hidden rounded-[16px] border border-[#d6deeb] bg-white shadow-[0_10px_18px_rgba(10,29,58,0.09)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_24px_rgba(10,29,58,0.14)]"
                >
                  <div className="relative h-[240px] overflow-hidden bg-[#f3f6fb] sm:h-[290px] lg:h-[285px]">
                    <Image
                      src={newsCards[0].image}
                      alt={newsCards[0].title}
                      fill
                      sizes="(min-width: 1024px) 52vw, 100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,25,47,0.02)_42%,rgba(8,25,47,0.72)_100%)]" />
                  </div>
                  <div className="bg-white px-4 py-3 sm:px-5">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="inline-flex rounded-md bg-[#ef233c] px-3 py-1 text-[10px] font-black uppercase tracking-[0.1em] text-white">
                        {newsCards[0].category}
                      </p>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.09em] text-[#6b7d9d]">
                        {newsCards[0].dateLabel}
                      </p>
                    </div>
                    <h4 className="mt-2 text-[1.35rem] font-black uppercase leading-[1.02] text-[#0a1d3a] sm:text-[1.7rem]">
                      {newsCards[0].title}
                    </h4>
                    <p className="mt-2 text-sm leading-snug text-[#5d6f8f]">{newsCards[0].excerpt}</p>
                    <p className="mt-3 inline-flex items-center text-[11px] font-black uppercase tracking-[0.08em] text-[#1f3f8f] transition-colors group-hover:text-[#ef233c]">
                      Lire l article <RiArrowRightLine className="ml-1 h-4 w-4" />
                    </p>
                  </div>
                </motion.article>

                {newsCards.slice(3, 4).map((card, index) => (
                  <motion.article
                    key={`actualites-left-${card.title}`}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.42, ease: 'easeOut', delay: 0.08 * index }}
                    viewport={{ once: true, amount: 0.2 }}
                    className="group overflow-hidden rounded-[14px] border border-[#d8dfeb] bg-white shadow-[0_9px_16px_rgba(10,29,58,0.07)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_21px_rgba(10,29,58,0.11)]"
                  >
                    <div className="relative h-[148px] overflow-hidden bg-[#f3f6fb] sm:h-[156px]">
                      <Image
                        src={card.image}
                        alt={card.title}
                        fill
                        sizes="(min-width: 768px) 48vw, 100vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                      />
                    </div>
                    <div className="bg-white px-3.5 py-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="inline-flex rounded-md bg-[#ef233c] px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.1em] text-white">
                          {card.category}
                        </p>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.09em] text-[#6b7d9d]">{card.dateLabel}</p>
                      </div>
                      <h4 className="mt-1.5 text-[1.03rem] font-black uppercase leading-tight text-[#0a1d3a] sm:text-[1.1rem]">
                        {card.title}
                      </h4>
                      <p className="mt-1.5 text-[13px] leading-snug text-[#5d6f8f]">{card.excerpt}</p>
                    </div>
                  </motion.article>
                ))}
              </div>

              <div className="grid gap-3">
                {newsCards.slice(1, 3).map((card, index) => (
                  <motion.article
                    key={`actualites-side-${card.title}`}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, ease: 'easeOut', delay: 0.06 * (index + 1) }}
                    viewport={{ once: true, amount: 0.2 }}
                    className="group overflow-hidden rounded-[16px] border border-[#d6deeb] bg-white shadow-[0_10px_16px_rgba(10,29,58,0.08)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_13px_22px_rgba(10,29,58,0.12)]"
                  >
                    <div className="relative h-[170px] overflow-hidden bg-[#f3f6fb] sm:h-[165px] lg:h-[175px]">
                      <Image
                        src={card.image}
                        alt={card.title}
                        fill
                        sizes="(min-width: 1024px) 38vw, 100vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                      />
                      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,25,47,0.05)_28%,rgba(8,25,47,0.72)_100%)]" />
                    </div>
                    <div className="bg-white px-3.5 py-3.5 sm:px-4">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="inline-flex rounded-md bg-[#1f3f8f] px-3 py-1 text-[10px] font-black uppercase tracking-[0.1em] text-white">
                          {card.category}
                        </p>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.09em] text-[#6b7d9d]">{card.dateLabel}</p>
                      </div>
                      <h4 className="mt-2 text-[1.18rem] font-black uppercase leading-[1.06] text-[#0a1d3a] sm:text-[1.28rem]">
                        {card.title}
                      </h4>
                      <p className="mt-1.5 text-[13px] leading-snug text-[#5d6f8f]">{card.excerpt}</p>
                      <p className="mt-2.5 inline-flex items-center text-[11px] font-black uppercase tracking-[0.08em] text-[#1f3f8f] transition-colors group-hover:text-[#ef233c]">
                        Lire l article <RiArrowRightLine className="ml-1 h-4 w-4" />
                      </p>
                    </div>
                  </motion.article>
                ))}

                {newsCards.slice(4).map((card, index) => (
                  <motion.article
                    key={`actualites-right-${card.title}`}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.42, ease: 'easeOut', delay: 0.12 + 0.08 * index }}
                    viewport={{ once: true, amount: 0.2 }}
                    className="group overflow-hidden rounded-[14px] border border-[#d8dfeb] bg-white shadow-[0_9px_16px_rgba(10,29,58,0.07)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_21px_rgba(10,29,58,0.11)]"
                  >
                    <div className="relative h-[148px] overflow-hidden bg-[#f3f6fb] sm:h-[156px]">
                      <Image
                        src={card.image}
                        alt={card.title}
                        fill
                        sizes="(min-width: 768px) 48vw, 100vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                      />
                    </div>
                    <div className="bg-white px-3.5 py-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="inline-flex rounded-md bg-[#ef233c] px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.1em] text-white">
                          {card.category}
                        </p>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.09em] text-[#6b7d9d]">{card.dateLabel}</p>
                      </div>
                      <h4 className="mt-1.5 text-[1.03rem] font-black uppercase leading-tight text-[#0a1d3a] sm:text-[1.1rem]">
                        {card.title}
                      </h4>
                      <p className="mt-1.5 text-[13px] leading-snug text-[#5d6f8f]">{card.excerpt}</p>
                    </div>
                  </motion.article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-10 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-[1320px] gap-5 lg:grid-cols-[1.08fr_0.92fr]">
            <motion.article
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              viewport={{ once: true, amount: 0.2 }}
              className="relative overflow-hidden rounded-[22px] border border-[#d7e0ee] bg-[linear-gradient(126deg,#f8fbff_0%,#eef4fd_58%,#f9fbff_100%)] p-5 shadow-[0_12px_26px_rgba(10,29,58,0.1)] sm:p-6"
            >
              <div className="absolute -right-20 -top-20 h-52 w-52 rounded-full bg-[radial-gradient(circle,rgba(31,63,143,0.13),rgba(31,63,143,0)_72%)]" />
              <div className="absolute -left-16 bottom-[-70px] h-44 w-44 rounded-full bg-[radial-gradient(circle,rgba(239,35,60,0.14),rgba(239,35,60,0)_72%)]" />

              <div className="relative z-10">
                <p className="text-[11px] font-black uppercase tracking-[0.14em] text-[#ef233c]">Vision FC TORO</p>
                <h2 className="mt-2 max-w-[680px] text-[clamp(1.55rem,2.5vw,2.4rem)] font-black uppercase leading-[0.97] text-[#12366f]">
                  Formation serieuse, identite forte, progression continue
                </h2>
                <p className="mt-3 max-w-[720px] text-sm leading-relaxed text-[#4f6387]">
                  Un cadre clair, des objectifs concrets et un accompagnement terrain pour faire progresser chaque
                  joueur sans bruit, avec discipline.
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="rounded-full bg-[#12366f] px-3 py-1 text-[10px] font-black uppercase tracking-[0.1em] text-white">
                    Discipline
                  </span>
                  <span className="rounded-full bg-[#ef233c] px-3 py-1 text-[10px] font-black uppercase tracking-[0.1em] text-white">
                    Intensite
                  </span>
                  <span className="rounded-full bg-[#1f4ea1] px-3 py-1 text-[10px] font-black uppercase tracking-[0.1em] text-white">
                    Mentalite club
                  </span>
                </div>

                <div className="mt-5 flex flex-wrap gap-2.5">
                  <Link
                    href="/inscription"
                    className="inline-flex items-center rounded-lg bg-[#ef233c] px-4 py-2 text-[11px] font-black uppercase tracking-[0.08em] text-white transition-colors hover:bg-[#d91933]"
                  >
                    Rejoindre le club <RiArrowRightLine className="ml-1 h-4 w-4" />
                  </Link>
                  <Link
                    href="#club"
                    className="inline-flex items-center rounded-lg border border-[#cdd9eb] bg-white px-4 py-2 text-[11px] font-black uppercase tracking-[0.08em] text-[#12366f] transition-colors hover:border-[#1f4ea1]"
                  >
                    Histoire du club <RiArrowRightLine className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </motion.article>

            <motion.article
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: 'easeOut', delay: 0.05 }}
              viewport={{ once: true, amount: 0.2 }}
              className="rounded-[22px] border border-[#d7e0ee] bg-[#f7faff] p-4 shadow-[0_12px_26px_rgba(10,29,58,0.09)] sm:p-5"
            >
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-xl font-black uppercase leading-[0.95] text-[#12366f] sm:text-2xl">Focus joueurs</h3>
                <Link
                  href="#joueurs"
                  className="text-[11px] font-black uppercase tracking-[0.1em] text-[#12366f] transition-colors hover:text-[#ef233c]"
                >
                  Voir tout <RiArrowRightLine className="ml-1 inline h-4 w-4" />
                </Link>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2.5 sm:gap-3">
                {playerCards.slice(0, 4).map((player) => (
                  <article
                    key={`focus-pro-${player.name}`}
                    className="group relative min-h-[136px] overflow-hidden rounded-[12px] bg-[#0f2a4b] sm:min-h-[154px]"
                  >
                    <Image
                      src={player.image}
                      alt={player.name}
                      fill
                      sizes="(min-width: 1024px) 22vw, 48vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,25,47,0.02)_35%,rgba(8,25,47,0.84)_100%)]" />
                    <div className="absolute bottom-0 left-0 right-0 p-2.5 text-white">
                      <p className="text-[10px] font-black uppercase tracking-[0.1em] text-white/82">{player.role}</p>
                      <p className="mt-1 text-[1.55rem] font-black uppercase leading-[0.88] sm:text-[1.75rem]">{player.name}</p>
                    </div>
                  </article>
                ))}
              </div>
            </motion.article>
          </div>
        </section>
      </main>

      <footer id="footer" className="bg-white">
        <section className="px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[1100px]">
            <h4 className="text-center text-xs font-black uppercase tracking-[0.12em] text-[#0a1d3a]">Partenaires officiels</h4>

            <div className="mt-6 sm:hidden">
              <div className="flex items-center justify-between gap-1">
                {sponsors.map((sponsor) => (
                  <div
                    key={`sponsor-mobile-${sponsor.id}`}
                    className="grid h-14 basis-[14%] place-items-center px-0.5"
                  >
                    <div className="relative h-9 w-full">
                      <Image
                        src={sponsor.logo}
                        alt={sponsor.name}
                        fill
                        sizes="14vw"
                        className="object-contain object-center"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 hidden grid-cols-3 gap-3 sm:grid md:grid-cols-4 lg:grid-cols-7">
              {sponsors.map((sponsor) => (
                <div key={sponsor.id} className="grid h-20 place-items-center px-2 transition-transform duration-300 hover:-translate-y-1">
                  <div className="relative h-14 w-full max-w-[210px]">
                    <Image
                      src={sponsor.logo}
                      alt={sponsor.name}
                      fill
                      sizes="(min-width: 1280px) 13vw, (min-width: 768px) 20vw, 42vw"
                      className="object-contain object-center"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[linear-gradient(120deg,#16357c,#ef233c)] px-4 py-9 text-white sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-[1100px] flex-wrap items-center justify-between gap-5">
            <div className="flex items-center gap-4">
              <Image src="/fc-toro-logo.png" alt="Logo FC TORO" width={54} height={54} className="h-[54px] w-auto object-contain" />
              <div>
                <p className="text-sm font-black uppercase tracking-[0.08em]">L application officielle du FC TORO</p>
                <p className="mt-1 text-xs">Suivez FC TORO partout avec l app mobile.</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="inline-flex items-center gap-2 rounded border border-white/70 px-4 py-2 text-xs font-bold uppercase">
                <RiAppStoreFill className="h-4 w-4" />
                App Store
              </button>
              <button className="inline-flex items-center gap-2 rounded border border-white/70 px-4 py-2 text-xs font-bold uppercase">
                <RiGooglePlayFill className="h-4 w-4" />
                Google Play
              </button>
            </div>
          </div>
        </section>

        <section className="px-4 py-6 sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-[1100px] flex-wrap items-center justify-center gap-4 text-xs font-semibold uppercase tracking-[0.08em] text-[#0a1d3a]">
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
