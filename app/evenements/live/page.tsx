import type { Metadata } from 'next'
import { HomeNavbar } from '@/components/home-navbar'
import LivePageContent from '@/components/live-page-content'
import { supabase } from '@/lib/supabase'

export const metadata: Metadata = {
  title: 'Live | FC TORO',
  description: 'Page de diffusion live FC TORO avec flux de match et partage rapide.',
}

export default async function LivePage() {
  // Récupérer le dernier événement de type "Live Diffusion"
  const { data: cmsLiveMatch } = await supabase
    .from('club_events')
    .select(`
      *,
      home_team:home_team_id(name, logo_url),
      away_team:away_team_id(name, logo_url)
    `)
    .eq('type', 'live_diffusion')
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle()

  return (
    <>
      <HomeNavbar anchorPrefix="/" />
      <LivePageContent cmsLiveMatch={cmsLiveMatch} />
    </>
  )
}
