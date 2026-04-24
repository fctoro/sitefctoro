import Image from 'next/image'
import Link from 'next/link'
import {
  RiArrowRightLine,
  RiFocus3Line,
  RiHeartLine,
  RiMedalLine,
  RiShieldStarLine,
  RiTrophyLine,
} from '@remixicon/react'

const values = [
  { label: 'Discipline', icon: RiShieldStarLine },
  { label: 'Respect', icon: RiHeartLine },
  { label: 'Courage', icon: RiFocus3Line },
  { label: 'Humilité', icon: RiMedalLine },
  { label: 'Passion', icon: RiTrophyLine },
]

export default function VisionSection() {
  return (
    <section className="relative overflow-hidden bg-[#0a1d3a] px-4 py-14 text-white sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute left-0 top-0 h-full w-full select-none overflow-hidden opacity-[0.015]">
        <p className="absolute -left-20 top-0 text-[25vw] font-black uppercase italic leading-none text-white/40">
          VISION
        </p>
      </div>

      <div className="relative z-10 mx-auto max-w-[1100px]">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="space-y-10">
            <div className="space-y-6">
              <p className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-[#ef233c]">
                <span className="h-0.5 w-6 bg-[#ef233c]" />
                Philosophie - Former des joueurs et des citoyens
              </p>

              <h2 className="max-w-md text-2xl font-black uppercase leading-[0.95] tracking-tighter md:text-3xl">
                À FC TORO, le football est un espace d&apos;apprentissage où les jeunes développent discipline,
                confiance, respect et sens du collectif
                <span className="text-[#ef233c]">.</span>
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {values.map((item) => {
                const Icon = item.icon

                return (
                  <div
                    key={item.label}
                    className="group flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 transition-all hover:border-[#ef233c]/30 hover:bg-[#ef233c]/10"
                  >
                    <Icon className="h-4 w-4 text-[#ef233c]" />
                    <span className="text-[10px] font-black uppercase tracking-widest">{item.label}</span>
                  </div>
                )
              })}
            </div>

            <Link href="/le-club" className="group hidden items-center gap-5 sm:flex">
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 transition-all group-hover:border-[#ef233c] group-hover:bg-[#ef233c]">
                <RiArrowRightLine className="h-5 w-5" />
              </div>

              <div className="space-y-0.5">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#ef233c]">
                  En savoir plus
                </p>
                <p className="text-xs font-black uppercase tracking-widest text-white/60 transition-colors group-hover:text-white">
                  Notre philosophie
                </p>
              </div>
            </Link>
          </div>

          <div className="relative">
            <div className="group relative z-20 mx-auto aspect-[3/4] w-full max-w-[290px] sm:ml-auto sm:max-w-[320px] sm:aspect-[4/5]">
              <div className="absolute -inset-2 translate-x-3 translate-y-3 rounded-[24px] border border-[#ef233c]/30 opacity-20" />

              <div className="relative h-full w-full overflow-hidden rounded-[24px] shadow-2xl">
                <Image
                  src="/home/vision-fille.jpg"
                  alt="Philosophie FC TORO"
                  fill
                  sizes="(min-width: 1024px) 320px, 78vw"
                  className="object-cover object-center scale-[1.01] transform-gpu transition-transform duration-1000 group-hover:scale-105"
                />

                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0a1d3a] to-transparent p-6">
                  <p className="text-xl font-black uppercase leading-none tracking-tight">Depuis 2012</p>
                  <p className="mt-2 text-[10px] font-bold uppercase tracking-widest text-[#ef233c] italic">
                    L&apos;excellence au cœur d&apos;Haïti
                  </p>
                </div>
              </div>
            </div>

            <div className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-[#ef233c]/5 blur-[100px]" />
          </div>
        </div>
      </div>
    </section>
  )
}
