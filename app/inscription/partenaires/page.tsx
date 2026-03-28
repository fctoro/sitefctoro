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
  RiBarChartBoxLine,
  RiCheckLine,
  RiHandHeartLine,
} from '@remixicon/react'

const partnershipAxes = [
  'Visibilite marque et activations terrain',
  'Soutien a la formation des jeunes',
  'Partenariats media, equipement et evenements',
]

const partnershipFormats = [
  'Sponsor principal',
  'Partenaire equipement',
  'Partenaire evenementiel',
  'Partenaire communautaire',
]

export default function InscriptionPartenairesPage() {
  return (
    <div className="min-h-screen bg-[#f2f2f4] text-[#0a1d3a]">
      <HomeNavbar anchorPrefix="/" />

      <main className="pt-[116px] lg:pt-[78px]">
        <section className="relative h-[240px] overflow-hidden bg-[#0a1d3a] text-white md:h-[320px]">
          <Image
            src="/joueur/extracted/634150827_18560832649012336_7495873752742897530_n.jpg"
            alt="Devenir partenaire FC TORO"
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
                Developpement club
              </p>
              <h1 className="max-w-[760px] text-4xl font-black uppercase leading-[0.82] tracking-tighter drop-shadow-2xl md:text-7xl">
                Devenir
                <br />
                Partenaire
              </h1>
            </motion.div>
          </div>
        </section>

        <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-[1100px] gap-12 lg:grid-cols-[0.92fr_1.08fr]">
            <div className="space-y-10">
              <div>
                <div className="inline-flex items-center gap-3 rounded-full bg-[#ef233c] px-5 py-3 text-sm font-black uppercase tracking-[0.14em] text-white">
                  Collaboration club
                </div>
                <h2 className="mt-6 text-[clamp(2rem,4vw,3.4rem)] font-black uppercase leading-[0.92] text-[#0a1d3a]">
                  Construire un partenariat utile, lisible et coherent avec l identite FC TORO.
                </h2>
              </div>

              <p className="text-base font-medium leading-relaxed text-[#5b6f91]">
                FC TORO recherche des partenaires capables d accompagner le developpement sportif, la
                formation des jeunes et la visibilite du club. Cette page permet de cadrer une premiere
                prise de contact business avec les bonnes informations.
              </p>

              <div className="grid gap-4">
                {partnershipAxes.map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-4 rounded-[28px] border border-[#e5edf7] bg-[#f8fafc] p-5"
                  >
                    <RiHandHeartLine className="mt-0.5 h-5 w-5 shrink-0 text-[#ef233c]" />
                    <p className="text-sm font-bold leading-relaxed text-[#0a1d3a]">{item}</p>
                  </div>
                ))}
              </div>

              <div className="overflow-hidden rounded-[34px] bg-[#0a2347] p-8 text-white shadow-xl">
                <div className="flex items-center gap-3">
                  <RiBarChartBoxLine className="h-8 w-8 text-[#ef233c]" />
                  <h3 className="text-xl font-black uppercase">Formats possibles</h3>
                </div>

                <div className="mt-6 space-y-4">
                  {partnershipFormats.map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <RiCheckLine className="mt-0.5 h-5 w-5 shrink-0 text-[#ef233c]" />
                      <p className="text-sm font-semibold text-white/88">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <InscriptionFormCard
              eyebrow="Dossier partenaire"
              title="Partenariat club"
              description="Ce dossier cadre le premier echange business avec FC TORO: structure, format de collaboration, objectif d activation et niveau d engagement."
              badges={['Business', 'Activation', 'Club']}
            >
              <form className="space-y-8">
                <InscriptionFormSection
                  index="01"
                  title="Structure et interlocuteur"
                  description="Base de contact pour identifier rapidement l entreprise, la personne responsable et le contexte business."
                >
                  <div className="grid gap-5 sm:grid-cols-2">
                    <InscriptionField label="Nom de l entreprise" required>
                      <InscriptionInput type="text" placeholder="Ex: Nom de marque" />
                    </InscriptionField>
                    <InscriptionField label="Nom du contact" required>
                      <InscriptionInput type="text" placeholder="Nom complet du referent" />
                    </InscriptionField>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <InscriptionField label="Email professionnel" required>
                      <InscriptionInput type="email" placeholder="contact@entreprise.com" />
                    </InscriptionField>
                    <InscriptionField label="Telephone" required>
                      <InscriptionInput type="tel" placeholder="+509 ..." />
                    </InscriptionField>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <InscriptionField label="Secteur d activite" required>
                      <InscriptionInput type="text" placeholder="Ex: Telecom, beverage, retail..." />
                    </InscriptionField>
                    <InscriptionField label="Site web">
                      <InscriptionInput type="url" placeholder="https://..." />
                    </InscriptionField>
                  </div>
                </InscriptionFormSection>

                <InscriptionFormSection
                  index="02"
                  title="Proposition de collaboration"
                  description="Nous aide a comprendre la nature du partenariat envisage et sa profondeur."
                >
                  <div className="grid gap-5 sm:grid-cols-2">
                    <InscriptionField label="Type de partenariat" required>
                      <InscriptionSelect defaultValue="Type de partenariat">
                        <option disabled>Type de partenariat</option>
                        {partnershipFormats.map((item) => (
                          <option key={item}>{item}</option>
                        ))}
                      </InscriptionSelect>
                    </InscriptionField>
                    <InscriptionField label="Niveau d engagement" required>
                      <InscriptionSelect defaultValue="Niveau d engagement">
                        <option disabled>Niveau d engagement</option>
                        <option>Decouverte</option>
                        <option>Activation ciblee</option>
                        <option>Partenariat saison</option>
                        <option>Partenariat majeur</option>
                      </InscriptionSelect>
                    </InscriptionField>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <InscriptionField label="Zone d activation">
                      <InscriptionInput type="text" placeholder="Terrain, digital, evenement, academie..." />
                    </InscriptionField>
                    <InscriptionField label="Calendrier ideal">
                      <InscriptionSelect defaultValue="Calendrier ideal">
                        <option disabled>Calendrier ideal</option>
                        <option>Immediate</option>
                        <option>Prochain trimestre</option>
                        <option>Prochaine saison</option>
                      </InscriptionSelect>
                    </InscriptionField>
                  </div>

                  <InscriptionField
                    label="Objectifs de visibilite et contexte"
                    required
                    helper="Decrivez la cible, le type d activation recherche et le cadre general de la demande."
                  >
                    <InscriptionTextarea rows={4} placeholder="Objectifs, audience, formats souhaites, territoire de marque..." />
                  </InscriptionField>
                </InscriptionFormSection>

                <InscriptionFormSection
                  index="03"
                  title="Cadre de suivi"
                  description="Derniers elements pour faciliter le prochain rendez-vous avec l equipe FC TORO."
                >
                  <InscriptionField
                    label="Message complementaire"
                    helper="Informations additionnelles, attentes, contraintes ou pieces a preparer pour la suite."
                  >
                    <InscriptionTextarea rows={4} placeholder="Ajouter tout element utile au premier echange." />
                  </InscriptionField>
                </InscriptionFormSection>

                <InscriptionConsent>
                  J autorise FC TORO a me recontacter au sujet de cette proposition de partenariat et des
                  echanges commerciaux associes.
                </InscriptionConsent>

                <InscriptionSubmit
                  label="Envoyer la demande"
                  note="L equipe club utilisera ce dossier pour qualifier la demande, identifier le bon interlocuteur et preparer un premier retour commercial."
                />
              </form>
            </InscriptionFormCard>
          </div>
        </section>
      </main>
    </div>
  )
}
