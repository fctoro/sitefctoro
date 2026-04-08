import { HomeNavbar } from '@/components/home-navbar'
import { StagesBoard } from '@/components/stages-board'
import { stageOpenings } from '@/lib/stages'

export default function RecrutementPage() {
  return (
    <div className="min-h-screen bg-[#f2f2f4] text-[#0a1d3a]">
      <HomeNavbar anchorPrefix="/" />

      <main className="pt-[116px] lg:pt-[78px]">
        <section className="relative overflow-hidden border-b border-[#e3e8f2] bg-[#0a1d3a] px-4 py-16 text-white sm:px-6 lg:px-8 lg:py-20">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#ef233c] to-transparent" />
          
          <div className="mx-auto max-w-[1100px] text-center">
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#ef233c]">
              Opportunités de carrière
            </p>
            <h1 className="mt-4 text-[clamp(2.5rem,5vw,4.5rem)] font-black uppercase tracking-tighter leading-[0.9]">
              Recrutement <br />
              <span className="text-[#ef233c]">FC TORO.</span>
            </h1>
            <p className="mx-auto mt-8 max-w-[700px] text-lg font-medium leading-relaxed text-white/70">
              Rejoignez une organisation d'excellence. Nous recherchons des passionnés pour renforcer nos équipes techniques, administratives et opérationnelles.
            </p>
          </div>
        </section>

        <StagesBoard stages={stageOpenings} detailBasePath="/recrutement" />
      </main>
    </div>
  )
}
