import 'server-only'

import { liveMatchData } from '@/data/events-data'
import { pool } from '@/lib/db'
import { resolveCmsImage } from '@/lib/utils'

type LiveEventRow = {
  id: string
  title: string | null
  event_date: string | Date | null
  location: string | null
  youtube_url: string | null
  home_score: number | null
  away_score: number | null
  home_team_name: string | null
  home_team_logo_url: string | null
  away_team_name: string | null
  away_team_logo_url: string | null
}

export type LiveMatch = {
  competition: string
  headline: string
  startsAt: string
  venue: string
  youtubeId: string
  isLive: boolean
  homeScore: number | null
  awayScore: number | null
  home: {
    name: string
    logo: string
  }
  away: {
    name: string
    logo: string
  }
}

function getYoutubeId(url: string | null | undefined) {
  if (!url) return ''

  const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
  const match = url.match(regExp)

  return match && match[2].length === 11 ? match[2] : ''
}

function buildFallbackLiveMatch(): LiveMatch {
  return {
    competition: liveMatchData.competition,
    headline: liveMatchData.headline,
    startsAt: liveMatchData.startsAt,
    venue: liveMatchData.venue,
    youtubeId: liveMatchData.youtubeId,
    isLive: liveMatchData.isLive || Boolean(liveMatchData.youtubeId),
    homeScore: liveMatchData.homeScore,
    awayScore: liveMatchData.awayScore,
    home: {
      name: liveMatchData.home.name,
      logo: resolveCmsImage(liveMatchData.home.logo) || '/fc-toro-logo.png',
    },
    away: {
      name: liveMatchData.away.name,
      logo: resolveCmsImage(liveMatchData.away.logo) || '/placeholder.jpg',
    },
  }
}

function mapLiveEvent(row: LiveEventRow): LiveMatch {
  const fallback = buildFallbackLiveMatch()
  const eventDate = row.event_date ? new Date(row.event_date) : null
  const formattedStartsAt =
    eventDate && !Number.isNaN(eventDate.getTime())
      ? eventDate.toLocaleString('fr-FR', {
          day: '2-digit',
          month: 'short',
          hour: '2-digit',
          minute: '2-digit',
        })
      : fallback.startsAt

  return {
    competition: row.title?.trim() || fallback.competition,
    headline:
      row.title?.trim() === 'Live Diffusion'
        ? fallback.headline
        : row.title?.trim() || fallback.headline,
    startsAt: formattedStartsAt,
    venue: row.location?.trim() || fallback.venue,
    youtubeId: getYoutubeId(row.youtube_url) || fallback.youtubeId,
    isLive: Boolean(getYoutubeId(row.youtube_url) || fallback.youtubeId),
    homeScore: row.home_score,
    awayScore: row.away_score,
    home: {
      name: row.home_team_name?.trim() || fallback.home.name,
      logo: resolveCmsImage(row.home_team_logo_url) || fallback.home.logo,
    },
    away: {
      name: row.away_team_name?.trim() || fallback.away.name,
      logo: resolveCmsImage(row.away_team_logo_url) || fallback.away.logo,
    },
  }
}

export async function getLatestLiveMatch(): Promise<LiveMatch> {
  const fallback = buildFallbackLiveMatch()

  if (!process.env.DATABASE_URL) {
    return fallback
  }

  try {
    const { rows } = await pool.query<LiveEventRow>(`
      select
        e.id,
        e.title,
        e.event_date,
        e.location,
        e.youtube_url,
        e.home_score,
        e.away_score,
        home.name as home_team_name,
        home.logo_url as home_team_logo_url,
        away.name as away_team_name,
        away.logo_url as away_team_logo_url
      from club_events e
      left join flagday_teams home on home.id = e.home_team_id
      left join flagday_teams away on away.id = e.away_team_id
      where e.type = 'live_diffusion'
      order by e.created_at desc nulls last
      limit 1
    `)

    return rows.length > 0 ? mapLiveEvent(rows[0]) : fallback
  } catch (error) {
    console.error('[LIVE] Impossible de recuperer le live actif.', error)
    return fallback
  }
}
