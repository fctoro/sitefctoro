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
  RiHeartLine,
  RiMegaphoneLine,
} from '@remixicon/react'

const supporterBenefits = [
  'Rejoindre la base supporters et les activations club',
  'Participer au benevolat matchday selon les disponibilites',
  'Recevoir les informations utiles sur la vie du club',
]

const supporterRoles = [
  'Supporter actif',
  'Benevole matchday',
  'Ambassadeur digital',
  'Parent supporter',
]

export default function InscriptionFansPage() {
  return (
    <div className="min-h-screen bg-[#f2f2f4] text-[#0a1d3a]">
      <HomeNavbar anchorPrefix="/" />

      <main className="pt-[116px] lg:pt-[78px]">
        <section className="relative h-[240px] overflow-hidden bg-[#0a1d3a] text-white md:h-[320px]">
          <Image
            src="/joueur/extracted/583167774_18542869372012336_2307311757000245016_n.jpg"
            alt="Devenir fan FC TORO"
            fill
            priority
            className="object-cover opacity-45 transition-transform duration-1000 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a1d3a] via-[#0a1d3a]/65 to-transparent" />
          <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-[#ef233c] via-[#ef233c]/55 to-transparent" />

          <div className="relative z-10 mx-auto flex h-full max-w-[1100px] flex-col justify-center px-6">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#ef233c]">
                Communaute club
              </p>
              <h1 className="max-w-[760px] text-4xl font-black uppercase leading-[0.82] tracking-tighter drop-shadow-2xl md:text-7xl">
                Devenir
                <br />
                Fan
              </h1>
            </motion.div>
          </div>
        </section>

        <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-[1100px] gap-12 lg:grid-cols-[0.92fr_1.08fr]">
            <div className="space-y-10">
              <div>
                <div className="inline-flex items-center gap-3 rounded-full bg-[#0a2347] px-5 py-3 text-sm font-black uppercase tracking-[0.14em] text-white">
                  Vivre le club
                </div>
                <h2 className="mt-6 text-[clamp(2rem,4vw,3.4rem)] font-black uppercase leading-[0.92] text-[#0a1d3a]">
                  Construire une communaute forte autour des jours de match et de la vie FC TORO.
                </h2>
              </div>

              <p className="text-base font-medium leading-relaxed text-[#5b6f91]">
                Cette inscription est pensee pour les supporters, parents et benevoles qui souhaitent
                prendre part au rythme du club. Matchday, contenu, accueil, tribune ou relais digital:
                chaque energie utile compte.
              </p>

              <div className="grid gap-4">
                {supporterBenefits.map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-4 rounded-[28px] border border-[#e5edf7] bg-[#f8fafc] p-5"
                  >
                    <RiHeartLine className="mt-0.5 h-5 w-5 shrink-0 text-[#ef233c]" />
                    <p className="text-sm font-bold leading-relaxed text-[#0a1d3a]">{item}</p>
                  </div>
                ))}
              </div>

              <div className="overflow-hidden rounded-[34px] bg-[#0a2347] p-8 text-white shadow-xl">
                <div className="flex items-center gap-3">
                  <RiMegaphoneLine className="h-8 w-8 text-[#ef233c]" />
                  <h3 className="text-xl font-black uppercase">Types d engagement</h3>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {supporterRoles.map((item) => (
                    <div key={item} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
                      <RiCheckLine className="mt-0.5 h-5 w-5 shrink-0 text-[#ef233c]" />
                      <p className="text-sm font-semibold text-white/88">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <InscriptionFormCard
              eyebrow="Dossier fans"
              title="Activation supporters"
              description="Le formulaire permet au club de savoir comment vous souhaitez vous impliquer, sur quels temps forts et avec quel type de presence."
              badges={['Communaute', 'Matchday', 'Supporters']}
            >
              <form className="space-y-8">
                <InscriptionFormSection
                  index="01"
                  title="Profil supporter"
                  description="Informations de base pour vous identifier et garder un canal de contact propre."
                >
                  <div className="grid gap-5 sm:grid-cols-2">
                    <InscriptionField label="Prenom" required>
                      <InscriptionInput type="text" placeholder="Ex: Sarah" />
                    </InscriptionField>
                    <InscriptionField label="Nom" required>
                      <InscriptionInput type="text" placeholder="Ex: Alexis" />
                    </InscriptionField>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <InscriptionField label="Email" required>
                      <InscriptionInput type="email" placeholder="contact@email.com" />
                    </InscriptionField>
                    <InscriptionField label="Telephone / WhatsApp" required>
                      <InscriptionInput type="tel" placeholder="+509 ..." />
                    </InscriptionField>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <InscriptionField label="Ville" required>
                      <InscriptionInput type="text" placeholder="Ex: Petion-Ville" />
                    </InscriptionField>
                    <InscriptionField label="Lien avec le club">
                      <InscriptionSelect defaultValue="Lien avec le club">
                        <option disabled>Lien avec le club</option>
                        <option>Supporter</option>
                        <option>Parent</option>
                        <option>Ancien joueur</option>
                        <option>Ami du club</option>
                      </InscriptionSelect>
                    </InscriptionField>
                  </div>
                </InscriptionFormSection>

                <InscriptionFormSection
                  index="02"
                  title="Engagement souhaite"
                  description="Le club peut ainsi vous orienter vers les activations les plus utiles."
                >
                  <div className="grid gap-5 sm:grid-cols-2">
                    <InscriptionField label="Role souhaite" required>
                      <InscriptionSelect defaultValue="Role souhaite">
                        <option disabled>Role souhaite</option>
                        {supporterRoles.map((item) => (
                          <option key={item}>{item}</option>
                        ))}
                      </InscriptionSelect>
                    </InscriptionField>
                    <InscriptionField label="Disponibilite" required>
                      <InscriptionSelect defaultValue="Disponibilite">
                        <option disabled>Disponibilite</option>
                        <option>Tous les matchs</option>
                        <option>Week-ends seulement</option>
                        <option>Occasionnel</option>
                      </InscriptionSelect>
                    </InscriptionField>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <InscriptionField label="Taille de maillot">
                      <InscriptionSelect defaultValue="Taille de maillot">
                        <option disabled>Taille de maillot</option>
                        <option>S</option>
                        <option>M</option>
                        <option>L</option>
                        <option>XL</option>
                      </InscriptionSelect>
                    </InscriptionField>
                    <InscriptionField label="Zone d aide preferee">
                      <InscriptionSelect defaultValue="Zone d aide preferee">
                        <option disabled>Zone d aide preferee</option>
                        <option>Tribune et ambiance</option>
                        <option>Accueil jour de match</option>
                        <option>Contenu digital</option>
                        <option>Logistique club</option>
                      </InscriptionSelect>
                    </InscriptionField>
                  </div>
                </InscriptionFormSection>

                <InscriptionFormSection
                  index="03"
                  title="Presence et motivation"
                  description="Quelques details pour mieux comprendre votre energie et votre valeur ajoutée."
                >
                  <InscriptionField
                    label="Reseaux sociaux ou pseudo"
                    helper="Optionnel. Utile si vous souhaitez aider sur la partie contenu ou relais digital."
                  >
                    <InscriptionInput type="text" placeholder="@pseudo ou lien de profil" />
                  </InscriptionField>

                  <InscriptionField
                    label="Pourquoi souhaitez-vous rejoindre la communaute FC TORO ?"
                    required
                    helper="Expliquez en quoi vous voulez aider ou vivre l experience du club."
                  >
                    <InscriptionTextarea rows={5} placeholder="Votre motivation, vos idees et votre disponibilite." />
                  </InscriptionField>
                </InscriptionFormSection>

                <InscriptionConsent>
                  J accepte d etre contacte par FC TORO concernant la vie du club, les activations supporters
                  et les opportunites de benevolat matchday.
                </InscriptionConsent>

                <InscriptionSubmit
                  label="Rejoindre la communaute"
                  note="Le club utilise ces informations pour vous orienter vers les prochaines activations, les jours de match et les opportunites supporters."
                />
              </form>
            </InscriptionFormCard>
          </div>
        </section>
      </main>
    </div>
  )
}
