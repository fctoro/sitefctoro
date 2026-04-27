'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { RiArrowRightLine, RiGroupLine, RiShareLine, RiTimerLine } from '@remixicon/react'
import { eventCards } from '@/data/events-data'
import type { LiveMatch } from '@/lib/live'

const heroStageImg = '/flag-day/victory-stage.jpg'

function normalizeVenueLabel(value?: string | null) {
  return (value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, ' ')
}

export default function LivePageContent({ liveMatch }: { liveMatch: LiveMatch }) {
  const [shareFeedback, setShareFeedback] = useState<string | null>(null)
  const sideEvents = eventCards.filter((card) => card.slug !== 'live')
  const hasVideo = Boolean(liveMatch.youtubeId)
  const hasScore = liveMatch.homeScore !== null || liveMatch.awayScore !== null
  const sanitizedVenue =
    normalizeVenueLabel(liveMatch.venue) === 'stade fc toro' ? '' : liveMatch.venue.trim()
  const hasVenue = Boolean(sanitizedVenue)

  const handleShare = async () => {
    const url = window.location.href

    try {
      if (navigator.share) {
        await navigator.share({
          title: 'FC TORO Live',
          text: 'Suivez le live FC TORO en direct.',
          url,
        })
        setShareFeedback('Lien partage')
      } else {
        await navigator.clipboard.writeText(url)
        setShareFeedback('Lien copie')
      }
    } catch {
      setShareFeedback('Partage annule')
    }

    window.setTimeout(() => setShareFeedback(null), 1800)
  }

  return (
    <div className="min-h-screen bg-[#061225] text-white">
      <main className="pb-16 pt-[180px] lg:pt-[160px]">
        {/* En-tête simplifié */}
        <section className="px-4 pb-10 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[1200px]">
            <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
              <div>
                <h1 className="text-4xl font-black uppercase tracking-[-0.04em] text-white sm:text-6xl lg:text-7xl">
                  Live Diffusion
                </h1>
                <p className="mt-2 text-[10px] font-black uppercase tracking-[0.2em] text-[#ef233c]">
                  Direct & Matchs FC TORO
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={handleShare}
                  className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/8 px-5 py-3 text-[11px] font-black uppercase tracking-[0.16em] transition-colors hover:bg-white/12"
                >
                  <RiShareLine className="h-4 w-4" />
                  Partager
                </button>

                <Link
                  href="/inscription/fans"
                  className="inline-flex items-center gap-2 rounded-full bg-[#ef233c] px-5 py-3 text-[11px] font-black uppercase tracking-[0.16em] text-white shadow-[0_14px_28px_rgba(239,35,60,0.28)] transition-all hover:bg-[#d91b34]"
                >
                  Devenir fan
                  <RiArrowRightLine className="h-4 w-4" />
                </Link>

                {shareFeedback ? (
                  <span className="text-[11px] font-black uppercase tracking-[0.14em] text-[#ffd8de]">
                    {shareFeedback}
                  </span>
                ) : null}
              </div>
            </div>
          </div>
        </section>

        {/* Section Video Centrée */}
        <section className="px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[1200px]">
            <div className="relative aspect-video overflow-hidden rounded-[32px] border border-white/10 bg-black shadow-[0_32px_64px_-16px_rgba(0,0,0,0.6)]">
              {hasVideo ? (
                <>
                  <iframe
                    className="absolute inset-0 h-full w-full"
                    src={`https://www.youtube-nocookie.com/embed/${liveMatch.youtubeId}?rel=0&modestbranding=1&autoplay=1`}
                    title="FC TORO Live"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />

                  <div className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between gap-3 bg-[linear-gradient(180deg,rgba(6,11,22,0.88)_0%,rgba(6,11,22,0.2)_72%,transparent_100%)] p-4 sm:p-6">
                    <span className="flex items-center gap-2 rounded-full border border-[#ef233c]/35 bg-[#ef233c]/18 px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-white backdrop-blur-md">
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#ef233c]" />
                      {liveMatch.isLive ? 'En direct' : 'Video officielle'}
                    </span>
                    <span className="rounded-full bg-black/55 px-4 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-white/82 backdrop-blur-md">
                      FC TORO Live
                    </span>
                  </div>

                  <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-[linear-gradient(180deg,transparent_0%,rgba(6,11,22,0.92)_100%)] p-4 sm:p-6">
                    <p className="text-xl font-black uppercase tracking-[0.04em] text-white sm:text-2xl lg:text-3xl">
                      {liveMatch.headline}
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <Image
                    src={heroStageImg}
                    alt="Diffusion FC TORO"
                    fill
                    priority
                    sizes="(min-width: 1200px) 1200px, 100vw"
                    className="object-cover object-center opacity-40"
                  />
                  <div className="absolute inset-0 flex items-center justify-center px-6 text-center">
                    <div className="max-w-[620px]">
                      <p className="text-[10px] font-black uppercase tracking-[0.24em] text-[#ef233c]">
                        Diffusion a venir
                      </p>
                      <p className="mt-4 text-3xl font-black uppercase sm:text-4xl lg:text-5xl">
                        {liveMatch.headline}
                      </p>
                      <div className="mx-auto mt-6 h-px w-12 bg-[#ef233c]/40" />
                      <p className="mt-6 text-sm font-semibold uppercase tracking-[0.12em] text-white/60">
                        La video sera visible ici des qu un lien YouTube sera ajoute au live.
                      </p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </section>

        <section className="px-4 pb-16 pt-6 sm:px-6 lg:px-8 lg:pt-8">
          <div className="mx-auto grid max-w-[1200px] gap-6 lg:grid-cols-[minmax(0,1.15fr)_320px]">
            <div className="space-y-6">
              <div className="rounded-[28px] border border-white/10 bg-[#112542] p-4 shadow-[0_18px_36px_rgba(0,0,0,0.18)] sm:p-5">
                <div className="grid gap-4 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
                  <div className="flex items-center gap-3">
                    <div className="relative h-16 w-16 overflow-hidden rounded-[18px] border border-white/12 bg-white/8 p-2.5">
                      <Image
                        src={liveMatch.home.logo}
                        alt={liveMatch.home.name}
                        fill
                        sizes="64px"
                        className="object-contain p-2.5"
                      />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.16em] text-white/55">Club domicile</p>
                      <p className="mt-1 text-[clamp(1.1rem,2vw,1.6rem)] font-black uppercase leading-[0.94] text-white">
                        {liveMatch.home.name}
                      </p>
                    </div>
                  </div>

                  <div className="rounded-[22px] border border-white/10 bg-white/6 px-4 py-4 text-center">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#ef233c]">Match</p>
                    <p className="mt-2 text-sm font-black uppercase text-white">{liveMatch.startsAt}</p>
                    {hasVenue ? (
                      <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.16em] text-white/50">
                        {sanitizedVenue}
                      </p>
                    ) : null}
                    <div className="mt-3">
                      {hasScore ? (
                        <p className="text-[clamp(1.8rem,4vw,2.5rem)] font-black uppercase leading-none text-white">
                          {liveMatch.homeScore ?? 0} - {liveMatch.awayScore ?? 0}
                        </p>
                      ) : (
                        <p className="text-[10px] font-black uppercase tracking-[0.18em] text-white/58">
                          {liveMatch.isLive ? 'En direct' : 'Bientot'}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-start gap-3 sm:flex-row-reverse">
                    <div className="relative h-16 w-16 overflow-hidden rounded-[18px] border border-white/12 bg-white/8 p-2.5">
                      <Image
                        src={liveMatch.away.logo}
                        alt={liveMatch.away.name}
                        fill
                        sizes="64px"
                        className="object-contain p-2.5"
                      />
                    </div>
                    <div className="sm:text-right">
                      <p className="text-[10px] font-black uppercase tracking-[0.16em] text-white/55">Club visiteur</p>
                      <p className="mt-1 text-[clamp(1.1rem,2vw,1.6rem)] font-black uppercase leading-[0.94] text-white">
                        {liveMatch.away.name}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-[28px] border border-white/10 bg-white/5 p-6">
                <h3 className="flex items-center gap-2 text-sm font-black uppercase tracking-[0.12em] text-white">
                  <RiGroupLine className="h-4 w-4 text-[#ef233c]" />
                  Autres rendez-vous
                </h3>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {sideEvents.map((event) => (
                    <Link
                      key={event.slug}
                      href={event.href}
                      className="block rounded-2xl border border-white/10 bg-white/5 p-4 transition-colors hover:border-[#ef233c]/40 hover:bg-white/8"
                    >
                      <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#ef233c]">
                        {event.badge}
                      </p>
                      <p className="mt-2 text-sm font-black uppercase">{event.title}</p>
                      <p className="mt-2 text-sm leading-relaxed text-white/65">{event.summary}</p>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-[28px] bg-[#ef233c] p-6 text-center shadow-[0_20px_34px_rgba(239,35,60,0.3)]">
                <p className="text-xs font-black uppercase tracking-[0.18em] leading-none">
                  Abonnez-vous
                </p>
                <p className="mt-3 text-sm font-bold leading-tight">
                  Recevez une notification avant chaque match live FC TORO.
                </p>
                <Link
                  href="/inscription/fans"
                  className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#0a1d3a] py-4 text-[10px] font-black uppercase tracking-[0.18em] transition-all hover:scale-[1.01]"
                >
                  Devenir fan
                  <RiArrowRightLine className="h-4 w-4" />
                </Link>
              </div>

              <div className="rounded-[28px] border border-white/10 bg-white/5 p-6 shadow-[0_18px_36px_rgba(0,0,0,0.18)]">
                <h3 className="flex items-center gap-2 text-sm font-black uppercase tracking-[0.12em] text-white">
                  <RiTimerLine className="h-4 w-4 text-[#ef233c]" />
                  Infos match
                </h3>

                <div className="mt-5 space-y-3">
                  <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4">
                    <p className="text-[10px] font-black uppercase tracking-[0.16em] text-white/55">Competition</p>
                    <p className="mt-2 text-sm font-black uppercase text-white">{liveMatch.competition}</p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4">
                    <p className="text-[10px] font-black uppercase tracking-[0.16em] text-white/55">Horaire</p>
                    <p className="mt-2 text-sm font-black uppercase text-white">{liveMatch.startsAt}</p>
                  </div>

                  {hasVenue ? (
                    <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4">
                      <p className="text-[10px] font-black uppercase tracking-[0.16em] text-white/55">Lieu</p>
                      <p className="mt-2 text-sm font-black uppercase text-white">{sanitizedVenue}</p>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
