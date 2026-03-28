import { newsCards } from '@/lib/joueur'
import { HomeNavbar } from '@/components/home-navbar'
import { NewsBarcaGrid } from '@/components/news-barca-grid'

export default function ActualitesPage() {
  return (
    <div className="toro-site-shell min-h-screen overflow-x-hidden bg-[#f2f2f4] text-[#0a1d3a]">
      <HomeNavbar anchorPrefix="/" />

      <main className="pt-[116px] lg:pt-[78px]">
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
