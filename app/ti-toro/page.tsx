'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { HomeNavbar } from '@/components/home-navbar'
import playerHeroImage from '@/img/Kids/IMG_9452.jpg'
import {
  RiArrowRightLine,
  RiCheckDoubleLine,
  RiMailLine,
  RiMapPinLine,
  RiPhoneLine,
  RiRunLine,
  RiTimeLine,
  RiUserSmileLine,
  RiWhatsappLine,
  RiStarSFill,
  RiPlayLargeFill,
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
    <div className="min-h-screen bg-[#f8fafc] text-[#0a1d3a]">
      <HomeNavbar anchorPrefix="/" />

      <main className="pt-[116px] lg:pt-[78px]">
        {/* --- HERO SECTION --- */}
        <section className="relative overflow-hidden bg-[#0a1d3a] px-4 py-20 text-white sm:px-6 lg:px-8 lg:py-32">
          {/* Subtle Background Effects */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(239,35,60,0.12),transparent_50%)]" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#ef233c]/40 to-transparent" />

          <div className="relative mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 items-center gap-12 lg:gap-20 text-left">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-sm">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#ef233c]/80" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-[#ef233c]" />
                  </span>
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/90">
                    Inscription Programme 2026
                  </p>
                </div>

                <h1 className="mt-8 text-[clamp(2.5rem,5vw,5rem)] font-black uppercase leading-[0.85] tracking-tight">
                  Ti Toro
                  <span className="block text-[#ef233c]">Haiti</span>
                </h1>

                <div className="mt-8 h-1.5 w-24 rounded-full bg-[#ef233c]" />

                <p className="mt-10 max-w-[540px] text-lg font-medium leading-relaxed text-white/80 lg:text-[1.125rem]">
                  Programme d'initiation au football pour les enfants de 2 à 5 ans. 
                  Focus sur la psychomotricité, le jeu et le plaisir de bouger ensemble.
                </p>

                <div className="mt-12 flex flex-wrap gap-4">
                  <a
                    href="/inscription/joueur"
                    className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-[#ef233c] px-8 py-4 text-xs font-black uppercase tracking-[0.16em] text-white transition-all hover:scale-105"
                  >
                    S'inscrire Maintenant
                    <RiArrowRightLine className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </a>
                  <a
                    href="https://wa.me/50928178676"
                    className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/5 px-8 py-4 text-xs font-black uppercase tracking-[0.16em] text-white backdrop-blur-md transition-all hover:bg-white hover:text-[#0a1d3a]"
                  >
                    <RiWhatsappLine className="h-4 w-4" />
                    WhatsApp
                  </a>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95, x: 30 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="relative flex justify-center lg:justify-end"
              >
                <div className="relative w-full max-w-[420px] overflow-hidden rounded-[40px] border border-white/10 bg-[#102852] p-3 shadow-2xl">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-[30px]">
                    <Image
                      src={playerHeroImage}
                      alt="Ti Toro Initiation"
                      fill
                      priority
                      className="object-cover transition-transform duration-700 hover:scale-105"
                      style={{ objectPosition: 'top' }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a1d3a]/60 via-transparent to-transparent" />
                  </div>

                  <div className="absolute -bottom-4 -left-4 flex h-24 w-24 items-center justify-center rounded-full bg-[#ef233c] shadow-xl border-4 border-[#0a1d3a]">
                    <p className="text-center text-[10px] font-black uppercase tracking-widest text-white leading-tight">
                      2-5 <br /> ANS
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Quick Info Cards Overlay (Desktop only) */}
            <div className="mx-auto mt-24 grid max-w-[1200px] gap-6 sm:grid-cols-2 lg:grid-cols-2 lg:max-w-none">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="rounded-[30px] border border-white/10 bg-white/5 p-8 text-left backdrop-blur-md"
              >
                 <RiUserSmileLine className="h-10 w-10 text-[#ef233c]" />
                 <h3 className="mt-6 text-sm font-black uppercase tracking-widest text-[#ef233c]">Socialisation</h3>
                 <p className="mt-4 text-sm leading-relaxed text-white/70">
                   Apprendre à jouer en groupe, partager et respecter ses camarades dans un environnement ludique.
                 </p>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="rounded-[30px] border border-white/10 bg-white/5 p-8 text-left backdrop-blur-md"
              >
                 <RiRunLine className="h-10 w-10 text-[#315cbf]" />
                 <h3 className="mt-6 text-sm font-black uppercase tracking-widest text-[#315cbf]">Psychomotricité</h3>
                 <p className="mt-4 text-sm leading-relaxed text-white/70">
                   Développer la coordination, l'équilibre et les réflexes de base à travers le jeu avec ballon.
                 </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* --- HIGHLIGHTS --- */}
        <section className="bg-white py-16 px-6">
          <div className="mx-auto max-w-[1100px]">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {highlights.map((item) => {
                const Icon = item.icon
                return (
                  <div key={item.label} className="rounded-[32px] border border-[#f0f4f8] bg-[#fbfcff] p-8 transition-all hover:shadow-xl hover:border-[#ef233c]/10">
                    <Icon className="h-8 w-8 text-[#ef233c]" />
                    <p className="mt-6 text-[10px] font-black uppercase tracking-widest text-[#ef233c] opacity-70">{item.label}</p>
                    <p className="mt-2 text-xl font-black text-[#0d2d62]">{item.value}</p>
                    <p className="mt-1 text-xs font-bold text-[#5b6f91]">{item.note}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* --- CONTACT --- */}
        <section className="bg-white py-24 px-6 border-t border-[#f0f4f8]">
          <div className="mx-auto max-w-[1100px]">
            <div className="mb-16 text-center">
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#ef233c]">Contact</p>
              <h2 className="mt-4 text-3xl font-black uppercase text-[#0d2d62]">Une question spécifique ?</h2>
            </div>
            <div className="grid gap-6 lg:grid-cols-3">
              {contactItems.map((item) => {
                const Icon = item.icon
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    className="group rounded-[32px] border border-[#dce5f2] bg-white p-8 transition-all hover:-translate-y-1 hover:border-[#ef233c]/20 hover:shadow-2xl"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#ef233c]/5 text-[#ef233c] transition-colors group-hover:bg-[#ef233c] group-hover:text-white">
                      <Icon className="h-6 w-6" />
                    </div>
                    <p className="mt-6 text-[10px] font-black uppercase tracking-widest text-[#ef233c]">{item.label}</p>
                    <p className="mt-2 text-lg font-black text-[#0a1d3a]">{item.value}</p>
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
