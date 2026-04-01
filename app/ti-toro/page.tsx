'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { HomeNavbar } from '@/components/home-navbar'
import kidsHero from '@/img/Kids/IMG_9445.jpg'
import {
  RiArrowRightLine,
  RiCheckLine,
  RiFileList3Line,
  RiMailLine,
  RiMapPinLine,
  RiPhoneLine,
  RiRunLine,
  RiShieldStarLine,
  RiTimeLine,
  RiUserSmileLine,
  RiWhatsappLine,
} from '@remixicon/react'

const highlights = [
  {
    label: 'Age',
    value: '2 a 5 ans',
    note: 'Filles et garcons',
    icon: RiUserSmileLine,
  },
  {
    label: 'Horaires',
    value: 'Mardi au vendredi',
    note: '14h a 16h',
    icon: RiTimeLine,
  },
  {
    label: 'Lieu',
    value: 'Skyboul',
    note: 'Petion-Ville',
    icon: RiMapPinLine,
  },
  {
    label: 'Approche',
    value: 'Jeu et motricite',
    note: 'Cadre simple et progressif',
    icon: RiRunLine,
  },
]

const boysCategories = [
  { years: '2007 - 2008', category: 'U19' },
  { years: '2009', category: 'U17' },
  { years: '2010', category: 'U16' },
  { years: '2011 - 2012', category: 'U14 - U15' },
  { years: '2013 - 2014', category: 'U12 - U13' },
  { years: '2015', category: 'U11' },
  { years: '2016', category: 'U10' },
  { years: '2017', category: 'U9' },
  { years: '2018 - 2019', category: 'U7 - U8' },
]

const girlsCategories = [
  { years: '2009 - 2011', category: 'U17' },
  { years: '2012 - 2014', category: 'U13' },
  { years: '2015 - 2017', category: 'U11' },
]

const registrationSteps = [
  {
    title: 'Prendre contact',
    body: 'La famille contacte FC TORO pour demander les informations 2026 et confirmer la place disponible.',
  },
  {
    title: 'Completer le dossier',
    body: 'Le parent ou tuteur remplit la fiche avec les informations de l enfant et les documents demandes.',
  },
  {
    title: 'Valider l inscription',
    body: 'Le club confirme la reception du dossier, les modalites 2026 et la prochaine etape de suivi.',
  },
]

const requiredDocs = [
  '2 photos d identification de l enfant',
  'Copie de l acte de naissance du joueur',
  'Copie de la piece d identite du parent ou tuteur',
]

const formFields = [
  {
    title: 'Informations enfant',
    items: [
      'Prenom et nom',
      'Date de naissance',
      'Sexe',
      'Adresse',
      'Ecole frequentee',
      'Experience football si disponible',
    ],
  },
  {
    title: 'Informations parent / tuteur',
    items: [
      'Nom complet',
      'Email',
      'Telephone / WhatsApp',
      'Adresse',
    ],
  },
  {
    title: 'Contact d urgence',
    items: [
      'Nom complet',
      'Lien avec la famille',
      'Telephone',
      'Email si disponible',
    ],
  },
  {
    title: 'Informations sportives',
    items: [
      'Taille du haut',
      'Taille du short',
      'Numero prefere',
      'Remarques utiles pour le staff',
    ],
  },
]

const notes2026 = [
  {
    title: 'Frais 2026',
    body: 'Les frais, calendriers et modalites de paiement 2026 sont communiques directement par le club apres prise de contact.',
  },
  {
    title: 'Categories',
    body: 'La repartition par annees de naissance reste indicative. Le staff peut ajuster selon le niveau et les besoins du joueur.',
  },
  {
    title: 'Documents',
    body: 'Le dossier n est considere complet qu apres reception du formulaire et des documents demandes.',
  },
]

const paymentIncludes = ['Inscription', 'Frais annuels', 'Uniformes']

const paymentPlanTwo = [
  "Premier versement: $500 a l'inscription",
  'Deuxieme versement: $300',
  'Troisieme versement: $150',
  'Quatrieme versement: $50',
]

const paymentMethods = [
  "Cheque a l'ordre de FULMOUN PRODUCTION",
  'Cash',
  'Carte de credit',
  'Virement bancaire',
]

const paymentLocations = [
  'Les cheques et les especes peuvent etre deposes a Kikloe a Petion-Ville.',
  "Ils peuvent aussi etre deposes au Centre de Formation Maurice Bonnefil a Haytrac, sur la route de l'aeroport.",
  'Les paiements par carte de credit sont recus a Haytrac.',
]

const paymentPolicies = [
  {
    title: 'Inscription complete',
    body: "L'inscription est consideree comme complete une fois que le formulaire a ete soumis avec le premier paiement dans son integralite. Une fois l'inscription effectuee, les uniformes seront commandes.",
  },
  {
    title: 'Reduction pour famille',
    body: "Les familles avec plus d'un enfant dans le club beneficieront d'une reduction de 5% du prix annuel par enfant additionnel a partir du 2e enfant.",
  },
  {
    title: 'Frais de retard',
    body: 'Un montant de $20 USD est ajoute par semaine de retard apres la date limite fixee pour les paiements.',
  },
]

const paymentNotes = [
  {
    title: 'Absence ou depart',
    body: "Tout cas d'absence ou de depart d'un enfant doit etre annonce a l'avance par ecrit. Aucun montant deja verse ne sera rembourse. Si l'enfant quitte apres le debut de la nouvelle periode, cette periode est due dans son integralite. Un courriel formel annoncant le depart doit etre envoye afin qu'il soit effectif. Aucune exception ne sera faite.",
  },
  {
    title: 'Absence temporaire',
    body: "En cas d'absence en raison de maladie, un certificat medical doit etre soumis.",
  },
  {
    title: 'Excursions',
    body: "Nous organiserons des sorties sur le terrain pour nos joueurs. Plus d'informations seront fournies pendant la saison.",
  },
]

const contactItems = [
  {
    label: 'Telephone / WhatsApp',
    value: '+509 2817-8676',
    href: 'tel:+50928178676',
    icon: RiPhoneLine,
  },
  {
    label: 'Email',
    value: 'footballclubtoro@gmail.com',
    href: 'mailto:footballclubtoro@gmail.com',
    icon: RiMailLine,
  },
  {
    label: 'Adresse',
    value: 'Football Club TORO, 7 Rue Rigaud, Petion-Ville, Haiti',
    href: '/contact',
    icon: RiMapPinLine,
  },
]

export default function TiToroPage() {
  return (
    <div className="min-h-screen bg-[#f2f2f4] text-[#0a1d3a]">
      <HomeNavbar anchorPrefix="/" />

      <main className="pt-[116px] lg:pt-[78px]">
        <section className="relative overflow-hidden bg-[#0a1d3a] px-4 py-14 text-white sm:px-6 lg:px-8 lg:py-18">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(239,35,60,0.18),transparent_34%)]" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_82%_10%,rgba(49,92,191,0.18),transparent_28%)]" />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#ef233c] to-transparent" />

          <div className="relative mx-auto grid max-w-[1180px] gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-[720px]"
            >
              <p className="text-[10px] font-black uppercase tracking-[0.38em] text-[#ef233c]">
                Programme 2026
              </p>
              <h1 className="mt-4 text-[clamp(2rem,4vw,4rem)] font-black uppercase leading-[0.9] tracking-[-0.05em] lg:text-[clamp(2.5rem,5vw,5rem)]">
                Ti Toro
                <br />
                Haiti
              </h1>
              <p className="mt-6 max-w-[620px] text-base font-medium leading-relaxed text-white/80 sm:text-lg lg:max-w-[680px] lg:text-[1.15rem]">
                Ti Toro est le programme d initiation au football pour les enfants de 2 a 5 ans.
                En 2026, le projet met l accent sur le jeu, la coordination, l ecoute et le plaisir
                de bouger dans un cadre adapte aux plus petits.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#procedures-paiements"
                  className="inline-flex items-center gap-2 rounded-full bg-[#ef233c] px-5 py-3 text-xs font-black uppercase tracking-[0.14em] text-white transition-all hover:bg-[#ff3f5c]"
                >
                  <RiArrowRightLine className="h-4 w-4" />
                  Voir conditions
                </a>
                <a
                  href="tel:+50928178676"
                  className="inline-flex items-center gap-2 rounded-full border border-white/24 px-5 py-3 text-sm font-black uppercase tracking-[0.12em] text-white transition-all hover:bg-white hover:text-[#0a1d3a]"
                >
                  <RiWhatsappLine className="h-4 w-4" />
                  WhatsApp
                </a>
                <a
                  href="mailto:footballclubtoro@gmail.com"
                  className="inline-flex items-center gap-2 rounded-full border border-white/24 px-5 py-3 text-sm font-black uppercase tracking-[0.12em] text-white transition-all hover:bg-white hover:text-[#0a1d3a]"
                >
                  <RiMailLine className="h-4 w-4" />
                  Demander les infos 2026
                </a>
              </div>
            </motion.div>

            <div className="rounded-[34px] bg-[#102852] p-4 shadow-[0_18px_36px_rgba(0,0,0,0.2)]">
              <div className="relative min-h-[380px] overflow-hidden rounded-[28px] sm:min-h-[440px]">
                <Image
                  src={kidsHero}
                  alt="Programme Ti Toro"
                  fill
                  sizes="(min-width: 1024px) 42vw, 100vw"
                  className="object-cover object-[center_28%]"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,19,43,0.05)_0%,rgba(7,19,43,0.1)_45%,rgba(7,19,43,0.28)_100%)]" />
              </div>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div className="rounded-[24px] border border-white/10 bg-[rgba(15,45,96,0.96)] p-5 shadow-[0_18px_34px_rgba(7,19,43,0.18)]">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#8db7ff]">
                    Jeu actif
                  </p>
                  <p className="mt-3 text-base font-black leading-snug text-white sm:text-[1.05rem] lg:text-[1.15rem]">
                    Premiers contacts avec le ballon, motricite, coordination et plaisir de jouer.
                  </p>
                </div>

                <div className="rounded-[24px] border border-white/10 bg-[rgba(15,45,96,0.96)] p-5 shadow-[0_18px_34px_rgba(7,19,43,0.18)]">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#ffb4bf]">
                    Objectif
                  </p>
                  <p className="mt-3 text-base font-black leading-snug text-white sm:text-[1.05rem] lg:text-[1.15rem]">
                    Donner aux enfants un premier contact positif avec le ballon, les reperes
                    collectifs et le mouvement.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white px-4 py-14 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[1180px]">
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {highlights.map((item) => {
                const Icon = item.icon

                return (
                  <article
                    key={item.label}
                    className="rounded-[26px] border border-[#dce5f2] bg-[#f8fafc] p-6 shadow-[0_14px_28px_rgba(10,29,58,0.05)]"
                  >
                    <Icon className="h-7 w-7 text-[#ef233c]" />
                    <p className="mt-5 text-[10px] font-black uppercase tracking-[0.18em] text-[#ef233c]">
                      {item.label}
                    </p>
                    <h2 className="mt-2 text-xl font-black uppercase leading-tight text-[#0a1d3a]">
                      {item.value}
                    </h2>
                    <p className="mt-2 text-sm font-medium leading-relaxed text-[#5b6f91]">
                      {item.note}
                    </p>
                  </article>
                )
              })}
            </div>
          </div>
        </section>

        <section className="bg-[#f8fafc] px-4 py-14 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[1180px]">
            <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.34em] text-[#ef233c]">
                  Categories 2026
                </p>
                <h2 className="mt-3 text-[clamp(1.65rem,3.2vw,2.7rem)] font-black uppercase leading-[0.92] tracking-[-0.05em] text-[#0d2d62]">
                  Repartition indicative
                  <br />
                  des groupes FC TORO.
                </h2>
              </div>

              <p className="max-w-[460px] text-sm font-medium leading-relaxed text-[#5b6f91] sm:text-[15px]">
                Ti Toro ouvre la premiere porte. Ensuite, la progression continue dans les categories
                du club selon l age, le niveau et l evaluation du staff.
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <article className="rounded-[28px] border border-[#dce5f2] bg-white p-6 shadow-[0_14px_28px_rgba(10,29,58,0.05)]">
                <h3 className="text-xl font-black uppercase text-[#0a1d3a]">Garcons</h3>
                <div className="mt-5 space-y-3">
                  {boysCategories.map((item) => (
                    <div
                      key={`${item.years}-${item.category}`}
                      className="flex items-center justify-between gap-4 rounded-2xl bg-[#f8fafc] px-4 py-3"
                    >
                      <span className="text-sm font-semibold text-[#5b6f91]">{item.years}</span>
                      <span className="text-sm font-black uppercase text-[#0a1d3a]">
                        {item.category}
                      </span>
                    </div>
                  ))}
                </div>
              </article>

              <article className="rounded-[28px] border border-[#dce5f2] bg-white p-6 shadow-[0_14px_28px_rgba(10,29,58,0.05)]">
                <h3 className="text-xl font-black uppercase text-[#0a1d3a]">Filles</h3>
                <div className="mt-5 space-y-3">
                  {girlsCategories.map((item) => (
                    <div
                      key={`${item.years}-${item.category}`}
                      className="flex items-center justify-between gap-4 rounded-2xl bg-[#f8fafc] px-4 py-3"
                    >
                      <span className="text-sm font-semibold text-[#5b6f91]">{item.years}</span>
                      <span className="text-sm font-black uppercase text-[#0a1d3a]">
                        {item.category}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 rounded-[22px] bg-[#0a2347] p-5 text-white">
                  <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#ffb4bf]">
                    Ti Toro
                  </p>
                  <p className="mt-3 text-sm font-semibold leading-relaxed text-white/84">
                    Programme d introduction pour les enfants de 2 a 5 ans avant l entree dans les
                    categories regulieres du club.
                  </p>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="bg-white px-4 py-14 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[1180px]">
            <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.34em] text-[#ef233c]">
                  Inscription 2026
                </p>
                <h2 className="mt-3 text-[clamp(1.6rem,3vw,2.5rem)] font-black uppercase leading-[0.92] tracking-[-0.05em] text-[#0d2d62]">
                  Procedure, documents
                  <br />
                  et fiche a preparer.
                </h2>
              </div>

              <p className="max-w-[420px] text-sm font-medium leading-relaxed text-[#5b6f91] sm:text-[15px]">
                Le dossier 2026 doit rester simple, lisible et complet pour que le club puisse
                organiser la suite dans de bonnes conditions.
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
              <div className="space-y-6">
                <div className="grid gap-5 md:grid-cols-3">
                  {registrationSteps.map((step, index) => (
                    <article
                      key={step.title}
                      className="rounded-[26px] border border-[#dce5f2] bg-[#f8fafc] p-6 shadow-[0_14px_28px_rgba(10,29,58,0.05)]"
                    >
                      <p className="text-4xl font-black leading-none text-[#dce5f2]">0{index + 1}</p>
                      <h3 className="mt-5 text-lg font-black uppercase leading-tight text-[#0a1d3a]">
                        {step.title}
                      </h3>
                      <p className="mt-3 text-sm font-medium leading-relaxed text-[#5b6f91]">
                        {step.body}
                      </p>
                    </article>
                  ))}
                </div>

                <article className="rounded-[28px] border border-[#dce5f2] bg-white p-6 shadow-[0_14px_28px_rgba(10,29,58,0.05)]">
                  <div className="flex items-center gap-3">
                    <RiFileList3Line className="h-6 w-6 text-[#ef233c]" />
                    <h3 className="text-xl font-black uppercase text-[#0a1d3a]">
                      Documents requis
                    </h3>
                  </div>
                  <div className="mt-5 space-y-3">
                    {requiredDocs.map((item) => (
                      <div
                        key={item}
                        className="rounded-2xl bg-[#f8fafc] px-4 py-3 text-sm font-semibold text-[#445b7f]"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </article>
              </div>

              <div className="space-y-5">
                {notes2026.map((item) => (
                  <article
                    key={item.title}
                    className="rounded-[26px] border border-[#dce5f2] bg-[#f8fafc] p-6 shadow-[0_14px_28px_rgba(10,29,58,0.05)]"
                  >
                    <h3 className="text-lg font-black uppercase text-[#0a1d3a]">{item.title}</h3>
                    <p className="mt-3 text-sm font-medium leading-relaxed text-[#5b6f91]">
                      {item.body}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section
          id="procedures-paiements"
          className="relative overflow-hidden px-4 py-16 sm:px-6 lg:px-8"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(239,35,60,0.08),transparent_28%)]" />
          <div className="pointer-events-none absolute right-[-4rem] top-10 h-48 w-48 rounded-full bg-[#1a4ea3]/8 blur-3xl" />

          <div className="mx-auto max-w-[1180px] rounded-[38px] border border-[#dbe5f2] bg-[linear-gradient(180deg,#ffffff_0%,#f5f8fd_100%)] p-5 shadow-[0_24px_56px_rgba(10,29,58,0.08)] sm:p-8">
            <div className="grid gap-8 lg:grid-cols-[0.88fr_1.12fr]">
              <div className="space-y-5">
                <div className="max-w-[480px]">
                  <p className="text-[10px] font-black uppercase tracking-[0.32em] text-[#ef233c]">
                    Procedures & paiements
                  </p>
                  <h2 className="mt-3 text-[clamp(1.35rem,2.2vw,1.9rem)] font-black leading-[1.02] tracking-[-0.04em] text-[#0a1d3a]">
                    Conditions, plans et suivi du dossier
                  </h2>
                  <p className="mt-3 text-sm font-medium leading-relaxed text-[#5b6f91]">
                    Une lecture plus simple des frais, des versements et des informations
                    administratives pour les familles.
                  </p>
                </div>

                <article className="overflow-hidden rounded-[30px] bg-[linear-gradient(160deg,#143a74_0%,#0a2347_100%)] p-6 text-white shadow-[0_22px_40px_rgba(10,29,58,0.18)]">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#ffb4bf]">
                        Reference 2019 / 2020
                      </p>
                      <p className="mt-2 text-sm font-semibold text-white/72">
                        Paiement annuel
                      </p>
                    </div>
                    <span className="rounded-full border border-white/14 bg-white/8 px-3 py-1 text-[10px] font-black uppercase tracking-[0.14em] text-white/72">
                      Annuel
                    </span>
                  </div>

                  <div className="mt-6 flex items-end gap-2">
                    <span className="text-[2.15rem] font-black leading-none sm:text-[2.45rem]">
                      $1000
                    </span>
                    <span className="pb-1 text-[11px] font-black uppercase tracking-[0.16em] text-white/60">
                      USD
                    </span>
                  </div>

                  <p className="mt-3 max-w-[340px] text-sm leading-relaxed text-white/76">
                    Le cout comprend l'inscription, les frais annuels et les uniformes.
                  </p>
                </article>

                <article className="rounded-[26px] border border-[#e2eaf5] bg-white/90 p-5 shadow-[0_12px_24px_rgba(10,29,58,0.04)]">
                  <div className="flex items-center gap-2">
                    <RiCheckLine className="h-5 w-5 text-[#ef233c]" />
                    <p className="text-[11px] font-black uppercase tracking-[0.16em] text-[#0a1d3a]">
                      Inclus dans le cout
                    </p>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2.5">
                    {paymentIncludes.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-[#e4ebf6] bg-[#f8fafc] px-4 py-2 text-[11px] font-black uppercase tracking-[0.08em] text-[#27456e]"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </article>
              </div>

              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <article className="rounded-[28px] border border-[#dfe7f2] bg-white p-5 shadow-[0_12px_24px_rgba(10,29,58,0.04)]">
                    <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#ef233c]">
                      Plan 1
                    </p>
                    <h3 className="mt-3 text-base font-black leading-tight text-[#0a1d3a]">
                      Paiement annuel en une fois
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#5b6f91]">
                      Un seul paiement pour finaliser l'inscription.
                    </p>

                    <div className="mt-5 rounded-[22px] bg-[#f7faff] px-4 py-5">
                      <p className="text-[10px] font-black uppercase tracking-[0.14em] text-[#6b82a4]">
                        Montant
                      </p>
                      <p className="mt-2 text-2xl font-black leading-none text-[#0a1d3a]">
                        $1000 USD
                      </p>
                    </div>
                  </article>

                  <article className="rounded-[28px] border border-[#dfe7f2] bg-white p-5 shadow-[0_12px_24px_rgba(10,29,58,0.04)]">
                    <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#ef233c]">
                      Plan 2
                    </p>
                    <h3 className="mt-3 text-base font-black leading-tight text-[#0a1d3a]">
                      Paiement fractionne
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#5b6f91]">
                      Une formule plus souple, sans afficher les dates de versement.
                    </p>

                    <div className="mt-4 space-y-2.5">
                      {paymentPlanTwo.map((item, index) => (
                        <div
                          key={item}
                          className="flex items-center justify-between gap-3 rounded-2xl bg-[#f8fafc] px-4 py-3"
                        >
                          <span className="text-[11px] font-black uppercase tracking-[0.08em] text-[#7c8fad]">
                            Versement 0{index + 1}
                          </span>
                          <span className="text-sm font-black text-[#0a1d3a]">
                            {item.split(': ')[1]}
                          </span>
                        </div>
                      ))}
                    </div>
                  </article>
                </div>

                <article className="rounded-[28px] border border-[#dfe7f2] bg-white p-5 shadow-[0_12px_24px_rgba(10,29,58,0.04)]">
                  <div className="flex items-center gap-2">
                    <RiFileList3Line className="h-5 w-5 text-[#ef233c]" />
                    <p className="text-[11px] font-black uppercase tracking-[0.16em] text-[#0a1d3a]">
                      Moyens et lieux de paiement
                    </p>
                  </div>

                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {paymentMethods.map((item) => (
                      <div
                        key={item}
                        className="rounded-2xl border border-[#e6edf7] bg-[#fbfcff] px-4 py-3 text-sm font-semibold leading-relaxed text-[#445b7f]"
                      >
                        {item}
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 space-y-2.5">
                    {paymentLocations.map((item) => (
                      <div
                        key={item}
                        className="rounded-2xl bg-[#f8fafc] px-4 py-3 text-sm leading-relaxed text-[#5b6f91]"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </article>
              </div>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {paymentPolicies.map((item) => (
                <article
                  key={item.title}
                  className="rounded-[24px] border border-[#e0e8f3] bg-white p-5 shadow-[0_10px_22px_rgba(10,29,58,0.04)]"
                >
                  <div className="flex items-center gap-2">
                    <RiTimeLine className="h-4 w-4 text-[#ef233c]" />
                    <p className="text-[11px] font-black uppercase tracking-[0.14em] text-[#0a1d3a]">
                      {item.title}
                    </p>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-[#5b6f91]">
                    {item.body}
                  </p>
                </article>
              ))}
            </div>

            <article className="mt-6 rounded-[30px] border border-[#dfe7f2] bg-white p-5 shadow-[0_14px_28px_rgba(10,29,58,0.05)] sm:p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <RiShieldStarLine className="h-5 w-5 text-[#ef233c]" />
                  <h3 className="text-base font-black leading-tight text-[#0a1d3a]">
                    Notes importantes
                  </h3>
                </div>

                <span className="rounded-full border border-[#e2eaf5] bg-[#f8fafc] px-3 py-1 text-[10px] font-black uppercase tracking-[0.14em] text-[#7287a7]">
                  Informations administratives
                </span>
              </div>

              <div className="mt-4 grid gap-4 lg:grid-cols-3">
                {paymentNotes.map((item) => (
                  <article
                    key={item.title}
                    className="rounded-[22px] bg-[#f8fafc] p-4"
                  >
                    <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#ef233c]">
                      {item.title}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-[#5b6f91]">
                      {item.body}
                    </p>
                  </article>
                ))}
              </div>
            </article>
          </div>
        </section>

        <section className="bg-[#f8fafc] px-4 py-14 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[1180px]">
            <div className="mb-10 text-center">
              <p className="text-[10px] font-black uppercase tracking-[0.34em] text-[#ef233c]">
                Formulaire a preparer
              </p>
              <h2 className="mt-3 text-[clamp(1.6rem,3vw,2.5rem)] font-black uppercase leading-[0.92] tracking-[-0.05em] text-[#0d2d62]">
                Informations a rassembler
                <br />
                pour l inscription.
              </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {formFields.map((section) => (
                <article
                  key={section.title}
                  className="rounded-[28px] border border-[#dce5f2] bg-white p-6 shadow-[0_14px_28px_rgba(10,29,58,0.05)]"
                >
                  <h3 className="text-lg font-black uppercase leading-tight text-[#0a1d3a]">
                    {section.title}
                  </h3>
                  <div className="mt-5 space-y-3">
                    {section.items.map((item) => (
                      <div
                        key={item}
                        className="rounded-2xl bg-[#f8fafc] px-4 py-3 text-sm font-semibold text-[#445b7f]"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white px-4 py-14 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[1180px]">
            <div className="mb-10 text-center">
              <p className="text-[10px] font-black uppercase tracking-[0.34em] text-[#ef233c]">
                Contacts
              </p>
              <h2 className="mt-3 text-[clamp(1.6rem,3vw,2.4rem)] font-black uppercase leading-[0.92] tracking-[-0.05em] text-[#0d2d62]">
                Les memes contacts
                <br />
                que le site actuel.
              </h2>
            </div>

            <div className="grid gap-5 lg:grid-cols-3">
              {contactItems.map((item) => {
                const Icon = item.icon

                return (
                  <a
                    key={item.label}
                    href={item.href}
                    className="rounded-[28px] border border-[#dce5f2] bg-[#f8fafc] p-6 shadow-[0_14px_28px_rgba(10,29,58,0.05)] transition-all hover:-translate-y-1 hover:border-[#ef233c]/35 hover:shadow-[0_18px_34px_rgba(10,29,58,0.08)]"
                  >
                    <Icon className="h-7 w-7 text-[#ef233c]" />
                    <p className="mt-5 text-[10px] font-black uppercase tracking-[0.18em] text-[#ef233c]">
                      {item.label}
                    </p>
                    <p className="mt-2 text-sm font-semibold leading-relaxed text-[#445b7f]">
                      {item.value}
                    </p>
                  </a>
                )
              })}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
