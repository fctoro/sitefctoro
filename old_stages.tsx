import Link from 'next/link'
import { HomeNavbar } from '@/components/home-navbar'
import { StagesBoard } from '@/components/stages-board'
import { stageOpenings } from '@/lib/stages'

const clubValues = [
  'Pedagogie',
  'Discipline',
  'Lecture du jeu',
  'Esprit collectif',
  'Progression',
]

export default function StagesPage() {
  return (
    <div className="min-h-screen bg-[#f2f2f4] text-[#0a1d3a]">
      <HomeNavbar anchorPrefix="/" />

      <main className="pt-[116px] lg:pt-[78px]">
        <section className="relative overflow-hidden border-b border-[#e3e8f2] bg-white px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#ef233c] to-transparent" />

          <div className="mx-auto max-w-[1100px]">
            <div className="text-center">
              <p className="text-[10px] font-black uppercase tracking-[0.35em] text-[#ef233c]">
                Acces club
              </p>
              <h1 className="mt-3 text-[clamp(2.3rem,5vw,4.4rem)] font-black tracking-[-0.05em] text-[#0a1d3a]">
                Stages FC TORO
              </h1>
            </div>

            <p className="mx-auto mt-8 max-w-[720px] text-center text-sm font-medium leading-relaxed text-[#5b6f91] sm:text-[15px]">
              Les stages FC TORO permettent d entrer dans un environnement de football structure, exigeant
              et formateur. Coaching, performance, media, operations ou scouting: chaque opportunite aide
              le club a faire progresser les joueurs et l experience terrain.
            </p>

            <div className="mx-auto mt-8 max-w-[760px] space-y-4">
              {clubValues.map((value) => (
                <div key={value} className="grid grid-cols-[1fr_auto] gap-4 border-b border-[#f0c8ea] pb-2">
                  <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#0a1d3a] sm:text-[11px]">
                    {value}
                  </p>
                  <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#0a1d3a] sm:text-[11px]">
                    100%
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex justify-center">
              <Link
                href="#offres"
                className="inline-flex items-center rounded-full border border-[#ef233c] px-8 py-3 text-sm font-black uppercase tracking-[0.14em] text-[#ef233c] transition-colors hover:bg-[#ef233c] hover:text-white"
              >
                Voir les stages
              </Link>
            </div>
          </div>
        </section>

        <StagesBoard stages={stageOpenings} />
      </main>
    </div>
  )
}
