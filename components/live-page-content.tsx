'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  RiGroupLine,
  RiShareLine,
  RiTimerLine,
} from '@remixicon/react'
import { eventCards, liveFeed } from '@/data/events-data'
import type { LiveMatch } from '@/lib/live'

export default function LivePageContent({ liveMatch }: { liveMatch: LiveMatch }) {
  const [shareFeedback, setShareFeedback] = useState<string | null>(null)
  const sideEvents = eventCards.filter((card) => card.slug !== 'live')
  const hasVideo = Boolean(liveMatch.youtubeId)

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
    <div className="min-h-screen bg-[#08162f] text-white">
      <main className="min-h-[calc(100vh-100px)] pb-14 pt-[116px] lg:pt-[78px]">
        <section className="border-b border-white/10 px-4 py-8 sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-[1200px] flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-4">
              <div className={`h-3.5 w-3.5 rounded-full shadow-[0_0_18px_rgba(239,35,60,0.85)] ${liveMatch.isLive ? 'animate-pulse bg-[#ef233c]' : 'bg-white/40'}`} />
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.32em] text-[#ef233c]">
                  Direct club
                </p>
                <h1 className="mt-2 text-2xl font-black uppercase tracking-tight sm:text-3xl">
                  Live / Diffusion
                </h1>
              </div>
            </div>

            <div className="rounded-full border border-white/10 bg-white/5 px-5 py-2 text-[11px] font-black uppercase tracking-[0.28em] text-white/70">
              {liveMatch.competition}
            </div>

            <div className="flex items-center gap-3">
              {shareFeedback ? (
                <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#ffd7de]">
                  {shareFeedback}
                </span>
              ) : null}

              <button
                type="button"
                onClick={handleShare}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2 text-xs font-bold uppercase tracking-[0.16em] transition-all hover:bg-white/10"
              >
                <RiShareLine className="h-4 w-4" />
                Partager
              </button>
            </div>
          </div>
        </section>

        <section className="px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
          <div className="mx-auto grid max-w-[1200px] gap-8 lg:grid-cols-[minmax(0,1.7fr)_340px]">
            <div className="space-y-8">
              <div className="grid gap-4 rounded-[32px] border border-white/10 bg-white/5 p-5 shadow-[0_18px_36px_rgba(0,0,0,0.18)] sm:grid-cols-[1fr_auto_1fr] sm:items-center">
                <div className="flex items-center gap-4">
                  <div className="relative h-14 w-14 overflow-hidden rounded-full border border-white/10 bg-white/5">
                    <Image src={liveMatch.home.logo} alt={liveMatch.home.name} fill className="object-cover" />
                  </div>
                  <div>
                    <p className="text-[11px] font-black uppercase tracking-[0.12em] text-white/55">Club domicile</p>
                    <p className="text-lg font-black uppercase">{liveMatch.home.name}</p>
                  </div>
                </div>

                <div className="text-center">
                  <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#ef233c]">Programme</p>
                  <p className="mt-2 text-sm font-bold uppercase text-white/80">{liveMatch.startsAt}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.14em] text-white/45">{liveMatch.venue}</p>
                  {liveMatch.homeScore !== null || liveMatch.awayScore !== null ? (
                    <p className="mt-3 text-2xl font-black uppercase">
                      {liveMatch.homeScore ?? 0} - {liveMatch.awayScore ?? 0}
                    </p>
                  ) : null}
                </div>

                <div className="flex items-center justify-start gap-4 sm:justify-end">
                  <div className="text-right">
                    <p className="text-[11px] font-black uppercase tracking-[0.12em] text-white/55">Club visiteur</p>
                    <p className="text-lg font-black uppercase">{liveMatch.away.name}</p>
                  </div>
                  <div className="relative h-14 w-14 overflow-hidden rounded-full border border-white/10 bg-white/5">
                    <Image src={liveMatch.away.logo} alt={liveMatch.away.name} fill className="object-cover" />
                  </div>
                </div>
              </div>

              <div className="relative aspect-video overflow-hidden rounded-[34px] border border-white/10 bg-black ring-1 ring-white/8 shadow-[0_20px_40px_rgba(0,0,0,0.28)]">
                {hasVideo ? (
                  <>
                    <iframe
                      className="absolute inset-0 h-full w-full"
                      src={`https://www.youtube-nocookie.com/embed/${liveMatch.youtubeId}?rel=0&modestbranding=1`}
                      title="FC TORO Live"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    />

                    <div className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between bg-[linear-gradient(180deg,rgba(6,11,22,0.86)_0%,rgba(6,11,22,0.2)_70%,transparent_100%)] p-5">
                      <span className="rounded-full border border-[#ef233c]/35 bg-[#ef233c]/18 px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-white shadow-[0_10px_24px_rgba(0,0,0,0.28)]">
                        {liveMatch.isLive ? 'En direct' : 'Video officielle'}
                      </span>
                      <span className="rounded-full bg-black/55 px-4 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-white/82">
                        FC TORO Live
                      </span>
                    </div>

                    <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-[linear-gradient(180deg,transparent_0%,rgba(6,11,22,0.9)_100%)] p-5">
                      <p className="text-lg font-black uppercase tracking-[0.08em] text-white sm:text-xl">
                        {liveMatch.headline}
                      </p>
                    </div>
                  </>
                ) : (
                  <div className="flex h-full items-center justify-center bg-[radial-gradient(circle_at_top,rgba(239,35,60,0.18),transparent_45%),linear-gradient(180deg,#091221_0%,#050b15_100%)] px-6 text-center">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.24em] text-[#ef233c]">
                        Diffusion a venir
                      </p>
                      <p className="mt-4 text-2xl font-black uppercase sm:text-3xl">
                        {liveMatch.headline}
                      </p>
                      <p className="mt-4 text-sm font-semibold uppercase tracking-[0.12em] text-white/60">
                        La video sera visible ici des qu'un lien YouTube sera ajoute au live.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-[32px] border border-white/10 bg-white/5 p-6 shadow-[0_18px_36px_rgba(0,0,0,0.18)]">
                <h3 className="flex items-center gap-2 border-b border-white/10 pb-4 text-xs font-black uppercase tracking-[0.18em]">
                  <RiTimerLine className="h-4 w-4 text-[#ef233c]" />
                  Match feed
                </h3>

                <div className="mt-5 space-y-4">
                  {liveFeed.map((entry) => (
                    <div key={`${entry.label}-${entry.title}`} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#ef233c]">
                        {entry.label}
                      </p>
                      <p className="mt-2 text-sm font-black uppercase">{entry.title}</p>
                      <p className="mt-2 text-sm leading-relaxed text-white/65">{entry.body}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[32px] bg-[#ef233c] p-7 text-center shadow-[0_22px_34px_rgba(239,35,60,0.34)]">
                <p className="text-xs font-black uppercase tracking-[0.18em] leading-none">
                  Abonnez-vous
                </p>
                <p className="mt-3 text-sm font-bold leading-tight">
                  Recevez une notification avant chaque match live FC TORO.
                </p>
                <button className="mt-5 w-full rounded-2xl bg-[#0a1d3a] py-4 text-[10px] font-black uppercase tracking-[0.18em] transition-all hover:scale-[1.01]">
                  Rejoindre directement
                </button>
              </div>

              <div className="rounded-[32px] border border-white/10 bg-white/5 p-6">
                <h3 className="flex items-center gap-2 text-sm font-black uppercase tracking-[0.12em] text-white">
                  <RiGroupLine className="h-4 w-4 text-[#ef233c]" />
                  Autres rendez-vous
                </h3>
                <div className="mt-4 space-y-3">
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
          </div>
        </section>
      </main>
    </div>
  )
}
