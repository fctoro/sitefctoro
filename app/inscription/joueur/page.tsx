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
  RiFocusLine,
  RiShieldStarLine,
} from '@remixicon/react'

const playerHighlights = [
  'Detection par categorie et niveau',
  'Lecture technique, attitude et potentiel',
  'Suivi avec parent ou responsable legal',
]

const playerChecklist = [
  'Nom complet du joueur',
  'Date de naissance et categorie visee',
  'Poste prefere et experience recente',
  'Contact parent ou responsable',
]

export default function InscriptionJoueurPage() {
  return (
    <div className="min-h-screen bg-[#f2f2f4] text-[#0a1d3a]">
      <HomeNavbar anchorPrefix="/" />

      <main className="pt-[116px] lg:pt-[78px]">
        <section className="relative h-[240px] overflow-hidden bg-[#0a1d3a] text-white md:h-[320px]">
          <Image
            src="/joueur/extracted/560435029_18532793887012336_3999511270054224397_n.jpg"
            alt="Devenir joueur FC TORO"
            fill
            priority
            className="object-cover opacity-55 transition-transform duration-1000 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a1d3a] via-[#0a1d3a]/68 to-transparent" />
          <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-[#ef233c] via-[#ef233c]/55 to-transparent" />

          <div className="relative z-10 mx-auto flex h-full max-w-[1100px] flex-col justify-center px-6">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#ef233c]">
                Recrutement joueur
              </p>
              <h1 className="max-w-[760px] text-4xl font-black uppercase leading-[0.82] tracking-tighter drop-shadow-2xl md:text-7xl">
                Devenir
                <br />
                Joueur
              </h1>
            </motion.div>
          </div>
        </section>

        <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-[1100px] gap-12 lg:grid-cols-[0.92fr_1.08fr]">
            <div className="space-y-10">
              <div>
                <div className="inline-flex items-center gap-3 rounded-full bg-[#ef233c] px-5 py-3 text-sm font-black uppercase tracking-[0.14em] text-white">
                  Parcours academie
                </div>
                <h2 className="mt-6 text-[clamp(2rem,4vw,3.5rem)] font-black uppercase leading-[0.92] text-[#0a1d3a]">
                  Entrer dans le projet FC TORO avec un dossier propre et une lecture claire du profil.
                </h2>
              </div>

              <p className="text-base font-medium leading-relaxed text-[#5b6f91]">
                Cette page est concue pour les jeunes joueurs qui souhaitent integrer une categorie FC TORO
                ou etre evalues par le staff. Le club observe le niveau, l attitude, la marge de progression
                et la capacite a s inscrire dans un cadre exigeant.
              </p>

              <div className="grid gap-4">
                {playerHighlights.map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-4 rounded-[28px] border border-[#e5edf7] bg-[#f8fafc] p-5"
                  >
                    <RiShieldStarLine className="mt-0.5 h-5 w-5 shrink-0 text-[#ef233c]" />
                    <p className="text-sm font-bold leading-relaxed text-[#0a1d3a]">{item}</p>
                  </div>
                ))}
              </div>

              <div className="overflow-hidden rounded-[34px] bg-[#0a2347] p-8 text-white shadow-xl">
                <div className="flex items-center gap-3">
                  <RiFocusLine className="h-8 w-8 text-[#ef233c]" />
                  <h3 className="text-xl font-black uppercase">Avant de soumettre</h3>
                </div>

                <div className="mt-6 space-y-4">
                  {playerChecklist.map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <RiCheckLine className="mt-0.5 h-5 w-5 shrink-0 text-[#ef233c]" />
                      <p className="text-sm font-semibold leading-relaxed text-white/88">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <InscriptionFormCard
              eyebrow="Dossier joueur"
              title="Evaluation academie"
              description="Le formulaire ci-dessous aide le staff a lire rapidement le profil, la categorie visee et le contexte familial avant la premiere prise de contact."
              badges={['Dossier confidentiel', 'Lecture staff', 'Reponse parentale']}
            >
              <form className="space-y-8">
                <InscriptionFormSection
                  index="01"
                  title="Identite du joueur"
                  description="Base administrative pour orienter correctement le dossier dans la bonne categorie."
                >
                  <div className="grid gap-5 sm:grid-cols-2">
                    <InscriptionField label="Prenom du joueur" required>
                      <InscriptionInput type="text" placeholder="Ex: Nathan" />
                    </InscriptionField>
                    <InscriptionField label="Nom du joueur" required>
                      <InscriptionInput type="text" placeholder="Ex: Pierre" />
                    </InscriptionField>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <InscriptionField label="Date de naissance" required>
                      <InscriptionInput type="date" />
                    </InscriptionField>
                    <InscriptionField label="Categorie souhaitee" required>
                      <InscriptionSelect defaultValue="Categorie souhaitee">
                        <option disabled>Categorie souhaitee</option>
                        <option>U11</option>
                        <option>U13</option>
                        <option>U15</option>
                        <option>U17</option>
                        <option>U20</option>
                      </InscriptionSelect>
                    </InscriptionField>
                  </div>
                </InscriptionFormSection>

                <InscriptionFormSection
                  index="02"
                  title="Profil sportif"
                  description="Elements utiles pour comprendre le parcours du joueur et preparer une lecture terrain plus juste."
                >
                  <div className="grid gap-5 sm:grid-cols-2">
                    <InscriptionField label="Poste prefere" required>
                      <InscriptionSelect defaultValue="Poste prefere">
                        <option disabled>Poste prefere</option>
                        <option>Gardien</option>
                        <option>Defenseur</option>
                        <option>Milieu</option>
                        <option>Ailier</option>
                        <option>Attaquant</option>
                      </InscriptionSelect>
                    </InscriptionField>
                    <InscriptionField label="Pied fort" required>
                      <InscriptionSelect defaultValue="Pied fort">
                        <option disabled>Pied fort</option>
                        <option>Droit</option>
                        <option>Gauche</option>
                        <option>Les deux</option>
                      </InscriptionSelect>
                    </InscriptionField>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <InscriptionField label="Ville / quartier" required>
                      <InscriptionInput type="text" placeholder="Ex: Petion-Ville" />
                    </InscriptionField>
                    <InscriptionField label="Club ou ecole actuelle">
                      <InscriptionInput type="text" placeholder="Structure frequentee actuellement" />
                    </InscriptionField>
                  </div>

                  <InscriptionField
                    label="Experience recente"
                    required
                    helper="Tournois joues, niveau actuel, points forts et disponibilites d entrainement."
                  >
                    <InscriptionTextarea rows={5} placeholder="Expliquer le parcours recent du joueur." />
                  </InscriptionField>

                  <InscriptionField
                    label="Lien video ou profil sportif"
                    helper="Optionnel, mais utile pour une premiere lecture du joueur avant evaluation."
                  >
                    <InscriptionInput type="url" placeholder="https://..." />
                  </InscriptionField>
                </InscriptionFormSection>

                <InscriptionFormSection
                  index="03"
                  title="Responsable legal"
                  description="Coordonnees de la personne autorisee a valider la demarche et a echanger avec le club."
                >
                  <div className="grid gap-5 sm:grid-cols-2">
                    <InscriptionField label="Nom du parent / responsable" required>
                      <InscriptionInput type="text" placeholder="Nom complet du responsable" />
                    </InscriptionField>
                    <InscriptionField label="Lien avec le joueur" required>
                      <InscriptionSelect defaultValue="Lien avec le joueur">
                        <option disabled>Lien avec le joueur</option>
                        <option>Pere</option>
                        <option>Mere</option>
                        <option>Tuteur legal</option>
                        <option>Autre responsable</option>
                      </InscriptionSelect>
                    </InscriptionField>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <InscriptionField label="Telephone" required>
                      <InscriptionInput type="tel" placeholder="+509 ..." />
                    </InscriptionField>
                    <InscriptionField label="Email" required>
                      <InscriptionInput type="email" placeholder="contact@email.com" />
                    </InscriptionField>
                  </div>
                </InscriptionFormSection>

                <InscriptionConsent>
                  Je confirme que les informations transmises sont exactes et que le parent ou responsable
                  legal autorise le depot de ce dossier aupres de FC TORO.
                </InscriptionConsent>

                <InscriptionSubmit
                  label="Soumettre la candidature"
                  note="Le staff utilise ce dossier pour preparer le premier retour, orienter la categorie et organiser la prochaine etape de contact."
                />
              </form>
            </InscriptionFormCard>
          </div>
        </section>
      </main>
    </div>
  )
}
