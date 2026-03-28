import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { HomeNavbar } from '@/components/home-navbar'
import { eventCards, eventsOverviewStats } from '@/data/events-data'

export const metadata: Metadata = {
  title: 'Evenements | FC TORO',
  description: 'Live, Vertieres Cup et Flag Day dans une section evenement dediee.',
}

export default function EvenementsPage() {
  return (
    <div className="min-h-screen bg-[#f2f2f4] text-[#0a1d3a]">
      <HomeNavbar anchorPrefix="/" />

      <main className="pt-[116px] lg:pt-[78px]">
        <section className="relative overflow-hidden bg-[#0a1d3a] px-4 py-14 text-white sm:px-6 lg:px-8 lg:py-18">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(239,35,60,0.16),transparent_30%)]" />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#ef233c] to-transparent" />

          <div className="relative mx-auto max-w-[1200px]">
            <p className="text-[10px] font-black uppercase tracking-[0.38em] text-[#ef233c]">
              Section evenement
            </p>
            <h1 className="mt-4 text-[clamp(2.5rem,5vw,5.2rem)] font-black uppercase leading-[0.88] tracking-[-0.05em]">
              Live, Vertieres Cup
              <br />
              et Flag Day
            </h1>
            <p className="mt-6 max-w-[720px] text-base leading-relaxed text-white/74 sm:text-lg">
              Une section dediee aux grands rendez-vous FC TORO: diffusion live, inscription
              d equipes et suivi des classements de tournoi.
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {eventsOverviewStats.map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-white/12 bg-white/6 px-5 py-4"
                >
                  <p className="text-3xl font-black leading-none text-white">{item.value}</p>
                  <p className="mt-2 text-sm font-semibold uppercase tracking-[0.08em] text-white/70">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="evenements" className="px-4 py-14 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[1200px]">
            <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.34em] text-[#ef233c]">
                  Parcours
                </p>
                <h2 className="mt-3 text-[clamp(2rem,4vw,3.6rem)] font-black uppercase leading-[0.92] tracking-[-0.05em] text-[#0a1d3a]">
                  Trois pages,
                  <br />
                  une meme energie club.
                </h2>
              </div>

              <p className="max-w-[440px] text-sm font-semibold leading-relaxed text-[#5b6f91] sm:text-base">
                Clique sur la page a ouvrir selon ton besoin: suivre un live, inscrire une
                equipe a Vertieres Cup ou consulter le classement Flag Day.
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              {eventCards.map((card) => (
                <article
                  key={card.slug}
                  className="group overflow-hidden rounded-[30px] border border-[#d7dfec] bg-white shadow-[0_18px_32px_rgba(10,29,58,0.08)]"
                >
                  <div className="relative h-[280px] overflow-hidden bg-[#0a1d3a]">
                    <Image
                      src={card.image}
                      alt={card.title}
                      fill
                      sizes="(min-width: 1024px) 33vw, 100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,29,58,0.08)_0%,rgba(10,29,58,0.88)_100%)]" />

                    <div className="absolute left-5 top-5 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-white">
                      {card.badge}
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/72">
                        {card.dateLabel}
                      </p>
                      <h3 className="mt-2 text-3xl font-black uppercase leading-[0.92] tracking-[-0.04em]">
                        {card.title}
                      </h3>
                    </div>
                  </div>

                  <div className="space-y-5 p-6">
                    <p className="text-sm leading-relaxed text-[#5b6f91] sm:text-[15px]">
                      {card.summary}
                    </p>

                    <Link
                      href={card.href}
                      className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-[0.14em] text-[#ef233c] transition-transform duration-300 group-hover:translate-x-1"
                    >
                      {card.cta}
                      <span aria-hidden="true">+</span>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
