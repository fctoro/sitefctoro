import type { Metadata } from 'next'
import { HomeNavbar } from '@/components/home-navbar'
import EventsPageContent from '@/components/events-page-content'
import { eventsOverviewStats } from '@/data/events-data'

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

        <EventsPageContent />
      </main>
    </div>
  )
}
