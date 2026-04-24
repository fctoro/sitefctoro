import type { Metadata } from 'next'
import { HomeNavbar } from '@/components/home-navbar'
import { Breadcrumb } from '@/components/breadcrumb'
import FlagDayPageContent from '@/components/flag-day-page-content'
import { supabase } from '@/lib/supabase'

export const metadata: Metadata = {
  title: 'Flag Day | FC TORO',
  description: 'Classement, resultats et prochains matchs du tournoi Flag Day.',
}

export default async function FlagDayPage() {
  // 1. Récupérer les compétitions publiées
  const { data: competitions } = await supabase
    .from('flagday_competitions')
    .select('*')
    .eq('is_published', true)

  const publishedIds = competitions?.map(c => c.id) || []

  // 2. Récupérer les catégories liées aux compétitions publiées
  const { data: categories } = await supabase
    .from('flagday_categories')
    .select('id, name, competition_id')
    .in('competition_id', publishedIds)

  // 3. Récupérer les matchs liés aux compétitions publiées
  const { data: cmsMatches } = await supabase
    .from('flagday_matches')
    .select(`
      *,
      home_team:home_team_id(name, logo_url),
      away_team:away_team_id(name, logo_url)
    `)
    .in('competition_id', publishedIds)

  // 4. Récupérer les classements de base (pour le mapping des équipes)
  const { data: cmsStandings } = await supabase
    .from('flagday_standings')
    .select(`
      *,
      team:team_id(name, logo_url)
    `)
    .in('category_id', categories?.map(c => c.id) || [])

  // 5. Calculer le classement dynamiquement (pour parité totale avec le CMS)
  const standingsMap: Record<string, any> = {}
  cmsStandings?.forEach(s => {
    standingsMap[s.team_id] = {
      ...s,
      points: 0,
      played: 0,
      won: 0,
      drawn: 0,
      lost: 0,
      goals_for: 0,
      goals_against: 0
    }
  })

  cmsMatches?.forEach(m => {
    if (m.status !== 'finished') return
    if (!m.round.toLowerCase().includes('groupe')) return

    const home = standingsMap[m.home_team_id]
    const away = standingsMap[m.away_team_id]

    if (home && away) {
      home.played += 1
      away.played += 1
      home.goals_for += (m.home_score || 0)
      home.goals_against += (m.away_score || 0)
      away.goals_for += (m.away_score || 0)
      away.goals_against += (m.home_score || 0)

      if (m.home_score > m.away_score) {
        home.won += 1; home.points += 3; away.lost += 1
      } else if (m.home_score < m.away_score) {
        away.won += 1; away.points += 3; home.lost += 1
      } else {
        home.drawn += 1; away.drawn += 1; home.points += 1; away.points += 1
      }
    }
  })

  const finalStandings = Object.values(standingsMap)

  // 6. Récupérer et agréger les buteurs
  const { data: rawScorers } = await supabase
    .from('flagday_match_scorers')
    .select(`
      player_name,
      team_name,
      goals,
      match:match_id!inner(competition_id)
    `)
    .in('match.competition_id', publishedIds)

  const aggregatedScorersMap: Record<string, any> = {}
  rawScorers?.forEach(s => {
    const key = `${s.player_name}-${s.team_name}`
    if (!aggregatedScorersMap[key]) {
      aggregatedScorersMap[key] = { player_name: s.player_name, team_name: s.team_name, goals: 0 }
    }
    aggregatedScorersMap[key].goals += s.goals
  })

  const cmsScorers = Object.values(aggregatedScorersMap).sort((a, b) => b.goals - a.goals)

  return (
    <>
      <HomeNavbar anchorPrefix="/" />
      <Breadcrumb items={[{ label: 'Accueil', href: '/' }, { label: 'Événements' }, { label: 'Flag Day', href: '/evenements/flag-day' }]} />
      <FlagDayPageContent 
        cmsData={{
          competitions: competitions || [],
          categories: categories || [],
          matches: cmsMatches || [],
          standings: finalStandings,
          scorers: cmsScorers || []
        }}
      />
    </>
  )
}
