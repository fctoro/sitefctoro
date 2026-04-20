'use client'

import { useEffect, useState } from 'react'
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
  RiInformationLine,
} from '@remixicon/react'

const supporterBenefits = [
  'Rejoindre la base de supporters et les activations du club',
  'Participer au bénévolat matchday selon les disponibilités',
  'Recevoir les informations utiles sur la vie du club',
]

const supporterRoles = [
  'Supporter actif',
  'Bénévole matchday',
  'Ambassadeur digital',
  'Parent supporter',
]

export default function InscriptionFansPage() {
  const [submitState, setSubmitState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [submitMessage, setSubmitMessage] = useState<string | null>(null)

  useEffect(() => {
    if (!submitMessage) return
    const timeout = window.setTimeout(() => {
      setSubmitMessage(null)
      setSubmitState('idle')
    }, 3000)
    return () => window.clearTimeout(timeout)
  }, [submitMessage])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    const missingLabels: string[] = []
    const requiredElements = Array.from(
      form.querySelectorAll<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >('[required]')
    )
    requiredElements.forEach((element) => {
      const type = element.getAttribute('type')
      const isCheckbox = type === 'checkbox'
      const isRadio = type === 'radio'
      let isMissing = false
      if (isCheckbox) {
        isMissing = !(element as HTMLInputElement).checked
      } else if (isRadio) {
        const name = element.getAttribute('name')
        if (name) {
          const checked = form.querySelector<HTMLInputElement>(
            `input[type="radio"][name="${name}"]:checked`
          )
          isMissing = !checked
        }
      } else {
        isMissing = !element.value
      }
      if (isMissing) {
        const label =
          element.getAttribute('data-label') ||
          element.closest('label')?.textContent?.trim() ||
          element.closest('div')?.querySelector('label')?.textContent?.trim() ||
          element.getAttribute('name') ||
          'Champ obligatoire'
        if (label && !missingLabels.includes(label)) {
          missingLabels.push(label)
        }
      }
    })

    if (missingLabels.length > 0) {
      setSubmitMessage(`Champs manquants: ${missingLabels.join(', ')}`)
      setSubmitState('error')
      return
    }

    setSubmitState('submitting')
    setSubmitMessage(null)

    const formData = new FormData(form)
    try {
      const response = await fetch('/api/inscriptions/fans', {
        method: 'POST',
        body: formData,
      })
      let data: any = null
      const contentType = response.headers.get('content-type') || ''
      if (contentType.includes('application/json')) {
        data = await response.json().catch(() => null)
      } else {
        const text = await response.text().catch(() => '')
        if (text) {
          data = { message: text, error: text }
        }
      }
      if (!response.ok) {
        throw new Error(data?.error || "Une erreur est survenue lors de l'inscription.")
      }
      setSubmitState('success')
      setSubmitMessage(data?.message || "Inscription envoyee avec succes.")
      form.reset()
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Une erreur est survenue lors de l'inscription."
      setSubmitState('error')
      setSubmitMessage(message)
    }
  }

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
                Communauté club
              </p>
              <h1 className="max-w-[760px] text-3xl font-black uppercase leading-[0.82] tracking-tighter drop-shadow-2xl md:text-5xl">
                Devenir
                <br />
                Fan
              </h1>
            </motion.div>
          </div>
        </section>

        <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-[800px] flex-col gap-12">
            {/* Intro text centrée */}
            <div className="text-center space-y-6">
              <div className="inline-flex items-center gap-3 rounded-full bg-[#0a2347] px-5 py-3 text-sm font-black uppercase tracking-[0.14em] text-white">
                Vivre le club
              </div>
              <h2 className="text-3xl font-black uppercase leading-[1.1] text-[#0a1d3a] md:text-4xl">
                Rejoignez la grande famille des supporters.
              </h2>
              <p className="mx-auto max-w-[600px] text-base font-medium leading-relaxed text-[#5b6f91]">
                Cette inscription est pensée pour les supporters, parents et bénévoles qui souhaitent prendre part au rythme du club. Matchday, contenu, accueil, tribune ou relais digital : chaque énergie utile compte.
              </p>
            </div>

            {/* Avantages & Engagements centrés */}
            <div className="space-y-10">
              <div className="grid gap-4">
                {supporterBenefits.map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-4 rounded-[28px] border border-[#e5edf7] bg-[#f8fafc] p-5 shadow-sm"
                  >
                    <RiHeartLine className="mt-0.5 h-5 w-5 shrink-0 text-[#ef233c]" />
                    <p className="text-sm font-bold leading-relaxed text-[#0a1d3a]">{item}</p>
                  </div>
                ))}
              </div>

              <div className="overflow-hidden rounded-[34px] bg-[#0a2347] p-8 text-white shadow-xl mx-auto w-full">
                <div className="flex items-center gap-3">
                  <RiMegaphoneLine className="h-8 w-8 text-[#ef233c]" />
                  <h3 className="text-xl font-black uppercase">Types d'engagement</h3>
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
              description="Le formulaire permet au club de savoir comment vous souhaitez vous impliquer, sur quels temps forts et avec quel type de présence."
              badges={['Communauté', 'Matchday', 'Supporters']}
            >
              <form className="space-y-8" onSubmit={handleSubmit}>
                <InscriptionFormSection
                  index="01"
                  title="Informations du fan"
                  description="Complétez ces champs pour rejoindre officiellement notre communauté."
                >
                  <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2 items-start">
                    {/* --- BLOC GAUCHE (3 champs) --- */}
                    <div className="space-y-6">
                      <InscriptionField label="Nom" required>
                        <InscriptionInput
                          type="text"
                          name="last_name"
                          placeholder="Votre nom"
                          required
                          data-label="Nom"
                        />
                      </InscriptionField>

                      <InscriptionField label="Numéro de téléphone" required>
                        <InscriptionInput
                          type="tel"
                          name="phone"
                          placeholder="+509 XXXX XXXX"
                          required
                          data-label="Numero de telephone"
                        />
                      </InscriptionField>

                      <InscriptionField label="Département" required>
                        <InscriptionSelect
                          name="department"
                          defaultValue="Département"
                          required
                          data-label="Departement"
                        >
                          <option disabled>Département</option>
                          <option>Artibonite</option>
                          <option>Centre</option>
                          <option>Grand'Anse</option>
                          <option>Nippes</option>
                          <option>Nord</option>
                          <option>Nord-Est</option>
                          <option>Nord-Ouest</option>
                          <option>Ouest</option>
                          <option>Sud</option>
                          <option>Sud-Est</option>
                        </InscriptionSelect>
                      </InscriptionField>
                    </div>

                    {/* --- BLOC DROIT (3 champs) --- */}
                    <div className="space-y-6 flex flex-col h-full">
                      <InscriptionField label="Prénom" required>
                        <InscriptionInput
                          type="text"
                          name="first_name"
                          placeholder="Votre prénom"
                          required
                          data-label="Prenom"
                        />
                      </InscriptionField>

                      <InscriptionField label="Email" required>
                        <InscriptionInput
                          type="email"
                          name="email"
                          placeholder="contact@email.com"
                          required
                          data-label="Email"
                        />
                      </InscriptionField>

                      <InscriptionField label="Adresse complète" required>
                        <InscriptionInput
                          type="text"
                          name="address"
                          placeholder="Votre adresse exacte (Rue, quartier, ville...)"
                          required
                          data-label="Adresse complete"
                        />
                      </InscriptionField>
                    </div>
                  </div>
                </InscriptionFormSection>

                <InscriptionConsent
                  name="consent_contact"
                  required
                  dataLabel="Autorisation contact"
                >
                  J'accepte d'être contacté par FC TORO concernant la vie du club et les activations supporters.
                </InscriptionConsent>

                <InscriptionSubmit
                  label="Rejoindre la communauté"
                  note="Le club utilise ces informations uniquement pour vous intégrer à la famille des supporters officiels."
                  isSubmitting={submitState === 'submitting'}
                />
                {submitMessage ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 backdrop-blur-[3px]"
                  >
                    <motion.div
                      initial={{ opacity: 0, scale: 0.96, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.96, y: -8 }}
                      className={`w-full max-w-[380px] overflow-hidden rounded-[28px] border bg-white text-center shadow-[0_30px_80px_rgba(10,29,58,0.35)] ${
                        submitState === 'success'
                          ? 'border-emerald-200'
                          : 'border-rose-200'
                      }`}
                    >
                      <div className="px-6 py-6">
                        <div
                          className={`mx-auto mb-4 grid h-12 w-12 place-items-center rounded-full ${
                            submitState === 'success'
                              ? 'bg-emerald-100 text-emerald-600'
                              : 'bg-rose-100 text-rose-600'
                          }`}
                        >
                          {submitState === 'success' ? (
                            <motion.div
                              initial={{ scale: 0.5, rotate: -45 }}
                              animate={{ scale: 1, rotate: 0 }}
                            >
                              <RiCheckLine className="h-6 w-6" />
                            </motion.div>
                          ) : (
                            <RiInformationLine className="h-6 w-6" />
                          )}
                        </div>
                        <p className="text-base font-black uppercase tracking-wide text-[#0a1d3a]">
                          {submitState === 'success'
                            ? 'Bienvenue dans la communaute !'
                            : 'Action requise'}
                        </p>
                        <p className="mt-2 text-sm font-semibold text-[#5b6f91]">
                          {submitMessage}
                        </p>
                      </div>
                    </motion.div>
                  </motion.div>
                ) : null}
              </form>
            </InscriptionFormCard>
          </div>
        </section>
      </main>
    </div>
  )
}
