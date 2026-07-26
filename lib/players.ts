import 'server-only'

import type { PlayerCard } from '@/lib/joueur'
import { playerCards } from '@/lib/joueur'
import { resolveCmsImage } from '@/lib/utils'
import { supabaseAdmin } from '@/lib/supabase'

type ClubPlayerRow = {
  first_name: string | null
  last_name: string | null
  photo_url: string | null
  position: string | null
  category: string | null
}

type ElitePlayerRow = {
  number: string | null
  first_name: string | null
  last_name: string | null
  position: string | null
  club: string | null
  weight: string | null
  height: string | null
  photo_url: string | null
  video_url: string | null
}

export type EliteRosterPlayer = {
  name: string
  firstname: string
  lastname: string
  position: string
  club: string
  weight: string
  height: string
  photo_url: string
  video_url: string | null
  number: number
  tone: 'blue' | 'red'
}

function buildPlayerName(firstName?: string | null, lastName?: string | null) {
  return `${firstName || ''} ${lastName || ''}`.trim() || 'Joueur'
}

function normalizeRoleLabel(value?: string | null) {
  const label = value?.trim()

  if (!label) {
    return ''
  }

  const key = label
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()

  switch (key) {
    case 'defenseur':
      return 'Défenseur'
    case 'elite':
      return 'Élite'
    default:
      return label
  }
}

function mapClubPlayer(row: ClubPlayerRow): PlayerCard {
  return {
    name: buildPlayerName(row.first_name, row.last_name),
    role: normalizeRoleLabel(row.position) || normalizeRoleLabel(row.category) || 'Joueur',
    image: resolveCmsImage(row.photo_url) || '/placeholder-user.jpg',
  }
}

function parsePlayerCardName(name: string) {
  const [firstname = 'Joueur', ...rest] = name.trim().split(/\s+/)

  return {
    firstname,
    lastname: rest.join(' ') || firstname,
  }
}

function buildEliteFallback(): EliteRosterPlayer[] {
  return playerCards.slice(0, 10).map((player, index) => {
    const { firstname, lastname } = parsePlayerCardName(player.name)

    return {
      name: player.name,
      firstname,
      lastname,
      position: player.role || 'Joueur',
      club: 'FC TORO',
      weight: '-',
      height: '-',
      photo_url: player.image || '/placeholder-user.jpg',
      video_url: null,
      number: index + 1,
      tone: index % 2 === 0 ? 'blue' : 'red',
    }
  })
}

function mapElitePlayer(row: ElitePlayerRow, index: number): EliteRosterPlayer {
  const digits = (row.number || '').replace(/\D/g, '')
  const parsedNumber = digits ? Number.parseInt(digits, 10) : index + 1
  const firstname = row.first_name?.trim() || 'Joueur'
  const lastname = row.last_name?.trim() || ''
  const videoUrl = row.video_url?.trim()

  return {
    name: buildPlayerName(firstname, lastname),
    firstname,
    lastname: lastname || firstname,
    position: row.position?.trim() || '',
    club: row.club?.trim() || 'FC TORO',
    weight: row.weight?.trim() || '-',
    height: row.height?.trim() || '-',
    photo_url: resolveCmsImage(row.photo_url) || '/placeholder-user.jpg',
    video_url: videoUrl ? resolveCmsImage(videoUrl) : null,
    number: parsedNumber,
    tone: index % 2 === 0 ? 'blue' : 'red',
  }
}

type GetEliteRosterOptions = {
  useFallback?: boolean
}

export async function getHomePlayers(): Promise<PlayerCard[]> {
  if (process.env.NODE_ENV !== 'production') {
    return playerCards
  }

  try {
    const { data, error } = await supabaseAdmin
      .from('club_players')
      .select('first_name,last_name,photo_url,position,category')
      .eq('status', 'actif')
      .order('created_at', { ascending: false })

    if (error) {
      throw error
    }

    const players = (data ?? [])
      .map(mapClubPlayer)
      .filter((player) => Boolean(player.image))
    return players.length > 0 ? players : playerCards
  } catch (error) {
    console.error('[PLAYERS] Impossible de recuperer les joueurs du site.', error)
    return playerCards
  }
}

export async function getEliteRoster({ useFallback = true }: GetEliteRosterOptions = {}): Promise<EliteRosterPlayer[]> {
  const fallback = useFallback ? buildEliteFallback() : []

  if (process.env.NODE_ENV !== 'production') {
    return fallback
  }

  try {
    const { data, error } = await supabaseAdmin
      .from('club_elite_players')
      .select('number,first_name,last_name,position,club,weight,height,photo_url,video_url')
      .order('created_at', { ascending: true })

    if (error) {
      throw error
    }

    const eliteRoster = (data ?? []).map(mapElitePlayer)
    return eliteRoster.length > 0 ? eliteRoster : fallback
  } catch (error) {
    console.error('[PLAYERS] Impossible de recuperer les joueurs elite.', error)
    return fallback
  }
}
