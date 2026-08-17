'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { HomeNavbar } from '@/components/home-navbar'
import { Breadcrumb } from '@/components/breadcrumb'
import {
  InscriptionField,
  InscriptionFormCard,
  InscriptionFormSection,
  InscriptionInput,
  InscriptionSelect,
  InscriptionTextarea,
  InscriptionSubmit,
} from '@/components/inscription-form-ui'
import { RiUploadCloud2Line, RiCheckLine, RiInformationLine } from '@remixicon/react'

export default function DetectionsPage() {
  const formRef = useRef<HTMLFormElement>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)
  const [fileName, setFileName] = useState<string | null>(null)
  const [ficheName, setFicheName] = useState<string | null>(null)
  const [vaccinName, setVaccinName] = useState<string | null>(null)
  const [acteName, setActeName] = useState<string | null>(null)
  const [pieceName, setPieceName] = useState<string | null>(null)
  const [age, setAge] = useState<string>('')

  const todayStr = new Date().toISOString().split('T')[0]

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dateStr = e.target.value
    if (dateStr) {
      const birthDate = new Date(dateStr)
      if (!isNaN(birthDate.getTime())) {
        const today = new Date()
        let calculatedAge = today.getFullYear() - birthDate.getFullYear()
        const m = today.getMonth() - birthDate.getMonth()
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
          calculatedAge--
        }
        setAge(calculatedAge >= 0 ? calculatedAge.toString() : '')
      } else {
        setAge('')
      }
    } else {
      setAge('')
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitMessage(null)

    const formData = new FormData(e.currentTarget)

    const comment_identifie = formData.getAll('comment_identifie').map(String)
    if (comment_identifie.length === 0) {
      setSubmitMessage({ type: 'error', text: 'Veuillez préciser comment vous avez été identifié.' })
      setIsSubmitting(false)
      return
    }

    try {
      const response = await fetch('/api/inscriptions/detections', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Une erreur est survenue lors de l'inscription.")
      }

      setSubmitMessage({ type: 'success', text: data.message })
      formRef.current?.reset()
      setFileName(null)
      setFicheName(null)
      setVaccinName(null)
      setActeName(null)
      setPieceName(null)
    } catch (error) {
      setSubmitMessage({
        type: 'error',
        text: error instanceof Error ? error.message : "Erreur de connexion. Veuillez réessayer.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#0a1d3a] max-w-full overflow-x-hidden">
      <HomeNavbar anchorPrefix="/" />

      <main className="pt-[116px] lg:pt-[78px]">
        <Breadcrumb items={[{ label: 'Accueil', href: '/' }, { label: 'Inscription' }, { label: 'Détections', href: '/inscription/detections' }]} />
        
        <section className="relative h-[320px] overflow-hidden bg-[#0a1d3a] text-white">
          <Image
            src="/home/staff-direction-optimized.jpg"
            alt="Détections FC TORO"
            fill
            priority
            className="object-cover object-[center_25%] opacity-40"
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
                Détections 2026
              </h1>
              <p className="max-w-[600px] text-lg font-medium text-white/80">
                Gagne ta place au sein du FC TORO. Remplis la fiche d'inscription pour participer à la prochaine session.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="bg-white px-4 pb-12 pt-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[900px]">
            <div>
              <InscriptionFormCard
                eyebrow="Formulaire"
                title="Fiche d'inscription"
                description="Remplissez les champs ci-dessous pour soumettre votre candidature aux détections 2026."
                badges={[]}
              >
                <form ref={formRef} className="space-y-8" onSubmit={handleSubmit}>
                  
                  {/* SECTION 1: IDENTIFICATION DU JOUEUR */}
                  <InscriptionFormSection
                    index="1"
                    title="Identification du joueur"
                    description="Vos informations personnelles de base."
                  >
                    <div className="mb-8 grid place-items-center">
                      <InscriptionField label="Photo récente" helper="Format JPG ou PNG (Max 4MB)">
                        <div className="relative flex h-32 w-32 items-center justify-center rounded-3xl border-2 border-dashed border-[#dce5f2] bg-white transition-all hover:border-[#ef233c]/30 hover:bg-[#fffcfc]">
                          <input
                            type="file"
                            name="photo_recente"
                            accept="image/jpeg,image/png"
                            onChange={(e) => setFileName(e.target.files?.[0]?.name || null)}
                            className="absolute inset-0 z-10 cursor-pointer opacity-0"
                          />
                          <div className="text-center">
                            <RiUploadCloud2Line className="mx-auto h-6 w-6 text-[#ef233c]/40" />
                            <p className="mt-1 text-[10px] font-black uppercase tracking-widest text-[#0a1d3a]">
                              {fileName ? 'Prêt' : 'Photo'}
                            </p>
                          </div>
                        </div>
                        {fileName && <p className="mt-2 text-center text-xs font-semibold text-[#0a2347]">{fileName}</p>}
                      </InscriptionField>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">

                      <InscriptionField label="Nom" required>
                        <InscriptionInput type="text" name="nom" required />
                      </InscriptionField>

                      <InscriptionField label="Prénom" required>
                        <InscriptionInput type="text" name="prenom" required />
                      </InscriptionField>

                      <InscriptionField label="Date de naissance" required>
                        <InscriptionInput type="date" name="date_naissance" max={todayStr} required onChange={handleDateChange} />
                      </InscriptionField>

                      <InscriptionField label="Âge" required>
                        <InscriptionInput type="number" name="age" min="1" max="99" required value={age} readOnly className="bg-[#f8fafc] font-bold text-[#8ea2bf] pointer-events-none" />
                      </InscriptionField>

                      <InscriptionField label="Sexe" required>
                        <InscriptionSelect name="sexe" required>
                          <option value="">Sélectionner</option>
                          <option value="Masculin">Masculin</option>
                          <option value="Féminin">Féminin</option>
                        </InscriptionSelect>
                      </InscriptionField>

                      <InscriptionField label="École">
                        <InscriptionInput type="text" name="ecole" />
                      </InscriptionField>

                      <div className="sm:col-span-2">
                        <InscriptionField label="Commune / Zone de résidence" required>
                          <InscriptionInput type="text" name="zone_residence" required />
                        </InscriptionField>
                      </div>
                    </div>
                  </InscriptionFormSection>

                  {/* SECTION 2: PROFIL FOOTBALL */}
                  <InscriptionFormSection
                    index="2"
                    title="Profil Football"
                    description="Votre parcours et vos compétences sur le terrain."
                  >
                    <div className="grid gap-5 sm:grid-cols-2">
                      <InscriptionField label="Poste principal" required>
                        <InscriptionSelect name="poste_principal" required>
                          <option value="">Sélectionner</option>
                          <option value="Gardien de but">Gardien de but</option>
                          <option value="Défenseur">Défenseur</option>
                          <option value="Milieu de terrain">Milieu de terrain</option>
                          <option value="Attaquant">Attaquant</option>
                        </InscriptionSelect>
                      </InscriptionField>

                      <InscriptionField label="Poste secondaire">
                        <InscriptionSelect name="poste_secondaire">
                          <option value="">Sélectionner</option>
                          <option value="Gardien de but">Gardien de but</option>
                          <option value="Défenseur">Défenseur</option>
                          <option value="Milieu de terrain">Milieu de terrain</option>
                          <option value="Attaquant">Attaquant</option>
                        </InscriptionSelect>
                      </InscriptionField>

                      <div className="sm:col-span-2">
                        <InscriptionField label="Pied dominant" required>
                          <div className="flex gap-6 mt-2">
                            <label className="flex items-center gap-2 font-semibold text-[#0a1d3a] cursor-pointer">
                              <input type="radio" name="pied_dominant" value="Droit" className="h-5 w-5 accent-[#ef233c]" required /> Droit
                            </label>
                            <label className="flex items-center gap-2 font-semibold text-[#0a1d3a] cursor-pointer">
                              <input type="radio" name="pied_dominant" value="Gauche" className="h-5 w-5 accent-[#ef233c]" /> Gauche
                            </label>
                            <label className="flex items-center gap-2 font-semibold text-[#0a1d3a] cursor-pointer">
                              <input type="radio" name="pied_dominant" value="Les deux" className="h-5 w-5 accent-[#ef233c]" /> Les deux
                            </label>
                          </div>
                        </InscriptionField>
                      </div>

                      <InscriptionField label="Club / Académie actuelle">
                        <InscriptionInput type="text" name="club_actuel" />
                      </InscriptionField>

                      <InscriptionField label="Club / Académie précédente">
                        <InscriptionInput type="text" name="club_precedent" />
                      </InscriptionField>

                      <InscriptionField label="Années de pratique">
                        <InscriptionInput type="number" name="annees_pratique" min="0" />
                      </InscriptionField>

                      <InscriptionField label="Niveau / Catégorie actuelle">
                        <InscriptionInput type="text" name="niveau_actuel" />
                      </InscriptionField>

                      <div className="sm:col-span-2">
                        <InscriptionField label="Expérience (sélections, tournois, distinctions)" required>
                          <InscriptionTextarea name="experience" placeholder="Décrivez votre expérience..." required />
                        </InscriptionField>
                      </div>

                      <div className="sm:col-span-2">
                        <InscriptionField label="Comment avez-vous été identifié ?" required>
                          <div className="mt-3 grid gap-3 sm:grid-cols-2">
                            {[
                              'Inscription libre',
                              'Flag Day Tournament',
                              'Vertières Cup',
                              'Summer Camp FC TORO',
                              "Recommandation d'un coach",
                              'Sélection nationale',
                              'Watchlist FC TORO'
                            ].map((source) => (
                              <label key={source} className="flex items-center gap-3 text-sm font-semibold text-[#445b7f] cursor-pointer">
                                <input type="radio" name="comment_identifie" value={source} className="h-4 w-4 rounded border-[#c7d4e7] accent-[#ef233c]" />
                                {source}
                              </label>
                            ))}
                            <div className="flex items-center gap-3">
                               <input type="radio" name="comment_identifie" value="Autre" id="source_autre" className="h-4 w-4 rounded border-[#c7d4e7] accent-[#ef233c]" />
                               <InscriptionInput type="text" name="identification_autre" placeholder="Autre (préciser)" className="h-10 text-sm" onChange={(e) => {
                                 const radio = document.getElementById('source_autre') as HTMLInputElement
                                 if (radio) {
                                   radio.checked = true
                                   radio.value = e.target.value ? `Autre: ${e.target.value}` : 'Autre'
                                 }
                               }} />
                            </div>
                          </div>
                        </InscriptionField>
                      </div>
                    </div>
                  </InscriptionFormSection>

                  {/* SECTION 3: PARENT / RESPONSABLE */}
                  <InscriptionFormSection
                    index="3"
                    title="Parent / Responsable"
                    description="Coordonnées de la personne responsable en cas d'urgence."
                  >
                    <div className="grid gap-5 sm:grid-cols-2">
                      <InscriptionField label="Nom et prénom" required>
                        <InscriptionInput type="text" name="parent_nom" required />
                      </InscriptionField>

                      <InscriptionField label="Lien avec le joueur" required>
                        <InscriptionInput type="text" name="parent_lien" placeholder="Ex: Père, Mère, Tuteur" required />
                      </InscriptionField>

                      <InscriptionField label="Téléphone / WhatsApp" required>
                        <InscriptionInput type="tel" name="parent_telephone" required />
                      </InscriptionField>

                      <InscriptionField label="Email">
                        <InscriptionInput type="email" name="parent_email" />
                      </InscriptionField>

                    </div>
                  </InscriptionFormSection>

                  {/* SECTION 4: DOCUMENTS */}
                  <InscriptionFormSection
                    index="4"
                    title="Documents"
                    description="Téléchargez vos documents (formats acceptés : JPG, PNG, PDF)."
                  >
                    <div className="grid gap-5 sm:grid-cols-2">
                      <InscriptionField label="Fiche 9ème">
                        <div className="relative flex h-32 w-full items-center justify-center rounded-3xl border-2 border-dashed border-[#dce5f2] bg-white transition-all hover:border-[#ef233c]/30 hover:bg-[#fffcfc]">
                          <input
                            type="file"
                            name="fiche_9e"
                            accept="image/jpeg,image/png,application/pdf"
                            onChange={(e) => setFicheName(e.target.files?.[0]?.name || null)}
                            className="absolute inset-0 z-10 cursor-pointer opacity-0"
                          />
                          <div className="text-center">
                            <RiUploadCloud2Line className="mx-auto h-6 w-6 text-[#ef233c]/40" />
                            <p className="mt-1 text-[10px] font-black uppercase tracking-widest text-[#0a1d3a]">
                              {ficheName ? 'Prêt' : 'Fichier'}
                            </p>
                          </div>
                        </div>
                        {ficheName && <p className="mt-2 text-center text-xs font-semibold text-[#0a2347] truncate px-2">{ficheName}</p>}
                      </InscriptionField>

                      <InscriptionField label="Carnet de vaccination">
                        <div className="relative flex h-32 w-full items-center justify-center rounded-3xl border-2 border-dashed border-[#dce5f2] bg-white transition-all hover:border-[#ef233c]/30 hover:bg-[#fffcfc]">
                          <input
                            type="file"
                            name="carnet_vaccination"
                            accept="image/jpeg,image/png,application/pdf"
                            onChange={(e) => setVaccinName(e.target.files?.[0]?.name || null)}
                            className="absolute inset-0 z-10 cursor-pointer opacity-0"
                          />
                          <div className="text-center">
                            <RiUploadCloud2Line className="mx-auto h-6 w-6 text-[#ef233c]/40" />
                            <p className="mt-1 text-[10px] font-black uppercase tracking-widest text-[#0a1d3a]">
                              {vaccinName ? 'Prêt' : 'Fichier'}
                            </p>
                          </div>
                        </div>
                        {vaccinName && <p className="mt-2 text-center text-xs font-semibold text-[#0a2347] truncate px-2">{vaccinName}</p>}
                      </InscriptionField>

                      <InscriptionField label="Acte de naissance">
                        <div className="relative flex h-32 w-full items-center justify-center rounded-3xl border-2 border-dashed border-[#dce5f2] bg-white transition-all hover:border-[#ef233c]/30 hover:bg-[#fffcfc]">
                          <input
                            type="file"
                            name="acte_naissance"
                            accept="image/jpeg,image/png,application/pdf"
                            onChange={(e) => setActeName(e.target.files?.[0]?.name || null)}
                            className="absolute inset-0 z-10 cursor-pointer opacity-0"
                          />
                          <div className="text-center">
                            <RiUploadCloud2Line className="mx-auto h-6 w-6 text-[#ef233c]/40" />
                            <p className="mt-1 text-[10px] font-black uppercase tracking-widest text-[#0a1d3a]">
                              {acteName ? 'Prêt' : 'Fichier'}
                            </p>
                          </div>
                        </div>
                        {acteName && <p className="mt-2 text-center text-xs font-semibold text-[#0a2347] truncate px-2">{acteName}</p>}
                      </InscriptionField>

                      <InscriptionField label="Pièce d'identité parent">
                        <div className="relative flex h-32 w-full items-center justify-center rounded-3xl border-2 border-dashed border-[#dce5f2] bg-white transition-all hover:border-[#ef233c]/30 hover:bg-[#fffcfc]">
                          <input
                            type="file"
                            name="piece_identite_parent"
                            accept="image/jpeg,image/png,application/pdf"
                            onChange={(e) => setPieceName(e.target.files?.[0]?.name || null)}
                            className="absolute inset-0 z-10 cursor-pointer opacity-0"
                          />
                          <div className="text-center">
                            <RiUploadCloud2Line className="mx-auto h-6 w-6 text-[#ef233c]/40" />
                            <p className="mt-1 text-[10px] font-black uppercase tracking-widest text-[#0a1d3a]">
                              {pieceName ? 'Prêt' : 'Fichier'}
                            </p>
                          </div>
                        </div>
                        {pieceName && <p className="mt-2 text-center text-xs font-semibold text-[#0a2347] truncate px-2">{pieceName}</p>}
                      </InscriptionField>
                    </div>
                  </InscriptionFormSection>

                  <InscriptionSubmit
                    label="Soumettre la fiche"
                    note="Assurez-vous que toutes les informations sont correctes avant de soumettre. Nous vous contacterons pour confirmer votre session."
                    isSubmitting={isSubmitting}
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
                          submitMessage.type === 'success'
                            ? 'border-emerald-200'
                            : 'border-rose-200'
                        }`}
                      >
                        <div className="px-6 py-6">
                          <div
                            className={`mx-auto mb-4 grid h-12 w-12 place-items-center rounded-full ${
                              submitMessage.type === 'success'
                                ? 'bg-emerald-100 text-emerald-600'
                                : 'bg-rose-100 text-rose-600'
                            }`}
                          >
                            {submitMessage.type === 'success' ? (
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
                            {submitMessage.type === 'success' ? 'Dossier enregistré !' : 'Action requise'}
                          </p>
                          <p className="mt-2 text-sm font-semibold text-[#5b6f91]">
                            {submitMessage.text}
                          </p>
                          <button
                            type="button"
                            onClick={() => {
                              if (submitMessage.type === 'success') {
                                formRef.current?.reset()
                                setFileName(null)
                                setFicheName(null)
                                setVaccinName(null)
                                setActeName(null)
                                setPieceName(null)
                              }
                              setSubmitMessage(null)
                            }}
                            className="mt-6 w-full rounded-full bg-[#0a2347] px-6 py-3 text-sm font-bold uppercase tracking-widest text-white transition-colors hover:bg-[#0d2d62]"
                          >
                            Ok
                          </button>
                        </div>
                      </motion.div>
                    </motion.div>
                  ) : null}
                </form>
              </InscriptionFormCard>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
