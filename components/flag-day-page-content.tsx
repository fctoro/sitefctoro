import Image from 'next/image'
import Link from 'next/link'
import {
  RiArrowRightLine,
  RiCalendarEventLine,
  RiTrophyLine,
} from '@remixicon/react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { flagDayFixtures, flagDayStandings } from '@/data/events-data'
import { ClubFixture, ClubStandingRow, MatchFormResult } from '@/types/club'

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

export default function FlagDayPageContent() {
  const standings = sortStandings(flagDayStandings)
  const leader = standings[0]
  const fcToro = standings.find((row) => row.teamId === 'team-fctoro')
  const recentFixtures: ClubFixture[] = [...flagDayFixtures]
    .filter((fixture) => fixture.status === 'FT')
    .sort((a, b) => new Date(b.kickoff).getTime() - new Date(a.kickoff).getTime())
    .slice(0, 4)

  const upcomingFixtures: ClubFixture[] = [...flagDayFixtures]
    .filter((fixture) => fixture.status === 'A venir')
    .sort((a, b) => new Date(a.kickoff).getTime() - new Date(b.kickoff).getTime())
    .slice(0, 4)

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f4f6fb_0%,#edf2f8_100%)] text-[#0a1d3a]">
      <main className="pb-14 pt-[116px] lg:pt-[78px]">
        <section className="relative overflow-hidden border-b border-[#dbe4f0] bg-[#0a1d3a] px-4 py-10 text-white sm:px-6 sm:py-12 lg:px-8 lg:py-12 xl:py-14">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(239,35,60,0.18),transparent_32%)]" />
          <div className="mx-auto grid max-w-[1200px] gap-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start xl:grid-cols-[minmax(0,1.05fr)_360px] xl:gap-8">
            <div className="relative z-10">
              <p className="text-[10px] font-black uppercase tracking-[0.34em] text-[#ef233c]">
                Tournoi club
              </p>
              <h1 className="mt-4 max-w-[640px] text-[clamp(2.1rem,4vw,4.25rem)] font-black uppercase leading-[0.9] tracking-[-0.05em]">
                Flag Day
                <br />
                Classement
              </h1>
              <p className="mt-4 max-w-[620px] text-[15px] leading-relaxed text-white/72 sm:text-lg">
                Classement general, resultats recents et prochaines affiches du tournoi Flag Day.
                La structure est deja prete pour recevoir le classement officiel quand tu l enverras.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-black uppercase tracking-[0.14em] text-white/76">
                  <RiTrophyLine className="h-4 w-4 text-[#ef233c]" />
                  Leader: {leader.teamName}
                </div>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-black uppercase tracking-[0.14em] text-white/76">
                  <RiCalendarEventLine className="h-4 w-4 text-[#ef233c]" />
                  Finale: 18 mai 2026
                </div>
              </div>
            </div>

            <div className="relative z-10 self-start rounded-[28px] border border-white/10 bg-white/6 p-5 backdrop-blur lg:p-6">
              <p className="text-[10px] font-black uppercase tracking-[0.22em] text-white/48">
                Focus FC TORO
              </p>
              <p className="mt-3 text-4xl font-black leading-none text-white">{fcToro?.pts ?? '-'} pts</p>
              <p className="mt-2 text-sm font-semibold text-white/72">
                {fcToro ? `${fcToro.wins} victoires, ${fcToro.draws} nuls, ${fcToro.losses} defaites` : 'En attente des donnees'}
              </p>
              <Link
                href="/evenements/live"
                className="mt-6 inline-flex items-center gap-2 text-sm font-black uppercase tracking-[0.12em] text-[#ffd5db]"
              >
                Suivre le live <RiArrowRightLine className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        <section className="px-4 py-8 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[1200px]">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl border border-[#d7dfec] bg-white px-5 py-4">
                <p className="text-[11px] font-black uppercase tracking-[0.12em] text-[#6a7f9f]">Leader actuel</p>
                <p className="mt-2 text-xl font-black text-[#0a1d3a]">{leader.teamName}</p>
              </div>
              <div className="rounded-2xl border border-[#d7dfec] bg-white px-5 py-4">
                <p className="text-[11px] font-black uppercase tracking-[0.12em] text-[#6a7f9f]">Position FC TORO</p>
                <p className="mt-2 text-xl font-black text-[#0a1d3a]">
                  {fcToro ? `${standings.findIndex((row) => row.teamId === 'team-fctoro') + 1}e` : '-'}
                </p>
              </div>
              <div className="rounded-2xl border border-[#d7dfec] bg-white px-5 py-4">
                <p className="text-[11px] font-black uppercase tracking-[0.12em] text-[#6a7f9f]">Equipes suivies</p>
                <p className="mt-2 text-xl font-black text-[#0a1d3a]">{standings.length}</p>
              </div>
            </div>

            <div className="mt-6 space-y-6">
              <section className="overflow-hidden rounded-[28px] border border-[#d7dfec] bg-white shadow-[0_14px_30px_rgba(10,29,58,0.08)]">
                <div className="border-b border-[#ebf0f7] px-5 py-4">
                  <h3 className="text-xl font-black text-[#0a1d3a]">Classement Flag Day</h3>
                  <p className="mt-1 text-sm text-[#5b6f91]">
                    Tableau principal du tournoi avec FC TORO mis en evidence.
                  </p>
                </div>

                <Table>
                  <TableHeader className="border-b border-[#eef2f8]">
                    <TableRow className="hover:bg-transparent">
                      <TableHead className="px-4 py-3 text-[11px] font-black uppercase tracking-[0.08em] text-[#6a7f9f]">#</TableHead>
                      <TableHead className="px-4 py-3 text-[11px] font-black uppercase tracking-[0.08em] text-[#6a7f9f]">Equipe</TableHead>
                      <TableHead className="px-2 py-3 text-center text-[11px] font-black uppercase tracking-[0.08em] text-[#6a7f9f]">PTS</TableHead>
                      <TableHead className="px-2 py-3 text-center text-[11px] font-black uppercase tracking-[0.08em] text-[#6a7f9f]">J</TableHead>
                      <TableHead className="px-2 py-3 text-center text-[11px] font-black uppercase tracking-[0.08em] text-[#6a7f9f]">W</TableHead>
                      <TableHead className="px-2 py-3 text-center text-[11px] font-black uppercase tracking-[0.08em] text-[#6a7f9f]">L</TableHead>
                      <TableHead className="px-2 py-3 text-center text-[11px] font-black uppercase tracking-[0.08em] text-[#6a7f9f]">N</TableHead>
                      <TableHead className="px-2 py-3 text-center text-[11px] font-black uppercase tracking-[0.08em] text-[#6a7f9f]">GF</TableHead>
                      <TableHead className="px-2 py-3 text-center text-[11px] font-black uppercase tracking-[0.08em] text-[#6a7f9f]">GA</TableHead>
                      <TableHead className="px-2 py-3 text-center text-[11px] font-black uppercase tracking-[0.08em] text-[#6a7f9f]">+/-</TableHead>
                      <TableHead className="px-4 py-3 text-center text-[11px] font-black uppercase tracking-[0.08em] text-[#6a7f9f]">5 derniers</TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {standings.map((row, index) => {
                      const goalDiff = row.goalsFor - row.goalsAgainst
                      const isToro = row.teamId === 'team-fctoro'

                      return (
                        <TableRow
                          key={row.teamId}
                          className={isToro ? 'bg-[linear-gradient(98deg,rgba(239,35,60,0.12),rgba(26,78,163,0.08))]' : 'hover:bg-[#f8fbff]'}
                        >
                          <TableCell className="px-4 py-3 text-sm font-black text-[#0a1d3a]">{index + 1}</TableCell>
                          <TableCell className="px-4 py-3">
                            <div className="flex items-center gap-3">
                              <Image
                                src={row.logoUrl}
                                alt={row.teamName}
                                width={26}
                                height={26}
                                className="h-6 w-6 rounded-full object-cover"
                                unoptimized
                              />
                              <span className="text-sm font-semibold text-[#0a1d3a]">{row.teamName}</span>
                            </div>
                          </TableCell>
                          <TableCell className="px-2 py-3 text-center text-sm font-black text-[#0a1d3a]">{row.pts}</TableCell>
                          <TableCell className="px-2 py-3 text-center text-sm text-[#5b6f91]">{row.played}</TableCell>
                          <TableCell className="px-2 py-3 text-center text-sm text-[#5b6f91]">{row.wins}</TableCell>
                          <TableCell className="px-2 py-3 text-center text-sm text-[#5b6f91]">{row.losses}</TableCell>
                          <TableCell className="px-2 py-3 text-center text-sm text-[#5b6f91]">{row.draws}</TableCell>
                          <TableCell className="px-2 py-3 text-center text-sm text-[#5b6f91]">{row.goalsFor}</TableCell>
                          <TableCell className="px-2 py-3 text-center text-sm text-[#5b6f91]">{row.goalsAgainst}</TableCell>
                          <TableCell className="px-2 py-3 text-center text-sm font-semibold text-[#0a1d3a]">
                            {goalDiff > 0 ? `+${goalDiff}` : goalDiff}
                          </TableCell>
                          <TableCell className="px-4 py-3">
                            <div className="flex items-center justify-center gap-1.5">
                              {row.form.map((result, resultIndex) => (
                                <span
                                  key={`${row.teamId}-${resultIndex}`}
                                  className={`inline-flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-black ${formBadgeClasses[result]}`}
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
              </section>

              <div className="grid gap-6 xl:grid-cols-2">
                <section className="rounded-[28px] border border-[#d7dfec] bg-white p-5 shadow-[0_14px_30px_rgba(10,29,58,0.08)]">
                  <h3 className="text-base font-black text-[#0a1d3a]">Resultats recents</h3>
                  <div className="mt-4 space-y-3">
                    {recentFixtures.map((fixture) => (
                      <article
                        key={fixture.id}
                        className="rounded-2xl border border-[#e7edf6] bg-[#fbfcff] px-4 py-3"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <p className="text-[12px] text-[#6a7f9f]">
                            {fixture.round} - {fixture.competition}
                          </p>
                          <p className="text-[12px] text-[#6a7f9f]">
                            {formatKickoffDate(fixture.kickoff)}
                          </p>
                        </div>
                        <div className="mt-3 grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-3">
                          <div className="flex min-w-0 items-center gap-2">
                            <Image
                              src={fixture.homeLogoUrl}
                              alt={fixture.homeTeamName}
                              width={20}
                              height={20}
                              className="h-5 w-5 rounded-full object-cover"
                              unoptimized
                            />
                            <span className="truncate text-sm font-semibold text-[#0a1d3a]">
                              {fixture.homeTeamName}
                            </span>
                          </div>

                          <span className="text-base font-black text-[#0a1d3a]">
                            {fixture.homeScore} - {fixture.awayScore}
                          </span>

                          <div className="flex min-w-0 items-center justify-end gap-2">
                            <span className="min-w-0 truncate text-right text-sm font-semibold text-[#0a1d3a]">
                              {fixture.awayTeamName}
                            </span>
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
                      </article>
                    ))}
                  </div>
                </section>

                <section className="rounded-[28px] border border-[#d7dfec] bg-white p-5 shadow-[0_14px_30px_rgba(10,29,58,0.08)]">
                  <h3 className="text-base font-black text-[#0a1d3a]">Prochains matchs</h3>
                  <div className="mt-4 space-y-3">
                    {upcomingFixtures.map((fixture) => (
                      <article
                        key={fixture.id}
                        className="rounded-2xl border border-[#e7edf6] bg-[#fbfcff] px-4 py-3"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <p className="text-[12px] text-[#6a7f9f]">
                            {fixture.round} - {fixture.competition}
                          </p>
                          <span className="rounded-full bg-[#ffe9ed] px-2 py-1 text-[10px] font-black uppercase tracking-[0.08em] text-[#c81f34]">
                            A venir
                          </span>
                        </div>

                        <p className="mt-1 text-[12px] text-[#6a7f9f]">
                          {formatKickoffDate(fixture.kickoff)} - {formatKickoffTime(fixture.kickoff)}
                        </p>

                        <div className="mt-3 grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-3">
                          <div className="flex min-w-0 items-center gap-2">
                            <Image
                              src={fixture.homeLogoUrl}
                              alt={fixture.homeTeamName}
                              width={20}
                              height={20}
                              className="h-5 w-5 rounded-full object-cover"
                              unoptimized
                            />
                            <span className="truncate text-sm font-semibold text-[#0a1d3a]">
                              {fixture.homeTeamName}
                            </span>
                          </div>

                          <span className="text-base font-black text-[#6a7f9f]">vs</span>

                          <div className="flex min-w-0 items-center justify-end gap-2">
                            <span className="min-w-0 truncate text-right text-sm font-semibold text-[#0a1d3a]">
                              {fixture.awayTeamName}
                            </span>
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
                      </article>
                    ))}
                  </div>
                </section>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
