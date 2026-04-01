'use client'

import { FormEvent, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { CalendarDays, Check, Plus, TrendingUp } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  mockClubFixtures,
  mockLeagueStandings,
  mockStandingTeams,
} from '@/data/club/standings-data'
import { ClubFixture, ClubStandingRow, MatchFormResult } from '@/types/club'

type AddResultFormState = {
  competition: string
  round: string
  kickoffDate: string
  kickoffTime: string
  homeTeamId: string
  awayTeamId: string
  homeScore: string
  awayScore: string
}

const defaultFormValues: AddResultFormState = {
  competition: 'Ligue Elite',
  round: 'J28',
  kickoffDate: '2026-03-19',
  kickoffTime: '20:30',
  homeTeamId: 'team-fctoro',
  awayTeamId: 'team-riviera',
  homeScore: '2',
  awayScore: '1',
}

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

const updateTeamWithResult = (
  row: ClubStandingRow,
  goalsFor: number,
  goalsAgainst: number,
): ClubStandingRow => {
  const outcome: MatchFormResult =
    goalsFor > goalsAgainst ? 'W' : goalsFor < goalsAgainst ? 'L' : 'D'

  return {
    ...row,
    played: row.played + 1,
    wins: row.wins + (outcome === 'W' ? 1 : 0),
    draws: row.draws + (outcome === 'D' ? 1 : 0),
    losses: row.losses + (outcome === 'L' ? 1 : 0),
    goalsFor: row.goalsFor + goalsFor,
    goalsAgainst: row.goalsAgainst + goalsAgainst,
    pts: row.pts + (outcome === 'W' ? 3 : outcome === 'D' ? 1 : 0),
    form: [outcome, ...row.form].slice(0, 5),
  }
}

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
  const [standings, setStandings] = useState<ClubStandingRow[]>(mockLeagueStandings)
  const [fixtures, setFixtures] = useState<ClubFixture[]>(mockClubFixtures)
  const [isAddResultOpen, setIsAddResultOpen] = useState(false)
  const [formValues, setFormValues] = useState<AddResultFormState>(defaultFormValues)
  const [formError, setFormError] = useState<string | null>(null)

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

  const closeAddResultModal = () => {
    setIsAddResultOpen(false)
    setFormError(null)
  }

  const handleAddResult = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (formValues.homeTeamId === formValues.awayTeamId) {
      setFormError('Les equipes domicile et exterieur doivent etre differentes.')
      return
    }

    const homeScore = Number.parseInt(formValues.homeScore, 10)
    const awayScore = Number.parseInt(formValues.awayScore, 10)

    if (
      !Number.isFinite(homeScore) ||
      !Number.isFinite(awayScore) ||
      homeScore < 0 ||
      awayScore < 0
    ) {
      setFormError('Les scores doivent etre des nombres entiers positifs.')
      return
    }

    const homeTeam = mockStandingTeams.find((team) => team.id === formValues.homeTeamId)
    const awayTeam = mockStandingTeams.find((team) => team.id === formValues.awayTeamId)

    if (!homeTeam || !awayTeam) {
      setFormError('Equipe introuvable. Verifiez la selection.')
      return
    }

    const kickoff = `${formValues.kickoffDate}T${formValues.kickoffTime}:00`
    const fixtureId = `fx-custom-${Date.now()}`

    const newFixture: ClubFixture = {
      id: fixtureId,
      competition: formValues.competition.trim() || 'Ligue Elite',
      round: formValues.round.trim() || 'Journee',
      kickoff,
      status: 'FT',
      homeTeamId: homeTeam.id,
      awayTeamId: awayTeam.id,
      homeTeamName: homeTeam.name,
      awayTeamName: awayTeam.name,
      homeLogoUrl: homeTeam.logoUrl,
      awayLogoUrl: awayTeam.logoUrl,
      homeScore,
      awayScore,
    }

    setFixtures((prevFixtures) => [newFixture, ...prevFixtures])
    setStandings((prevStandings) =>
      prevStandings.map((row) => {
        if (row.teamId === homeTeam.id) return updateTeamWithResult(row, homeScore, awayScore)
        if (row.teamId === awayTeam.id) return updateTeamWithResult(row, awayScore, homeScore)
        return row
      }),
    )

    setFormValues(defaultFormValues)
    closeAddResultModal()
  }

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f5f7fb_0%,#edf2f8_100%)] px-3 pb-14 pt-8 sm:px-5 lg:px-8">
      <div className="mx-auto max-w-[1460px]">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="flex flex-wrap items-start justify-between gap-4"
        >
          <div>
            <p className="text-xs font-black uppercase tracking-[0.14em] text-[#ef233c]">Club</p>
            <h1 className="mt-1 text-2xl font-black uppercase tracking-tight text-[#0a1d3a] sm:text-3xl">
              Classement Ligue Elite
            </h1>
            <p className="mt-1 text-sm text-zinc-600">
              Tableau complet, resultats recents et prochaines affiches.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsAddResultOpen(true)}
            className="inline-flex items-center gap-2 rounded-lg bg-[#ef233c] px-4 py-2.5 text-sm font-bold text-white transition-all duration-300 hover:translate-y-[-1px] hover:bg-[#d71931]"
          >
            <Plus className="h-4 w-4" />
            Ajouter un resultat
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut', delay: 0.05 }}
          className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3"
        >
          <div className="rounded-xl border border-[#dbe2ef] bg-white px-4 py-3">
            <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-zinc-500">Leader</p>
            <p className="mt-1 text-base font-black text-[#0a1d3a]">{leader.teamName}</p>
          </div>
          <div className="rounded-xl border border-[#dbe2ef] bg-white px-4 py-3">
            <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-zinc-500">Position FC Toro</p>
            <p className="mt-1 text-base font-black text-[#0a1d3a]">
              {fcToroRank >= 0 ? `${fcToroRank + 1}e` : '-'} {fcToro ? `- ${fcToro.pts} pts` : ''}
            </p>
          </div>
          <div className="rounded-xl border border-[#dbe2ef] bg-white px-4 py-3">
            <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-zinc-500">Forme recente</p>
            <p className="mt-1 text-base font-black text-[#0a1d3a]">
              {fcToro ? `${fcToro.form.join(' ')}` : '-'}
            </p>
          </div>
        </motion.div>

        <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_330px]">
          <motion.section
            initial={{ opacity: 0, x: -18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className="overflow-hidden rounded-2xl border border-[#d7dfec] bg-white shadow-[0_12px_28px_rgba(10,29,58,0.08)]"
          >
            <div className="border-b border-[#e7edf6] px-5 py-4">
              <h3 className="text-lg font-black text-[#0a1d3a]">Classement Ligue Elite</h3>
              <p className="mt-1 text-sm text-zinc-500">Exemple pro avec FC Toro en tete.</p>
            </div>

            <Table>
              <TableHeader className="border-b border-[#eef2f8]">
                <TableRow className="hover:bg-transparent">
                  <TableHead className="px-4 py-3 text-[11px] font-bold uppercase tracking-[0.08em] text-zinc-500">#</TableHead>
                  <TableHead className="px-4 py-3 text-[11px] font-bold uppercase tracking-[0.08em] text-zinc-500">Equipe</TableHead>
                  <TableHead className="px-2 py-3 text-center text-[11px] font-bold uppercase tracking-[0.08em] text-zinc-500">PTS</TableHead>
                  <TableHead className="px-2 py-3 text-center text-[11px] font-bold uppercase tracking-[0.08em] text-zinc-500">J</TableHead>
                  <TableHead className="px-2 py-3 text-center text-[11px] font-bold uppercase tracking-[0.08em] text-zinc-500">W</TableHead>
                  <TableHead className="px-2 py-3 text-center text-[11px] font-bold uppercase tracking-[0.08em] text-zinc-500">L</TableHead>
                  <TableHead className="px-2 py-3 text-center text-[11px] font-bold uppercase tracking-[0.08em] text-zinc-500">N</TableHead>
                  <TableHead className="px-2 py-3 text-center text-[11px] font-bold uppercase tracking-[0.08em] text-zinc-500">GF</TableHead>
                  <TableHead className="px-2 py-3 text-center text-[11px] font-bold uppercase tracking-[0.08em] text-zinc-500">GA</TableHead>
                  <TableHead className="px-2 py-3 text-center text-[11px] font-bold uppercase tracking-[0.08em] text-zinc-500">+/-</TableHead>
                  <TableHead className="px-4 py-3 text-center text-[11px] font-bold uppercase tracking-[0.08em] text-zinc-500">5 derniers</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {sortedStandings.map((row, index) => {
                  const goalDiff = row.goalsFor - row.goalsAgainst
                  const isToro = row.teamId === 'team-fctoro'
                  return (
                    <TableRow
                      key={row.teamId}
                      className={`transition-colors ${isToro ? 'bg-[linear-gradient(98deg,rgba(239,35,60,0.12),rgba(26,78,163,0.1))]' : 'hover:bg-[#f8fbff]'}`}
                    >
                      <TableCell className="px-4 py-3 text-sm font-black text-zinc-900">{index + 1}</TableCell>
                      <TableCell className="px-4 py-3">
                        <div className="flex items-center gap-2.5">
                          <Image
                            src={row.logoUrl}
                            alt={row.teamName}
                            width={24}
                            height={24}
                            className="h-6 w-6 rounded-full object-cover"
                          />
                          <span className="text-sm font-semibold text-zinc-900">{row.teamName}</span>
                        </div>
                      </TableCell>
                      <TableCell className="px-2 py-3 text-center text-sm font-black text-zinc-900">{row.pts}</TableCell>
                      <TableCell className="px-2 py-3 text-center text-sm text-zinc-600">{row.played}</TableCell>
                      <TableCell className="px-2 py-3 text-center text-sm text-zinc-600">{row.wins}</TableCell>
                      <TableCell className="px-2 py-3 text-center text-sm text-zinc-600">{row.losses}</TableCell>
                      <TableCell className="px-2 py-3 text-center text-sm text-zinc-600">{row.draws}</TableCell>
                      <TableCell className="px-2 py-3 text-center text-sm text-zinc-600">{row.goalsFor}</TableCell>
                      <TableCell className="px-2 py-3 text-center text-sm text-zinc-600">{row.goalsAgainst}</TableCell>
                      <TableCell className="px-2 py-3 text-center text-sm font-semibold text-zinc-700">
                        {goalDiff > 0 ? `+${goalDiff}` : goalDiff}
                      </TableCell>
                      <TableCell className="px-4 py-3">
                        <div className="flex items-center justify-center gap-1.5">
                          {row.form.map((result, resultIndex) => (
                            <span
                              key={`${row.teamId}-${resultIndex}`}
                              className={`inline-flex h-5 w-5 items-center justify-center rounded-full text-[9px] font-bold ${formBadgeClasses[result]}`}
                              title={result}
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
          </motion.section>

          <motion.aside
            initial={{ opacity: 0, x: 18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, ease: 'easeOut', delay: 0.05 }}
            className="space-y-6"
          >
            <section className="rounded-2xl border border-[#d7dfec] bg-white p-4 shadow-[0_12px_24px_rgba(10,29,58,0.06)]">
              <h3 className="text-base font-black text-[#0a1d3a]">Resultats recents</h3>
              <div className="mt-3 space-y-2.5">
                {recentFixtures.map((fixture, index) => (
                  <motion.article
                    key={fixture.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.28, delay: index * 0.05 }}
                    className="rounded-xl border border-[#e6ecf5] bg-[#fbfcff] p-3 transition-all duration-300 hover:-translate-y-[1px] hover:shadow-[0_10px_20px_rgba(10,29,58,0.07)]"
                  >
                    <p className="text-[11px] text-zinc-500">
                      {fixture.round} - {fixture.competition}
                    </p>
                    <p className="mt-0.5 text-[11px] text-zinc-500">{formatKickoffDate(fixture.kickoff)}</p>
                    <div className="mt-2 flex items-center justify-between gap-2 text-sm">
                      <div className="flex min-w-0 items-center gap-2">
                        <Image src={fixture.homeLogoUrl} alt={fixture.homeTeamName} width={18} height={18} className="h-[18px] w-[18px] rounded-full object-cover" />
                        <span className="truncate text-zinc-900">{fixture.homeTeamName}</span>
                      </div>
                      <span className="font-black text-zinc-900">
                        {fixture.homeScore} - {fixture.awayScore}
                      </span>
                      <div className="flex min-w-0 items-center gap-2">
                        <span className="truncate text-zinc-900">{fixture.awayTeamName}</span>
                        <Image src={fixture.awayLogoUrl} alt={fixture.awayTeamName} width={18} height={18} className="h-[18px] w-[18px] rounded-full object-cover" />
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            </section>

            <section className="rounded-2xl border border-[#d7dfec] bg-white p-4 shadow-[0_12px_24px_rgba(10,29,58,0.06)]">
              <h3 className="text-base font-black text-[#0a1d3a]">Prochains matchs</h3>
              <div className="mt-3 space-y-2.5">
                {upcomingFixtures.map((fixture, index) => (
                  <motion.article
                    key={fixture.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.28, delay: index * 0.05 + 0.1 }}
                    className="rounded-xl border border-[#e6ecf5] bg-[#fbfcff] p-3 transition-all duration-300 hover:-translate-y-[1px] hover:shadow-[0_10px_20px_rgba(10,29,58,0.07)]"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-[11px] text-zinc-500">
                        {fixture.round} - {fixture.competition}
                      </p>
                      <span className="rounded-full bg-[#ffe8ec] px-2 py-0.5 text-[10px] font-bold text-[#c81f34]">
                        A venir
                      </span>
                    </div>
                    <p className="mt-1 flex items-center gap-1 text-[11px] text-zinc-500">
                      <CalendarDays className="h-3 w-3" />
                      {formatKickoffDate(fixture.kickoff)} - {formatKickoffTime(fixture.kickoff)}
                    </p>
                    <div className="mt-2 flex items-center justify-between gap-2 text-sm">
                      <div className="flex min-w-0 items-center gap-2">
                        <Image src={fixture.homeLogoUrl} alt={fixture.homeTeamName} width={18} height={18} className="h-[18px] w-[18px] rounded-full object-cover" />
                        <span className="truncate text-zinc-900">{fixture.homeTeamName}</span>
                      </div>
                      <span className="font-bold text-zinc-500">vs</span>
                      <div className="flex min-w-0 items-center gap-2">
                        <span className="truncate text-zinc-900">{fixture.awayTeamName}</span>
                        <Image src={fixture.awayLogoUrl} alt={fixture.awayTeamName} width={18} height={18} className="h-[18px] w-[18px] rounded-full object-cover" />
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            </section>

            <section className="rounded-2xl border border-[#d7dfec] bg-white p-4 shadow-[0_12px_24px_rgba(10,29,58,0.06)]">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-[#ef233c]" />
                <p className="text-sm font-black uppercase tracking-[0.08em] text-[#0a1d3a]">Point API</p>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-zinc-600">
                Donnees demo dans `data/club/standings-data.ts`. Tu peux brancher une API
                reelle ensuite sans changer le design.
              </p>
            </section>
          </motion.aside>
        </div>
      </div>

      <Dialog
        open={isAddResultOpen}
        onOpenChange={(open) => (!open ? closeAddResultModal() : setIsAddResultOpen(true))}
      >
        <DialogContent className="max-h-[92vh] overflow-y-auto sm:max-w-[900px]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-[#0a1d3a]">Ajouter un resultat</DialogTitle>
            <DialogDescription>
              Le score est ajoute au bloc resultats et met automatiquement le classement a jour.
            </DialogDescription>
          </DialogHeader>

          <form className="space-y-5" onSubmit={handleAddResult}>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-zinc-700">Competition</label>
                <input
                  type="text"
                  value={formValues.competition}
                  onChange={(event) =>
                    setFormValues((prev) => ({
                      ...prev,
                      competition: event.target.value,
                    }))
                  }
                  className="h-11 w-full rounded-lg border border-zinc-300 bg-white px-3 text-sm text-zinc-800 focus:border-[#ef233c] focus:outline-none focus:ring-2 focus:ring-[#ef233c]/20"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-zinc-700">Journee / Tour</label>
                <input
                  type="text"
                  value={formValues.round}
                  onChange={(event) => setFormValues((prev) => ({ ...prev, round: event.target.value }))}
                  className="h-11 w-full rounded-lg border border-zinc-300 bg-white px-3 text-sm text-zinc-800 focus:border-[#ef233c] focus:outline-none focus:ring-2 focus:ring-[#ef233c]/20"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-zinc-700">Date</label>
                <input
                  type="date"
                  value={formValues.kickoffDate}
                  onChange={(event) =>
                    setFormValues((prev) => ({
                      ...prev,
                      kickoffDate: event.target.value,
                    }))
                  }
                  className="h-11 w-full rounded-lg border border-zinc-300 bg-white px-3 text-sm text-zinc-800 focus:border-[#ef233c] focus:outline-none focus:ring-2 focus:ring-[#ef233c]/20"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-zinc-700">Heure</label>
                <input
                  type="time"
                  value={formValues.kickoffTime}
                  onChange={(event) =>
                    setFormValues((prev) => ({
                      ...prev,
                      kickoffTime: event.target.value,
                    }))
                  }
                  className="h-11 w-full rounded-lg border border-zinc-300 bg-white px-3 text-sm text-zinc-800 focus:border-[#ef233c] focus:outline-none focus:ring-2 focus:ring-[#ef233c]/20"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-zinc-700">Equipe domicile</label>
                <select
                  value={formValues.homeTeamId}
                  onChange={(event) =>
                    setFormValues((prev) => ({
                      ...prev,
                      homeTeamId: event.target.value,
                    }))
                  }
                  className="h-11 w-full rounded-lg border border-zinc-300 bg-white px-3 text-sm text-zinc-800 focus:border-[#ef233c] focus:outline-none focus:ring-2 focus:ring-[#ef233c]/20"
                >
                  {mockStandingTeams.map((team) => (
                    <option key={team.id} value={team.id}>
                      {team.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-zinc-700">Equipe exterieur</label>
                <select
                  value={formValues.awayTeamId}
                  onChange={(event) =>
                    setFormValues((prev) => ({
                      ...prev,
                      awayTeamId: event.target.value,
                    }))
                  }
                  className="h-11 w-full rounded-lg border border-zinc-300 bg-white px-3 text-sm text-zinc-800 focus:border-[#ef233c] focus:outline-none focus:ring-2 focus:ring-[#ef233c]/20"
                >
                  {mockStandingTeams.map((team) => (
                    <option key={team.id} value={team.id}>
                      {team.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-zinc-700">Score domicile</label>
                <input
                  type="number"
                  min={0}
                  value={formValues.homeScore}
                  onChange={(event) =>
                    setFormValues((prev) => ({
                      ...prev,
                      homeScore: event.target.value,
                    }))
                  }
                  className="h-11 w-full rounded-lg border border-zinc-300 bg-white px-3 text-sm text-zinc-800 focus:border-[#ef233c] focus:outline-none focus:ring-2 focus:ring-[#ef233c]/20"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-zinc-700">Score exterieur</label>
                <input
                  type="number"
                  min={0}
                  value={formValues.awayScore}
                  onChange={(event) =>
                    setFormValues((prev) => ({
                      ...prev,
                      awayScore: event.target.value,
                    }))
                  }
                  className="h-11 w-full rounded-lg border border-zinc-300 bg-white px-3 text-sm text-zinc-800 focus:border-[#ef233c] focus:outline-none focus:ring-2 focus:ring-[#ef233c]/20"
                />
              </div>
            </div>

            {formError ? (
              <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                {formError}
              </p>
            ) : null}

            <DialogFooter className="gap-3 sm:justify-end">
              <button
                type="button"
                onClick={closeAddResultModal}
                className="rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-lg bg-[#ef233c] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#d71931]"
              >
                <Check className="h-4 w-4" />
                Enregistrer le score
              </button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
