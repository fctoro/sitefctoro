'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { HomeNavbar } from '@/components/home-navbar'
import {
  RiArrowRightLine,
  RiGroupLine,
  RiHandHeartLine,
  RiShieldStarLine,
} from '@remixicon/react'

const pathways = [
  {
    label: 'Joueur',
    title: 'Devenir joueur',
    description:
      'Tests, evaluation du potentiel, categorie adaptee et integration progressive dans le projet FC TORO.',
    href: '/inscription/joueur',
    image: '/joueur/extracted/560435029_18532793887012336_3999511270054224397_n.jpg',
    icon: RiShieldStarLine,
  },
  {
    label: 'Fans',
    title: 'Devenir fan',
    description:
      'Supporters, benevoles matchday et membres de la communaute qui veulent vivre le club de plus pres.',
    href: '/inscription/fans',
    image: '/joueur/extracted/583167774_18542869372012336_2307311757000245016_n.jpg',
    icon: RiGroupLine,
  },
  {
    label: 'Partenaires',
    title: 'Devenir partenaire',
    description:
      'Entreprises, institutions et acteurs locaux qui souhaitent construire une collaboration durable avec FC TORO.',
    href: '/inscription/partenaires',
    image: '/joueur/extracted/634150827_18560832649012336_7495873752742897530_n.jpg',
    icon: RiHandHeartLine,
  },
]

const processSteps = [
  {
    title: 'Choisir le parcours',
    text: 'Selectionnez le formulaire correspondant a votre profil: joueur, fan ou partenaire.',
  },
  {
    title: 'Completer le dossier',
    text: 'Renseignez les informations utiles pour que le club puisse etudier votre demande.',
  },
  {
    title: 'Recevoir le suivi',
    text: 'L equipe FC TORO revient vers vous avec la prochaine etape selon votre demande.',
  },
]

export default function InscriptionPage() {
  return (
    <div className="min-h-screen bg-[#f2f2f4] text-[#0a1d3a]">
      <HomeNavbar anchorPrefix="/" />

      <main className="pt-[116px] lg:pt-[78px]">
        <section className="relative overflow-hidden bg-[#0a1d3a] px-4 py-16 text-white sm:px-6 lg:px-8 lg:py-20">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(239,35,60,0.16),transparent_34%)]" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_10%,rgba(49,92,191,0.18),transparent_30%)]" />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#ef233c] to-transparent" />

          <div className="relative mx-auto max-w-[1100px]">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-[760px]"
            >
              <p className="text-[10px] font-black uppercase tracking-[0.38em] text-[#ef233c]">
                Parcours pour rejoindre
              </p>
              <h1 className="mt-4 text-[clamp(2.4rem,5vw,4.9rem)] font-black uppercase leading-[0.9] tracking-[-0.05em]">
                Rejoindre
                <br />
                FC TORO
              </h1>
              <p className="mt-6 max-w-[620px] text-base font-medium leading-relaxed text-white/78 sm:text-lg">
                Un seul point d entree pour les joueurs, les supporters et les partenaires qui veulent
                s engager avec le club de facon claire, serieuse et structuree.
              </p>
            </motion.div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {[
                'Academie et detection',
                'Communaute et matchday',
                'Partenariats et activations',
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/12 bg-white/6 px-5 py-4 text-sm font-black uppercase tracking-[0.08em] text-white/88"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="rejoindre" className="bg-white px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[1200px]">
            <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.34em] text-[#ef233c]">
                  Choisir un parcours
                </p>
                <h2 className="mt-3 text-[clamp(2rem,4vw,3.5rem)] font-black uppercase leading-[0.92] tracking-[-0.05em] text-[#0a1d3a]">
                  Trois portes d entree,
                  <br />
                  un meme projet club.
                </h2>
              </div>

              <p className="max-w-[420px] text-sm font-semibold leading-relaxed text-[#5b6f91] sm:text-base">
                Chaque page est construite pour aller droit au but: le bon formulaire, le bon niveau
                d information et une lecture claire pour l equipe FC TORO.
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              {pathways.map((pathway, index) => {
                const Icon = pathway.icon

                return (
                  <motion.article
                    key={pathway.href}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, delay: index * 0.08 }}
                    viewport={{ once: true, amount: 0.2 }}
                    className="group overflow-hidden rounded-[28px] border border-[#e7edf6] bg-[#f8fafc] shadow-[0_18px_32px_rgba(10,29,58,0.06)]"
                  >
                    <div className="relative h-[260px] overflow-hidden bg-[#0a1d3a]">
                      <Image
                        src={pathway.image}
                        alt={pathway.title}
                        fill
                        sizes="(min-width: 1024px) 33vw, 100vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,29,58,0.12)_0%,rgba(10,29,58,0.86)_100%)]" />
                      <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-white">
                        <Icon className="h-4 w-4 text-[#ef233c]" />
                        {pathway.label}
                      </div>
                    </div>

                    <div className="space-y-5 p-6">
                      <div>
                        <h3 className="text-2xl font-black uppercase leading-[0.94] text-[#0a1d3a]">
                          {pathway.title}
                        </h3>
                        <p className="mt-3 text-sm font-medium leading-relaxed text-[#5b6f91] sm:text-[15px]">
                          {pathway.description}
                        </p>
                      </div>

                      <Link
                        href={pathway.href}
                        className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-[0.12em] text-[#ef233c] transition-transform duration-300 group-hover:translate-x-1"
                      >
                        Ouvrir le parcours
                        <RiArrowRightLine className="h-5 w-5" />
                      </Link>
                    </div>
                  </motion.article>
                )
              })}
            </div>
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[1100px]">
            <div className="mb-8 text-center">
              <p className="text-[10px] font-black uppercase tracking-[0.34em] text-[#ef233c]">
                Comment ca fonctionne
              </p>
              <h2 className="mt-3 text-[clamp(1.9rem,3.8vw,3rem)] font-black uppercase leading-[0.94] tracking-[-0.04em] text-[#0a1d3a]">
                Un processus simple, rapide
                <br />
                et propre.
              </h2>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              {processSteps.map((step, index) => (
                <div
                  key={step.title}
                  className="rounded-[30px] border border-[#dce5f2] bg-white p-8 shadow-[0_14px_28px_rgba(10,29,58,0.05)]"
                >
                  <p className="text-4xl font-black leading-none text-[#dbe4f2]">0{index + 1}</p>
                  <h3 className="mt-5 text-xl font-black uppercase leading-tight text-[#0a1d3a]">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm font-medium leading-relaxed text-[#5b6f91]">
                    {step.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
