import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { RiArrowRightLine, RiBookOpenLine, RiRunLine, RiTeamLine } from '@remixicon/react'
import { HomeNavbar } from '@/components/home-navbar'

export const metadata: Metadata = {
  title: 'Formation | FC TORO',
  description: 'La structure de formation FC TORO pour le developpement technique, tactique et humain.',
}

const trainingPillars = [
  {
    icon: RiBookOpenLine,
    title: 'Comprendre le jeu',
    body: 'Les joueurs apprennent a lire les espaces, reconnaitre les temps forts et mieux choisir leurs actions.',
  },
  {
    icon: RiRunLine,
    title: 'Repeter juste',
    body: 'La repetition n est pas un volume vide: elle sert a stabiliser les bons gestes et les bonnes habitudes.',
  },
  {
    icon: RiTeamLine,
    title: 'Grandir ensemble',
    body: 'Le collectif reste la base de la progression. Chaque joueur doit savoir faire mieux jouer les autres.',
  },
]

const developmentSteps = [
  'Base technique et coordination',
  'Lecture tactique et discipline collective',
  'Gestion de l effort et du tempo',
  'Responsabilite, constance et competition',
]

export default function FormationPage() {
  return (
    <div className="min-h-screen bg-[#f5f4ef] text-[#10213f]">
      <HomeNavbar anchorPrefix="/" />

      <main className="pt-[116px] lg:pt-[78px]">
        <section className="relative overflow-hidden px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
          <div className="absolute inset-0 bg-[linear-gradient(135deg,#f5f4ef_0%,#ebe7dd_48%,#f7f5f0_100%)]" />
          <div className="relative mx-auto grid max-w-[1200px] gap-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-center">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.34em] text-[#d14a2e]">
                Academie
              </p>
              <h1 className="mt-4 text-[clamp(2rem,4vw,4rem)] font-black uppercase leading-[0.88] tracking-[-0.05em]">
                Formation
              </h1>
              <p className="mt-6 max-w-[720px] text-base leading-relaxed text-[#5d6e88] sm:text-lg">
                FC TORO construit sa formation comme un parcours. On ne cherche pas juste a
                remplir des seances: on veut donner aux joueurs une base durable pour jouer,
                comprendre et evoluer.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/stages"
                  className="inline-flex items-center gap-2 rounded-full bg-[#10213f] px-6 py-3 text-xs font-black uppercase tracking-[0.16em] text-white transition-colors hover:bg-[#1f355f]"
                >
                  Voir les stages
                  <RiArrowRightLine className="h-4 w-4" />
                </Link>
                <div className="rounded-full border border-[#d8d0c3] px-5 py-3 text-xs font-black uppercase tracking-[0.16em] text-[#7a644b]">
                  Progression pensee sur la duree
                </div>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[34px] border border-[#ddd4c7] bg-white shadow-[0_22px_36px_rgba(16,33,63,0.08)]">
              <div className="relative h-[420px]">
                <Image
                  src="/joueur/extracted/621203459_18554581459012336_4537330016788795057_n.jpg"
                  alt="Formation FC TORO"
                  fill
                  priority
                  className="object-cover"
                />
              </div>
              <div className="grid grid-cols-2 gap-px bg-[#ddd4c7]">
                <div className="bg-white px-5 py-4">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#d14a2e]">
                    Base
                  </p>
                  <p className="mt-2 text-sm font-semibold text-[#415472]">Technique et lecture</p>
                </div>
                <div className="bg-white px-5 py-4">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#d14a2e]">
                    Cadre
                  </p>
                  <p className="mt-2 text-sm font-semibold text-[#415472]">Discipline et repetition</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-8 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-[1200px] gap-6 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="rounded-[30px] bg-[#10213f] p-6 text-white shadow-[0_20px_38px_rgba(16,33,63,0.18)] sm:p-8">
              <p className="text-[10px] font-black uppercase tracking-[0.24em] text-[#ff8b6f]">
                Etapes de travail
              </p>
              <div className="mt-6 space-y-4">
                {developmentSteps.map((step, index) => (
                  <div key={step} className="flex items-start gap-4">
                    <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#d14a2e] text-xs font-black">
                      0{index + 1}
                    </span>
                    <p className="pt-1 text-sm font-semibold leading-relaxed text-white/82">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {trainingPillars.map((item) => (
                <article
                  key={item.title}
                  className="rounded-[28px] border border-[#e2d9cc] bg-white p-6 shadow-[0_14px_28px_rgba(16,33,63,0.06)]"
                >
                  <item.icon className="h-8 w-8 text-[#d14a2e]" />
                  <h2 className="mt-5 text-lg font-black uppercase leading-tight text-[#10213f]">
                    {item.title}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-[#586a84]">{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
