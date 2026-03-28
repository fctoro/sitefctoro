'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronDown, Menu, X } from 'lucide-react'

type DropdownKey = 'equipes' | 'evenements' | 'rejoindre' | null

const teamCategories = [
  { label: 'U7', href: '/academie/u7' },
  { label: 'U9', href: '/academie/u9' },
  { label: 'U11', href: '/academie/u11' },
  { label: 'U13', href: '/academie/u13' },
  { label: 'U15', href: '/academie/u15' },
  { label: 'U17', href: '/academie/u17' },
  { label: 'U19', href: '/academie/u19' },
  { label: 'U21', href: '/academie/u21' },
]

const joinOptions = [
  { label: 'Rejoindre le club', href: '/inscription' },
  { label: 'Devenir joueur', href: '/inscription/joueur' },
  { label: 'Devenir fan', href: '/inscription/fans' },
  { label: 'Devenir partenaire', href: '/inscription/partenaires' },
]

const eventOptions = [
  { label: 'Hub evenements', href: '/evenements' },
  { label: 'Live Diffusion', href: '/evenements/live' },
  { label: 'Vertieres Cup', href: '/evenements/vertieres-cup' },
  { label: 'Flag Day', href: '/evenements/flag-day' },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mobileSection, setMobileSection] = useState<DropdownKey>(null)
  const [openDropdown, setOpenDropdown] = useState<DropdownKey>(null)
  const closeTimerRef = useRef<number | null>(null)

  const clearCloseTimer = () => {
    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current)
      closeTimerRef.current = null
    }
  }

  const openMenu = (key: Exclude<DropdownKey, null>) => {
    clearCloseTimer()
    setOpenDropdown(key)
  }

  const closeMenuSoon = () => {
    clearCloseTimer()
    closeTimerRef.current = window.setTimeout(() => setOpenDropdown(null), 120)
  }

  const closeMenuNow = () => {
    clearCloseTimer()
    setOpenDropdown(null)
  }

  useEffect(() => {
    return () => clearCloseTimer()
  }, [])

  return (
    <header className="sticky top-0 z-50 border-b border-primary/45 bg-[linear-gradient(104deg,rgba(6,16,44,0.95),rgba(22,53,124,0.9),rgba(239,35,60,0.78),rgba(226,232,240,0.22))] backdrop-blur">
      <div className="relative mx-auto max-w-[1340px] px-3 sm:px-5 lg:px-6">
        <div className="pointer-events-none absolute left-0 right-0 top-0 h-[3px] bg-gradient-to-r from-secondary via-primary to-secondary" />
        <div className="relative flex h-[74px] items-center gap-3">
          <Link href="/" className="flex shrink-0 items-center gap-2.5 lg:ml-2" onMouseEnter={closeMenuNow}>
            <Image
              src="/fc-toro-logo.png"
              alt="FC TORO logo"
              width={46}
              height={46}
              className="h-[46px] w-auto object-contain"
              priority
            />
            <div className="leading-tight">
              <p className="text-[1.06rem] font-bold tracking-tight text-white">FC TORO</p>
              <p className="text-[0.64rem] font-semibold tracking-[0.14em] text-slate-100">Mache sou yo</p>
            </div>
          </Link>

          <Link
            href="/evenements/live"
            className="ml-auto inline-flex items-center gap-2 rounded-full bg-[#ef233c] px-3 py-2 text-[10px] font-black uppercase tracking-[0.16em] text-white shadow-[0_10px_18px_rgba(239,35,60,0.28)] transition-all hover:bg-[#d71931] lg:hidden"
            onMouseEnter={closeMenuNow}
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/80" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-white" />
            </span>
            Live
          </Link>

          <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-6 lg:left-[54%] lg:ml-[80px] lg:flex xl:left-1/2 xl:gap-8">
            <Link
              href="/"
              className="whitespace-nowrap text-[0.95rem] font-semibold text-white transition-colors hover:text-primary"
              onMouseEnter={closeMenuNow}
            >
              Accueil
            </Link>
            <Link
              href="/club/about"
              className="whitespace-nowrap text-[0.95rem] font-semibold text-white transition-colors hover:text-primary"
              onMouseEnter={closeMenuNow}
            >
              Le Club
            </Link>

            <button
              type="button"
              className="inline-flex whitespace-nowrap items-center gap-1 text-[0.95rem] font-semibold text-white transition-colors hover:text-primary"
              onMouseEnter={() => openMenu('equipes')}
              aria-expanded={openDropdown === 'equipes'}
              aria-controls="equipes-dropdown"
            >
              Equipes
              <ChevronDown className={`h-4 w-4 transition-transform ${openDropdown === 'equipes' ? 'rotate-180' : ''}`} />
            </button>

            <Link
              href="/evenements/live"
              className="whitespace-nowrap text-[0.95rem] font-semibold text-white transition-colors hover:text-primary"
              onMouseEnter={closeMenuNow}
            >
              Matchs
            </Link>
            <button
              type="button"
              className="inline-flex whitespace-nowrap items-center gap-1 text-[0.95rem] font-semibold text-white transition-colors hover:text-primary"
              onMouseEnter={() => openMenu('evenements')}
              aria-expanded={openDropdown === 'evenements'}
              aria-controls="evenements-dropdown"
            >
              Evenements
              <ChevronDown className={`h-4 w-4 transition-transform ${openDropdown === 'evenements' ? 'rotate-180' : ''}`} />
            </button>
            <Link
              href="/classement"
              className="whitespace-nowrap text-[0.95rem] font-semibold text-white transition-colors hover:text-primary"
              onMouseEnter={closeMenuNow}
            >
              Classement
            </Link>

            <button
              type="button"
              className="inline-flex whitespace-nowrap items-center gap-1 text-[0.95rem] font-semibold text-white transition-colors hover:text-primary"
              onMouseEnter={() => openMenu('rejoindre')}
              aria-expanded={openDropdown === 'rejoindre'}
              aria-controls="rejoindre-dropdown"
            >
              Rejoindre
              <ChevronDown className={`h-4 w-4 transition-transform ${openDropdown === 'rejoindre' ? 'rotate-180' : ''}`} />
            </button>
          </nav>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((value) => !value)}
            className="grid h-9 w-9 place-items-center rounded-lg border border-white/40 text-white transition-colors hover:bg-white/15 lg:hidden"
            aria-label="Ouvrir le menu"
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>

        {openDropdown ? (
          <div className="pointer-events-none absolute left-0 right-0 top-full hidden lg:block">
            <div
              className="pointer-events-auto border-t border-secondary/20 bg-white shadow-[0_16px_34px_rgba(0,77,152,0.16)]"
              onMouseEnter={clearCloseTimer}
              onMouseLeave={closeMenuSoon}
            >
              {openDropdown === 'equipes' ? (
                <div id="equipes-dropdown" className="mx-auto grid max-w-[1220px] gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[1fr_300px] lg:px-8">
                  <div>
                    <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-zinc-500">Categories equipes</p>
                    <div className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-3 md:grid-cols-4">
                      {teamCategories.map((item) => (
                        <Link
                          key={item.label}
                          href={item.href}
                          className="rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-2.5 text-sm font-semibold text-zinc-900 transition-colors hover:border-primary/40 hover:bg-primary/5 hover:text-primary"
                          onClick={closeMenuNow}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>

                  <aside className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
                    <div className="flex items-center gap-3">
                      <Image src="/fc-toro-logo.png" alt="FC TORO" width={38} height={38} className="h-[38px] w-auto object-contain" />
                      <p className="text-sm font-bold tracking-tight text-zinc-900">FC TORO</p>
                    </div>
                    <p className="mt-3 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-zinc-500">Parcours joueur</p>
                    <p className="mt-2 text-xl font-semibold leading-tight text-zinc-900">Formation continue de U7 a U21</p>
                    <p className="mt-2 text-sm leading-relaxed text-zinc-600">
                      Programme adapte: technique, intelligence de jeu, mental et performance.
                    </p>
                  </aside>
                </div>
              ) : openDropdown === 'evenements' ? (
                <div id="evenements-dropdown" className="mx-auto grid max-w-[1220px] gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[1fr_320px] lg:px-8">
                  <div>
                    <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-zinc-500">Live et tournois</p>
                    <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
                      {eventOptions.map((item) => (
                        <Link
                          key={item.label}
                          href={item.href}
                          className="rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-2.5 text-sm font-semibold text-zinc-900 transition-colors hover:border-primary/40 hover:bg-primary/5 hover:text-primary"
                          onClick={closeMenuNow}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>

                  <aside className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
                    <div className="flex items-center gap-3">
                      <Image src="/fc-toro-logo.png" alt="FC TORO" width={38} height={38} className="h-[38px] w-auto object-contain" />
                      <p className="text-sm font-bold tracking-tight text-zinc-900">FC TORO</p>
                    </div>
                    <p className="mt-3 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-zinc-500">Section evenement</p>
                    <p className="mt-2 text-xl font-semibold leading-tight text-zinc-900">Live, Vertieres Cup et Flag Day</p>
                    <p className="mt-2 text-sm leading-relaxed text-zinc-600">
                      Retrouvez les diffusions, l inscription des equipes et le classement des tournois.
                    </p>
                  </aside>
                </div>
              ) : (
                <div id="rejoindre-dropdown" className="mx-auto grid max-w-[1220px] gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[1fr_320px] lg:px-8">
                  <div>
                    <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-zinc-500">Recrutement et adhesion</p>
                    <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
                      {joinOptions.map((item) => (
                        <Link
                          key={item.label}
                          href={item.href}
                          className="rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-2.5 text-sm font-semibold text-zinc-900 transition-colors hover:border-primary/40 hover:bg-primary/5 hover:text-primary"
                          onClick={closeMenuNow}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>

                  <aside className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
                    <div className="flex items-center gap-3">
                      <Image src="/fc-toro-logo.png" alt="FC TORO" width={38} height={38} className="h-[38px] w-auto object-contain" />
                      <p className="text-sm font-bold tracking-tight text-zinc-900">FC TORO</p>
                    </div>
                    <p className="mt-3 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-zinc-500">Dossier joueur</p>
                    <p className="mt-2 text-xl font-semibold leading-tight text-zinc-900">Candidature joueur</p>
                    <p className="mt-2 text-sm leading-relaxed text-zinc-600">
                      Nom, date de naissance, poste, video recente et contact d un responsable legal.
                    </p>
                  </aside>
                </div>
              )}
            </div>
          </div>
        ) : null}

        {mobileMenuOpen ? (
          <div className="border-t border-primary/35 bg-[linear-gradient(165deg,rgba(8,18,46,0.95),rgba(16,72,170,0.85),rgba(239,35,60,0.74))] px-1 pb-4 pt-3 lg:hidden">
            <nav className="space-y-1">
              <Link
                href="/"
                className="block rounded-xl px-3 py-2.5 text-sm font-semibold text-white hover:bg-white/15"
                onClick={() => setMobileMenuOpen(false)}
              >
                Accueil
              </Link>
              <Link
                href="/club/about"
                className="block rounded-xl px-3 py-2.5 text-sm font-semibold text-white hover:bg-white/15"
                onClick={() => setMobileMenuOpen(false)}
              >
                Le Club
              </Link>

              <button
                type="button"
                onClick={() => setMobileSection((value) => (value === 'equipes' ? null : 'equipes'))}
                className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm font-semibold text-white hover:bg-white/15"
              >
                Equipes
                <ChevronDown className={`h-4 w-4 transition-transform ${mobileSection === 'equipes' ? 'rotate-180' : ''}`} />
              </button>
              {mobileSection === 'equipes' ? (
                <div className="ml-3 grid grid-cols-2 gap-2 pb-2 pt-1">
                  {teamCategories.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="rounded-lg border border-white/35 bg-white/15 px-3 py-2 text-xs font-semibold text-white"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              ) : null}

              <Link
                href="/evenements/live"
                className="block rounded-xl px-3 py-2.5 text-sm font-semibold text-white hover:bg-white/15"
                onClick={() => setMobileMenuOpen(false)}
              >
                Matchs
              </Link>
              <button
                type="button"
                onClick={() => setMobileSection((value) => (value === 'evenements' ? null : 'evenements'))}
                className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm font-semibold text-white hover:bg-white/15"
              >
                Evenements
                <ChevronDown className={`h-4 w-4 transition-transform ${mobileSection === 'evenements' ? 'rotate-180' : ''}`} />
              </button>
              {mobileSection === 'evenements' ? (
                <div className="ml-3 grid gap-2 pb-2 pt-1">
                  {eventOptions.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="rounded-lg border border-white/35 bg-white/15 px-3 py-2 text-xs font-semibold text-white"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              ) : null}
              <Link
                href="/classement"
                className="block rounded-xl px-3 py-2.5 text-sm font-semibold text-white hover:bg-white/15"
                onClick={() => setMobileMenuOpen(false)}
              >
                Classement
              </Link>

              <button
                type="button"
                onClick={() => setMobileSection((value) => (value === 'rejoindre' ? null : 'rejoindre'))}
                className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm font-semibold text-white hover:bg-white/15"
              >
                Rejoindre
                <ChevronDown className={`h-4 w-4 transition-transform ${mobileSection === 'rejoindre' ? 'rotate-180' : ''}`} />
              </button>
              {mobileSection === 'rejoindre' ? (
                <div className="ml-3 grid gap-2 pb-2 pt-1">
                  {joinOptions.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="rounded-lg border border-white/35 bg-white/15 px-3 py-2 text-xs font-semibold text-white"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              ) : null}
            </nav>
          </div>
        ) : null}
      </div>
    </header>
  )
}
