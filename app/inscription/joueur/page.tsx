'use client'

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
  InscriptionSubmit,
  InscriptionTextarea,
} from '@/components/inscription-form-ui'
import {
  RiCheckLine,
  RiInformationLine,
  RiPriceTag3Line,
  RiFileList3Line,
  RiShieldStarLine,
  RiTimerLine,
  RiWallet3Line,
  RiParentLine,
  RiUser3Line,
  RiContactsLine,
  RiTShirtLine,
  RiArrowRightLine,
  RiUploadCloud2Line,
} from '@remixicon/react'

const feeIncludes = [
  "L'enregistrement annuel",
  "Les frais annuels",
  "Pack Uniformes complet"
]

const paymentPlans = [
  {
    name: 'PLAN #1',
    description: 'Paiement unique à l\'inscription',
    total: '$1,700 USD',
    details: 'Un paiement de $1,700 USD'
  },
  {
    name: 'PLAN #2',
    description: 'Paiement fractionné en 4 versements',
    total: '$1,700 USD',
    details: [
      'Premier paiement : $750 à l\'enregistrement',
      'Deuxième paiement : $450',
      'Troisième paiement : $450',
      'Quatrième paiement : $50'
    ]
  }
]

const requiredFiles = [
  { label: "2 Photos d'identification", description: "Format passeport recommandé" },
  { label: "Acte de naissance", description: "Copie lisible du document original" },
  { label: "Pièce d'identité du parent", description: "Passeport ou Carte d'Identité" }
]

export default function InscriptionJoueurPage() {
  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#0a1d3a]">
      <HomeNavbar anchorPrefix="/" />

      <main className="pt-[116px] lg:pt-[78px]">
        {/* Hero Section */}
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
              <h1 className="text-4xl font-black uppercase md:text-6xl tracking-tight">
                Devenir Joueur
              </h1>
              <p className="max-w-[600px] text-lg font-medium text-white/80">
                Intégrez l'académie FC TORO ou le programme Ti Toro. Un parcours d'excellence dès le plus jeune âge.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Pricing/Fees Section */}
        <section className="bg-white px-4 pt-12 pb-2 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[1100px]">
            <div className="mb-16 grid gap-12 lg:grid-cols-2">
              <div className="space-y-8">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#ef233c]">Enregistrement / Frais</p>
                  <h2 className="mt-4 text-4xl font-black uppercase text-[#0d2d62]">Procédures & Paiements</h2>
                  <div className="mt-6 h-1 w-16 bg-[#ef233c]" />
                </div>

                <div className="overflow-hidden rounded-[40px] bg-[#0a2347] p-10 text-white shadow-2xl">
                  <div className="flex items-center gap-3 mb-8">
                    <RiPriceTag3Line className="h-6 w-6 text-[#ef233c]" />
                    <p className="text-sm font-black uppercase tracking-widest">Paiement Annuel 2026</p>
                  </div>
                  <div className="flex items-baseline gap-4">
                    <span className="text-7xl font-black tracking-tighter">$1,700</span>
                    <span className="text-xl font-black text-[#ef233c]">USD</span>
                  </div>
                  <div className="mt-10 space-y-4 border-t border-white/10 pt-8">
                    <p className="text-sm font-black uppercase tracking-widest text-[#ef233c]">Ce prix inclut :</p>
                    <div className="grid gap-3">
                      {feeIncludes.map((item) => (
                        <div key={item} className="flex items-center gap-3 text-sm font-semibold text-white/80">
                          <RiCheckLine className="h-5 w-5 text-[#ef233c]" />
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="rounded-[32px] border border-[#dce5f2] bg-[#f8fafc] p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <RiWallet3Line className="h-6 w-6 text-[#ef233c]" />
                    <h3 className="text-lg font-black uppercase">Modes de paiement</h3>
                  </div>
                  <p className="text-sm leading-relaxed text-[#5b6f91]">
                    Les frais sont payables par chèque à l'ordre de <strong>FULMOUN PRODUCTION</strong>, en cash, par carte de crédit ou par virement bancaire.
                  </p>
                  <div className="mt-6 space-y-3">
                    <p className="text-xs font-bold text-[#0d2d62] underline">Lieux de dépôt :</p>
                    <div className="rounded-2xl bg-white p-4 text-xs italic text-[#5b6f91] space-y-2">
                       <p>• Kikloe à Pétion-Ville</p>
                       <p>• Centre de Formation Maurice Bonnefil (Haytrac, route de l'aéroport)</p>
                       <p className="text-[#ef233c] font-black non-italic">Note : Les paiements par carte de crédit sont reçus uniquement à Haytrac.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <div className="grid gap-6">
                  {paymentPlans.map((plan) => (
                    <div key={plan.name} className="rounded-[32px] border border-[#dce5f2] bg-white p-8 shadow-sm">
                      <div className="flex items-center justify-between">
                        <p className="text-[10px] font-black uppercase tracking-widest text-[#ef233c]">{plan.name}</p>
                        <span className="text-sm font-black text-[#0d2d62]">{plan.total}</span>
                      </div>
                      <h3 className="mt-2 text-xl font-black uppercase">{plan.description}</h3>
                      <div className="mt-6 space-y-2">
                        {Array.isArray(plan.details) ? (
                          plan.details.map((d) => (
                            <div key={d} className="flex items-center justify-between rounded-xl bg-[#f8fafc] px-4 py-3 text-xs font-bold text-[#5b6f91]">
                              {d}
                            </div>
                          ))
                        ) : (
                          <p className="text-sm font-semibold text-[#5b6f91]">{plan.details}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-[28px] bg-[#ef233c]/5 p-6 border border-[#ef233c]/10">
                    <RiParentLine className="h-6 w-6 text-[#ef233c] mb-4" />
                    <h4 className="text-xs font-black uppercase tracking-widest text-[#ef233c]">Réduction Famille</h4>
                    <p className="mt-3 text-xs leading-relaxed text-[#5b6f91]">
                      <strong>5% de réduction</strong> sur le prix annuel par enfant additionnel à partir du 2e enfant.
                    </p>
                  </div>
                  <div className="rounded-[28px] bg-[#0a2347]/5 p-6 border border-[#0a2347]/10">
                    <RiTimerLine className="h-6 w-6 text-[#0a2347] mb-4" />
                    <h4 className="text-xs font-black uppercase tracking-widest text-[#0a2347]">Frais de retard</h4>
                    <p className="mt-3 text-xs leading-relaxed text-[#5b6f91]">
                      <strong>$20 USD</strong> de frais par semaine de retard après la date limite fixée.
                    </p>
                  </div>
                </div>

                <div className="rounded-[32px] border border-[#dce5f2] bg-white p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <RiInformationLine className="h-6 w-6 text-[#ef233c]" />
                    <h3 className="text-lg font-black uppercase">Politique d'absence</h3>
                  </div>
                  <div className="space-y-4 text-xs leading-relaxed text-[#5b6f91]">
                    <p>Tout départ ou absence prolongée doit être annoncé par écrit par courriel à <strong>Patrick Bonnefil</strong> avec copie à son assistante.</p>
                    <p className="font-bold text-[#ef233c]">Aucun remboursement n'est effectué pour les montants déjà versés.</p>
                    <p>En cas de maladie, un certificat médical doit être soumis impérativement.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Form Section */}
        <section id="formulaire-joueur" className="bg-[#f8fafc] px-4 pt-2 pb-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[1100px]">
            <InscriptionFormCard
              eyebrow="Formulaire 2026"
              title="Inscription & Dossier"
              description="Soumettez votre dossier complet en ligne. L'inscription est considérée comme complète une fois le formulaire soumis avec le premier paiement intégral."
              badges={['Dossier Joueur', 'Inscription Directe', 'Paiement Securise']}
            >
              <form className="space-y-8">
                {/* 0. Choix du programme */}
                <div className="rounded-[32px] bg-[#0a2347] p-8 text-white shadow-xl">
                   <div className="flex items-center gap-4 mb-6">
                      <RiShieldStarLine className="h-8 w-8 text-[#ef233c]" />
                      <div>
                        <h3 className="text-xl font-black uppercase tracking-tight">Choix du programme</h3>
                        <p className="text-sm text-white/60">Sélectionnez le parcours souhaité pour le joueur.</p>
                      </div>
                   </div>
                   <div className="grid gap-4 sm:grid-cols-2">
                      <label className="relative flex cursor-pointer items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 transition-all hover:bg-white/10">
                        <input type="radio" name="program" value="titoro" className="h-5 w-5 accent-[#ef233c]" defaultChecked />
                        <div>
                          <p className="text-sm font-black uppercase tracking-widest">Ti Toro</p>
                          <p className="text-xs text-white/50">2 à 5 ans</p>
                        </div>
                      </label>
                      <label className="relative flex cursor-pointer items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 transition-all hover:bg-white/10">
                        <input type="radio" name="program" value="fctoro" className="h-5 w-5 accent-[#ef233c]" />
                        <div>
                          <p className="text-sm font-black uppercase tracking-widest">FC Toro</p>
                          <p className="text-xs text-white/50">6 ans et plus</p>
                        </div>
                      </label>
                   </div>
                </div>

                <InscriptionFormSection
                  index="01"
                  title="Identité du joueur"
                  description="Informations personnelles de l'enfant."
                >
                  <div className="grid gap-5 sm:grid-cols-2">
                    <InscriptionField label="Prénom de l'enfant" required>
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
                        <option>Garçon (M)</option>
                      </InscriptionSelect>
                    </InscriptionField>
                  </div>

                  <InscriptionField label="Adresse domicile" required>
                    <InscriptionInput type="text" placeholder="Rue, Quartier, Ville" />
                  </InscriptionField>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <InscriptionField label="École fréquentée" required>
                      <InscriptionInput type="text" placeholder="Nom de l'établissement" />
                    </InscriptionField>
                    <InscriptionField label="Ancienne Expérience Soccer">
                      <InscriptionInput type="text" placeholder="Clubs précédents ou 'Nouveau'" />
                    </InscriptionField>
                  </div>
                </InscriptionFormSection>

                <InscriptionFormSection
                  index="02"
                  title="Parents / Tuteur"
                  description="Informations de contact pour les responsables légaux."
                >
                  <div className="grid gap-5 sm:grid-cols-2">
                    <InscriptionField label="Nom & Prénom" required>
                      <InscriptionInput type="text" />
                    </InscriptionField>
                    <InscriptionField label="E-mail" required>
                      <InscriptionInput type="email" placeholder="votre@email.com" />
                    </InscriptionField>
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <InscriptionField label="Téléphone / WhatsApp" required>
                      <InscriptionInput type="tel" placeholder="+509" />
                    </InscriptionField>
                    <InscriptionField label="Adresse (si différente)">
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
                    <InscriptionField label="Nom & Prénom" required>
                      <InscriptionInput type="text" />
                    </InscriptionField>
                    <InscriptionField label="Lien de parenté" required>
                      <InscriptionInput type="text" placeholder="Ex: Oncle, Tante..." />
                    </InscriptionField>
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <InscriptionField label="Téléphone" required>
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
                  description="Sélectionnez les tailles pour l'équipement fourni par le club."
                >
                  <div className="grid gap-5 sm:grid-cols-2">
                    <InscriptionField label="Taille du Haut (Top)" required>
                      <InscriptionSelect defaultValue="Choisir">
                        <option disabled>Choisir</option>
                        <option>YXS</option><option>YS</option><option>YM</option><option>YL</option><option>YXL</option>
                        <option>AS</option><option>AM</option><option>AL</option><option>AXL</option>
                      </InscriptionSelect>
                    </InscriptionField>
                    <InscriptionField label="Taille du Short" required>
                      <InscriptionSelect defaultValue="Choisir">
                        <option disabled>Choisir</option>
                        <option>YXS</option><option>YS</option><option>YM</option><option>YL</option><option>YXL</option>
                        <option>AS</option><option>AM</option><option>AL</option><option>AXL</option>
                      </InscriptionSelect>
                    </InscriptionField>
                  </div>
                  <InscriptionField label="Numéros préférés" helper="Indiquez 3 choix (Ex: 10, 7, 22)">
                    <InscriptionInput type="text" placeholder="10, 7, 22" />
                  </InscriptionField>
                </InscriptionFormSection>

                <InscriptionFormSection
                  index="05"
                  title="Choix du Plan de Paiement"
                  description="Consultez les détails en haut de page avant de sélectionner."
                >
                   <div className="grid gap-4">
                      <label className="flex cursor-pointer items-center gap-4 rounded-2xl border border-[#dce5f2] bg-white p-5 hover:bg-[#f8fafc]">
                        <input type="radio" name="payment_plan" value="plan1" className="h-4 w-4 accent-[#ef233c]" defaultChecked />
                        <span className="text-sm font-bold text-[#0d2d62]">PLAN #1 (Paiement intégral - $1,700 USD)</span>
                      </label>
                      <label className="flex cursor-pointer items-center gap-4 rounded-2xl border border-[#dce5f2] bg-white p-5 hover:bg-[#f8fafc]">
                        <input type="radio" name="payment_plan" value="plan2" className="h-4 w-4 accent-[#ef233c]" />
                        <span className="text-sm font-bold text-[#0d2d62]">PLAN #2 (4 paiments - Fractionné)</span>
                      </label>
                   </div>
                </InscriptionFormSection>

                <InscriptionFormSection
                  index="06"
                  title="Documents à soumettre"
                  description="Veuillez télécharger les versions numériques (Scan ou Photo claire) des documents suivants."
                >
                  <div className="grid gap-8">
                     {requiredFiles.map((doc) => (
                       <InscriptionField key={doc.label} label={doc.label} helper={doc.description} required>
                          <div className="relative flex min-h-[140px] items-center justify-center rounded-[32px] border-2 border-dashed border-[#dce5f2] bg-white transition-all hover:border-[#ef233c]/30 hover:bg-[#fffcfc]">
                            <input type="file" className="absolute inset-0 z-10 cursor-pointer opacity-0" />
                            <div className="text-center">
                              <RiUploadCloud2Line className="mx-auto h-8 w-8 text-[#ef233c]/40" />
                              <p className="mt-2 text-xs font-black uppercase tracking-widest text-[#0a1d3a]">Uploader le fichier</p>
                              <p className="mt-1 text-[10px] text-[#5b6f91]">PDF, JPG ou PNG (Max 5MB)</p>
                            </div>
                          </div>
                       </InscriptionField>
                     ))}
                  </div>
                </InscriptionFormSection>

                <InscriptionConsent>
                  Je confirme que les informations sont exactes et que je m'engage à respecter les politiques du club concernant les paiements et le comportement des membres.
                </InscriptionConsent>

                <InscriptionSubmit
                  label="Finaliser l'inscription"
                  note="Votre dossier sera analysé par le club. Un message de confirmation vous sera envoyé par e-mail avec les instructions finales pour le paiement."
                />
              </form>
            </InscriptionFormCard>
          </div>
        </section>
      </main>
    </div>
  )
}
