import Image from 'next/image'
import Link from 'next/link'
import { newsCards } from '@/lib/joueur'
import { NewsBarcaGrid } from '@/components/news-barca-grid'

const navLinks = [
  { label: 'Actualites', href: '/actualites' },
  { label: 'Club', href: '/#club' },
  { label: 'Equipe', href: '/#joueurs' },
  { label: 'Calendrier', href: '/club/calendrier' },
  { label: 'Evenements', href: '/club/calendrier#evenements' },
  { label: 'Contact', href: '/#footer' },
]

export default function ActualitesPage() {
  return (
    <div className="min-h-screen bg-[#f2f2f4] text-[#0a1d3a]">
      <header className="fixed inset-x-0 top-0 z-[200] bg-white/92 shadow-[0_6px_20px_rgba(10,29,58,0.06)] backdrop-blur">
        <div className="mx-auto flex max-w-[1100px] items-center gap-6 px-4 py-3.5 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/fc-toro-logo.png" alt="FC TORO" width={50} height={50} className="h-10 w-auto" priority />
            <div>
              <p className="text-lg font-black uppercase tracking-tight text-[#0a1d3a]">FC TORO</p>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#ef233c]">Mache sou yo</p>
            </div>
          </Link>

          <nav className="ml-auto hidden items-center gap-2 lg:flex">
            {navLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`px-2 py-2 text-sm font-black uppercase tracking-[0.06em] transition-colors ${
                  item.label === 'Actualites'
                    ? 'text-[#ef233c]'
                    : 'text-[#0a1d3a] hover:text-[#ef233c]'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <main className="pt-[92px]">
        <section className="px-4 pb-11 sm:px-6 lg:px-8">
          <NewsBarcaGrid
            items={newsCards}
            eyebrow="Actualites du club"
            heading="ACTUALITES"
            ctaHref="/"
            ctaLabel="Retour accueil"
          />
        </section>
      </main>
    </div>
  )
}
