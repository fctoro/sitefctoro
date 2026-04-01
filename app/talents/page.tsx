import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import {
  RiArrowRightLine,
  RiFlashlightLine,
  RiMedalLine,
  RiUserStarLine,
} from '@remixicon/react'
import { HomeNavbar } from '@/components/home-navbar'

export const metadata: Metadata = {
  title: 'Talents | FC TORO',
  description: 'Les profils a fort potentiel et la maniere dont FC TORO les accompagne.',
}

const talentCards = [
  {
    icon: RiFlashlightLine,
    title: 'Detection',
    body: 'FC TORO regarde les signaux utiles, pas seulement les gestes spectaculaires. Le talent doit etre relu sur plusieurs contextes.',
  },
  {
    icon: RiUserStarLine,
    title: 'Accompagnement',
    body: 'Le joueur a fort potentiel doit etre aide a structurer ses habitudes de travail, son attention et sa responsabilite.',
  },
  {
    icon: RiMedalLine,
    title: 'Projection',
    body: 'Le club cherche a comprendre jusqu ou le joueur peut aller, a condition qu il reste engage dans son developpement.',
  },
]

const talentSignals = [
  'Qualite de decision',
  'Regularite dans l effort',
  'Capacite a apprendre vite',
  'Impact sur le collectif',
]

export default function TalentsPage() {
  return (
    <div className="min-h-screen bg-[#f4f7fb] text-[#0b2140]">
      <HomeNavbar anchorPrefix="/" />

      <main className="pt-[116px] lg:pt-[78px]">
        <section className="relative overflow-hidden bg-[#091a35] px-4 py-14 text-white sm:px-6 lg:px-8 lg:py-16">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(239,35,60,0.18),transparent_30%)]" />
          <div className="relative mx-auto max-w-[1200px]">
            <p className="text-[10px] font-black uppercase tracking-[0.34em] text-[#ef233c]">
              Academie
            </p>
            <h1 className="mt-4 text-[clamp(2rem,4vw,4rem)] font-black uppercase leading-[0.88] tracking-[-0.05em]">
              Talents
            </h1>
            <p className="mt-5 max-w-[760px] text-base leading-relaxed text-white/74 sm:text-lg">
              Ici, le talent n est pas un simple effet visuel. C est un potentiel lisible,
              soutenu par la discipline, la repetition et la capacite a mieux jouer avec les
              autres.
            </p>
          </div>
        </section>

        <section className="px-4 py-8 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-[1200px] gap-6 xl:grid-cols-[minmax(0,1.15fr)_340px]">
            <div className="space-y-6">
              <article className="overflow-hidden rounded-[34px] border border-[#dbe4f0] bg-white shadow-[0_18px_32px_rgba(10,29,58,0.08)]">
                <div className="relative h-[300px] sm:h-[360px]">
                  <Image
                    src="/joueur/extracted/542448727_18525142066012336_8843479393054800058_n.jpg"
                    alt="Talents FC TORO"
                    fill
                    priority
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,29,58,0.08)_0%,rgba(10,29,58,0.84)_100%)]" />
                  <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-8">
                    <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#ef233c]">
                      Lecture interne
                    </p>
                    <p className="mt-3 max-w-[520px] text-2xl font-black uppercase leading-[0.94]">
                      Le talent prend de la valeur quand il devient fiable.
                    </p>
                  </div>
                </div>
              </article>

              <div className="grid gap-6 md:grid-cols-3">
                {talentCards.map((item) => (
                  <article
                    key={item.title}
                    className="rounded-[28px] border border-[#dbe4f0] bg-white p-6 shadow-[0_16px_28px_rgba(10,29,58,0.08)]"
                  >
                    <item.icon className="h-8 w-8 text-[#ef233c]" />
                    <h2 className="mt-5 text-lg font-black uppercase leading-tight text-[#0b2140]">
                      {item.title}
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-[#5a6f8d]">{item.body}</p>
                  </article>
                ))}
              </div>
            </div>

            <aside className="rounded-[34px] border border-[#dbe4f0] bg-white p-6 shadow-[0_18px_32px_rgba(10,29,58,0.08)] sm:p-8">
              <p className="text-[10px] font-black uppercase tracking-[0.24em] text-[#ef233c]">
                Signaux observes
              </p>

              <div className="mt-6 space-y-3">
                {talentSignals.map((signal) => (
                  <div
                    key={signal}
                    className="rounded-2xl border border-[#e3eaf4] bg-[#f8fbff] px-4 py-4 text-sm font-black uppercase leading-tight tracking-[0.08em] text-[#25456f]"
                  >
                    {signal}
                  </div>
                ))}
              </div>

              <div className="mt-8 rounded-[28px] bg-[#f5f8fd] p-5">
                <p className="text-sm leading-relaxed text-[#5a6f8d]">
                  FC TORO veut distinguer les profils capables de produire des actions utiles,
                  de progresser vite et de rester stables dans leur comportement.
                </p>
                <p className="mt-4 text-sm leading-relaxed text-[#5a6f8d]">
                  Le talent doit pouvoir traverser plusieurs niveaux d exigence sans perdre son
                  intelligence de jeu ni sa disponibilite pour le collectif.
                </p>
              </div>

              <Link
                href="/equipes"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#ef233c] px-6 py-3 text-xs font-black uppercase tracking-[0.16em] text-white transition-colors hover:bg-[#d71931]"
              >
                Voir l equipe
                <RiArrowRightLine className="h-4 w-4" />
              </Link>
            </aside>
          </div>
        </section>
      </main>
    </div>
  )
}
