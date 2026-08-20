'use client'

import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import imageCompression from 'browser-image-compression'
import { HomeNavbar } from '@/components/home-navbar'
import { supabaseSmg } from '@/lib/supabase'
import { Breadcrumb } from '@/components/breadcrumb'
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
  RiDownloadCloud2Line,
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
    annualLabel: 'Adhésion annuelle FC Toro',
    annualTotal: '$1,350',
    annualCurrency: 'USD',
    feeIncludes: [
      "Frais d'inscription / réinscription ($75.00)",
      "Uniformes non inclus (à la carte)",
    ],
    paymentPlans: [
      {
        name: 'PLAN #1 (Annuel)',
        description: "Un versement unique à l'inscription",
        total: '$1,215',
        details: '10% de rabais',
      },
      {
        name: 'PLAN #2 (Semestriel)',
        description: '2 versements égaux : inscription & janvier',
        total: '$641.25 x 2',
        details: '5% de rabais',
      },
      {
        name: 'PLAN #3 (Mensuel)',
        description: '9 versements, de septembre à mai, payables avant le 10 de chaque mois',
        total: '$155 / mois',
        details: 'Mensualité',
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
      'Tout retard ou défaut de paiement peut entraîner la suspension de la participation du joueur aux activités.',
    absenceTitle: "Engagement & Absence",
    absenceBody: [
      "Tout mois engagé est dû dans son intégralité, même en cas d'absence, de suspension temporaire ou d'arrêt.",
      "Aucun versement déjà effectué n'est remboursable.",
      'Le paiement mensuel est une facilité de paiement. L\'engagement financier demeure applicable pour toute période engagée.',
    ],
  },
  tiToro: {
    annualLabel: 'Adhésion annuelle Ti Toro',
    annualTotal: '$1,000',
    annualCurrency: 'USD',
    feeIncludes: [
      "Frais d'inscription / réinscription ($75.00)",
      "Uniformes non inclus (à la carte)",
    ],
    paymentPlans: [
      {
        name: 'PLAN #1 (Annuel)',
        description: "Un versement unique à l'inscription",
        total: '$900',
        details: '10% de rabais',
      },
      {
        name: 'PLAN #2 (Semestriel)',
        description: '2 versements égaux : inscription & janvier',
        total: '$475 x 2',
        details: '5% de rabais',
      },
      {
        name: 'PLAN #3 (Mensuel)',
        description: '9 versements, de septembre à mai, payables avant le 10 de chaque mois',
        total: '$115 / mois',
        details: 'Mensualité',
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
      'Tout retard ou défaut de paiement peut entraîner la suspension de la participation du joueur aux activités.',
    absenceTitle: "Engagement & Absence",
    absenceBody: [
      "Tout mois engagé est dû dans son intégralité, même en cas d'absence, de suspension temporaire ou d'arrêt.",
      "Aucun versement déjà effectué n'est remboursable.",
      'Le paiement mensuel est une facilité de paiement. L\'engagement financier demeure applicable pour toute période engagée.',
    ],
  },
}

const requiredFiles = [
  {
    label: "Photo d'identité",
    description: 'Format passeport recommandé (JPG ou PNG)',
    name: 'document_photo_id',
  },
  {
    label: 'Acte de naissance',
    description: 'Copie lisible du document original (JPG ou PNG)',
    name: 'document_birth_certificate',
  },
  {
    label: "Pièce d'identité du parent",
    description: "Passeport ou carte d'identité (JPG ou PNG)",
    name: 'document_parent_id',
  },
]

const programAgeRanges: Record<ProgramKey, { min: number; max: number }> = {
  tiToro: { min: 2, max: 5 },
  fcToro: { min: 6, max: 18 },
}

function formatDateInput(value: Date) {
  const year = value.getFullYear()
  const month = `${value.getMonth() + 1}`.padStart(2, '0')
  const day = `${value.getDate()}`.padStart(2, '0')
  return `${year}-${month}-${day}`
}

function toDateOnly(value: Date) {
  return new Date(value.getFullYear(), value.getMonth(), value.getDate())
}

function parseDateOnly(value: string) {
  const [year, month, day] = value.split('-').map((part) => Number(part))
  if (!year || !month || !day) return null
  return new Date(year, month - 1, day)
}

function isWithinRange(birthDate: Date, minDate: Date, maxDate: Date) {
  const birth = toDateOnly(birthDate).getTime()
  const min = toDateOnly(minDate).getTime()
  const max = toDateOnly(maxDate).getTime()
  return birth >= min && birth <= max
}

export default function InscriptionJoueurPage() {
  const [isFormOpen, setIsFormOpen] = useState<boolean | null>(null)

  useEffect(() => {
    async function checkStatus() {
      try {
        console.log("Checking form status from client...")
        const { data, error } = await supabaseSmg
          .from('site_status')
          .select('inscriptions_ouvertes')
          .eq('id', 1)
          .single()
        console.log("checkStatus result:", data, error)
        if (data && !error) {
          setIsFormOpen(data.inscriptions_ouvertes)
        } else {
          console.error("Error fetching status, defaulting to open:", error)
          setIsFormOpen(true)
        }
      } catch (e) {
        console.error("Catch block error fetching status:", e)
        setIsFormOpen(true)
      }
    }
    checkStatus()
  }, [])

  const formRef = useRef<HTMLFormElement>(null)
  const [activeProgram, setActiveProgram] = useState<ProgramKey>('fcToro')
  const [submitState, setSubmitState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [showDownload, setShowDownload] = useState(false)
  const [submitMessage, setSubmitMessage] = useState<string | null>(null)
  const [birthDateValue, setBirthDateValue] = useState('')
  const [ageError, setAgeError] = useState<string | null>(null)
  const [ageStatus, setAgeStatus] = useState<'idle' | 'valid' | 'invalid'>('idle')
  const [fileStates, setFileStates] = useState<Record<string, File | null>>({})
  const [fileErrors, setFileErrors] = useState<Record<string, string | null>>({})

  if (isFormOpen === null) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f8fafc] text-[#0a2347]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 rounded-full border-4 border-slate-200 border-t-[#0a2347] animate-spin" />
          <p className="text-xs font-black uppercase tracking-widest text-slate-400">Chargement...</p>
        </div>
      </div>
    )
  }

  const pricing = pricingPrograms[activeProgram]
  const ageRange = programAgeRanges[activeProgram]
  const today = toDateOnly(new Date())
  const minBirthDateDate = new Date(
    today.getFullYear() - ageRange.max,
    0,
    1
  )
  const maxBirthDateDate = new Date(
    today.getFullYear() - ageRange.min,
    11,
    31
  )
  const minBirthDate = formatDateInput(minBirthDateDate)
  const maxBirthDate = formatDateInput(maxBirthDateDate)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (submitState === 'submitting') return;
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
      const isFile = type === 'file'
      const isRadio = type === 'radio'

      let isMissing = false
      if (isCheckbox) {
        isMissing = !(element as HTMLInputElement).checked
      } else if (isFile) {
        isMissing = !((element as HTMLInputElement).files?.length)
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
    if (ageError) {
      setSubmitMessage(ageError)
      setSubmitState('error')
      return
    }
    const fileErrorMessages = Object.values(fileErrors).filter(
      (value): value is string => Boolean(value)
    )
    if (fileErrorMessages.length > 0) {
      setSubmitMessage(
        fileErrorMessages[0] ||
          'Erreur: un fichier depasse 4MB. Veuillez compresser vos images.'
      )
      setSubmitState('error')
      return
    }
    setSubmitState('submitting')
    setSubmitMessage(null)

    const formData = new FormData(form)
    formData.set('program', activeProgram)

    // Remplacer les fichiers du formulaire par les fichiers compressés
    Object.entries(fileStates).forEach(([key, file]) => {
      if (file) {
        formData.set(key, file, file.name)
      }
    })

    // VÉRIFICATION FINALE DE LA TAILLE TOTALE (Pour éviter l'erreur Vercel 413)
    let totalSize = 0
    for (const [key, value] of formData.entries()) {
      if (value instanceof File) {
        totalSize += value.size
      }
    }

    if (totalSize > 4 * 1024 * 1024) {
      setSubmitState('error')
      setSubmitMessage(`La taille totale de vos documents (${(totalSize / (1024 * 1024)).toFixed(1)} Mo) dépasse la limite autorisée (4 Mo). Si vous envoyez des PDF ou des photos iPhone (HEIC), veuillez d'abord réduire leur taille.`)
      return
    }

    try {
      const response = await fetch('/api/inscriptions/joueurs', {
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
      setSubmitMessage("Merci d’avoir soumis votre pré-inscription. Votre demande a bien été enregistrée. Cette étape ne confirme pas encore l’inscription du joueur. Notre équipe administrative vous contactera prochainement afin de valider les documents requis et finaliser le paiement. L’inscription sera confirmée une fois toutes les étapes complétées.")
      setShowDownload(true)
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Une erreur est survenue lors de l'inscription."
      setSubmitState('error')
      setSubmitMessage(message)
    }
  }



  const validateAge = (value: string, program = activeProgram) => {
    if (!value) {
      setAgeError(null)
      setAgeStatus('idle')
      return
    }
    const birthDate = parseDateOnly(value)
    if (!birthDate || Number.isNaN(birthDate.getTime())) {
      setAgeError('Date de naissance invalide.')
      setAgeStatus('invalid')
      return
    }
    const range = programAgeRanges[program]
    const minDate = new Date(
      today.getFullYear() - range.max,
      0,
      1
    )
    const maxDate = new Date(
      today.getFullYear() - range.min,
      11,
      31
    )
    if (!isWithinRange(birthDate, minDate, maxDate)) {
      setAgeError(`Age requis: ${range.min} a ${range.max} ans pour ce programme.`)
      setAgeStatus('invalid')
      return
    }
    setAgeError(null)
    setAgeStatus('valid')
  }

  const handleFileChange = async (docName: string, file: File | null, event?: React.ChangeEvent<HTMLInputElement>) => {
    if (!file) {
      setFileStates((prev) => ({ ...prev, [docName]: null }))
      setFileErrors((prev) => ({ ...prev, [docName]: null }))
      return
    }

    let processedFile = file
    if (file.type.startsWith('image/')) {
      try {
        const options = {
          maxSizeMB: 0.8,
          maxWidthOrHeight: 1920,
          useWebWorker: true,
        }
        processedFile = await imageCompression(file, options)
      } catch (error) {
        console.error("Erreur lors de la compression de l'image:", error)
      }
    }

    if (processedFile.size > 4 * 1024 * 1024) {
      setSubmitState('error')
      setSubmitMessage(`Le fichier sélectionné est trop volumineux (${(processedFile.size / (1024 * 1024)).toFixed(1)} MB). La taille maximale permise par fichier est de 4 MB. Veuillez choisir une image plus petite ou la compresser.`)
      if (event && event.target) {
        event.target.value = ''
      }
      setFileStates((prev) => ({ ...prev, [docName]: null }))
      setFileErrors((prev) => ({
        ...prev,
        [docName]: 'Le fichier ne doit pas depasser 4MB.',
      }))
      return
    }
    
    setFileStates((prev) => ({ ...prev, [docName]: processedFile }))
    setFileErrors((prev) => ({ ...prev, [docName]: null }))
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#0a1d3a] max-w-full overflow-x-hidden">
      <HomeNavbar anchorPrefix="/" />

      <main className="pt-[116px] lg:pt-[78px]">
        <Breadcrumb items={[{ label: 'Accueil', href: '/' }, { label: 'Inscription' }, { label: 'Devenir Joueur', href: '/inscription/joueur' }]} />
        <section className="relative h-[320px] overflow-hidden bg-[#0a1d3a] text-white">
          <Image
            src="/joueur/extracted/560435029_18532793887012336_3999511270054224397_n.jpg"
            alt="Devenir joueur FC TORO"
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
            <div className="mb-12 lg:mb-16 grid gap-8 lg:gap-12 lg:grid-cols-2">
              <div className="space-y-8">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#ef233c]">
                      Enregistrement / Frais
                    </p>
                    <h2 className="mt-4 text-3xl lg:text-4xl font-black uppercase text-[#0d2d62]">
                      Procedures & Paiements
                    </h2>
                    <div className="mt-6 h-1 w-16 bg-[#ef233c]" />
                  </div>

                  <div className="inline-flex rounded-full border border-[#dce5f2] bg-white p-1.5 shadow-[0_10px_20px_rgba(10,29,58,0.05)]">
                    <button
                      type="button"
                      onClick={() => {
                        setActiveProgram('fcToro')
                        validateAge(birthDateValue, 'fcToro')
                      }}
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
                      onClick={() => {
                        setActiveProgram('tiToro')
                        validateAge(birthDateValue, 'tiToro')
                      }}
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

                <div className="overflow-hidden rounded-[32px] md:rounded-[40px] bg-[#0a2347] p-6 md:p-10 text-white shadow-2xl">
                  <div className="mb-6 md:mb-8 flex items-center gap-3">
                    <RiPriceTag3Line className="h-6 w-6 text-[#ef233c]" />
                    <p className="text-sm font-black uppercase tracking-widest">
                      {pricing.annualLabel}
                    </p>
                  </div>
                  <div className="flex items-baseline gap-2 md:gap-4">
                    <span className="text-5xl md:text-7xl font-black tracking-tighter">
                      {pricing.annualTotal}
                    </span>
                    <span className="text-lg md:text-xl font-black text-[#ef233c]">
                      {pricing.annualCurrency}
                    </span>
                  </div>
                  <div className="mt-10 space-y-4 border-t border-white/10 pt-8">
                    <p className="text-sm font-black uppercase tracking-widest text-[#ef233c]">
                      Ce prix n'inclut pas :
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
              </div>

              <div className="space-y-8">
                <div className="grid gap-6">
                  {pricing.paymentPlans.map((plan) => (
                    <div
                      key={`${activeProgram}-${plan.name}`}
                      className="rounded-[32px] border border-[#dce5f2] bg-white p-6 sm:p-8 shadow-sm"
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
              </div>

              <div className="lg:col-span-2 min-w-0 w-full">
                <div className="rounded-[32px] border border-[#dce5f2] bg-white p-4 sm:p-8 overflow-hidden shadow-[0_8px_16px_rgba(10,29,58,0.04)]">
                  <h3 className="mb-4 sm:mb-6 text-lg sm:text-xl font-black uppercase text-[#0a2347]">
                    Tarification de la saison 2026-2027
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-[#5b6f91] border-separate border-spacing-0">
                      <thead className="bg-[#eef4ff] text-xs uppercase text-[#0d2d62]">
                        <tr>
                          <th className="whitespace-nowrap px-4 py-3 font-black border-y border-l border-[#dce5f2] rounded-tl-xl">Rubrique</th>
                          <th className="whitespace-nowrap px-4 py-3 font-black border-y border-l border-[#dce5f2]">Montant</th>
                          <th className="px-4 py-3 font-black border border-[#dce5f2] rounded-tr-xl min-w-[250px]">Précision</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          ['Frais d\'inscription / réinscription', '$75', 'Applicables à tous les joueurs, nouveaux et anciens.'],
                          ['Adhésion annuelle - FC TORO', '$1,350', 'Catégories École de Football / Académie / Élite, hors uniformes.'],
                          ['Adhésion annuelle - TI TORO', '$1,000', 'Catégorie Ti Toro / U6-U8, hors uniformes.'],
                          ['Uniforme – Jeux 1', '$80.00', 'Jeux Entrainement - Obligatoire'],
                          ['Uniforme – Jeux 2', '$100.00', 'Jeux Match 1 - Obligatoire'],
                          ['Uniforme – Jeux 3', '$100.00', 'Jeux Match 2 - Obligatoire'],
                          ['Tracksuit', '$150', 'Jacket & Jogger - ( Facultatif)'],
                          ['Backpack', '$90', 'Sac à dos - ( Facultatif)'],
                        ].map(([rubrique, montant, precision], idx, arr) => (
                          <tr key={idx} className="hover:bg-[#f8fafc] transition-colors">
                            <td className={`whitespace-nowrap px-4 py-3 font-bold text-[#0a2347] border-b border-l border-[#dce5f2] ${idx === arr.length - 1 ? 'rounded-bl-xl' : ''}`}>{rubrique}</td>
                            <td className="whitespace-nowrap px-4 py-3 border-b border-l border-[#dce5f2] font-semibold text-[#ef233c]">{montant}</td>
                            <td className={`px-4 py-3 border-b border-x border-[#dce5f2] ${idx === arr.length - 1 ? 'rounded-br-xl' : ''}`}>{precision}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div className="space-y-8 min-w-0">
                <div className="rounded-[32px] border border-[#dce5f2] bg-[#f8fafc] p-6 sm:p-8">
                  <div className="mb-6 flex items-center gap-3">
                    <RiUploadCloud2Line className="h-6 w-6 text-[#ef233c]" />
                    <h3 className="text-lg font-black uppercase">
                      Pièces à fournir
                    </h3>
                  </div>
                  <div className="space-y-4">
                    <p className="text-sm font-medium text-[#5b6f91]">
                      Pour compléter votre dossier, vous devrez télécharger les documents suivants :
                    </p>
                    <div className="grid gap-3">
                      {requiredFiles.map((doc) => (
                        <div key={doc.name} className="flex flex-col rounded-2xl bg-white p-4 border border-[#eef2f8]">
                          <div className="flex items-center gap-3">
                            <RiCheckLine className="h-5 w-5 text-[#ef233c]" />
                            <p className="text-sm font-black text-[#0d2d62]">
                              {doc.label}
                            </p>
                          </div>
                          <p className="mt-1 ml-8 text-[11px] font-medium text-[#5b6f91]">
                             {doc.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-8">
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

                <div className="rounded-[32px] border border-[#dce5f2] bg-white p-6 sm:p-8">
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

        {isFormOpen === false ? (
          <section className="w-full bg-white border-t border-b border-[#dce5f2] pt-10 pb-16 text-center select-none">
            {/* Logo FC Toro */}
            <div className="flex justify-center mb-4">
              <Image
                src="/fc-toro-logo.png"
                alt="FC Toro Logo"
                width={80}
                height={80}
                className="object-contain"
                priority
              />
            </div>

            {/* Titre principal */}
            <h3 className="text-3xl sm:text-4xl font-black uppercase text-[#0a2347] tracking-tight mt-4 mb-6 px-4">
              Inscriptions fermées
            </h3>

            {/* Image de déconnexion s'étendant sur toute la largeur de la page de manière proportionnelle */}
            <div className="w-full my-6 overflow-hidden px-4">
              <img
                src="/deconnexion icon.png"
                alt="Déconnexion"
                className="w-full max-w-[800px] mx-auto h-auto max-h-[120px] object-contain"
                style={{
                  filter: 'invert(11%) sepia(35%) saturate(2258%) hue-rotate(193deg) brightness(95%) contrast(98%)'
                }}
              />
            </div>

            {/* Contenu textuel de description centré */}
            <div className="mx-auto max-w-2xl px-4 mt-6">
              <p className="text-[#5b6f91] text-base sm:text-lg leading-relaxed max-w-xl mx-auto">
                Malheureusement, nous ne recevons plus de demande d'inscription pour le moment. Restez connectés pour connaître les dates des prochaines sessions.
              </p>
            </div>
          </section>
        ) : (
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
              <form ref={formRef} className="space-y-8" onSubmit={handleSubmit}>
                <div className="rounded-[32px] bg-[#0a2347] p-6 sm:p-8 text-white shadow-xl">
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
                      className={`relative flex cursor-pointer items-center gap-3 sm:gap-4 rounded-2xl border p-4 sm:p-6 transition-all ${
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
                      className={`relative flex cursor-pointer items-center gap-3 sm:gap-4 rounded-2xl border p-4 sm:p-6 transition-all ${
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
                  <div className="mb-8 grid place-items-center">
                    <InscriptionField label="Photo d'identité" required helper="Format passeport (JPG ou PNG)">
                      <div className="relative flex h-32 w-32 items-center justify-center rounded-3xl border-2 border-dashed border-[#dce5f2] bg-white transition-all hover:border-[#ef233c]/30 hover:bg-[#fffcfc]">
                        <input
                          type="file"
                          name="document_photo_id"
                          accept="image/jpeg,image/png"
                          required
                          data-label="Photo d'identité"
                          onChange={(event) => {
                            const file = event.target.files?.[0] ?? null
                            handleFileChange('document_photo_id', file, event)
                          }}
                          className="absolute inset-0 z-10 cursor-pointer opacity-0"
                        />
                        <div className="text-center">
                          <RiUploadCloud2Line className="mx-auto h-6 w-6 text-[#ef233c]/40" />
                          <p className="mt-1 text-[10px] font-black uppercase tracking-widest text-[#0a1d3a]">
                            {fileStates['document_photo_id'] ? 'Prêt' : 'Photo'}
                          </p>
                        </div>
                      </div>
                      {fileStates['document_photo_id'] ? (
                        <p className="mt-2 text-center text-[10px] font-semibold text-[#0a2347]">
                          {fileStates['document_photo_id']?.name}
                        </p>
                      ) : null}
                    </InscriptionField>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <InscriptionField label="Nom de l'enfant" required>
                      <InscriptionInput
                        type="text"
                        name="child_last_name"
                        placeholder="Pierre"
                        required
                        data-label="Nom de l'enfant"
                      />
                    </InscriptionField>
                    <InscriptionField label="Prenom de l'enfant" required>
                      <InscriptionInput
                        type="text"
                        name="child_first_name"
                        placeholder="Nathan"
                        required
                        data-label="Prenom de l'enfant"
                      />
                    </InscriptionField>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <InscriptionField label="Date de naissance" required>
                      <InscriptionInput
                        type="date"
                        name="child_birth_date"
                        required
                        data-label="Date de naissance"
                        min={minBirthDate}
                        max={maxBirthDate}
                        value={birthDateValue}
                        onChange={(event) => {
                          const nextValue = event.target.value
                          setBirthDateValue(nextValue)
                          validateAge(nextValue)
                        }}
                      />
                      {ageStatus !== 'idle' ? (
                        <div className="mt-2 space-y-1">
                          <p
                            className={`text-xs font-semibold italic ${
                              ageStatus === 'valid' ? 'text-emerald-600' : 'text-rose-600'
                            }`}
                          >
                            {ageStatus === 'valid'
                              ? 'Valide !'
                              : 'Non valide !'}
                          </p>
                          <p className="text-[11px] font-semibold text-[#6d82a3]">
                            Age requis: {ageRange.min} a {ageRange.max} ans.
                          </p>
                        </div>
                      ) : null}
                    </InscriptionField>
                    <InscriptionField label="Genre" required>
                      <InscriptionSelect
                        name="child_gender"
                        defaultValue=""
                        required
                        data-label="Genre"
                      >
                        <option value="" disabled>Choisir</option>
                        <option>Filles (F)</option>
                        <option>Garcon (M)</option>
                      </InscriptionSelect>
                    </InscriptionField>
                  </div>

                  <InscriptionField label="Adresse domicile" required>
                    <InscriptionInput
                      type="text"
                      name="child_address"
                      placeholder="Rue, Quartier, Ville"
                      required
                      data-label="Adresse domicile"
                    />
                  </InscriptionField>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <InscriptionField label="Ecole frequentee" required>
                      <InscriptionInput
                        type="text"
                        name="child_school"
                        placeholder="Nom de l'etablissement"
                        required
                        data-label="Ecole frequentee"
                      />
                    </InscriptionField>
                    <InscriptionField label="Ancienne experience soccer">
                      <InscriptionInput
                        type="text"
                        name="child_soccer_experience"
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
                      <InscriptionInput
                        type="text"
                        name="guardian_name"
                        required
                        data-label="Nom & Prenom (Parent/Tuteur)"
                      />
                    </InscriptionField>
                    <InscriptionField label="E-mail" required>
                      <InscriptionInput
                        type="email"
                        name="guardian_email"
                        placeholder="votre@email.com"
                        required
                        data-label="E-mail (Parent/Tuteur)"
                      />
                    </InscriptionField>
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <InscriptionField label="Telephone / WhatsApp" required>
                      <InscriptionInput
                        type="tel"
                        name="guardian_phone"
                        placeholder="+509"
                        required
                        data-label="Telephone / WhatsApp (Parent/Tuteur)"
                      />
                    </InscriptionField>
                    <InscriptionField label="Adresse (si differente)">
                      <InscriptionInput type="text" name="guardian_address" />
                    </InscriptionField>
                  </div>
                </InscriptionFormSection>

                <InscriptionFormSection
                  index="03"
                  title="Contact d'urgence"
                  description="En cas d'urgence si on ne trouve pas les parents et les tuteurs"
                >
                  <div className="grid gap-5 sm:grid-cols-2">
                    <InscriptionField label="Nom & Prenom" required>
                      <InscriptionInput
                        type="text"
                        name="emergency_name"
                        required
                        data-label="Nom & Prenom (Urgence)"
                      />
                    </InscriptionField>
                    <InscriptionField label="Lien de parente" required>
                      <InscriptionInput
                        type="text"
                        name="emergency_relation"
                        placeholder="Ex: Oncle, Tante..."
                        required
                        data-label="Lien de parente (Urgence)"
                      />
                    </InscriptionField>
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <InscriptionField label="Telephone" required>
                      <InscriptionInput
                        type="tel"
                        name="emergency_phone"
                        required
                        data-label="Telephone (Urgence)"
                      />
                    </InscriptionField>
                    <InscriptionField label="E-mail">
                      <InscriptionInput type="email" name="emergency_email" />
                    </InscriptionField>
                  </div>
                  <InscriptionField label="Adresse physique">
                    <InscriptionInput type="text" name="emergency_address" />
                  </InscriptionField>
                </InscriptionFormSection>

                <InscriptionFormSection
                  index="04"
                  title="Uniformes & Tailles"
                  description="Selectionnez les tailles pour l'equipement fourni par le club."
                >
                  <div className="grid gap-5 sm:grid-cols-2">
                    <InscriptionField label="Taille du Haut (Top)" required>
                      <InscriptionSelect
                        name="uniform_top_size"
                        defaultValue=""
                        required
                        data-label="Taille du Haut (Top)"
                      >
                        <option value="" disabled>Choisir</option>
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
                      <InscriptionSelect
                        name="uniform_short_size"
                        defaultValue=""
                        required
                        data-label="Taille du Short"
                      >
                        <option value="" disabled>Choisir</option>
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
                    <InscriptionInput type="text" name="preferred_numbers" placeholder="10, 7, 22" />
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
                          required
                          data-label="Plan de paiement"
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
                          required
                          data-label="Mode de paiement"
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
                  title="Commande des Uniformes"
                  description="Selectionnez votre situation concernant les uniformes."
                >
                  <div className="grid gap-4 sm:grid-cols-2">
                    {[
                      { label: "Uniforme – Jeux 1 (Entraînement) - 80$", value: "uniforme_jeux1" },
                      { label: "Uniforme – Jeux 2 (Match 1) - 100$", value: "uniforme_jeux2" },
                      { label: "Uniforme – Jeux 3 (Match 2) - 100$", value: "uniforme_jeux3" },
                      { label: "Tracksuit (Jacket & Jogger) - 150$", value: "tracksuit" },
                      { label: "Backpack (Sac à dos) - 90$", value: "backpack" },

                    ].map((item) => (
                      <label
                        key={item.value}
                        className="flex cursor-pointer items-start gap-3 rounded-2xl border border-[#dce5f2] bg-white p-5 transition-all hover:border-[#ef233c]/20 hover:bg-[#f8fafc]"
                      >
                        <input
                          type="checkbox"
                          name={`uniform_order_${item.value}`}
                          value={item.value}
                          className="mt-1 h-4 w-4 shrink-0 rounded accent-[#ef233c]"
                        />
                        <span className="text-sm font-bold text-[#0d2d62]">
                          {item.label}
                        </span>
                      </label>
                    ))}
                  </div>


                </InscriptionFormSection>

                <InscriptionFormSection
                  index="08"
                  title="Documents a soumettre"
                  description="Veuillez telecharger les versions numeriques (scan ou photo claire) des documents suivants."
                >
                  <div className="grid gap-8">
                    {requiredFiles.filter(d => d.name !== 'document_photo_id').map((doc) => (
                      <InscriptionField
                        key={doc.label}
                        label={doc.label}
                        helper={doc.description}
                        required
                      >
                        <div className="relative flex min-h-[140px] items-center justify-center rounded-[32px] border-2 border-dashed border-[#dce5f2] bg-white transition-all hover:border-[#ef233c]/30 hover:bg-[#fffcfc]">
                          <input
                            type="file"
                            name={doc.name}
                            accept="image/jpeg,image/png"
                            required
                            data-label={doc.label}
                            onChange={(event) => {
                              const file = event.target.files?.[0] ?? null
                              handleFileChange(doc.name, file, event)
                            }}
                            className="absolute inset-0 z-10 cursor-pointer opacity-0"
                          />
                          <div className="text-center">
                            <RiUploadCloud2Line className="mx-auto h-8 w-8 text-[#ef233c]/40" />
                            <p className="mt-2 text-xs font-black uppercase tracking-widest text-[#0a1d3a]">
                              {fileStates[doc.name]
                                ? 'Fichier ajoute'
                                : 'Uploader le fichier'}
                            </p>
                            <p className="mt-1 text-[10px] text-[#5b6f91]">
                              JPG ou PNG (Max 4MB)
                            </p>
                            {fileStates[doc.name] ? (
                              <p className="mt-2 text-[11px] font-semibold text-[#0a2347]">
                                {fileStates[doc.name]?.name}
                              </p>
                            ) : null}
                            {fileErrors[doc.name] ? (
                              <p className="mt-2 text-[11px] font-semibold text-rose-600">
                                {fileErrors[doc.name]}
                              </p>
                            ) : null}
                          </div>
                        </div>
                      </InscriptionField>
                    ))}
                  </div>
                </InscriptionFormSection>

                <InscriptionFormSection
                  index="09"
                  title="Engagement financier et Reconnaissance de dette"
                  description="Veuillez lire attentivement et signer l'engagement ci-dessous."
                >
                  <div className="space-y-6">
                    <div className="rounded-3xl bg-[#f8fafc] p-6 text-sm text-[#445b7f] leading-relaxed border border-[#e4ebf6] text-justify">
                      Je soussigné(e), parent/personne responsable du joueur inscrit, reconnais avoir pris connaissance de la tarification de la saison 2026-2027 et du plan de paiement choisi. Je reconnais devoir à FC TORO/Fulmoun Production les montants indiqués ci-dessus et m'engage à les régler selon l'échéancier convenu. Tout mois engagé est dû dans son intégralité, même en cas d'absence, de suspension temporaire ou d'arrêt de participation non notifié par écrit avant le début du mois concerné. Tout retard ou défaut de paiement peut entraîner la suspension de la participation du joueur aux activités, sans annuler les sommes dues. En cas de non-règlement après relances, le dossier pourra être transmis au service de recouvrement, conformément aux procédures applicables. Aucun versement déjà effectué n'est remboursable, sauf décision exceptionnelle de l'administration.
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <InscriptionField label="Nom du responsable" required>
                        <input
                          type="text"
                          name="engagement_name"
                          required
                          data-label="Nom du responsable"
                          className="h-14 w-full rounded-2xl border-2 border-[#dce5f2] bg-white px-6 font-semibold text-[#0a2347] outline-none transition-all placeholder:font-normal placeholder:text-[#8ea2bf] focus:border-[#ef233c] focus:bg-white"
                          placeholder="Nom complet"
                        />
                      </InscriptionField>
                      <InscriptionField label="Date" required>
                        <input
                          type="date"
                          name="engagement_date"
                          required
                          data-label="Date"
                          className="h-14 w-full rounded-2xl border-2 border-[#dce5f2] bg-white px-6 font-semibold text-[#0a2347] outline-none transition-all placeholder:font-normal placeholder:text-[#8ea2bf] focus:border-[#ef233c] focus:bg-white"
                        />
                      </InscriptionField>
                      <InscriptionField label="Téléphone / WhatsApp" required>
                        <input
                          type="tel"
                          name="engagement_phone"
                          required
                          data-label="Téléphone / WhatsApp"
                          className="h-14 w-full rounded-2xl border-2 border-[#dce5f2] bg-white px-6 font-semibold text-[#0a2347] outline-none transition-all placeholder:font-normal placeholder:text-[#8ea2bf] focus:border-[#ef233c] focus:bg-white"
                          placeholder="+509 XXXX XXXX"
                        />
                      </InscriptionField>
                      <div className="md:col-span-2">
                        <InscriptionSignatureField
                          label="Signature"
                          name="engagement_signature"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </InscriptionFormSection>

                <InscriptionFormSection
                  index="10"
                  title="Autorisations & Engagement"
                  description="Veuillez cocher chaque case pour valider votre accord."
                >
                  <div className="space-y-4">
                    <InscriptionConsent
                      name="consent_media"
                      dataLabel="Autorisation photos"
                    >
                      J'autorise l'utilisation des photos et vidéos de mon enfant sur les réseaux sociaux et sur tout support de communication relatif à <strong>FC TORO</strong>.
                    </InscriptionConsent>
                    <InscriptionConsent
                      name="consent_health"
                      dataLabel="Attestation medicale"
                    >
                      Je certifie que mon enfant ne présente aucune contre-indication médicale à la pratique du football.
                    </InscriptionConsent>
                    <InscriptionConsent
                      name="consent_emergency"
                      dataLabel="Autorisation urgence"
                    >
                      Je soussigné(e) autorise les responsables de FC TORO à prendre toutes les dispositions nécessaires en cas d'urgence médicale concernant mon enfant.
                    </InscriptionConsent>
                  </div>

                  <div className="mt-8 space-y-6 rounded-3xl bg-white p-8 border border-[#dce5f2]">
                    <InscriptionSignatureField
                      label="Signature du parent ou tuteur legal"
                      name="parent_signature"
                      required
                    />
                  </div>
                </InscriptionFormSection>

                <InscriptionConsent
                  name="consent_accuracy"
                  required
                  dataLabel="Confirmation informations"
                >
                  Je confirme que les informations sont exactes et que je
                  m'engage a respecter les politiques du club concernant les
                  paiements et le comportement des membres.
                </InscriptionConsent>

                {showDownload ? (
                  <motion.a
                    href="/Livret FC Toro.pdf"
                    download="Livret FC Toro.pdf"
                    onClick={() => {
                      setShowDownload(false)
                      formRef.current?.reset()
                      setActiveProgram('fcToro')
                      setBirthDateValue('')
                      setAgeStatus('idle')
                      setAgeError(null)
                      setFileStates({})
                      setFileErrors({})
                    }}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="group relative flex w-full cursor-pointer items-center justify-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-[#0a2347] to-[#0d2d62] px-8 py-5 text-center font-black uppercase tracking-widest text-white shadow-xl transition-all hover:shadow-[0_20px_40px_rgba(10,35,71,0.3)]"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-[#ef233c] to-[#d91e32] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <RiDownloadCloud2Line className="relative z-10 h-6 w-6 animate-bounce" />
                    <span className="relative z-10">Veuillez télécharger le Guide d’adhésion 2026-2027</span>
                  </motion.a>
                ) : (
                  <InscriptionSubmit
                    label="Finaliser l'inscription"
                    note="Votre dossier sera analyse par le club. Un message de confirmation vous sera envoye par e-mail avec les instructions finales pour le paiement."
                    isSubmitting={submitState === 'submitting'}
                  />
                )}
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
                          {submitState === 'success' ? 'Dossier enregistre !' : 'Action requise'}
                        </p>
                        <p className="mt-2 text-sm font-semibold text-[#5b6f91]">
                          {submitMessage}
                        </p>
                        <button
                          type="button"
                          onClick={() => {
                            setSubmitMessage(null)
                            setSubmitState('idle')
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
        </section>
        )}
      </main>
    </div>
  )
}
