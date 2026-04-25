import { Breadcrumb } from '@/components/breadcrumb'
import { HomeNavbar } from '@/components/home-navbar'
import { NewsBarcaGrid } from '@/components/news-barca-grid'
import { getPublishedCmsArticles } from '@/lib/articles'

export const dynamic = 'force-dynamic'

export default async function ActualitesPage() {
  const cmsArticles = await getPublishedCmsArticles()

  return (
    <div className="toro-site-shell min-h-screen overflow-x-hidden bg-[#f2f2f4] text-[#0a1d3a]">
      <HomeNavbar anchorPrefix="/" />

      <main className="pt-[116px] lg:pt-[78px]">
        <Breadcrumb
          items={[
            { label: 'Accueil', href: '/' },
            { label: 'Actualités', href: '/actualites' },
          ]}
          theme="light"
          absolute={false}
        />
        <section className="px-4 pb-11 pt-4 sm:px-6 sm:pt-6 lg:px-8 lg:pt-8">
          <NewsBarcaGrid
            items={cmsArticles}
            eyebrow="Actualités du club"
            heading="ACTUALITÉS"
            ctaHref="/"
            ctaLabel="Retour à l’accueil"
          />
        </section>
      </main>
    </div>
  )
}
