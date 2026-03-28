'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import {
  RiArrowDownSLine,
  RiArrowRightLine,
  RiArrowRightSLine,
  RiCloseLine,
  RiMenuLine,
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

type HomeNavbarProps = {
  anchorPrefix?: string
}

const linkDescriptionMap: Record<string, string> = {
  'Inscription joueur': 'Dossier rapide et parcours d integration accompagne.',
  'Voir les stages': 'Calendrier des camps intensifs et pre-inscription.',
  'Rejoindre le club': 'Tests de detection, suivi et integration continue.',
  'Devenir partenaire': 'Associez votre marque a un projet sportif fort.',
  'Benevolat matchday': 'Contribuez aux jours de match et activations club.',
  'Contacter recrutement': 'Parlez directement avec l equipe recrutement.',
  'Histoire du club': 'Parcours, jalons majeurs et ADN FC TORO.',
  Sponsors: 'Partenaires et soutiens qui accompagnent FC TORO.',
  Elite: 'Le pont entre formation et excellence FC TORO.',
  CASA: 'Projet Caribbean Sports Academy.',
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

export function HomeNavbar({ anchorPrefix = '' }: HomeNavbarProps) {
  const [activeDesktopMenu, setActiveDesktopMenu] = useState<string | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

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
              { label: 'Devenir partenaire', href: '/sponsors' },
              { label: 'Benevolat matchday', href: '/inscription#benevolat' },
              { label: 'Contacter recrutement', href: '/contact' },
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
    { label: 'Contact', href: '/contact' },
  ]

  const mobilePrimaryLinks: Array<{ label: string; href: string; accent?: boolean }> = [
    { label: 'Actualites', href: '/actualites' },
    { label: 'Club', href: `${anchorPrefix}#club` },
    { label: 'Equipe', href: '/equipes' },
    { label: 'Projet', href: '/elite' },
    { label: 'Evenements', href: '/club/calendrier#evenements' },
  ]

  const activeDesktopItem = navItems.find(
    (item) => item.label === activeDesktopMenu && item.submenu,
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
                            : activeDesktopItem.label === 'Projet'
                              ? 'Projets club'
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
                          <div
                            className={`mt-3 grid gap-4 ${
                              activeDesktopItem.submenu.sections[0].links.length === 2
                                ? 'grid-cols-2'
                                : 'grid-cols-3'
                            }`}
                          >
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

                      {activeDesktopItem.submenu.sections[1] ? (
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
                      ) : null}
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
                            {activeDesktopItem.label === 'Projet' ? 'Projet FC TORO' : 'Parcours joueur'}
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
                            {activeDesktopItem.label === 'Projet' ? 'Projet a la une' : 'Joueur en lumiere'}
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
                  <div className="border-b border-[#e6ebf3] pb-2">
                    <Link
                      href="/contact"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-sm font-semibold uppercase leading-tight tracking-[0.06em] text-[#2e436a] transition-colors duration-200 hover:text-[#ef233c]"
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
    </>
  )
}
