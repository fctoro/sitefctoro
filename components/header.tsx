'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronDown, Menu, X } from 'lucide-react'

type DropdownKey = 'equipes' | 'rejoindre' | null

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

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<DropdownKey>(null)
  const [mobileSection, setMobileSection] = useState<DropdownKey>(null)
  const headerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const onPointerDown = (event: MouseEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) {
        setOpenDropdown(null)
      }
    }

    document.addEventListener('mousedown', onPointerDown)
    return () => document.removeEventListener('mousedown', onPointerDown)
  }, [])

  const toggleDropdown = (key: Exclude<DropdownKey, null>) => {
    setOpenDropdown((current) => (current === key ? null : key))
  }

  return (
    <header ref={headerRef} className="sticky top-0 z-50 border-b border-zinc-200 bg-[#f2f2f2]">
      <div className="mx-auto flex h-[82px] max-w-[1320px] items-center gap-3 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex shrink-0 items-center gap-3" onClick={() => setOpenDropdown(null)}>
          <Image
            src="/fc-toro-logo.png"
            alt="FC TORO logo"
            width={56}
            height={56}
            className="h-[54px] w-auto object-contain"
            priority
          />
          <div className="hidden min-[420px]:block">
            <p className="text-[1.16rem] font-extrabold tracking-tight text-zinc-900">FC TORO</p>
            <p className="text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-zinc-500">Club officiel haiti</p>
          </div>
        </Link>

        <Link
          href="/evenements/live"
          className="ml-auto inline-flex items-center gap-2 rounded-full bg-[#ef233c] px-3 py-2 text-[10px] font-black uppercase tracking-[0.16em] text-white shadow-[0_10px_18px_rgba(239,35,60,0.28)] transition-all hover:bg-[#d71931] lg:hidden"
          onClick={() => setOpenDropdown(null)}
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/80" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-white" />
          </span>
          Live
        </Link>

        <nav className="ml-5 hidden items-center gap-8 lg:flex">
          <Link
            href="/"
            className="text-[1.02rem] font-semibold text-zinc-900 transition-colors hover:text-primary"
            onClick={() => setOpenDropdown(null)}
          >
            Accueil
          </Link>
          <Link
            href="/club/about"
            className="text-[1.02rem] font-semibold text-zinc-900 transition-colors hover:text-primary"
            onClick={() => setOpenDropdown(null)}
          >
            Le Club
          </Link>

          <button
            type="button"
            className="inline-flex items-center gap-1 text-[1.02rem] font-semibold text-zinc-900 transition-colors hover:text-primary"
            onClick={() => toggleDropdown('equipes')}
            aria-expanded={openDropdown === 'equipes'}
            aria-controls="equipes-dropdown"
          >
            Equipes
            <ChevronDown className={`h-4 w-4 transition-transform ${openDropdown === 'equipes' ? 'rotate-180' : ''}`} />
          </button>

          <Link
            href="/evenements/live"
            className="text-[1.02rem] font-semibold text-zinc-900 transition-colors hover:text-primary"
            onClick={() => setOpenDropdown(null)}
          >
            Matchs
          </Link>
          <Link
            href="/club/actualites"
            className="text-[1.02rem] font-semibold text-zinc-900 transition-colors hover:text-primary"
            onClick={() => setOpenDropdown(null)}
          >
            Actualites
          </Link>

          <button
            type="button"
            className="inline-flex items-center gap-1 text-[1.02rem] font-semibold text-zinc-900 transition-colors hover:text-primary"
            onClick={() => toggleDropdown('rejoindre')}
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
          className="grid h-9 w-9 place-items-center rounded-lg border border-zinc-300 text-zinc-700 transition-colors hover:bg-zinc-200 lg:hidden"
          aria-label="Ouvrir le menu"
        >
          {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>

      {openDropdown === 'equipes' ? (
        <div id="equipes-dropdown" className="hidden border-t border-zinc-200 bg-white shadow-[0_14px_30px_rgba(0,0,0,0.08)] lg:block">
          <div className="mx-auto grid max-w-[1320px] gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[1fr_320px] lg:px-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.17em] text-zinc-500">Categories equipes</p>
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                {teamCategories.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm font-semibold text-zinc-900 transition-colors hover:border-primary/40 hover:bg-primary/5 hover:text-primary"
                    onClick={() => setOpenDropdown(null)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            <aside className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.17em] text-zinc-500">Parcours joueur</p>
              <p className="mt-3 text-lg font-semibold text-zinc-900">Formation continue de U7 a U21</p>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600">
                Chaque categorie suit un programme adapte: technique, intelligence de jeu, mental et performance.
              </p>
            </aside>
          </div>
        </div>
      ) : null}

      {openDropdown === 'rejoindre' ? (
        <div id="rejoindre-dropdown" className="hidden border-t border-zinc-200 bg-white shadow-[0_14px_30px_rgba(0,0,0,0.08)] lg:block">
          <div className="mx-auto grid max-w-[1320px] gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[1fr_340px] lg:px-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.17em] text-zinc-500">Recrutement et adhesion</p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {joinOptions.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm font-semibold text-zinc-900 transition-colors hover:border-primary/40 hover:bg-primary/5 hover:text-primary"
                    onClick={() => setOpenDropdown(null)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            <aside className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.17em] text-zinc-500">Dossier joueur</p>
              <p className="mt-3 text-lg font-semibold text-zinc-900">Informations a fournir pour postuler</p>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600">
                Nom complet, date de naissance, poste, video recente et contact d un responsable legal pour validation.
              </p>
            </aside>
          </div>
        </div>
      ) : null}

      {mobileMenuOpen ? (
        <div className="border-t border-zinc-200 bg-[#f2f2f2] px-4 py-4 lg:hidden">
          <nav className="mx-auto max-w-[1320px] space-y-1">
            <Link
              href="/"
              className="block rounded-xl px-3 py-2.5 text-sm font-semibold text-zinc-900 hover:bg-zinc-200"
              onClick={() => setMobileMenuOpen(false)}
            >
              Accueil
            </Link>
            <Link
              href="/club/about"
              className="block rounded-xl px-3 py-2.5 text-sm font-semibold text-zinc-900 hover:bg-zinc-200"
              onClick={() => setMobileMenuOpen(false)}
            >
              Le Club
            </Link>

            <button
              type="button"
              onClick={() => setMobileSection((value) => (value === 'equipes' ? null : 'equipes'))}
              className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm font-semibold text-zinc-900 hover:bg-zinc-200"
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
                    className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-xs font-semibold text-zinc-700"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            ) : null}

            <Link
              href="/evenements/live"
              className="block rounded-xl px-3 py-2.5 text-sm font-semibold text-zinc-900 hover:bg-zinc-200"
              onClick={() => setMobileMenuOpen(false)}
            >
              Matchs
            </Link>
            <Link
              href="/club/actualites"
              className="block rounded-xl px-3 py-2.5 text-sm font-semibold text-zinc-900 hover:bg-zinc-200"
              onClick={() => setMobileMenuOpen(false)}
            >
              Actualites
            </Link>

            <button
              type="button"
              onClick={() => setMobileSection((value) => (value === 'rejoindre' ? null : 'rejoindre'))}
              className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm font-semibold text-zinc-900 hover:bg-zinc-200"
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
                    className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-xs font-semibold text-zinc-700"
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
    </header>
  )
}
