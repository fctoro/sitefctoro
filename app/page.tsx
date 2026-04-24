import { HomePageContent } from '@/components/home-page-content'
import { getPublishedCmsArticles } from '@/lib/articles'
import { getHomePlayers } from '@/lib/players'
import { getActiveHeroSlides } from '@/lib/slides'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const [players, cmsArticles, slides] = await Promise.all([
    getHomePlayers(),
    getPublishedCmsArticles(),
    getActiveHeroSlides(),
  ])

  return <HomePageContent initialPlayers={players} initialNews={cmsArticles} initialSlides={slides} />
}
