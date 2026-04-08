import Image from 'next/image'
import Link from 'next/link'
import {
  RiFacebookFill,
  RiInstagramFill,
  RiTiktokFill,
  RiYoutubeFill,
} from '@remixicon/react'
import { PoweredByOcta } from './powered-by-octa'

const socialLinks = [
  {
    icon: RiInstagramFill,
    href: 'https://www.instagram.com/fctoro/',
    label: 'Instagram FC TORO',
  },
  {
    icon: RiFacebookFill,
    href: 'https://www.facebook.com/fctoro?locale=fr_FR',
    label: 'Facebook FC TORO',
  },
  {
    icon: RiTiktokFill,
    href: 'https://www.tiktok.com/@fctoroayiti',
    label: 'TikTok FC TORO',
  },
  {
    icon: RiYoutubeFill,
    href: 'https://www.youtube.com/@fctorohaiti2023',
    label: 'YouTube FC TORO',
  },
]

export default function Footer() {
  return (
    <footer
      id="footer"
      className="relative overflow-hidden border-t border-white/5 bg-[#0a1d3a] text-white"
    >
      <div className="pointer-events-none absolute bottom-0 left-0 translate-x-[15%] -translate-y-[5%] select-none opacity-[0.03]">
        <p className="whitespace-nowrap text-[25vw] font-black uppercase italic leading-none">
          TORO
        </p>
      </div>
      <div className="relative z-10 mx-auto max-w-[1400px] px-6 py-8 lg:px-12 text-white">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8">
          {/* Logo & Info Section (3 Columns) */}
          <div className="flex flex-col items-center space-y-4 text-center lg:col-span-3 lg:items-start lg:text-left">
            <Link href="/" className="group flex items-center gap-3">
              <Image
                src="/fc-toro-logo.png"
                alt="FC TORO"
                width={50}
                height={50}
                className="h-10 w-auto transition-transform duration-300 group-hover:scale-110"
              />
              <div className="space-y-0 text-left">
                <p className="text-xl font-black uppercase italic leading-none tracking-tight">
                  FC TORO
                </p>
                <p className="mt-1 text-[9px] font-black uppercase italic leading-none tracking-[0.3em] text-[#ef233c]">
                  Mache sou yo
                </p>
              </div>
            </Link>

            <p className="max-w-[280px] text-[14px] font-medium leading-relaxed text-white/70">
              Depuis 2012, l'excellence du football en Haïti. Une académie de vie dédiée à la formation.
            </p>

            <div className="flex gap-2">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.href}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="grid h-9 w-9 place-items-center rounded-xl border border-white/10 bg-white/5 transition-all hover:border-[#ef233c] hover:bg-[#ef233c] hover:shadow-[0_8px_16px_rgba(239,35,60,0.25)]"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Links Section (6 Columns) */}
          <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-2 lg:col-span-6 lg:grid-cols-4 lg:gap-4">
            {/* Column 1: Club */}
            <div className="flex flex-col items-center space-y-3.5 lg:items-start">
              <h3 className="rounded-full border border-[#ef233c]/30 bg-[#ef233c]/10 px-3.5 py-1 text-[9px] font-black uppercase tracking-[0.2em] text-[#ef233c]">
                Club
              </h3>
              <ul className="space-y-2.5 text-center lg:text-left">
                {[
                  { label: 'Le Club', href: '/le-club' },
                  { label: 'Sponsors', href: '/sponsors' },
                  { label: 'Staff', href: '/staff' },
                  { label: 'Recrutement', href: '/recrutement' },
                  { label: 'Actualités', href: '/actualites' },
                ].map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="group flex flex-col items-center text-[13px] font-bold uppercase tracking-wide text-white/60 transition-colors hover:text-white lg:items-start"
                    >
                      <span className="whitespace-nowrap">{link.label}</span>
                      <span className="h-px w-0 bg-[#ef233c] transition-all duration-300 group-hover:w-full" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 2: Football */}
            <div className="flex flex-col items-center space-y-3.5 lg:items-start">
              <h3 className="rounded-full border border-[#ef233c]/30 bg-[#ef233c]/10 px-3.5 py-1 text-[9px] font-black uppercase tracking-[0.2em] text-[#ef233c]">
                Football
              </h3>
              <ul className="space-y-2.5 text-center lg:text-left">
                {[
                  { label: 'Equipe Pro', href: '/equipes' },
                  { label: 'Formation', href: '/formation' },
                  { label: 'Elite', href: '/elite' },
                  { label: 'Ti Toro', href: '/ti-toro' },
                ].map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="group flex flex-col items-center text-[13px] font-bold uppercase tracking-wide text-white/60 transition-colors hover:text-white lg:items-start"
                    >
                      <span className="whitespace-nowrap">{link.label}</span>
                      <span className="h-px w-0 bg-[#ef233c] transition-all duration-300 group-hover:w-full" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Evenements */}
            <div className="flex flex-col items-center space-y-3.5 lg:items-start">
              <h3 className="rounded-full border border-[#ef233c]/30 bg-[#ef233c]/10 px-3.5 py-1 text-[9px] font-black uppercase tracking-[0.2em] text-[#ef233c]">
                Events
              </h3>
              <ul className="space-y-2.5 text-center lg:text-left">
                {[
                  { label: 'Live Diffusion', href: '/evenements/live' },
                  { label: 'Vertieres Cup', href: '/evenements/vertieres-cup' },
                  { label: 'Flag Day', href: '/evenements/flag-day' },
                  { label: 'International', href: '/evenements/tournoi-international' },
                ].map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="group flex flex-col items-center text-[13px] font-bold uppercase tracking-wide text-white/60 transition-colors hover:text-white lg:items-start"
                    >
                      <span className="whitespace-nowrap">{link.label}</span>
                      <span className="h-px w-0 bg-[#ef233c] transition-all duration-300 group-hover:w-full" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Rejoindre */}
            <div className="flex flex-col items-center space-y-3.5 lg:items-start">
              <h3 className="rounded-full border border-[#ef233c]/30 bg-[#ef233c]/10 px-3.5 py-1 text-[9px] font-black uppercase tracking-[0.2em] text-[#ef233c]">
                Inscrire
              </h3>
              <ul className="space-y-2.5 text-center lg:text-left">
                {[
                  { label: 'Devenir Joueur', href: '/inscription/joueur' },
                  { label: 'Devenir Fan', href: '/inscription/fans' },
                  { label: 'Rejoindre le club', href: '/inscription' },
                  { label: 'Contact', href: '/contact' },
                ].map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="group flex flex-col items-center text-[13px] font-bold uppercase tracking-wide text-white/60 transition-colors hover:text-white lg:items-start"
                    >
                      <span className="whitespace-nowrap">{link.label}</span>
                      <span className="h-px w-0 bg-[#ef233c] transition-all duration-300 group-hover:w-full" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Philosophie Section (3 Columns) */}
          <div className="flex flex-col items-center space-y-5 lg:col-span-3 lg:items-end">
            <div className="rounded-full border border-[#ef233c]/40 bg-[#ef233c]/15 px-5 py-1.5 text-[10px] font-black uppercase tracking-[0.3em] text-[#ef233c]">
              Philosophie
            </div>

            <div className="w-full space-y-4 text-center lg:text-right">
              <p className="mx-auto max-w-[280px] text-[14px] font-semibold italic leading-relaxed text-white/80 lg:mr-0">
                "Le talent peut faire briller un joueur, mais ce sont les valeurs qui construisent un parcours durable."
              </p>

              <div className="relative h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent lg:bg-gradient-to-l" />

              <div className="flex flex-col items-center gap-4 lg:items-end">
                <div className="flex w-full items-center justify-center gap-10 lg:justify-end">
                  <div className="flex flex-col items-center lg:items-end">
                    <p className="text-[22px] font-black italic leading-none text-white tracking-tighter">
                      500<span className="ml-0.5 text-[#ef233c]">+</span>
                    </p>
                    <p className="mt-1 text-[8px] font-black uppercase tracking-widest text-white/40">Joueurs</p>
                  </div>
                  <div className="flex flex-col items-center lg:items-end">
                    <p className="text-[22px] font-black italic leading-none text-white tracking-tighter">
                      14<span className="ml-0.5 text-[#ef233c]">+</span>
                    </p>
                    <p className="mt-1 text-[8px] font-black uppercase tracking-widest text-white/40">Ans</p>
                  </div>
                </div>

                <div className="flex flex-col items-center lg:items-end">
                  <p className="text-[14px] font-black uppercase italic leading-none tracking-wider text-[#ef233c]">
                    Fondation 2012
                  </p>
                  <p className="mt-1 text-[8px] font-extrabold uppercase tracking-[0.2em] text-white/30">
                    Pétion-Ville, Haïti
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-6 border-t border-white/10 pt-6 lg:flex-row lg:gap-0">
          <p className="text-center text-[10px] font-bold uppercase tracking-[0.25em] text-white/40 lg:text-left">
            © 2026 FC TORO. Tous droits réservés.
          </p>

          <div className="flex justify-end">
            <PoweredByOcta />
          </div>
        </div>
      </div>
    </footer>
  )
}
