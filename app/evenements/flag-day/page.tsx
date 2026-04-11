import type { Metadata } from 'next'
import { HomeNavbar } from '@/components/home-navbar'
import FlagDayPageContent from '@/components/flag-day-page-content'
import { supabase } from '@/lib/supabase'

export const metadata: Metadata = {
  title: 'Flag Day | FC TORO',
  description: 'Classement, resultats et prochains matchs du tournoi Flag Day.',
}

export default async function FlagDayPage() {
  // Récupérer les catégories actives
  const { data: categories } = await supabase
    .from('flagday_categories')
    .select('id, name')
    .eq('active', true)

  // Récupérer les matchs CMS
  const { data: cmsMatches } = await supabase
    .from('flagday_matches')
    .select(`
      *,
      home_team:home_team_id(name, logo_url),
      away_team:away_team_id(name, logo_url)
    `)

  // Récupérer les classements CMS
  const { data: cmsStandings } = await supabase
    .from('flagday_standings')
    .select(`
      *,
      team:team_id(name, logo_url)
    `)

  // Récupérer les buteurs CMS
  const { data: cmsScorers } = await supabase
    .from('flagday_top_scorers')
    .select('*')

  return (
    <>
      <HomeNavbar anchorPrefix="/" />
      <FlagDayPageContent 
        cmsData={{
          categories: categories || [],
          matches: cmsMatches || [],
          standings: cmsStandings || [],
          scorers: cmsScorers || []
        }}
      />
    </>
  )
}
