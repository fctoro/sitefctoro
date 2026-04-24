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
            { label: 'Actualites', href: '/actualites' },
          ]}
          theme="light"
        />
        <section className="px-4 pb-11 pt-8 sm:px-6 sm:pt-10 lg:px-8 lg:pt-12">
          <NewsBarcaGrid
            items={cmsArticles}
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
