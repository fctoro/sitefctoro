'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { heroSlides, newsCards, playerCards } from '@/lib/joueur'
import { INTRO_SESSION_KEY } from '@/lib/site-session'
import { sponsors } from '@/lib/sponsors'
import { NewsBarcaGrid } from '@/components/news-barca-grid'
import VisionSection from '@/components/vision-section'
import {
  RiArrowDownSLine,
  RiArrowLeftSLine,
  RiArrowRightLine,
  RiArrowRightSLine,
  RiCloseLine,
  RiFlashlightLine,
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
  { label: 'Actualites', href: '/actualites' },
  {
    label: 'Club',
    submenu: {
      intro: 'Identite FC TORO, infrastructures et vie du club.',
      backdropImage: '/joueur/extracted/583167774_18542869372012336_2307311757000245016_n.jpg',
      sections: [
        {
          title: 'Le club',
          links: [
            { label: 'Histoire du club', href: '/le-club' },
            { label: 'Sponsors', href: '/sponsors' },
          ],
        },
      ],
      spotlight: {
        image: '/joueur/extracted/634150827_18560832649012336_7495873752742897530_n.jpg',
        name: 'Ruben Alexis',
        role: 'Capitaine',
        href: '/equipes',
      },
    },
  },
  {
    label: 'Equipe',
    href: '/equipes',
  },
  {
    label: 'Projet',
    submenu: {
      intro: 'Les projets FC TORO pour structurer la progression des joueurs.',
      backdropImage: '/joueur/extracted/591149277_18545355826012336_6701584250153829576_n.jpg',
      sections: [
        {
          title: 'Projets',
          links: [
            { label: 'Elite', href: '/elite' },
            { label: 'CASA', href: '/casa' },
          ],
        },
      ],
      spotlight: {
        image: '/joueur/extracted/591149277_18545355826012336_6701584250153829576_n.jpg',
        name: 'Projet FC TORO',
        role: 'Elite et CASA',
        href: '/elite',
      },
    },
  },
  {
    label: 'Evenements',
    href: '/evenements',
    submenu: {
      intro: 'Tous les rendez-vous FC TORO: live, inscriptions tournoi et classement.',
      backdropImage: '/joueur/extracted/566965214_18535346428012336_1378637816694320324_n.jpg',
      sections: [
        {
          title: 'Diffusion',
          links: [{ label: 'Live Diffusion', href: '/evenements/live' }],
        },
        {
          title: 'Tournois',
          links: [
            { label: 'Vertieres Cup', href: '/evenements/vertieres-cup' },
            { label: 'Flag Day', href: '/evenements/flag-day' },
          ],
        },
      ],
      spotlight: {
        image: '/joueur/extracted/583167774_18542869372012336_2307311757000245016_n.jpg',
        name: 'Flag Day',
        role: 'Classement, resultats et affiches',
        href: '/evenements/flag-day',
      },
    },
  },
  {
      label: 'Rejoindre',
      accent: true,
      submenu: {
      intro: 'Parcours, stages et integration au club.',
      backdropImage: '/joueur/extracted/560435029_18532793887012336_3999511270054224397_n.jpg',
      sections: [
        {
          title: 'Devenir',
          links: [
            { label: 'Devenir joueur', href: '/inscription/joueur' },
            { label: 'Devenir fan', href: '/inscription/fans' },
            { label: 'Devenir partenaire', href: '/inscription/partenaires' },
          ],
        },
        {
          title: 'Complement',
          links: [
            { label: 'Voir les stages', href: '/stages' },
            { label: 'Rejoindre le club', href: '/inscription' },
            { label: 'Contacter recrutement', href: '/contact' },
          ],
        },
      ],
      spotlight: {
        image: '/joueur/extracted/560435029_18532793887012336_3999511270054224397_n.jpg',
        name: 'Parcours FC TORO',
        role: 'Joueurs, fans et partenaires',
        href: '/inscription',
      },
    },
  },
  { label: 'Contact', href: '/contact' },
]

const linkDescriptionMap: Record<string, string> = {
  'Devenir joueur': 'Dossier rapide et parcours d integration accompagne.',
  'Devenir fan': 'Supporters, benevoles et activations jour de match.',
  'Devenir partenaire': 'Marques, institutions et projets de collaboration club.',
  'Voir les stages': 'Calendrier des camps intensifs et pre-inscription.',
  'Rejoindre le club': 'Vue d ensemble des parcours pour rejoindre FC TORO.',
  'Contacter recrutement': 'Parlez directement avec l equipe recrutement.',
  'Histoire du club': 'Parcours, jalons majeurs et ADN FC TORO.',
  Sponsors: 'Partenaires et soutiens qui accompagnent FC TORO.',
  Elite: 'Le pont entre formation et excellence FC TORO.',
  CASA: 'Projet Caribbean Sports Academy.',
  'Vision et valeurs': 'Discipline, identite et ambition long terme.',
  'Installations': 'Terrains, equipements et environnement d entrainement.',
  'Actualites club': 'Les dernieres informations officielles du club.',
  'Calendrier complet': 'Toutes les rencontres et evenements a venir.',
  'Live Diffusion': 'Diffusion live, flux de match et rappels avant coup d envoi.',
  'Vertieres Cup': 'Inscription equipe, logo officiel et liste des joueurs.',
  'Flag Day': 'Classement du tournoi, resultats recents et prochains matchs.',
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

const normalizePath = (href?: string) => {
  if (!href) return null
  const [path] = href.split('#')
  if (!path || path === '/') return path || null
  return path.endsWith('/') ? path.slice(0, -1) : path
}

const isPageMatch = (pathname: string, href?: string) => {
  const normalizedHref = normalizePath(href)
  const normalizedPathname = pathname !== '/' && pathname.endsWith('/') ? pathname.slice(0, -1) : pathname

  if (!normalizedHref || normalizedHref === '/') return false

  return normalizedPathname === normalizedHref || normalizedPathname.startsWith(`${normalizedHref}/`)
}

const isNavItemActive = (pathname: string, item: NavItem) => {
  if (isPageMatch(pathname, item.href)) return true
  if (!item.submenu) return false

  return item.submenu.sections.some((section) =>
    section.links.some((link) => isPageMatch(pathname, link.href)),
  )
}

const getMostSpecificMatchingHref = (pathname: string, links: NavSubLink[]) =>
  links.reduce<string | null>((bestMatch, link) => {
    if (!isPageMatch(pathname, link.href)) return bestMatch

    const normalizedHref = normalizePath(link.href)
    if (!normalizedHref) return bestMatch

    if (!bestMatch || normalizedHref.length > bestMatch.length) {
      return normalizedHref
    }

    return bestMatch
  }, null)

const isRejoindreSectionActive = (pathname: string) =>
  isPageMatch(pathname, '/inscription') || isPageMatch(pathname, '/stages')

const eliteShowcaseImage = '/home/elite-showcase.jpg'

const eliteFocusPoints = [
  {
    label: 'Passage vers Elite',
    icon: RiShieldStarLine,
  },
  {
    label: 'Rythme et discipline',
    icon: RiFlashlightLine,
  },
  {
    label: 'Pret pour la competition',
    icon: RiTrophyLine,
  },
]

const eliteStaffCards = [
  {
    eyebrow: 'Staff Elite',
    title: 'Encadrement terrain',
    description: 'Le groupe est accompagne de pres pour installer des seances plus exigeantes et plus lisibles.',
    image: '/home/staff-direction.jpg',
    alt: 'Staff Elite FC TORO pendant une seance',
  },
  {
    eyebrow: 'Staff Elite',
    title: 'Lecture du jeu',
    description: 'Le staff affine les details tactiques, le tempo collectif et la qualite des prises de decision.',
    image: '/home/staff-field.jpg',
    alt: 'Staff FC TORO sur le terrain',
  },
  {
    eyebrow: 'Staff Elite',
    title: 'Suivi quotidien',
    description: 'Preparation, correction et progression sont suivies au plus pres pour chaque cycle de travail.',
    image: '/home/staff-support.jpg',
    alt: 'Encadrement FC TORO Elite',
  },
]

const mobilePrimaryLinks: Array<{ label: string; href: string; accent?: boolean }> = [
  { label: 'Actualites', href: '/actualites' },
  { label: 'Club', href: '/le-club' },
  { label: 'Equipe', href: '/equipes' },
  { label: 'Elite', href: '/elite' },
  { label: 'Flag Day', href: '/evenements/flag-day' },
]

export default function HomePage() {
  const pathname = usePathname()
  const [showIntro, setShowIntro] = useState(false)
  const [introReady, setIntroReady] = useState(false)
  const [activeHero, setActiveHero] = useState(0)
  const [activeDesktopMenu, setActiveDesktopMenu] = useState<string | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const playerRailRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const hasSeenIntro = window.sessionStorage.getItem(INTRO_SESSION_KEY) === 'true'

    if (hasSeenIntro) {
      setShowIntro(false)
      setIntroReady(true)
      return
    }

    // Keep the intro limited to the user's first landing in the current session.
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

  const activeDesktopItem = navItems.find(
    (item) => item.label === activeDesktopMenu && item.submenu,
  )
  const activeDesktopSubmenuHref = activeDesktopItem?.submenu
    ? getMostSpecificMatchingHref(
        pathname,
        activeDesktopItem.submenu.sections.flatMap((section) => section.links),
      )
    : null
  const activeMobileSubmenuHref = getMostSpecificMatchingHref(
    pathname,
    navItems
      .filter((item) => item.submenu)
      .flatMap((item) => item.submenu!.sections.flatMap((section) => section.links)),
  )
  const activeHeroSlide = heroSlides[activeHero]
  const activeHeroTitle =
    activeHero === 1
      ? 'Flag Day approche. Consultez le classement et suivez le tournoi du 18 mai 2026.'
      : activeHero === 2
        ? 'FC TORO Elite structure la transition vers un niveau plus exigeant et plus ambitieux.'
        : activeHeroSlide.title

  if (!introReady) {
    return (
      <div className="min-h-screen bg-[#f2f2f4]" aria-hidden="true" />
    )
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

          <Link
            href="/evenements/live"
            className="ml-auto inline-flex items-center gap-2 rounded-full bg-[#ef233c] px-3 py-2 text-[10px] font-black uppercase tracking-[0.16em] text-white shadow-[0_10px_18px_rgba(239,35,60,0.28)] transition-all hover:bg-[#d71931] lg:hidden"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/80" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-white" />
            </span>
            Live
          </Link>

          <nav className="ml-auto hidden items-center gap-2 lg:flex">
            {navItems.map((item) => {
              const itemIsActive =
                item.label === 'Rejoindre'
                  ? isRejoindreSectionActive(pathname)
                  : isNavItemActive(pathname, item)
              const itemTone = 'text-[#0a1d3a] hover:text-[#ef233c]'
              const itemActiveTone = 'text-[#ef233c]'

              if (!item.submenu) {
                return (
                  <Link
                    key={item.label}
                    href={item.href ?? '#'}
                    onMouseEnter={() => setActiveDesktopMenu(null)}
                    className={`px-3 py-2 text-sm font-black uppercase tracking-[0.06em] transition-colors ${itemIsActive ? itemActiveTone : itemTone}`}
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
                    className={`inline-flex items-center gap-1 px-3 py-2 text-sm font-black uppercase tracking-[0.06em] transition-colors ${itemIsActive ? itemActiveTone : itemTone}`}
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
            className="inline-flex items-center justify-center rounded-[8px] border border-[#d7deea] bg-white p-2 text-[#0a1d3a] transition-colors hover:border-[#1a4ea3] hover:text-[#1a4ea3] lg:hidden"
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
                aria-current={isPageMatch(pathname, item.href) ? 'page' : undefined}
                className={`flex h-10 min-w-0 items-center justify-center border-r border-[#e5e7ee] text-center text-[10px] font-black uppercase tracking-[0.07em] transition-colors duration-200 last:border-r-0 sm:text-[12px] ${
                  isPageMatch(pathname, item.href)
                    ? 'text-[#ef233c]'
                    : item.accent
                      ? 'text-[#ef233c] hover:text-[#ff3f5c]'
                      : 'text-[#0a1d3a] hover:text-[#ef233c]'
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
                <div className="rounded-[18px] border border-[#dbe5f2] bg-white p-7 shadow-[0_22px_40px_rgba(10,29,58,0.14)]">
                  <div className="grid grid-cols-[280px_minmax(0,1fr)] gap-8 xl:grid-cols-[320px_minmax(0,1fr)]">
                    <aside className="rounded-[22px] border border-[#e7edf6] bg-[linear-gradient(180deg,#f8fbff_0%,#f2f7fd_100%)] p-6">
                      <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#ef233c]">
                        {activeDesktopItem.label}
                      </p>
                      <h3 className="mt-3 text-[1.95rem] font-black leading-[0.98] tracking-[-0.04em] text-[#0a1d3a]">
                        {activeDesktopItem.submenu.intro}
                      </h3>

                      <div className="mt-6 h-px bg-gradient-to-r from-[#ef233c] via-[#ef233c]/20 to-transparent" />

                      <div className="mt-6">
                        <p className="text-[11px] font-black uppercase tracking-[0.16em] text-[#6d82a3]">
                          Acces principal
                        </p>
                        <Link
                          href={activeDesktopItem.submenu.spotlight.href}
                          className="group mt-3 flex items-start justify-between rounded-[18px] border border-[#dbe5f2] bg-white px-4 py-4 transition-all duration-300 hover:border-[#ef233c]/35 hover:bg-[#fff7f8] hover:shadow-[0_14px_24px_rgba(10,29,58,0.08)]"
                        >
                          <div>
                            <p className="text-base font-black uppercase leading-[1.04] text-[#0a1d3a]">
                              {activeDesktopItem.submenu.spotlight.name}
                            </p>
                            <p className="mt-1 text-sm font-semibold leading-relaxed text-[#5b6f91]">
                              {activeDesktopItem.submenu.spotlight.role}
                            </p>
                          </div>
                          <RiArrowRightLine className="mt-0.5 h-5 w-5 text-[#ef233c] transition-transform duration-300 group-hover:translate-x-0.5" />
                        </Link>
                      </div>
                    </aside>

                    <div className="space-y-7">
                      {activeDesktopItem.submenu.sections.map((section) => (
                        <section key={`desktop-section-${activeDesktopItem.label}-${section.title}`}>
                          <div className="flex items-center gap-3">
                            <p className="text-[11px] font-black uppercase tracking-[0.18em] text-[#6d82a3]">
                              {section.title}
                            </p>
                            <div className="h-px flex-1 bg-[#e7edf6]" />
                          </div>

                          <div
                            className={`mt-4 grid gap-4 ${
                              section.links.length === 1
                                ? 'grid-cols-1'
                                : section.links.length === 2
                                  ? 'grid-cols-2'
                                  : 'grid-cols-3'
                            }`}
                          >
                            {section.links.map((link) => {
                              const linkIsActive = activeDesktopSubmenuHref === normalizePath(link.href)

                              return (
                                <Link
                                  key={`desktop-link-${activeDesktopItem.label}-${section.title}-${link.label}`}
                                  href={link.href}
                                  className={`group rounded-[18px] border p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#ef233c]/35 hover:bg-[#fff7f8] hover:shadow-[0_16px_28px_rgba(10,29,58,0.08)] ${
                                    linkIsActive
                                      ? 'border-[#ef233c]/45 bg-[#fff7f8] shadow-[0_16px_28px_rgba(10,29,58,0.08)]'
                                      : 'border-[#e4ebf6] bg-[#f8fafc]'
                                  }`}
                                >
                                  <p
                                    className={`text-lg font-black uppercase leading-[1.04] transition-colors group-hover:text-[#ef233c] ${
                                      linkIsActive ? 'text-[#ef233c]' : 'text-[#0a1d3a]'
                                    }`}
                                  >
                                    {link.label}
                                  </p>
                                  <p className="mt-2 text-sm leading-relaxed text-[#5b6f91]">
                                    {getLinkDescription(link.label)}
                                  </p>
                                  <p
                                    className={`mt-4 inline-flex items-center text-xs font-black uppercase tracking-[0.12em] transition-colors group-hover:text-[#ef233c] ${
                                      linkIsActive ? 'text-[#ef233c]' : 'text-[#1f4ea1]'
                                    }`}
                                  >
                                    Explorer <RiArrowRightLine className="ml-1 h-4 w-4" />
                                  </p>
                                </Link>
                              )
                            })}
                          </div>
                        </section>
                      ))}
                    </div>
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
                  <div className="border-b border-[#e6ebf3] pb-2">
                    <Link
                      href="/contact"
                      onClick={() => setMobileMenuOpen(false)}
                      className={`block text-sm font-semibold uppercase leading-tight tracking-[0.06em] transition-colors duration-200 ${
                        isPageMatch(pathname, '/contact') ? 'text-[#ef233c]' : 'text-[#2e436a] hover:text-[#ef233c]'
                      }`}
                    >
                      Contact
                    </Link>
                  </div>
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
                              className={`block text-sm font-semibold uppercase leading-tight tracking-[0.06em] transition-colors duration-200 ${
                                activeMobileSubmenuHref === normalizePath(link.href)
                                  ? 'text-[#ef233c]'
                                  : 'text-[#2e436a] hover:text-[#ef233c]'
                              }`}
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
              src={activeHeroSlide.image}
              alt={activeHeroTitle}
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
                {activeHeroSlide.label}
              </p>
              <h1 className="mt-4 text-[2.35rem] font-black uppercase leading-[0.95] text-white drop-shadow-[0_2px_0_rgba(0,0,0,0.25)] sm:mt-6 sm:text-5xl">
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

            <div className="toro-panel relative z-10 rounded-t-2xl border border-white/25 border-b-0 bg-[rgba(7,19,43,0.78)] p-3 backdrop-blur-md sm:p-5">
              <div className="grid grid-cols-3 gap-1.5 text-[10px] font-bold uppercase tracking-[0.08em] text-white sm:gap-2 sm:text-xs">
                <div className="border border-white/25 p-2 sm:p-3">Vertieres Cup 18 nov 2026</div>
                <div className="border border-white/25 p-2 sm:p-3">Flag Day 18 mai 2026</div>
                <div className="border border-white/25 p-2 sm:p-3">Academie en progression</div>
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
                    <h3 className="mt-3 text-[clamp(2.2rem,4.2vw,3.9rem)] font-black uppercase leading-[0.9] tracking-[-0.05em]">
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
                    <h3 className="mt-3 text-[clamp(2rem,3.8vw,3.2rem)] font-black uppercase leading-[0.92] tracking-[-0.05em] text-white">
                      Le projet Elite prend le relais.
                    </h3>

                    <div className="mt-5 space-y-4 text-[15px] leading-relaxed text-white/88">
                      <p>
                        FC TORO Elite relie l academie a un cadre plus exigeant pour accompagner les meilleurs profils
                        vers la competition et une progression plus structuree.
                      </p>
                      <p>
                        Le groupe avance avec un travail plus precis sur le tempo, la discipline collective et la maturite
                        tactique, afin de preparer la prochaine marche du parcours FC TORO.
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
                <h4 className="mt-2 text-[clamp(1.7rem,3vw,2.6rem)] font-black uppercase leading-[0.92] tracking-[-0.04em] text-[#0d2d62]">
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
                  className="overflow-hidden rounded-[24px] bg-[#0f2a4b] shadow-[0_18px_36px_rgba(10,29,58,0.14)]"
                >
                  <div className="relative h-[330px]">
                    <Image
                      src={card.image}
                      alt={card.alt}
                      fill
                      sizes="(min-width: 1024px) 30vw, 100vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,19,43,0.06)_30%,rgba(7,19,43,0.88)_100%)]" />
                    <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                      <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#ff8c9a]">
                        {card.eyebrow}
                      </p>
                      <h5 className="mt-2 text-2xl font-black uppercase leading-[0.95]">
                        {card.title}
                      </h5>
                      <p className="mt-2 text-sm leading-relaxed text-white/76">{card.description}</p>
                    </div>
                  </div>
                </article>
              ))}
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
                className="flex gap-2.5 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:snap-x sm:snap-mandatory"
              >
                {playerCards.map((player) => (
                  <article
                    data-player-card="true"
                    key={player.name}
                    className="group relative h-[266px] min-w-[43%] overflow-hidden rounded-[12px] bg-[#0f2a4b] sm:h-[316px] sm:min-w-[220px] sm:snap-start lg:h-[356px] lg:min-w-[252px]"
                  >
                    <Image
                      src={player.image}
                      alt={player.name}
                      fill
                      sizes="(min-width: 1536px) 16vw, (min-width: 1280px) 18vw, (min-width: 768px) 27vw, 58vw"
                      className="object-cover transition-transform duration-500 sm:group-hover:scale-[1.04]"
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
          </motion.div>
        </section>

        <section id="actualites" className="px-4 pb-11 sm:px-6 lg:px-8">
          <NewsBarcaGrid
            items={newsCards}
            eyebrow="Actualites du club"
            heading="ACTUALITES"
            ctaHref="/actualites"
            ctaLabel="Voir toute l actualite"
            limit={4}
          />
        </section>

        <VisionSection />

        <section id="sponsors" className="bg-white px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[1100px]">
            <h4 className="text-center text-xs font-black uppercase tracking-[0.12em] text-[#0a1d3a]">
              Partenaires officiels
            </h4>

            <div className="mt-6 sm:hidden">
              <div className="flex items-center justify-between gap-1">
                {sponsors.map((sponsor, index) => (
                  <motion.div
                    key={`sponsor-mobile-${sponsor.id}`}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.08 }}
                    viewport={{ once: true }}
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
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="mt-6 hidden grid-cols-3 gap-3 sm:grid md:grid-cols-4 lg:grid-cols-7">
              {sponsors.map((sponsor, index) => (
                <motion.div
                  key={sponsor.id}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="grid h-20 cursor-pointer place-items-center px-2 opacity-80 transition-all duration-300 hover:scale-110 hover:opacity-100"
                >
                  <div className="relative h-14 w-full max-w-[210px]">
                    <Image
                      src={sponsor.logo}
                      alt={sponsor.name}
                      fill
                      sizes="(min-width: 1280px) 13vw, (min-width: 768px) 20vw, 42vw"
                      className="object-contain object-center contrast-[1.1]"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

    </div>
  )
}
