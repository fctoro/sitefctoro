'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table'
import { mockClubFixtures, mockLeagueStandings } from '../data/club/standings-data'
import { ClubFixture, ClubStandingRow, MatchFormResult } from '../types/club'

const formBadgeClasses: Record<MatchFormResult, string> = {
  W: 'bg-emerald-500 text-white',
  D: 'bg-zinc-400 text-white',
  L: 'bg-red-500 text-white',
}

const formLabel: Record<MatchFormResult, string> = {
  W: 'V',
  D: 'N',
  L: 'D',
}

const sortStandings = (rows: ClubStandingRow[]) =>
  [...rows].sort((a, b) => {
    if (b.pts !== a.pts) return b.pts - a.pts
    const goalDiffA = a.goalsFor - a.goalsAgainst
    const goalDiffB = b.goalsFor - b.goalsAgainst
    if (goalDiffB !== goalDiffA) return goalDiffB - goalDiffA
    return b.goalsFor - a.goalsFor
  })

const formatKickoffDate = (kickoff: string) =>
  new Intl.DateTimeFormat('fr-FR', {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
  }).format(new Date(kickoff))

const formatKickoffTime = (kickoff: string) =>
  new Intl.DateTimeFormat('fr-FR', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(kickoff))

export default function StandingsPageContent() {
  const [standings] = useState<ClubStandingRow[]>(mockLeagueStandings)
  const [fixtures] = useState<ClubFixture[]>(mockClubFixtures)

  const sortedStandings = useMemo(() => sortStandings(standings), [standings])
  const leader = sortedStandings[0]
  const fcToro = sortedStandings.find((row) => row.teamId === 'team-fctoro')
  const fcToroRank = sortedStandings.findIndex((row) => row.teamId === 'team-fctoro')

  const recentFixtures = useMemo(
    () =>
      fixtures
        .filter((fixture) => fixture.status === 'FT')
        .sort((a, b) => new Date(b.kickoff).getTime() - new Date(a.kickoff).getTime())
        .slice(0, 6),
    [fixtures],
  )

  const upcomingFixtures = useMemo(
    () =>
      fixtures
        .filter((fixture) => fixture.status === 'A venir')
        .sort((a, b) => new Date(a.kickoff).getTime() - new Date(b.kickoff).getTime())
        .slice(0, 6),
    [fixtures],
  )

  return (
    <div className="min-h-screen bg-[#f5f7fb] px-4 pb-12 pt-8 text-zinc-900 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1360px] space-y-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">Club</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Classement</h1>
          <p className="mt-2 text-sm text-zinc-600">Classement et resultats de championnat du club.</p>
        </div>

        <div className="grid grid-cols-1 gap-4 xl:grid-cols-4">
          <div className="rounded-2xl border border-zinc-200 bg-white p-5">
            <p className="text-sm text-zinc-500">Leader actuel</p>
            <div className="mt-3 flex items-center gap-3">
              <Image
                src={leader.logoUrl}
                alt={leader.teamName}
                width={40}
                height={40}
                className="h-10 w-10 rounded-full object-cover"
                unoptimized
              />
              <div>
                <p className="text-sm font-semibold text-zinc-900">{leader.teamName}</p>
                <p className="text-xs text-zinc-500">{leader.pts} pts</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-zinc-200 bg-white p-5">
            <p className="text-sm text-zinc-500">Position FC Toro</p>
            <p className="mt-3 text-2xl font-semibold text-primary">{fcToroRank + 1}</p>
            <p className="mt-1 text-xs text-zinc-500">
              {fcToro ? `${fcToro.pts} pts, ${fcToro.goalsFor - fcToro.goalsAgainst} diff` : '-'}
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-200 bg-white p-5">
            <p className="text-sm text-zinc-500">Matchs enregistres</p>
            <p className="mt-3 text-2xl font-semibold text-zinc-900">{recentFixtures.length}</p>
            <p className="mt-1 text-xs text-zinc-500">Resultats recents visibles</p>
          </div>

          <div className="rounded-2xl border border-zinc-200 bg-white p-5">
            <p className="text-sm text-zinc-500">Prochain match</p>
            <p className="mt-3 text-base font-semibold text-zinc-900">
              {upcomingFixtures[0]
                ? `${upcomingFixtures[0].homeTeamName} vs ${upcomingFixtures[0].awayTeamName}`
                : 'Aucun match'}
            </p>
            <p className="mt-1 text-xs text-zinc-500">
              {upcomingFixtures[0] ? formatKickoffDate(upcomingFixtures[0].kickoff) : '-'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
          <div className="xl:col-span-8">
            <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white">
              <div className="border-b border-zinc-100 px-5 py-4">
                <h3 className="text-lg font-semibold text-zinc-900">Classement Ligue Elite</h3>
                <p className="mt-1 text-sm text-zinc-500">Exemple pro avec FC Toro en tete.</p>
              </div>

              <Table>
                <TableHeader>
                  <TableRow className="border-b border-zinc-100">
                    <TableHead className="px-4 py-3 text-xs font-medium text-zinc-500">#</TableHead>
                    <TableHead className="px-4 py-3 text-xs font-medium text-zinc-500">Equipe</TableHead>
                    <TableHead className="px-2 py-3 text-center text-xs font-medium text-zinc-500">PTS</TableHead>
                    <TableHead className="px-2 py-3 text-center text-xs font-medium text-zinc-500">J</TableHead>
                    <TableHead className="px-2 py-3 text-center text-xs font-medium text-zinc-500">W</TableHead>
                    <TableHead className="px-2 py-3 text-center text-xs font-medium text-zinc-500">L</TableHead>
                    <TableHead className="px-2 py-3 text-center text-xs font-medium text-zinc-500">N</TableHead>
                    <TableHead className="px-2 py-3 text-center text-xs font-medium text-zinc-500">GF</TableHead>
                    <TableHead className="px-2 py-3 text-center text-xs font-medium text-zinc-500">GA</TableHead>
                    <TableHead className="px-2 py-3 text-center text-xs font-medium text-zinc-500">+/-</TableHead>
                    <TableHead className="px-4 py-3 text-center text-xs font-medium text-zinc-500">5 derniers</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {sortedStandings.map((row, index) => {
                    const goalDiff = row.goalsFor - row.goalsAgainst
                    const isToro = row.teamId === 'team-fctoro'

                    return (
                      <TableRow key={row.teamId} className={isToro ? 'bg-primary/5' : ''}>
                        <TableCell className="px-4 py-3 text-sm font-semibold text-zinc-900">{index + 1}</TableCell>
                        <TableCell className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <Image
                              src={row.logoUrl}
                              alt={row.teamName}
                              width={28}
                              height={28}
                              className="h-7 w-7 rounded-full object-cover"
                              unoptimized
                            />
                            <span className="text-sm font-medium text-zinc-900">{row.teamName}</span>
                          </div>
                        </TableCell>
                        <TableCell className="px-2 py-3 text-center text-sm font-semibold text-zinc-900">{row.pts}</TableCell>
                        <TableCell className="px-2 py-3 text-center text-sm text-zinc-600">{row.played}</TableCell>
                        <TableCell className="px-2 py-3 text-center text-sm text-zinc-600">{row.wins}</TableCell>
                        <TableCell className="px-2 py-3 text-center text-sm text-zinc-600">{row.losses}</TableCell>
                        <TableCell className="px-2 py-3 text-center text-sm text-zinc-600">{row.draws}</TableCell>
                        <TableCell className="px-2 py-3 text-center text-sm text-zinc-600">{row.goalsFor}</TableCell>
                        <TableCell className="px-2 py-3 text-center text-sm text-zinc-600">{row.goalsAgainst}</TableCell>
                        <TableCell className="px-2 py-3 text-center text-sm font-medium text-zinc-700">
                          {goalDiff > 0 ? `+${goalDiff}` : goalDiff}
                        </TableCell>
                        <TableCell className="px-4 py-3">
                          <div className="flex items-center justify-center gap-1.5">
                            {row.form.map((result, resultIndex) => (
                              <span
                                key={`${row.teamId}-form-${resultIndex}`}
                                className={`inline-flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-semibold ${formBadgeClasses[result]}`}
                              >
                                {formLabel[result]}
                              </span>
                            ))}
                          </div>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </div>
          </div>

          <div className="space-y-6 xl:col-span-4">
            <div className="rounded-2xl border border-zinc-200 bg-white p-5">
              <h3 className="text-base font-semibold text-zinc-900">Resultats recents</h3>
              <div className="mt-4 space-y-3">
                {recentFixtures.map((fixture) => (
                  <div key={fixture.id} className="rounded-xl border border-zinc-200 p-3">
                    <p className="text-xs text-zinc-500">
                      {fixture.round} - {fixture.competition}
                    </p>
                    <p className="mt-1 text-xs text-zinc-500">{formatKickoffDate(fixture.kickoff)}</p>
                    <div className="mt-2 flex items-center justify-between gap-2">
                      <div className="flex min-w-0 items-center gap-2">
                        <Image
                          src={fixture.homeLogoUrl}
                          alt={fixture.homeTeamName}
                          width={20}
                          height={20}
                          className="h-5 w-5 rounded-full object-cover"
                          unoptimized
                        />
                        <span className="truncate text-sm text-zinc-900">{fixture.homeTeamName}</span>
                      </div>
                      <span className="text-sm font-semibold text-zinc-900">
                        {fixture.homeScore} - {fixture.awayScore}
                      </span>
                      <div className="flex min-w-0 items-center gap-2">
                        <span className="truncate text-right text-sm text-zinc-900">{fixture.awayTeamName}</span>
                        <Image
                          src={fixture.awayLogoUrl}
                          alt={fixture.awayTeamName}
                          width={20}
                          height={20}
                          className="h-5 w-5 rounded-full object-cover"
                          unoptimized
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-zinc-200 bg-white p-5">
              <h3 className="text-base font-semibold text-zinc-900">Prochains matchs</h3>
              <div className="mt-4 space-y-3">
                {upcomingFixtures.map((fixture) => (
                  <div key={fixture.id} className="rounded-xl border border-zinc-200 p-3">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-xs text-zinc-500">
                        {fixture.round} - {fixture.competition}
                      </p>
                      <span className="rounded-full bg-primary/10 px-2 py-1 text-[11px] font-medium text-primary">
                        A venir
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-zinc-500">
                      {formatKickoffDate(fixture.kickoff)} - {formatKickoffTime(fixture.kickoff)}
                    </p>
                    <div className="mt-2 flex items-center justify-between gap-2">
                      <div className="flex min-w-0 items-center gap-2">
                        <Image
                          src={fixture.homeLogoUrl}
                          alt={fixture.homeTeamName}
                          width={20}
                          height={20}
                          className="h-5 w-5 rounded-full object-cover"
                          unoptimized
                        />
                        <span className="truncate text-sm text-zinc-900">{fixture.homeTeamName}</span>
                      </div>
                      <span className="text-sm font-semibold text-zinc-500">vs</span>
                      <div className="flex min-w-0 items-center gap-2">
                        <span className="truncate text-right text-sm text-zinc-900">{fixture.awayTeamName}</span>
                        <Image
                          src={fixture.awayLogoUrl}
                          alt={fixture.awayTeamName}
                          width={20}
                          height={20}
                          className="h-5 w-5 rounded-full object-cover"
                          unoptimized
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
