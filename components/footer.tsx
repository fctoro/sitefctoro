import Image from 'next/image'
import Link from 'next/link'
import {
  RiFacebookFill,
  RiInstagramFill,
  RiTiktokFill,
  RiYoutubeFill,
} from '@remixicon/react'

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

const academyLinks = [
  { name: 'Formation', href: '/formation' },
  { name: 'Elite', href: '/elite' },
  { name: 'CASA', href: '/casa' },
  { name: 'Talents', href: '/talents' },
  { name: 'Scouting', href: '/scouting' },
]

const clubLinks = [
  { name: 'Le Club', href: '/le-club' },
  { name: 'Sponsors', href: '/sponsors' },
  { name: 'Actualites', href: '/actualites' },
  { name: 'Contact', href: '/contact' },
]

const legalLinks = [
  { name: 'Legal', href: '/legal' },
  { name: 'Privacy', href: '/privacy' },
  { name: 'Contact', href: '/contact' },
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

      <div className="relative z-10 mx-auto max-w-[1400px] px-6 py-10 lg:px-12">
        <div className="grid grid-cols-1 items-start gap-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <div className="flex flex-col items-center space-y-6 text-center lg:items-start lg:text-left">
            <Link href="/" className="group flex items-center gap-3">
              <Image
                src="/fc-toro-logo.png"
                alt="FC TORO"
                width={52}
                height={52}
                className="h-11 w-auto transition-transform group-hover:scale-105"
              />
              <div className="space-y-0">
                <p className="text-2xl font-extrabold uppercase italic leading-none tracking-tight">
                  FC TORO
                </p>
                <p className="text-[9px] font-black uppercase italic leading-none tracking-[0.3em] text-[#ef233c]">
                  Mache sou yo
                </p>
              </div>
            </Link>

            <p className="max-w-[280px] text-[15px] font-semibold leading-relaxed text-white/80">
              Depuis 2012, l excellence du football en Haiti. Plus qu un club,
              une academie de vie.
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
                    className="grid h-9 w-9 place-items-center rounded-lg border border-white/20 bg-white/10 transition-all hover:border-[#ef233c] hover:bg-[#ef233c]"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                )
              })}
            </div>
          </div>

          <div className="grid w-full grid-cols-2 items-start gap-4 lg:col-span-2 lg:gap-8">
            <div className="flex flex-col items-center space-y-6 text-center lg:items-start lg:text-left">
              <h3 className="rounded-full border border-[#ef233c]/30 bg-[#ef233c]/10 px-4 py-1.5 text-[11px] font-black uppercase tracking-[0.25em] text-[#ef233c]">
                Academie
              </h3>

              <ul className="space-y-4">
                {academyLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="group flex flex-col items-center text-[15px] font-bold uppercase tracking-wide text-white/80 transition-colors hover:text-white lg:items-start"
                    >
                      <span className="whitespace-nowrap">{link.name}</span>
                      <span className="h-0.5 w-0 bg-[#ef233c] transition-all group-hover:w-full" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col items-center space-y-6 text-center lg:items-start lg:text-left">
              <h3 className="rounded-full border border-[#ef233c]/30 bg-[#ef233c]/10 px-4 py-1.5 text-[11px] font-black uppercase tracking-[0.25em] text-[#ef233c]">
                Le Club
              </h3>

              <ul className="space-y-4">
                {clubLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="group flex flex-col items-center text-[15px] font-bold uppercase tracking-wide text-white/80 transition-colors hover:text-white lg:items-start"
                    >
                      <span className="whitespace-nowrap">{link.name}</span>
                      <span className="h-0.5 w-0 bg-[#ef233c] transition-all group-hover:w-full" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex flex-col items-center space-y-6 text-center lg:items-start lg:text-left">
            <h3 className="rounded-full border border-[#ef233c]/30 bg-[#ef233c]/10 px-4 py-1.5 text-[11px] font-black uppercase tracking-[0.25em] text-[#ef233c]">
              Philosophie
            </h3>

            <div className="w-full max-w-[280px] space-y-6 lg:max-w-none">
              <p className="text-[15px] font-semibold italic leading-relaxed text-white/80">
                "Le talent peut faire briller un joueur, mais ce sont les
                valeurs qui construisent un parcours durable."
              </p>

              <div className="grid grid-cols-2 gap-x-4 gap-y-6 border-t border-white/15 pt-4">
                <div className="flex flex-col items-center space-y-0.5 text-white lg:items-start">
                  <p className="text-[15px] font-black uppercase italic leading-none">
                    500<span className="text-[#ef233c]">+</span>
                  </p>
                  <p className="text-[8px] font-bold uppercase tracking-[0.1em] text-white/50">
                    Joueurs
                  </p>
                </div>

                <div className="flex flex-col items-center space-y-0.5 text-white lg:items-end">
                  <p className="text-[15px] font-black uppercase italic leading-none">
                    14<span className="text-[#ef233c]">+</span>
                  </p>
                  <p className="text-[8px] font-bold uppercase tracking-[0.1em] text-white/50">
                    Ans
                  </p>
                </div>

                <div className="col-span-2 flex flex-col items-center space-y-0.5 pt-2 text-white lg:items-start">
                  <p className="text-[15px] font-black uppercase italic leading-none tracking-tight">
                    Fondation 2012
                  </p>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#ef233c] opacity-80">
                    Petion-Ville, Haiti
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-6 border-t border-white/10 pt-6 lg:flex-row lg:gap-0">
          <p className="text-center text-[10px] font-bold uppercase tracking-[0.25em] text-white/50 lg:text-left">
            © 2026 FC TORO. Tous droits reserves.
          </p>

          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-[10px] font-black uppercase tracking-[0.2em] text-white/70 lg:gap-x-12">
            {legalLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="group relative transition-colors hover:text-white"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 h-[2px] w-0 rounded-full bg-[#ef233c] transition-all group-hover:w-full" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
