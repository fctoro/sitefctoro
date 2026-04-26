'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  RiArrowDownSLine,
  RiArrowRightLine,
  RiArrowRightSLine,
  RiCloseLine,
  RiMenuLine,
} from '@remixicon/react'
import { LiveButton } from '@/components/live-button'

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

type HomeNavbarProps = {
  anchorPrefix?: string
}

const linkDescriptionMap: Record<string, string> = {
  'Devenir joueur': "Dossier rapide et parcours d'intégration accompagné.",
  'Devenir fan': 'Supporters, bénévoles et activations jour de match.',
  'Rejoindre le club': "Vue d'ensemble des parcours pour rejoindre FC TORO.",
  'Histoire du club': 'Parcours, jalons majeurs et ADN FC TORO.',
  Sponsors: 'Partenaires et soutiens qui accompagnent FC TORO.',
  Élite: 'Le pont entre formation et excellence FC TORO.',
  CASA: 'Projet Caribbean Sports Academy.',
  'Ti Toro': "Initiation football 2 à 5 ans et première entrée dans le projet FC TORO.",
  Staff: 'Encadrement, direction sportive et accompagnement des groupes.',
  'Vision et valeurs': 'Discipline, identité et ambition long terme.',
  Installations: "Terrains, équipements et environnement d'entraînement.",
  'Actualités club': 'Les dernières informations officielles du club.',
  'Calendrier complet': 'Toutes les rencontres et événements à venir.',
  'Live Diffusion': "Diffusion live, flux de match et rappels avant coup d'envoi.",
  'Vertieres Cup': "Inscription équipe, logo officiel et liste des joueurs.",
  'Flag Day': 'Classement du tournoi, résultats récents et prochains matchs.',
  Intrasquad: 'Compétition interne pour évaluer et préparer nos athlètes.',
  International: 'Participation aux tournois majeurs sur la scène mondiale.',
  'Contact officiel': 'Accès direct aux canaux du club.',
  'Equipe Pro': 'Effectif principal et dynamique compétitive.',
  'Staff technique': 'Encadrement tactique et performance.',
  'Performance et suivi': 'Développement, data et progression joueur.',
  U13: 'Fondamentaux techniques et intelligence de jeu.',
  U15: 'Transition tactique, rythme et discipline collective.',
  U17: 'Progression compétitive et maîtrise des phases de jeu.',
  U19: 'Préparation haut niveau et responsabilisation.',
  U21: 'Passerelle vers le groupe pro et performance continue.',
}

const getLinkDescription = (label: string) =>
  linkDescriptionMap[label] ?? 'Découvrir le programme FC TORO.'

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
  isPageMatch(pathname, '/inscription')

export function HomeNavbar({ anchorPrefix = '' }: HomeNavbarProps) {
  const [activeDesktopMenu, setActiveDesktopMenu] = useState<string | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  const navItems: NavItem[] = [
    { label: 'Actualités', href: '/actualites' },
    {
      label: 'Club',
      submenu: {
        intro: 'Identité FC TORO, infrastructures, programmes et vie du club.',
        backdropImage: '/joueur/extracted/583167774_18542869372012336_2307311757000245016_n.jpg',
        sections: [
          {
            title: 'Le club',
            links: [
              { label: 'Histoire du club', href: '/le-club' },
              { label: 'Sponsors', href: '/sponsors' },
            ],
          },
          {
            title: 'Programmes',
            links: [
              { label: 'Élite', href: '/elite' },
              { label: 'CASA', href: '/casa' },
              { label: 'Ti Toro', href: '/ti-toro' },
            ],
          },
        ],
        spotlight: {
          image: '/joueur/extracted/591149277_18545355826012336_6701584250153829576_n.jpg',
          name: 'FC TORO Club',
          role: 'Histoire, Élite, CASA et Ti Toro',
          href: '/le-club',
        },
      },
    },
    {
      label: 'Équipe',
      href: '/equipes',
    },
    {
      label: 'Staff',
      href: '/staff',
    },
    {
      label: 'Événements',
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
              { label: 'Intrasquad', href: '/evenements/intrasquad' },
              { label: 'International', href: '/evenements/tournoi-international' },
            ],
          },
        ],
        spotlight: {
          image: '/joueur/extracted/583167774_18542869372012336_2307311757000245016_n.jpg',
          name: 'Flag Day',
          role: 'Classement, résultats et affiches',
          href: '/evenements/flag-day',
        },
      },
    },
    {
      label: 'Rejoindre',
      accent: true,
      submenu: {
        intro: "Parcours, recrutement et intégration au club.",
        backdropImage: '/joueur/extracted/560435029_18532793887012336_3999511270054224397_n.jpg',
        sections: [
          {
            title: 'Devenir',
            links: [
              { label: 'Devenir joueur', href: '/inscription/joueur' },
              { label: 'Devenir fan', href: '/inscription/fans' },
            ],
          },
          {
            title: 'Complément',
            links: [
              { label: 'Recrutement', href: '/recrutement' },
            ],
          },

        ],
        spotlight: {
          image: '/joueur/extracted/560435029_18532793887012336_3999511270054224397_n.jpg',
          name: 'Parcours FC TORO',
          role: 'Joueurs et fans',
          href: '/inscription',
        },
      },
    },
    { label: 'Contact', href: '/contact' },
  ]

  const mobilePrimaryLinks: Array<{ label: string; href: string; accent?: boolean }> = [
    { label: 'Actualités', href: '/actualites' },
    { label: 'Club', href: '/le-club' },
    { label: 'Équipe', href: '/equipes' },
    { label: 'Staff', href: '/staff' },
    { label: 'Flag Day', href: '/evenements/flag-day' },
  ]

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

  return (
    <>
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

          <div className="ml-auto lg:hidden">
            <LiveButton />
          </div>

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
                    onClick={() => {
                      if (item.label === 'Rejoindre') {
                        router.push('/inscription/fans')
                        return
                      }

                      setActiveDesktopMenu((prev) => (prev === item.label ? null : item.label))
                    }}
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
          <div className="flex h-full w-full">
            <div className="toro-tricolor-track" />
            <div className="toro-tricolor-track" />
          </div>
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
                          Accès principal
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
                                : section.links.length === 2 || section.links.length === 4
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
                        <p className="text-[11px] font-black uppercase tracking-[0.11em] text-[#ef233c]">
                          {section.title}
                        </p>

                        <div className="mt-1.5 space-y-1">
                          {section.links.map((link) => {
                            const linkColor = activeMobileSubmenuHref === normalizePath(link.href)
                              ? 'text-[#ef233c]'
                              : 'text-[#2e436a] hover:text-[#ef233c]'

                            return (
                              <Link
                                key={`mobile-full-${itemLabel}-${section.title}-${link.label}`}
                                href={link.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className={`block text-sm font-semibold uppercase leading-tight tracking-[0.06em] transition-all duration-200 active:scale-[0.97] active:opacity-70 ${linkColor}`}
                              >
                                {link.label}
                              </Link>
                            )
                          })}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
