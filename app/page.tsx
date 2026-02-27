'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { heroSlides, newsCards, playerCards } from '@/lib/joueur'
import { sponsors } from '@/lib/sponsors'
import { mockClubFixtures } from '@/data/club/standings-data'
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
  RiPlayCircleLine,
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

const recentMatches = [...mockClubFixtures]
  .filter((fixture) => fixture.status === 'FT')
  .sort((a, b) => new Date(b.kickoff).getTime() - new Date(a.kickoff).getTime())
  .slice(0, 3)

const nextMatch = [...mockClubFixtures]
  .filter((fixture) => fixture.status === 'A venir')
  .sort((a, b) => new Date(a.kickoff).getTime() - new Date(b.kickoff).getTime())[0]

const formatMatchDate = (kickoff: string) =>
  new Intl.DateTimeFormat('fr-FR', {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
  }).format(new Date(kickoff))

const formatMatchTime = (kickoff: string) =>
  new Intl.DateTimeFormat('fr-FR', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(kickoff))

const trophies = [
  { icon: RiTrophyLine, label: 'Ligue des Champions', value: '1' },
  { icon: RiShieldStarLine, label: 'Championnat', value: '11' },
  { icon: RiMedalLine, label: 'Coupes Nationales', value: '10' },
]

const mobilePrimaryLinks = [
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
  const playerRailRef = useRef<HTMLDivElement | null>(null)

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

        <section className="px-4 py-10 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-[1320px] gap-6 xl:grid-cols-[1.12fr_0.88fr]">
            <motion.article
              initial={{ opacity: 0, x: -28, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: 'easeOut' }}
              viewport={{ once: true, amount: 0.2 }}
              className="relative overflow-hidden rounded-[24px] border border-[#d6ddea] bg-[linear-gradient(125deg,#f7fbff_0%,#edf3fb_55%,#f6f8fc_100%)] p-5 shadow-[0_18px_34px_rgba(10,29,58,0.12)] sm:p-7"
            >
              <div className="absolute right-[-120px] top-[-120px] h-[280px] w-[280px] rounded-full bg-[radial-gradient(circle_at_center,rgba(239,35,60,0.24),rgba(239,35,60,0)_70%)]" />
              <div className="relative z-10 flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.12em] text-[#ef233c]">Nouveau bloc evenement</p>
                  <h2 className="mt-2 text-[2rem] font-black uppercase leading-[0.9] text-[#1f3f8f] sm:text-[3rem]">
                    Match
                    <br />& fan zone
                  </h2>
                </div>
                <Link href="/club/calendrier#evenements" className="inline-flex items-center rounded-full border border-[#cdd8eb] bg-white px-4 py-2 text-[11px] font-black uppercase tracking-[0.08em] text-[#0a1d3a] transition-colors hover:bg-[#f5f8ff] sm:text-xs">
                  Evenements <RiArrowRightLine className="ml-1 h-4 w-4" />
                </Link>
              </div>

              <div className="relative z-10 mt-5 grid gap-4 md:grid-cols-[minmax(220px,0.85fr)_1fr]">
                <div className="relative min-h-[370px] overflow-hidden rounded-2xl border border-[#d7e2f1] bg-[#0f2a4b]">
                  <Image
                    src={playerCards[0].image}
                    alt={`Joueur FC TORO - ${playerCards[0].name}`}
                    fill
                    sizes="(min-width: 768px) 32vw, 100vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,18,40,0)_20%,rgba(6,18,40,0.78)_100%)]" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-white/85">{playerCards[0].role}</p>
                    <p className="mt-1 text-2xl font-black uppercase leading-[0.95]">{playerCards[0].name}</p>
                  </div>
                </div>

                <div className="rounded-2xl border border-[#d7e2f1] bg-white/80 p-4 backdrop-blur-sm sm:p-5">
                  {nextMatch ? (
                    <>
                      <p className="text-xs font-black uppercase tracking-[0.08em] text-[#5d6f8f]">
                        {nextMatch.round} | {nextMatch.competition}
                      </p>
                      <p className="mt-2 text-2xl font-black uppercase leading-tight text-[#0a1d3a] sm:text-[2rem]">
                        {nextMatch.homeTeamName}
                        <span className="mx-2 text-[#ef233c]">VS</span>
                        {nextMatch.awayTeamName}
                      </p>
                      <p className="mt-3 text-sm font-bold uppercase tracking-[0.06em] text-[#1d3f87]">
                        {formatMatchDate(nextMatch.kickoff)} a {formatMatchTime(nextMatch.kickoff)}
                      </p>
                    </>
                  ) : (
                    <p className="text-sm font-semibold text-[#5d6f8f]">Aucun match a venir pour le moment.</p>
                  )}

                  <p className="mt-4 rounded-xl bg-[linear-gradient(95deg,rgba(239,35,60,0.12),rgba(26,78,163,0.1))] px-3 py-2 text-sm font-semibold text-[#0a1d3a]">
                    Animations tribune, photos supporters et stand boutique avant le coup d envoi.
                  </p>

                  <div className="mt-4 grid gap-2 sm:grid-cols-2">
                    <Link
                      href="/club/calendrier#evenements"
                      className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#ef233c] px-4 py-2.5 text-sm font-black uppercase text-white transition-colors hover:bg-[#d91933]"
                    >
                      <RiCalendarEventLine className="h-4 w-4" /> Evenements
                    </Link>
                    <Link
                      href="/club/calendrier"
                      className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#bfd0ea] bg-white px-4 py-2.5 text-sm font-black uppercase text-[#0a1d3a] transition-colors hover:bg-[#f4f8ff]"
                    >
                      Calendrier <RiArrowRightLine className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.article>

            <motion.article
              initial={{ opacity: 0, x: 28, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: 'easeOut', delay: 0.05 }}
              viewport={{ once: true, amount: 0.2 }}
              className="rounded-[24px] border border-[#d6ddea] bg-[#f7fbff] p-5 shadow-[0_18px_34px_rgba(10,29,58,0.1)] sm:p-6"
            >
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-2xl font-black uppercase leading-[0.95] text-[#1f3f8f] sm:text-3xl">
                  Focus
                  <br />joueurs
                </h3>
                <Link href="/club/calendrier#evenements" className="text-[11px] font-black uppercase tracking-[0.08em] text-[#0a1d3a] sm:text-xs">
                  Voir tout <RiArrowRightLine className="ml-1 inline h-4 w-4" />
                </Link>
              </div>

              <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {playerCards.slice(1, 5).map((player) => (
                  <article key={`event-card-${player.name}`} className="group relative min-h-[220px] overflow-hidden rounded-xl border border-[#d4deee] bg-[#102640]">
                    <Image
                      src={player.image}
                      alt={`Photo Instagram ${player.name}`}
                      fill
                      sizes="(min-width: 640px) 26vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,25,47,0.06)_18%,rgba(8,25,47,0.8)_100%)]" />
                    <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                      <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-white/85">{player.role}</p>
                      <p className="mt-1 text-xl font-black uppercase leading-[0.95]">{player.name}</p>
                    </div>
                  </article>
                ))}
              </div>
            </motion.article>
          </div>

          <div className="mx-auto mt-6 grid max-w-[1320px] gap-6 xl:grid-cols-[1fr_0.9fr]">
            <motion.article
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              viewport={{ once: true, amount: 0.2 }}
              className="rounded-2xl border border-[#d6ddea] bg-[#f7f9fd] p-5 shadow-[0_12px_26px_rgba(10,29,58,0.08)]"
            >
              <div className="mb-4 flex items-center justify-between gap-3">
                <h3 className="text-xl font-black uppercase text-[#0a1d3a] sm:text-2xl">3 derniers matchs</h3>
                <Link href="/classement" className="text-xs font-black uppercase tracking-[0.08em] text-[#0a1d3a]">
                  Voir classement <RiArrowRightLine className="ml-1 inline h-4 w-4" />
                </Link>
              </div>
              <div className="space-y-2.5">
                {recentMatches.map((fixture) => (
                  <div
                    key={fixture.id}
                    className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 rounded-xl border border-[#dde4f0] bg-white p-3 text-sm"
                  >
                    <p className="truncate font-semibold text-[#0a1d3a]">{fixture.homeTeamName}</p>
                    <p className="text-center text-base font-black text-[#0a1d3a]">
                      {fixture.homeScore} - {fixture.awayScore}
                    </p>
                    <p className="truncate text-right font-semibold text-[#0a1d3a]">{fixture.awayTeamName}</p>
                    <p className="col-span-3 text-xs font-medium text-[#5d6f8f]">
                      {fixture.round} | {formatMatchDate(fixture.kickoff)}
                    </p>
                  </div>
                ))}
              </div>
            </motion.article>

            <motion.article
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: 'easeOut', delay: 0.05 }}
              viewport={{ once: true, amount: 0.2 }}
              className="rounded-2xl border border-[#d6ddea] bg-[#f7f9fd] p-5 shadow-[0_12px_26px_rgba(10,29,58,0.08)]"
            >
              <h3 className="text-xl font-black uppercase text-[#0a1d3a] sm:text-2xl">Prochain match</h3>
              {nextMatch ? (
                <div className="mt-4 rounded-xl border border-[#dde4f0] bg-white p-4">
                  <p className="text-xs font-black uppercase tracking-[0.08em] text-[#5d6f8f]">
                    {nextMatch.round} | {nextMatch.competition}
                  </p>
                  <div className="mt-2 grid grid-cols-[1fr_auto_1fr] items-center gap-2">
                    <p className="truncate text-sm font-black uppercase text-[#0a1d3a]">
                      {nextMatch.homeTeamName}
                    </p>
                    <p className="text-sm font-black uppercase text-[#ef233c]">VS</p>
                    <p className="truncate text-right text-sm font-black uppercase text-[#0a1d3a]">
                      {nextMatch.awayTeamName}
                    </p>
                  </div>
                  <p className="mt-3 text-sm font-semibold text-[#1d3f87]">
                    {formatMatchDate(nextMatch.kickoff)} - {formatMatchTime(nextMatch.kickoff)}
                  </p>
                  <Link
                    href="/club/calendrier"
                    className="mt-4 inline-flex items-center rounded-lg bg-[#ef233c] px-4 py-2 text-xs font-black uppercase tracking-[0.08em] text-white transition-colors hover:bg-[#d91933]"
                  >
                    Voir le calendrier <RiArrowRightLine className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              ) : (
                <p className="mt-3 text-sm text-[#5d6f8f]">Aucun match a venir pour le moment.</p>
              )}
            </motion.article>
          </div>
        </section>

        <section id="joueurs" className="px-0 pb-10">
          <div className="w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              viewport={{ once: true, amount: 0.2 }}
              className="toro-players-shell"
            >
              <div className="mb-4 flex items-center justify-between gap-3 px-1.5 sm:px-2.5 lg:px-3">
                <h3 className="text-center text-2xl font-black uppercase tracking-tight text-[#0a1d3a] sm:text-3xl">Joueurs FC TORO</h3>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => slidePlayers('left')}
                    className="toro-player-nav-btn"
                    aria-label="Voir les joueurs precedents"
                  >
                    <RiArrowLeftSLine className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => slidePlayers('right')}
                    className="toro-player-nav-btn"
                    aria-label="Voir les joueurs suivants"
                  >
                    <RiArrowRightSLine className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div ref={playerRailRef} className="toro-player-rail">
                {playerCards.map((player, index) => (
                  <motion.article
                    key={player.name}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.38, ease: 'easeOut', delay: index * 0.05 }}
                    viewport={{ once: true, amount: 0.35 }}
                    className="toro-player-card"
                  >
                    <Image
                      src={player.image}
                      alt={player.name}
                      fill
                      sizes="(min-width: 1536px) 260px, (min-width: 1280px) 240px, (min-width: 1024px) 220px, 62vw"
                      className="object-cover"
                    />
                    <div className="toro-player-overlay" />
                    <div className="relative z-10 mt-auto p-3">
                      <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-white/90">{player.role}</p>
                      <p className="mt-1 text-[1.65rem] font-black uppercase leading-[0.95] text-white sm:text-[1.75rem]">{player.name}</p>
                      <p className="mt-1.5 inline-flex items-center text-xs font-black uppercase tracking-[0.08em] text-white">
                        Voir profil <RiArrowRightSLine className="ml-1 h-4 w-4" />
                      </p>
                    </div>
                  </motion.article>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <section id="actualites" className="px-4 pb-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[1320px]">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="toro-fusion-title text-3xl font-black uppercase text-[#0a1d3a] sm:text-4xl">Actualites</h3>
              <Link href="#" className="text-xs font-black uppercase tracking-[0.08em] text-[#0a1d3a]">
                Voir toutes les actus <RiArrowRightLine className="ml-1 inline h-4 w-4" />
              </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {newsCards.map((card, index) => (
                <motion.article
                  key={card.title}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, ease: 'easeOut', delay: index * 0.08 }}
                  viewport={{ once: true, amount: 0.2 }}
                  className={`${card.large ? 'sm:col-span-2 xl:col-span-2' : ''} toro-news-card toro-news-card-live`}
                >
                  <div className="relative h-[175px] overflow-hidden bg-[#0f2a4b] md:h-[205px]">
                    <Image src={card.image} alt={card.title} fill sizes="(min-width: 1280px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover opacity-90" />
                  </div>
                  <div className="bg-white px-4 py-4">
                    <p className="inline-flex bg-[#ef233c] px-3 py-1 text-xs font-black uppercase tracking-[0.08em] text-white">{card.category}</p>
                    <h4 className="mt-3 text-xl font-black uppercase leading-tight text-[#0a1d3a] sm:text-2xl">{card.title}</h4>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section id="club" className="relative overflow-hidden bg-[#17395f] px-4 py-14 sm:px-6 lg:px-8">
          <div className="absolute left-[-120px] top-[-100px] h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle_at_center,rgba(7,150,211,0.65),rgba(7,150,211,0)_70%)]" />

          <div className="relative mx-auto grid max-w-[1100px] gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <h3 className="toro-fusion-title text-3xl font-black uppercase text-white sm:text-4xl">Histoire du club</h3>
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
              <h3 className="toro-fusion-title text-3xl font-black uppercase text-white sm:text-4xl">Palmares</h3>
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

      <footer id="footer" className="bg-white">
        <section className="px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[1100px]">
            <h4 className="text-center text-xs font-black uppercase tracking-[0.12em] text-[#0a1d3a]">Partenaires officiels</h4>
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7">
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
