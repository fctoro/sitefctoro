import 'server-only'

import { pool } from '@/lib/db'

type CompetitionRow = {
  id: string
  name: string | null
  slug: string | null
  season: string | null
  description: string | null
  active: boolean | null
  sort_order: number | null
  logo_url: string | null
  created_at: string | Date | null
  updated_at: string | Date | null
  status: string | null
  is_published: boolean | null
  age_category: string | null
}

type CategoryRow = {
  id: string
  competition_id: string
  name: string | null
  sort_order: number | null
  active: boolean | null
}

type MatchRow = {
  id: string
  competition_id: string
  round: string | null
  kickoff: string | Date | null
  status: string | null
  home_team_id: string | null
  away_team_id: string | null
  home_score: number | null
  away_score: number | null
  venue: string | null
  notes: string | null
  featured: boolean | null
  sort_order: number | null
  created_at: string | Date | null
  updated_at: string | Date | null
  home_team_name: string | null
  home_team_logo_url: string | null
  away_team_name: string | null
  away_team_logo_url: string | null
}

type StandingRow = {
  id: string
  category_id: string
  team_id: string
  group_name: string | null
  stage: string | null
  played: number | null
  won: number | null
  drawn: number | null
  lost: number | null
  goals_for: number | null
  goals_against: number | null
  points: number | null
  rank_position: number | null
  is_qualified: boolean | null
  team_name: string | null
  team_logo_url: string | null
}

type ScorerRow = {
  player_name: string | null
  team_name: string | null
  goals: number | null
}

export type FlagDayCmsData = {
  competitions: CompetitionRow[]
  categories: CategoryRow[]
  matches: Array<MatchRow & { home_team: { name: string; logo_url: string | null }; away_team: { name: string; logo_url: string | null } }>
  standings: Array<StandingRow & { team: { name: string; logo_url: string | null } }>
  scorers: Array<{ player_name: string; team_name: string; goals: number }>
}

function emptyFlagDayData(): FlagDayCmsData {
  return {
    competitions: [],
    categories: [],
    matches: [],
    standings: [],
    scorers: [],
  }
}

export async function getFlagDayCmsData(): Promise<FlagDayCmsData> {
  if (!process.env.DATABASE_URL) {
    return emptyFlagDayData()
  }

  try {
    const { rows: competitions } = await pool.query<CompetitionRow>(`
      select *
      from flagday_competitions
      where is_published = true
      order by sort_order asc nulls last, created_at asc
    `)

    const publishedIds = competitions.map((competition) => competition.id)

    if (publishedIds.length === 0) {
      return emptyFlagDayData()
    }

    const { rows: categories } = await pool.query<CategoryRow>(
      `
        select id, competition_id, name, sort_order, active
        from flagday_categories
        where competition_id = any($1::uuid[])
        order by sort_order asc nulls last, name asc nulls last
      `,
      [publishedIds],
    )

    const categoryIds = categories.map((category) => category.id)

    const { rows: matchesRows } = await pool.query<MatchRow>(
      `
        select
          m.*,
          home.name as home_team_name,
          home.logo_url as home_team_logo_url,
          away.name as away_team_name,
          away.logo_url as away_team_logo_url
        from flagday_matches m
        left join flagday_teams home on home.id = m.home_team_id
        left join flagday_teams away on away.id = m.away_team_id
        where m.competition_id = any($1::uuid[])
        order by m.kickoff asc nulls last, m.created_at asc
      `,
      [publishedIds],
    )

    const standingsRows =
      categoryIds.length > 0
        ? (
            await pool.query<StandingRow>(
              `
                select
                  s.*,
                  t.name as team_name,
                  t.logo_url as team_logo_url
                from flagday_standings s
                left join flagday_teams t on t.id = s.team_id
                where s.category_id = any($1::uuid[])
                order by s.group_name asc nulls last, s.rank_position asc nulls last
              `,
              [categoryIds],
            )
          ).rows
        : []

    const standingsMap: Record<string, StandingRow & { team: { name: string; logo_url: string | null } }> = {}

    standingsRows.forEach((standing) => {
      standingsMap[standing.team_id] = {
        ...standing,
        points: 0,
        played: 0,
        won: 0,
        drawn: 0,
        lost: 0,
        goals_for: 0,
        goals_against: 0,
        team: {
          name: standing.team_name?.trim() || 'Equipe',
          logo_url: standing.team_logo_url,
        },
      }
    })

    matchesRows.forEach((match) => {
      if (match.status !== 'finished') return
      if (!match.round?.toLowerCase().includes('groupe')) return

      const home = match.home_team_id ? standingsMap[match.home_team_id] : null
      const away = match.away_team_id ? standingsMap[match.away_team_id] : null

      if (!home || !away) return

      const homeScore = match.home_score || 0
      const awayScore = match.away_score || 0

      home.played = (home.played || 0) + 1
      away.played = (away.played || 0) + 1
      home.goals_for = (home.goals_for || 0) + homeScore
      home.goals_against = (home.goals_against || 0) + awayScore
      away.goals_for = (away.goals_for || 0) + awayScore
      away.goals_against = (away.goals_against || 0) + homeScore

      if (homeScore > awayScore) {
        home.won = (home.won || 0) + 1
        home.points = (home.points || 0) + 3
        away.lost = (away.lost || 0) + 1
      } else if (homeScore < awayScore) {
        away.won = (away.won || 0) + 1
        away.points = (away.points || 0) + 3
        home.lost = (home.lost || 0) + 1
      } else {
        home.drawn = (home.drawn || 0) + 1
        away.drawn = (away.drawn || 0) + 1
        home.points = (home.points || 0) + 1
        away.points = (away.points || 0) + 1
      }
    })

    const { rows: scorerRows } = await pool.query<ScorerRow>(
      `
        select
          s.player_name,
          s.team_name,
          s.goals
        from flagday_match_scorers s
        inner join flagday_matches m on m.id = s.match_id
        where m.competition_id = any($1::uuid[])
      `,
      [publishedIds],
    )

    const aggregatedScorersMap: Record<string, { player_name: string; team_name: string; goals: number }> = {}

    scorerRows.forEach((scorer) => {
      const playerName = scorer.player_name?.trim()
      const teamName = scorer.team_name?.trim()

      if (!playerName || !teamName) {
        return
      }

      const key = `${playerName}-${teamName}`

      if (!aggregatedScorersMap[key]) {
        aggregatedScorersMap[key] = {
          player_name: playerName,
          team_name: teamName,
          goals: 0,
        }
      }

      aggregatedScorersMap[key].goals += scorer.goals || 0
    })

    return {
      competitions,
      categories,
      matches: matchesRows.map((match) => ({
        ...match,
        home_team: {
          name: match.home_team_name?.trim() || 'Equipe domicile',
          logo_url: match.home_team_logo_url,
        },
        away_team: {
          name: match.away_team_name?.trim() || 'Equipe exterieure',
          logo_url: match.away_team_logo_url,
        },
      })),
      standings: Object.values(standingsMap),
      scorers: Object.values(aggregatedScorersMap).sort((a, b) => b.goals - a.goals),
    }
  } catch (error) {
    console.error('[FLAG-DAY] Impossible de recuperer les donnees du tournoi.', error)
    return emptyFlagDayData()
  }
}
