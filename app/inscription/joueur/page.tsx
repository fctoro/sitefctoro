'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { HomeNavbar } from '@/components/home-navbar'
import {
  InscriptionConsent,
  InscriptionField,
  InscriptionFormCard,
  InscriptionFormSection,
  InscriptionInput,
  InscriptionSelect,
  InscriptionSignatureField,
  InscriptionSubmit,
} from '@/components/inscription-form-ui'
import {
  RiCheckLine,
  RiInformationLine,
  RiPriceTag3Line,
  RiShieldStarLine,
  RiTimerLine,
  RiWallet3Line,
  RiParentLine,
  RiUploadCloud2Line,
} from '@remixicon/react'

type ProgramKey = 'fcToro' | 'tiToro'

type ProgramPricing = {
  annualLabel: string
  annualTotal: string
  annualCurrency: string
  feeIncludes: string[]
  paymentPlans: Array<{
    name: string
    description: string
    total: string
    details: string | string[]
  }>
  paymentMethods: string
  paymentLocations: string[]
  familyTitle: string
  familyBody: string
  lateTitle: string
  lateBody: string
  absenceTitle: string
  absenceBody: string[]
}

const pricingPrograms: Record<ProgramKey, ProgramPricing> = {
  fcToro: {
    annualLabel: 'Paiement annuel FC Toro',
    annualTotal: '$1,700',
    annualCurrency: 'USD',
    feeIncludes: [
      "Frais annuels ($1,300.00)",
      "Equipement d'entrainement ($300.00)",
      "Enregistrement annuel ($100.00)",
    ],
    paymentPlans: [
      {
        name: 'PLAN #1 (Complet)',
        description: "Paiement unique a l'enregistrement",
        total: '$1,700.00 USD',
        details: 'Un versement de $1,700.00 a l\'enregistrement',
      },
      {
        name: 'PLAN #2 (Trimestriel)',
        description: 'Paiement fractionne en 4 versements',
        total: '$1,750.00 USD',
        details: [
          "Premier versement : $750.00 a l'enregistrement",
          'Deuxieme versement : $450.00',
          'Troisieme versement : $450.00',
          'Quatrieme versement : $100.00',
        ],
      },
      {
        name: 'PLAN #3 (Mensuel)',
        description: 'Paiement fractionne en 8 versements',
        total: '$1,800.00 USD',
        details: [
          "Premier versement : $600.00 a l'enregistrement",
          '7 versements mensuels de $171.43',
        ],
      },
    ],
    paymentMethods:
      "Les frais sont payables par cheque a l'ordre de FULMOUN PRODUCTION, en cash, par carte de credit ou par virement bancaire.",
    paymentLocations: [
      'Kikloe a Petion-Ville (9h - 13h)',
      "Centre de Formation Maurice Bonnefil (Haytrac, route de l'aeroport)",
      'Note : Les paiements par carte de credit sont recus uniquement a Haytrac.',
    ],
    familyTitle: 'Reduction famille',
    familyBody:
      '5% de reduction sur le prix annuel par enfant additionnel a partir du 2e enfant.',
    lateTitle: 'Frais de retard',
    lateBody:
      '20 USD de frais par semaine de retard apres la date limite fixee.',
    absenceTitle: "Politique d'absence",
    absenceBody: [
      "Tout depart ou absence prolongee doit etre annonce par ecrit par courriel a Patrick Bonnefil avec copie a son assistante.",
      "Aucun remboursement n'est effectue pour les montants deja verses.",
      'En cas de maladie, un certificat medical doit etre soumis imperativement.',
    ],
  },
  tiToro: {
    annualLabel: 'Paiement annuel Ti Toro',
    annualTotal: '$1,000',
    annualCurrency: 'USD',
    feeIncludes: [
      "Frais annuels ($700.00)",
      "Uniforme ($200.00)",
      "Enregistrement ($100.00)",
    ],
    paymentPlans: [
      {
        name: 'PLAN #1 (Complet)',
        description: "Paiement unique a l'inscription",
        total: '$1,000.00 USD',
        details: 'Un versement de $1,000.00 a l\'inscription',
      },
      {
        name: 'PLAN #2 (Trimestriel)',
        description: 'Paiement fractionne en 4 versements',
        total: '$1,050.00 USD',
        details: [
          "Premier versement : $500.00 a l'inscription",
          'Deuxieme versement : $300.00',
          'Troisieme versement : $200.00',
          'Quatrieme versement : $50.00',
        ],
      },
      {
        name: 'PLAN #3 (Mensuel)',
        description: 'Paiement fractionne en 8 versements',
        total: '$1,100.00 USD',
        details: [
          "Premier versement : $400.00 a l'inscription",
          '7 versements mensuels de $100.00',
        ],
      },
    ],
    paymentMethods:
      "Les frais sont payables par cheque a l'ordre de FULMOUN PRODUCTION, en cash, par carte de credit ou par virement bancaire.",
    paymentLocations: [
      'Kikloe a Petion-Ville (9h - 13h)',
      "Centre de Formation Maurice Bonnefil (Haytrac, route de l'aeroport)",
      'Note : Les paiements par carte de credit sont recus uniquement a Haytrac.',
    ],
    familyTitle: 'Reduction famille',
    familyBody:
      "Les familles avec plus d'un enfant dans le club beneficieront d'une reduction de 5% du prix annuel par enfant additionnel a partir du 2e enfant.",
    lateTitle: 'Frais de retard',
    lateBody:
      'Un montant de $20 USD est ajoute par semaine de retard apres la date limite fixee pour les paiements.',
    absenceTitle: "Politique d'absence",
    absenceBody: [
      "Tout cas d'absence ou de depart d'un enfant doit etre annonce a l'avance par ecrit.",
      'Un courriel formel doit etre envoye afin que le depart soit effectif.',
      "Aucun montant deja verse ne sera rembourse.",
    ],
  },
}

const requiredFiles = [
  {
    label: "2 Photos d'identification",
    description: 'Format passeport recommande',
  },
  {
    label: 'Acte de naissance',
    description: 'Copie lisible du document original',
  },
  {
    label: "Piece d'identite du parent",
    description: "Passeport ou carte d'identite",
  },
]

export default function InscriptionJoueurPage() {
  const [activeProgram, setActiveProgram] = useState<ProgramKey>('fcToro')
  const pricing = pricingPrograms[activeProgram]

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#0a1d3a]">
      <HomeNavbar anchorPrefix="/" />

      <main className="pt-[116px] lg:pt-[78px]">
        <section className="relative h-[320px] overflow-hidden bg-[#0a1d3a] text-white">
          <Image
            src="/joueur/extracted/560435029_18532793887012336_3999511270054224397_n.jpg"
            alt="Devenir joueur FC TORO"
            fill
            priority
            className="object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a1d3a] via-transparent to-transparent" />
          <div className="relative z-10 mx-auto flex h-full max-w-[1100px] flex-col justify-end px-6 pb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div className="inline-flex items-center gap-2 rounded-full bg-[#ef233c] px-4 py-2 text-[10px] font-black uppercase tracking-widest">
                Rejoindre le club
              </div>
              <h1 className="text-4xl font-black uppercase tracking-tight md:text-6xl">
                Devenir Joueur
              </h1>
              <p className="max-w-[600px] text-lg font-medium text-white/80">
                Integrez l'academie FC TORO ou le programme Ti Toro. Un parcours
                d'excellence des le plus jeune age.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="bg-white px-4 pb-2 pt-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[1100px]">
            <div className="mb-16 grid gap-12 lg:grid-cols-2">
              <div className="space-y-8">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#ef233c]">
                      Enregistrement / Frais
                    </p>
                    <h2 className="mt-4 text-4xl font-black uppercase text-[#0d2d62]">
                      Procedures & Paiements
                    </h2>
                    <div className="mt-6 h-1 w-16 bg-[#ef233c]" />
                  </div>

                  <div className="inline-flex rounded-full border border-[#dce5f2] bg-white p-1.5 shadow-[0_10px_20px_rgba(10,29,58,0.05)]">
                    <button
                      type="button"
                      onClick={() => setActiveProgram('fcToro')}
                      className={`rounded-full px-5 py-2.5 text-[11px] font-black uppercase tracking-[0.14em] transition-colors ${
                        activeProgram === 'fcToro'
                          ? 'bg-[#0a2347] text-white'
                          : 'text-[#5b6f91] hover:text-[#0a1d3a]'
                      }`}
                    >
                      FC Toro
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveProgram('tiToro')}
                      className={`rounded-full px-5 py-2.5 text-[11px] font-black uppercase tracking-[0.14em] transition-colors ${
                        activeProgram === 'tiToro'
                          ? 'bg-[#ef233c] text-white'
                          : 'text-[#5b6f91] hover:text-[#0a1d3a]'
                      }`}
                    >
                      Ti Toro
                    </button>
                  </div>
                </div>

                <div className="overflow-hidden rounded-[40px] bg-[#0a2347] p-10 text-white shadow-2xl">
                  <div className="mb-8 flex items-center gap-3">
                    <RiPriceTag3Line className="h-6 w-6 text-[#ef233c]" />
                    <p className="text-sm font-black uppercase tracking-widest">
                      {pricing.annualLabel}
                    </p>
                  </div>
                  <div className="flex items-baseline gap-4">
                    <span className="text-7xl font-black tracking-tighter">
                      {pricing.annualTotal}
                    </span>
                    <span className="text-xl font-black text-[#ef233c]">
                      {pricing.annualCurrency}
                    </span>
                  </div>
                  <div className="mt-10 space-y-4 border-t border-white/10 pt-8">
                    <p className="text-sm font-black uppercase tracking-widest text-[#ef233c]">
                      Ce prix inclut :
                    </p>
                    <div className="grid gap-3">
                      {pricing.feeIncludes.map((item) => (
                        <div
                          key={item}
                          className="flex items-center gap-3 text-sm font-semibold text-white/80"
                        >
                          <RiCheckLine className="h-5 w-5 text-[#ef233c]" />
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="rounded-[32px] border border-[#dce5f2] bg-[#f8fafc] p-8">
                  <div className="mb-6 flex items-center gap-3">
                    <RiWallet3Line className="h-6 w-6 text-[#ef233c]" />
                    <h3 className="text-lg font-black uppercase">
                      Modes de paiement
                    </h3>
                  </div>
                  <p className="text-sm leading-relaxed text-[#5b6f91]">
                    {pricing.paymentMethods}
                  </p>
                  <div className="mt-6 space-y-3">
                    <p className="text-xs font-bold text-[#0d2d62] underline">
                      Lieux de depot :
                    </p>
                    <div className="space-y-2 rounded-2xl bg-white p-4 text-xs italic text-[#5b6f91]">
                      {pricing.paymentLocations.map((item) => (
                        <p
                          key={item}
                          className={
                            item.startsWith('Note') || item.startsWith('Les paiements')
                              ? 'font-black not-italic text-[#ef233c]'
                              : ''
                          }
                        >
                          {item.startsWith('Note') || item.startsWith('Les paiements')
                            ? item
                            : `- ${item}`}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <div className="grid gap-6">
                  {pricing.paymentPlans.map((plan) => (
                    <div
                      key={`${activeProgram}-${plan.name}`}
                      className="rounded-[32px] border border-[#dce5f2] bg-white p-8 shadow-sm"
                    >
                      <div className="flex items-center justify-between">
                        <p className="text-[10px] font-black uppercase tracking-widest text-[#ef233c]">
                          {plan.name}
                        </p>
                        <span className="text-sm font-black text-[#0d2d62]">
                          {plan.total}
                        </span>
                      </div>
                      <h3 className="mt-2 text-xl font-black uppercase">
                        {plan.description}
                      </h3>
                      <div className="mt-6 space-y-2">
                        {Array.isArray(plan.details) ? (
                          plan.details.map((detail) => (
                            <div
                              key={detail}
                              className="flex items-center justify-between rounded-xl bg-[#f8fafc] px-4 py-3 text-xs font-bold text-[#5b6f91]"
                            >
                              {detail}
                            </div>
                          ))
                        ) : (
                          <p className="text-sm font-semibold text-[#5b6f91]">
                            {plan.details}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-[28px] border border-[#ef233c]/10 bg-[#ef233c]/5 p-6">
                    <RiParentLine className="mb-4 h-6 w-6 text-[#ef233c]" />
                    <h4 className="text-xs font-black uppercase tracking-widest text-[#ef233c]">
                      {pricing.familyTitle}
                    </h4>
                    <p className="mt-3 text-xs leading-relaxed text-[#5b6f91]">
                      {pricing.familyBody}
                    </p>
                  </div>
                  <div className="rounded-[28px] border border-[#0a2347]/10 bg-[#0a2347]/5 p-6">
                    <RiTimerLine className="mb-4 h-6 w-6 text-[#0a2347]" />
                    <h4 className="text-xs font-black uppercase tracking-widest text-[#0a2347]">
                      {pricing.lateTitle}
                    </h4>
                    <p className="mt-3 text-xs leading-relaxed text-[#5b6f91]">
                      {pricing.lateBody}
                    </p>
                  </div>
                </div>

                <div className="rounded-[32px] border border-[#dce5f2] bg-white p-8">
                  <div className="mb-6 flex items-center gap-3">
                    <RiInformationLine className="h-6 w-6 text-[#ef233c]" />
                    <h3 className="text-lg font-black uppercase">
                      {pricing.absenceTitle}
                    </h3>
                  </div>
                  <div className="space-y-4 text-xs leading-relaxed text-[#5b6f91]">
                    {pricing.absenceBody.map((item, index) => (
                      <p
                        key={`${activeProgram}-absence-${index}`}
                        className={index === 1 && activeProgram === 'fcToro' ? 'font-bold text-[#ef233c]' : ''}
                      >
                        {item}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="formulaire-joueur"
          className="bg-[#f8fafc] px-4 pb-12 pt-2 sm:px-6 lg:px-8"
        >
          <div className="mx-auto max-w-[1100px]">
            <InscriptionFormCard
              eyebrow="Formulaire joueur"
              title="Inscription & Dossier"
              description="Soumettez votre dossier complet en ligne. L'inscription est consideree comme complete une fois le formulaire soumis avec le premier paiement integral."
              badges={['Dossier Joueur', 'Inscription Directe', 'Paiement Securise']}
            >
              <form className="space-y-8">
                <div className="rounded-[32px] bg-[#0a2347] p-8 text-white shadow-xl">
                  <div className="mb-6 flex items-center gap-4">
                    <RiShieldStarLine className="h-8 w-8 text-[#ef233c]" />
                    <div>
                      <h3 className="text-xl font-black uppercase tracking-tight">
                        Choix du programme
                      </h3>
                      <p className="text-sm text-white/60">
                        Selectionnez le parcours souhaite pour le joueur.
                      </p>
                    </div>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label
                      className={`relative flex cursor-pointer items-center gap-4 rounded-2xl border p-6 transition-all ${
                        activeProgram === 'tiToro'
                          ? 'border-[#ef233c]/40 bg-white/12'
                          : 'border-white/10 bg-white/5 hover:bg-white/10'
                      }`}
                    >
                      <input
                        type="radio"
                        name="program"
                        value="titoro"
                        className="h-5 w-5 accent-[#ef233c]"
                        checked={activeProgram === 'tiToro'}
                        onChange={() => setActiveProgram('tiToro')}
                      />
                      <div>
                        <p className="text-sm font-black uppercase tracking-widest">
                          Ti Toro
                        </p>
                        <p className="text-xs text-white/50">2 a 5 ans</p>
                      </div>
                    </label>
                    <label
                      className={`relative flex cursor-pointer items-center gap-4 rounded-2xl border p-6 transition-all ${
                        activeProgram === 'fcToro'
                          ? 'border-[#ef233c]/40 bg-white/12'
                          : 'border-white/10 bg-white/5 hover:bg-white/10'
                      }`}
                    >
                      <input
                        type="radio"
                        name="program"
                        value="fctoro"
                        className="h-5 w-5 accent-[#ef233c]"
                        checked={activeProgram === 'fcToro'}
                        onChange={() => setActiveProgram('fcToro')}
                      />
                      <div>
                        <p className="text-sm font-black uppercase tracking-widest">
                          FC Toro
                        </p>
                        <p className="text-xs text-white/50">6 ans et plus</p>
                      </div>
                    </label>
                  </div>
                </div>

                <InscriptionFormSection
                  index="01"
                  title="Identite du joueur"
                  description="Informations personnelles de l'enfant."
                >
                  <div className="grid gap-5 sm:grid-cols-2">
                    <InscriptionField label="Prenom de l'enfant" required>
                      <InscriptionInput type="text" placeholder="Nathan" />
                    </InscriptionField>
                    <InscriptionField label="Nom de l'enfant" required>
                      <InscriptionInput type="text" placeholder="Pierre" />
                    </InscriptionField>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <InscriptionField label="Date de naissance" required>
                      <InscriptionInput type="date" />
                    </InscriptionField>
                    <InscriptionField label="Genre" required>
                      <InscriptionSelect defaultValue="Choisir">
                        <option disabled>Choisir</option>
                        <option>Filles (F)</option>
                        <option>Garcon (M)</option>
                      </InscriptionSelect>
                    </InscriptionField>
                  </div>

                  <InscriptionField label="Adresse domicile" required>
                    <InscriptionInput type="text" placeholder="Rue, Quartier, Ville" />
                  </InscriptionField>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <InscriptionField label="Ecole frequentee" required>
                      <InscriptionInput
                        type="text"
                        placeholder="Nom de l'etablissement"
                      />
                    </InscriptionField>
                    <InscriptionField label="Ancienne experience soccer">
                      <InscriptionInput
                        type="text"
                        placeholder="Clubs precedents ou Nouveau"
                      />
                    </InscriptionField>
                  </div>
                </InscriptionFormSection>

                <InscriptionFormSection
                  index="02"
                  title="Parents / Tuteur"
                  description="Informations de contact pour les responsables legaux."
                >
                  <div className="grid gap-5 sm:grid-cols-2">
                    <InscriptionField label="Nom & Prenom" required>
                      <InscriptionInput type="text" />
                    </InscriptionField>
                    <InscriptionField label="E-mail" required>
                      <InscriptionInput type="email" placeholder="votre@email.com" />
                    </InscriptionField>
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <InscriptionField label="Telephone / WhatsApp" required>
                      <InscriptionInput type="tel" placeholder="+509" />
                    </InscriptionField>
                    <InscriptionField label="Adresse (si differente)">
                      <InscriptionInput type="text" />
                    </InscriptionField>
                  </div>
                </InscriptionFormSection>

                <InscriptionFormSection
                  index="03"
                  title="Contact d'urgence"
                  description="En cas de besoin, qui le club doit-il contacter ?"
                >
                  <div className="grid gap-5 sm:grid-cols-2">
                    <InscriptionField label="Nom & Prenom" required>
                      <InscriptionInput type="text" />
                    </InscriptionField>
                    <InscriptionField label="Lien de parente" required>
                      <InscriptionInput
                        type="text"
                        placeholder="Ex: Oncle, Tante..."
                      />
                    </InscriptionField>
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <InscriptionField label="Telephone" required>
                      <InscriptionInput type="tel" />
                    </InscriptionField>
                    <InscriptionField label="E-mail">
                      <InscriptionInput type="email" />
                    </InscriptionField>
                  </div>
                  <InscriptionField label="Adresse physique">
                    <InscriptionInput type="text" />
                  </InscriptionField>
                </InscriptionFormSection>

                <InscriptionFormSection
                  index="04"
                  title="Uniformes & Tailles"
                  description="Selectionnez les tailles pour l'equipement fourni par le club."
                >
                  <div className="grid gap-5 sm:grid-cols-2">
                    <InscriptionField label="Taille du Haut (Top)" required>
                      <InscriptionSelect defaultValue="Choisir">
                        <option disabled>Choisir</option>
                        <option>YXS</option>
                        <option>YS</option>
                        <option>YM</option>
                        <option>YL</option>
                        <option>YXL</option>
                        <option>AS</option>
                        <option>AM</option>
                        <option>AL</option>
                        <option>AXL</option>
                      </InscriptionSelect>
                    </InscriptionField>
                    <InscriptionField label="Taille du Short" required>
                      <InscriptionSelect defaultValue="Choisir">
                        <option disabled>Choisir</option>
                        <option>YXS</option>
                        <option>YS</option>
                        <option>YM</option>
                        <option>YL</option>
                        <option>YXL</option>
                        <option>AS</option>
                        <option>AM</option>
                        <option>AL</option>
                        <option>AXL</option>
                      </InscriptionSelect>
                    </InscriptionField>
                  </div>
                  <InscriptionField
                    label="Numeros preferes"
                    helper="Indiquez 3 choix (Ex: 10, 7, 22)"
                  >
                    <InscriptionInput type="text" placeholder="10, 7, 22" />
                  </InscriptionField>
                </InscriptionFormSection>

                <InscriptionFormSection
                  index="05"
                  title="Choix du Plan de Paiement"
                  description="Consultez les details en haut de page avant de selectionner."
                >
                  <div className="grid gap-4">
                    {pricing.paymentPlans.map((plan, index) => (
                      <label
                        key={`form-${activeProgram}-${plan.name}`}
                        className="flex cursor-pointer items-center gap-4 rounded-2xl border border-[#dce5f2] bg-white p-5 hover:bg-[#f8fafc]"
                      >
                        <input
                          type="radio"
                          name="payment_plan"
                          value={plan.name}
                          className="h-4 w-4 accent-[#ef233c]"
                          defaultChecked={index === 0}
                        />
                        <span className="text-sm font-bold text-[#0d2d62]">
                          {plan.name} ({plan.description} - {plan.total})
                        </span>
                      </label>
                    ))}
                  </div>
                </InscriptionFormSection>

                <InscriptionFormSection
                  index="06"
                  title="Mode de paiement"
                  description="Selectionnez votre methode de reglement."
                >
                  <div className="grid gap-4 sm:grid-cols-3">
                    {[
                      { label: 'Cash/chèque', value: 'cash_cheque' },
                      { label: 'Carte bancaire', value: 'carte' },
                      { label: 'Transfert bancaire', value: 'transfert' },
                    ].map((mode) => (
                      <label
                        key={mode.value}
                        className="flex cursor-pointer items-center gap-3 rounded-2xl border border-[#dce5f2] bg-white p-5 transition-all hover:border-[#ef233c]/20 hover:bg-[#f8fafc]"
                      >
                        <input
                          type="radio"
                          name="payment_method"
                          value={mode.value}
                          className="h-4 w-4 accent-[#ef233c]"
                        />
                        <span className="text-sm font-bold text-[#0d2d62]">
                          {mode.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </InscriptionFormSection>

                <InscriptionFormSection
                  index="07"
                  title="Documents a soumettre"
                  description="Veuillez telecharger les versions numeriques (scan ou photo claire) des documents suivants."
                >
                  <div className="grid gap-8">
                    {requiredFiles.map((doc) => (
                      <InscriptionField
                        key={doc.label}
                        label={doc.label}
                        helper={doc.description}
                        required
                      >
                        <div className="relative flex min-h-[140px] items-center justify-center rounded-[32px] border-2 border-dashed border-[#dce5f2] bg-white transition-all hover:border-[#ef233c]/30 hover:bg-[#fffcfc]">
                          <input
                            type="file"
                            className="absolute inset-0 z-10 cursor-pointer opacity-0"
                          />
                          <div className="text-center">
                            <RiUploadCloud2Line className="mx-auto h-8 w-8 text-[#ef233c]/40" />
                            <p className="mt-2 text-xs font-black uppercase tracking-widest text-[#0a1d3a]">
                              Uploader le fichier
                            </p>
                            <p className="mt-1 text-[10px] text-[#5b6f91]">
                              PDF, JPG ou PNG (Max 5MB)
                            </p>
                          </div>
                        </div>
                      </InscriptionField>
                    ))}
                  </div>
                </InscriptionFormSection>

                <InscriptionFormSection
                  index="08"
                  title="Autorisations & Engagement"
                  description="Veuillez cocher chaque case pour valider votre accord."
                >
                  <div className="space-y-4">
                    <InscriptionConsent>
                      J'autorise l'utilisation des photos de mon enfant sur les réseaux sociaux et sur tout matériel relatif à <strong>FC TORO</strong>.
                    </InscriptionConsent>
                    <InscriptionConsent>
                      Je certifie que mon enfant n'a pas de contre-indication médicale à la pratique du sport.
                    </InscriptionConsent>
                    <InscriptionConsent>
                      Je, soussigné(e) Monsieur ou Madame, autorise les responsables de prendre toutes les dispositions nécessaires en cas d'urgence.
                    </InscriptionConsent>
                  </div>

                  <div className="mt-8 space-y-6 rounded-3xl bg-white p-8 border border-[#dce5f2]">
                    <InscriptionSignatureField label="Signature du parent ou tuteur legal" />
                  </div>
                </InscriptionFormSection>

                <InscriptionConsent>
                  Je confirme que les informations sont exactes et que je
                  m'engage a respecter les politiques du club concernant les
                  paiements et le comportement des membres.
                </InscriptionConsent>

                <InscriptionSubmit
                  label="Finaliser l'inscription"
                  note="Votre dossier sera analyse par le club. Un message de confirmation vous sera envoye par e-mail avec les instructions finales pour le paiement."
                />
              </form>
            </InscriptionFormCard>
          </div>
        </section>
      </main>
    </div>
  )
}
