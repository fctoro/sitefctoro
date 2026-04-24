import type { Metadata } from 'next'
import { Breadcrumb } from '@/components/breadcrumb'
import { HomeNavbar } from '@/components/home-navbar'
import LivePageContent from '@/components/live-page-content'
import { getLatestLiveMatch } from '@/lib/live'

export const metadata: Metadata = {
  title: 'Live | FC TORO',
  description: 'Page de diffusion live FC TORO avec flux de match et partage rapide.',
}

export const dynamic = 'force-dynamic'

export default async function LivePage() {
  const liveMatch = await getLatestLiveMatch()

  return (
    <>
      <HomeNavbar anchorPrefix="/" />
      <Breadcrumb
        items={[
          { label: 'Accueil', href: '/' },
          { label: 'Evenements' },
          { label: 'Live', href: '/evenements/live' },
        ]}
      />
      <LivePageContent liveMatch={liveMatch} />
    </>
  )
}
