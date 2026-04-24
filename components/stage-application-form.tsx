'use client'

import React, { useState } from 'react'

const languageLevels = ['Debutant', 'Intermediaire', 'Avance', 'Courant']

export function StageApplicationForm({ stageId }: { stageId: string }) {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(false)

    try {
      const formData = new FormData(e.currentTarget)
      formData.append('stageId', stageId)

      const response = await fetch('/api/inscriptions/stagiaires', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Erreur lors de la soumission de la candidature')
      }

      setSuccess(true)
      // Optional: e.currentTarget.reset()
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="mt-8 rounded-2xl bg-green-50 p-8 text-center text-green-800 border border-green-200">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-bold">Candidature envoyée !</h3>
        <p className="mt-2 text-green-700">Merci de votre intérêt. Nous étudierons votre profil très prochainement.</p>
      </div>
    )
  }

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      {error && (
        <div className="rounded-xl bg-red-50 p-4 text-sm text-red-600 border border-red-200">
          {error}
        </div>
      )}
      <div>
        <label className="text-sm font-medium text-[#445b7f]">
          Nom complet (Optionnel)
        </label>
        <input name="full_name" className="mt-2 w-full rounded-[14px] border border-[#d7dfeb] bg-white px-4 py-3 outline-none transition-colors focus:border-[#ef233c]" />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="text-sm font-medium text-[#445b7f]">
            Prenom <span className="text-[#ef233c]">*</span>
          </label>
          <input required name="first_name" className="mt-2 w-full rounded-[14px] border border-[#d7dfeb] bg-white px-4 py-3 outline-none transition-colors focus:border-[#ef233c]" />
        </div>
        <div>
          <label className="text-sm font-medium text-[#445b7f]">
            Nom <span className="text-[#ef233c]">*</span>
          </label>
          <input required name="last_name" className="mt-2 w-full rounded-[14px] border border-[#d7dfeb] bg-white px-4 py-3 outline-none transition-colors focus:border-[#ef233c]" />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="text-sm font-medium text-[#445b7f]">
            Email <span className="text-[#ef233c]">*</span>
          </label>
          <input required name="email" type="email" className="mt-2 w-full rounded-[14px] border border-[#d7dfeb] bg-white px-4 py-3 outline-none transition-colors focus:border-[#ef233c]" />
        </div>
        <div>
          <label className="text-sm font-medium text-[#445b7f]">
            Telephone <span className="text-[#ef233c]">*</span>
          </label>
          <input required name="phone" className="mt-2 w-full rounded-[14px] border border-[#d7dfeb] bg-white px-4 py-3 outline-none transition-colors focus:border-[#ef233c]" />
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-[#445b7f]">
          Localisation (Ville, Pays) <span className="text-[#ef233c]">*</span>
        </label>
        <input required name="location" className="mt-2 w-full rounded-[14px] border border-[#d7dfeb] bg-white px-4 py-3 outline-none transition-colors focus:border-[#ef233c]" />
      </div>

      <div>
        <label className="text-sm font-medium text-[#445b7f]">
          Upload CV / Resume <span className="text-[#ef233c]">*</span>
        </label>
        <input
          required
          name="cv"
          type="file"
          accept=".pdf,.doc,.docx"
          className="mt-2 block w-full rounded-[14px] border border-[#d7dfeb] bg-white px-4 py-3 text-sm text-[#445b7f]"
        />
        <p className="mt-2 text-xs text-[#7b8fab]">
          Types autorises: .pdf, .doc, .docx
        </p>
      </div>

      <div>
        <label className="text-sm font-medium text-[#445b7f]">
          Upload lettre de motivation
        </label>
        <input
          name="motivation"
          type="file"
          accept=".pdf,.doc,.docx"
          className="mt-2 block w-full rounded-[14px] border border-[#d7dfeb] bg-white px-4 py-3 text-sm text-[#445b7f]"
        />
      </div>

      <div>
        <label className="text-sm font-medium text-[#445b7f]">
          Pourquoi voulez-vous rejoindre FC TORO ?
        </label>
        <textarea
          name="motivation_text"
          rows={5}
          className="mt-2 w-full rounded-[14px] border border-[#d7dfeb] bg-white px-4 py-3 outline-none transition-colors focus:border-[#ef233c]"
        />
      </div>

      <div>
        <p className="text-sm font-medium text-[#445b7f]">
          Etes-vous disponible pour les entrainements et activites matchday ?{' '}
          <span className="text-[#ef233c]">*</span>
        </p>
        <div className="mt-3 flex gap-6 text-sm text-[#445b7f]">
          <label className="inline-flex items-center gap-2">
            <input required type="radio" name="availability" value="Oui" />
            Oui
          </label>
          <label className="inline-flex items-center gap-2">
            <input required type="radio" name="availability" value="Non" />
            Non
          </label>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="text-sm font-medium text-[#445b7f]">
            Comment avez-vous connu cette opportunite ? <span className="text-[#ef233c]">*</span>
          </label>
          <select required name="source" className="mt-2 w-full rounded-[14px] border border-[#d7dfeb] bg-white px-4 py-3 outline-none transition-colors focus:border-[#ef233c]">
            <option value="">Selectionner</option>
            <option value="Instagram">Instagram</option>
            <option value="Facebook">Facebook</option>
            <option value="Recommandation">Recommandation</option>
            <option value="Site officiel">Site officiel</option>
          </select>
        </div>
        <div>
          <label className="text-sm font-medium text-[#445b7f]">
            Si vous etes recommande, indiquez le nom
          </label>
          <input name="referrer_name" className="mt-2 w-full rounded-[14px] border border-[#d7dfeb] bg-white px-4 py-3 outline-none transition-colors focus:border-[#ef233c]" />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div>
          <label className="text-sm font-medium text-[#445b7f]">
            Niveau de Creole <span className="text-[#ef233c]">*</span>
          </label>
          <select required name="level_creole" className="mt-2 w-full rounded-[14px] border border-[#d7dfeb] bg-white px-4 py-3 outline-none transition-colors focus:border-[#ef233c]">
            <option value="">Selectionner</option>
            {languageLevels.map((level) => (
              <option key={`creole-${level}`} value={level}>{level}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-sm font-medium text-[#445b7f]">
            Niveau de Francais <span className="text-[#ef233c]">*</span>
          </label>
          <select required name="level_french" className="mt-2 w-full rounded-[14px] border border-[#d7dfeb] bg-white px-4 py-3 outline-none transition-colors focus:border-[#ef233c]">
            <option value="">Selectionner</option>
            {languageLevels.map((level) => (
              <option key={`french-${level}`} value={level}>{level}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-sm font-medium text-[#445b7f]">
            Niveau d Anglais
          </label>
          <select name="level_english" className="mt-2 w-full rounded-[14px] border border-[#d7dfeb] bg-white px-4 py-3 outline-none transition-colors focus:border-[#ef233c]">
            <option value="">Selectionner</option>
            {languageLevels.map((level) => (
              <option key={`english-${level}`} value={level}>{level}</option>
            ))}
          </select>
        </div>
      </div>

      <label className="flex w-full items-start gap-3 text-sm text-[#445b7f]">
        <input required name="consent" type="checkbox" className="mt-1" />
        <span>
          En utilisant ce formulaire, vous acceptez la collecte et le traitement de vos donnees
          pour cette candidature. <span className="text-[#ef233c]">*</span>
        </span>
      </label>

      <button
        disabled={loading}
        className="inline-flex w-fit rounded-full bg-[#0a1d3a] px-8 py-4 text-sm font-black uppercase tracking-[0.14em] text-white transition-colors hover:bg-[#ef233c] disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Envoi...' : 'Submit'}
      </button>
    </form>
  )
}
