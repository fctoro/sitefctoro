import { newsCards, type NewsCard } from '@/lib/joueur'
import { HomeNavbar } from '@/components/home-navbar'
import { NewsBarcaGrid } from '@/components/news-barca-grid'
import { supabase } from '@/lib/supabase'
import { resolveCmsImage } from '@/lib/utils'

export default async function ActualitesPage() {
  // Récupérer les articles depuis le CMS
  const { data: cmsArticles } = await supabase
    .from('articles')
    .select('*')
    .eq('status', 'published')
    .order('published_at', { ascending: false })

  // Formatter les articles CMS pour correspondre au type NewsCard
  const formattedCmsArticles: NewsCard[] = cmsArticles?.map(a => ({
    title: a.title_fr,
    slug: a.slug,
    excerpt: a.excerpt_fr || '',
    image: resolveCmsImage(a.cover_image),
    category: a.category,
    dateLabel: a.published_at ? new Date(a.published_at).toLocaleDateString('fr-FR') : '',
    intro: a.excerpt_fr || '',
    content: [a.content_fr || ''],
    keyPoints: []
  })) || []

  // Fusionner avec les données statiques (CMS en premier)
  const allArticles = [...formattedCmsArticles, ...newsCards]

  return (
    <div className="toro-site-shell min-h-screen overflow-x-hidden bg-[#f2f2f4] text-[#0a1d3a]">
      <HomeNavbar anchorPrefix="/" />

      <main className="pt-[116px] lg:pt-[78px]">
        <section className="px-4 pb-11 pt-8 sm:px-6 sm:pt-10 lg:px-8 lg:pt-12">
          <NewsBarcaGrid
            items={allArticles}
            eyebrow="Actualités du club"
            heading="ACTUALITÉS"
            ctaHref="/"
            ctaLabel="Retour accueil"
          />
        </section>
      </main>
    </div>
  )
}
