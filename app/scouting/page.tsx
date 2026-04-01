import type { Metadata } from 'next'
import Link from 'next/link'
import { RiArrowRightLine, RiEyeLine, RiFileChartLine, RiRadarLine } from '@remixicon/react'
import { HomeNavbar } from '@/components/home-navbar'

export const metadata: Metadata = {
  title: 'Scouting | FC TORO',
  description: 'Le scouting FC TORO pour observer, documenter et orienter les profils suivis par le club.',
}

const scoutingFlow = [
  {
    icon: RiEyeLine,
    title: 'Observer',
    body: 'Voir le joueur dans son role, ses deplacements, sa concentration et sa reponse aux differentes situations.',
  },
  {
    icon: RiRadarLine,
    title: 'Comparer',
    body: 'Relire ses actions dans leur contexte: niveau du match, densite de jeu, opposition et mission reelle.',
  },
  {
    icon: RiFileChartLine,
    title: 'Restituer',
    body: 'Produire une lecture claire, utile et exploitable par le staff technique ou le recrutement.',
  },
]

export default function ScoutingPage() {
  return (
    <div className="min-h-screen bg-[#f4f6fb] text-[#0a1d3a]">
      <HomeNavbar anchorPrefix="/" />

      <main className="pt-[116px] lg:pt-[78px]">
        <section className="relative overflow-hidden border-b border-[#dbe4f0] bg-white px-4 py-12 sm:px-6 lg:px-8 lg:py-14">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(239,35,60,0.12),transparent_28%)]" />
          <div className="mx-auto max-w-[1200px]">
            <p className="text-[10px] font-black uppercase tracking-[0.34em] text-[#ef233c]">
              Academie
            </p>
            <div className="mt-4 grid gap-8 lg:grid-cols-[1fr_340px] lg:items-end">
              <div>
                <h1 className="text-[clamp(2rem,4vw,4rem)] font-black uppercase leading-[0.88] tracking-[-0.05em]">
                  Scouting
                </h1>
                <p className="mt-5 max-w-[760px] text-base leading-relaxed text-[#5b6f91] sm:text-lg">
                  Le scouting FC TORO doit transformer l observation en information utile. Le but
                  n est pas d accumuler des notes, mais de rendre les profils lisibles pour une
                  vraie decision.
                </p>
              </div>

              <div className="rounded-[28px] border border-[#dbe4f0] bg-[#f8fbff] p-6 shadow-[0_14px_26px_rgba(10,29,58,0.06)]">
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#6d82a3]">
                  Principe
                </p>
                <p className="mt-3 text-2xl font-black uppercase leading-tight text-[#0a1d3a]">
                  Voir juste avant de juger vite
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-8 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-[1200px] gap-6 xl:grid-cols-[320px_minmax(0,1fr)]">
            <aside className="rounded-[30px] border border-[#dbe4f0] bg-white p-6 shadow-[0_18px_30px_rgba(10,29,58,0.08)]">
              <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#ef233c]">
                Ce que le club cherche
              </p>
              <div className="mt-5 space-y-3">
                {[
                  'Des comportements repetables.',
                  'Une vraie comprehension du role.',
                  'Une marge de progression lisible.',
                  'Un profil capable de servir le collectif.',
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-[#e6edf7] bg-[#f8fbff] px-4 py-4 text-sm leading-relaxed text-[#556b8d]"
                  >
                    {item}
                  </div>
                ))}
              </div>

              <Link
                href="/contact"
                className="mt-8 inline-flex items-center gap-2 text-sm font-black uppercase tracking-[0.12em] text-[#ef233c]"
              >
                Contacter le club
                <RiArrowRightLine className="h-4 w-4" />
              </Link>
            </aside>

            <section className="grid gap-4 md:grid-cols-3">
              {scoutingFlow.map((item, index) => (
                <article
                  key={item.title}
                  className="rounded-[30px] border border-[#dbe4f0] bg-white p-6 shadow-[0_18px_30px_rgba(10,29,58,0.08)]"
                >
                  <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#7a90b1]">
                    Etape 0{index + 1}
                  </p>
                  <item.icon className="mt-5 h-8 w-8 text-[#ef233c]" />
                  <h2 className="mt-5 text-lg font-black uppercase text-[#0a1d3a]">{item.title}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-[#556b8d]">{item.body}</p>
                </article>
              ))}
            </section>
          </div>
        </section>
      </main>
    </div>
  )
}
