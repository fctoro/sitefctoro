export type MatchFormResult = 'W' | 'D' | 'L'
export type MatchState = 'FT' | 'A venir'

export interface ClubStandingRow {
  teamId: string
  teamName: string
  logoUrl: string
  pts: number
  played: number
  wins: number
  losses: number
  draws: number
  goalsFor: number
  goalsAgainst: number
  form: MatchFormResult[]
}

export interface ClubFixture {
  id: string
  competition: string
  round: string
  kickoff: string
  status: MatchState
  homeTeamId: string
  awayTeamId: string
  homeTeamName: string
  awayTeamName: string
  homeLogoUrl: string
  awayLogoUrl: string
  homeScore?: number
  awayScore?: number
}
