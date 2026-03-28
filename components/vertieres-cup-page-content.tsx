'use client'

import { ChangeEvent, FormEvent, useMemo, useState } from 'react'
import {
  RiAddLine,
  RiCheckboxCircleFill,
  RiDeleteBinLine,
  RiImageAddLine,
  RiShieldStarLine,
  RiTeamLine,
  RiUser3Line,
} from '@remixicon/react'
import { vertieresHighlights, vertieresRequirements } from '@/data/events-data'

type PlayerEntry = {
  id: string
  number: string
  fullName: string
  birthYear: string
  position: string
  captain: boolean
}

type TeamRegistrationState = {
  teamName: string
  category: string
  city: string
  teamColors: string
  coachName: string
  coachPhone: string
  coachEmail: string
  managerName: string
  logoName: string
  logoPreview: string | null
  objective: string
  players: PlayerEntry[]
}

type SubmittedSummary = {
  teamName: string
  category: string
  city: string
  coachName: string
  logoName: string
  playerCount: number
}

const createPlayerEntry = (): PlayerEntry => ({
  id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
  number: '',
  fullName: '',
  birthYear: '',
  position: '',
  captain: false,
})

const createInitialPlayers = () =>
  Array.from({ length: 8 }, () => createPlayerEntry())

const initialFormState = (): TeamRegistrationState => ({
  teamName: '',
  category: 'U17',
  city: '',
  teamColors: '',
  coachName: '',
  coachPhone: '',
  coachEmail: '',
  managerName: '',
  logoName: '',
  logoPreview: null,
  objective: '',
  players: createInitialPlayers(),
})

export default function VertieresCupPageContent() {
  const [formState, setFormState] = useState<TeamRegistrationState>(initialFormState)
  const [formError, setFormError] = useState<string | null>(null)
  const [submittedSummary, setSubmittedSummary] = useState<SubmittedSummary | null>(null)

  const completedPlayers = useMemo(
    () => formState.players.filter((player) => player.fullName.trim()).length,
    [formState.players],
  )

  const handleLogoChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if (!file) {
      setFormState((prev) => ({ ...prev, logoName: '', logoPreview: null }))
      return
    }

    const reader = new FileReader()
    reader.onload = () => {
      setFormState((prev) => ({
        ...prev,
        logoName: file.name,
        logoPreview: typeof reader.result === 'string' ? reader.result : null,
      }))
    }
    reader.readAsDataURL(file)
  }

  const updatePlayer = (playerId: string, field: keyof PlayerEntry, value: string | boolean) => {
    setFormState((prev) => ({
      ...prev,
      players: prev.players.map((player) =>
        player.id === playerId ? { ...player, [field]: value } : player,
      ),
    }))
  }

  const addPlayer = () => {
    setFormState((prev) => ({
      ...prev,
      players: [...prev.players, createPlayerEntry()],
    }))
  }

  const removePlayer = (playerId: string) => {
    setFormState((prev) => ({
      ...prev,
      players:
        prev.players.length > 1
          ? prev.players.filter((player) => player.id !== playerId)
          : prev.players,
    }))
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!formState.teamName.trim() || !formState.city.trim()) {
      setFormError('Ajoute le nom de l equipe et la ville avant de valider.')
      return
    }

    if (!formState.coachName.trim() || !formState.coachPhone.trim() || !formState.coachEmail.trim()) {
      setFormError('Le responsable principal doit avoir un nom, un numero et un email.')
      return
    }

    if (!formState.logoName) {
      setFormError('Le logo de l equipe est demande pour l inscription Vertieres Cup.')
      return
    }

    if (completedPlayers < 7) {
      setFormError('Renseigne au moins 7 joueurs pour valider le dossier.')
      return
    }

    setFormError(null)
    setSubmittedSummary({
      teamName: formState.teamName,
      category: formState.category,
      city: formState.city,
      coachName: formState.coachName,
      logoName: formState.logoName,
      playerCount: completedPlayers,
    })
    setFormState(initialFormState())
  }

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f5f4f2_0%,#eef1f7_100%)] text-[#0a1d3a]">
      <main className="pb-14 pt-[116px] lg:pt-[78px]">
        <section className="relative overflow-hidden border-b border-[#d8e2ef] bg-[#0a1d3a] px-4 py-12 text-white sm:px-6 lg:px-8 lg:py-16">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(239,35,60,0.18),transparent_30%)]" />
          <div className="mx-auto grid max-w-[1200px] gap-8 lg:grid-cols-[minmax(0,1.2fr)_340px] lg:items-end">
            <div className="relative z-10">
              <p className="text-[10px] font-black uppercase tracking-[0.34em] text-[#ef233c]">
                Inscriptions tournoi
              </p>
              <h1 className="mt-4 text-[clamp(2.3rem,4.8vw,4.9rem)] font-black uppercase leading-[0.9] tracking-[-0.05em]">
                Vertieres
                <br />
                Cup
              </h1>
              <p className="mt-5 max-w-[700px] text-base leading-relaxed text-white/72 sm:text-lg">
                Enregistre ton equipe, ajoute le logo officiel et depose une liste complete des
                joueurs pour la validation du tournoi Vertieres Cup.
              </p>
            </div>

            <div className="relative z-10 rounded-[30px] border border-white/10 bg-white/6 p-6 backdrop-blur">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/45">
                Rappel competition
              </p>
              <p className="mt-3 text-4xl font-black leading-none text-white">18.11.2026</p>
              <p className="mt-2 text-sm leading-relaxed text-white/72">
                Verification des dossiers 72h avant la competition. Une equipe incompletement
                renseignee ne sera pas confirmee.
              </p>
            </div>
          </div>
        </section>

        <section className="px-4 py-8 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-[1200px] gap-6 xl:grid-cols-[330px_minmax(0,1fr)]">
            <aside className="space-y-6">
              <div className="rounded-[28px] border border-[#d7dfec] bg-white p-6 shadow-[0_14px_30px_rgba(10,29,58,0.08)]">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#ef233c]">
                  Pourquoi Vertieres Cup
                </p>
                <div className="mt-4 space-y-3">
                  {vertieresHighlights.map((item) => (
                    <div key={item} className="flex items-start gap-3 rounded-2xl bg-[#f8fafc] px-4 py-4">
                      <RiCheckboxCircleFill className="mt-0.5 h-5 w-5 shrink-0 text-[#ef233c]" />
                      <p className="text-sm leading-relaxed text-[#4a5f84]">{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[28px] border border-[#d7dfec] bg-white p-6 shadow-[0_14px_30px_rgba(10,29,58,0.08)]">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#ef233c]">
                  Dossier demande
                </p>
                <div className="mt-4 space-y-4">
                  {vertieresRequirements.map((item) => (
                    <article key={item.title} className="rounded-2xl border border-[#e7edf6] bg-[#fbfcff] p-4">
                      <p className="text-sm font-black uppercase text-[#0a1d3a]">{item.title}</p>
                      <p className="mt-2 text-sm leading-relaxed text-[#5b6f91]">{item.body}</p>
                    </article>
                  ))}
                </div>
              </div>

              {submittedSummary ? (
                <div className="rounded-[28px] bg-[#ef233c] p-6 text-white shadow-[0_22px_34px_rgba(239,35,60,0.3)]">
                  <p className="text-[10px] font-black uppercase tracking-[0.22em] text-white/72">
                    Dossier pret
                  </p>
                  <p className="mt-3 text-2xl font-black uppercase leading-tight">
                    {submittedSummary.teamName}
                  </p>
                  <div className="mt-4 space-y-2 text-sm font-semibold text-white/88">
                    <p>Categorie: {submittedSummary.category}</p>
                    <p>Ville: {submittedSummary.city}</p>
                    <p>Coach: {submittedSummary.coachName}</p>
                    <p>Logo: {submittedSummary.logoName}</p>
                    <p>Joueurs renseignes: {submittedSummary.playerCount}</p>
                  </div>
                </div>
              ) : null}
            </aside>

            <section className="rounded-[30px] border border-[#d7dfec] bg-white p-6 shadow-[0_18px_34px_rgba(10,29,58,0.08)] sm:p-8">
              <div className="flex flex-col gap-4 border-b border-[#e7edf6] pb-6 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#ef233c]">
                    Formulaire equipe
                  </p>
                  <h2 className="mt-3 text-[clamp(1.9rem,3vw,3rem)] font-black uppercase leading-[0.94] tracking-[-0.04em] text-[#0a1d3a]">
                    Inscription Vertieres Cup
                  </h2>
                </div>

                <div className="rounded-2xl border border-[#e7edf6] bg-[#f8fafc] px-4 py-3 text-sm font-bold text-[#5b6f91]">
                  {completedPlayers} joueur(s) renseignes
                </div>
              </div>

              <form className="mt-8 space-y-8" onSubmit={handleSubmit}>
                <section className="space-y-4">
                  <div className="flex items-center gap-3">
                    <RiTeamLine className="h-5 w-5 text-[#ef233c]" />
                    <h3 className="text-lg font-black uppercase text-[#0a1d3a]">Equipe</h3>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                    <label className="space-y-2">
                      <span className="text-sm font-semibold text-[#43597d]">Nom de l equipe</span>
                      <input
                        type="text"
                        value={formState.teamName}
                        onChange={(event) =>
                          setFormState((prev) => ({ ...prev, teamName: event.target.value }))
                        }
                        className="h-12 w-full rounded-2xl border border-[#d7dfec] bg-[#fbfcff] px-4 text-sm text-[#0a1d3a] focus:border-[#ef233c] focus:outline-none focus:ring-2 focus:ring-[#ef233c]/15"
                        placeholder="FC TORO U17"
                      />
                    </label>

                    <label className="space-y-2">
                      <span className="text-sm font-semibold text-[#43597d]">Categorie</span>
                      <select
                        value={formState.category}
                        onChange={(event) =>
                          setFormState((prev) => ({ ...prev, category: event.target.value }))
                        }
                        className="h-12 w-full rounded-2xl border border-[#d7dfec] bg-[#fbfcff] px-4 text-sm text-[#0a1d3a] focus:border-[#ef233c] focus:outline-none focus:ring-2 focus:ring-[#ef233c]/15"
                      >
                        <option value="U13">U13</option>
                        <option value="U15">U15</option>
                        <option value="U17">U17</option>
                        <option value="U20">U20</option>
                        <option value="Senior">Senior</option>
                      </select>
                    </label>

                    <label className="space-y-2">
                      <span className="text-sm font-semibold text-[#43597d]">Ville / Commune</span>
                      <input
                        type="text"
                        value={formState.city}
                        onChange={(event) =>
                          setFormState((prev) => ({ ...prev, city: event.target.value }))
                        }
                        className="h-12 w-full rounded-2xl border border-[#d7dfec] bg-[#fbfcff] px-4 text-sm text-[#0a1d3a] focus:border-[#ef233c] focus:outline-none focus:ring-2 focus:ring-[#ef233c]/15"
                        placeholder="Petion-Ville"
                      />
                    </label>

                    <label className="space-y-2">
                      <span className="text-sm font-semibold text-[#43597d]">Couleurs de l equipe</span>
                      <input
                        type="text"
                        value={formState.teamColors}
                        onChange={(event) =>
                          setFormState((prev) => ({ ...prev, teamColors: event.target.value }))
                        }
                        className="h-12 w-full rounded-2xl border border-[#d7dfec] bg-[#fbfcff] px-4 text-sm text-[#0a1d3a] focus:border-[#ef233c] focus:outline-none focus:ring-2 focus:ring-[#ef233c]/15"
                        placeholder="Bleu marine / Rouge"
                      />
                    </label>
                  </div>
                </section>

                <section className="space-y-4">
                  <div className="flex items-center gap-3">
                    <RiUser3Line className="h-5 w-5 text-[#ef233c]" />
                    <h3 className="text-lg font-black uppercase text-[#0a1d3a]">Responsables</h3>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                    <label className="space-y-2">
                      <span className="text-sm font-semibold text-[#43597d]">Coach principal</span>
                      <input
                        type="text"
                        value={formState.coachName}
                        onChange={(event) =>
                          setFormState((prev) => ({ ...prev, coachName: event.target.value }))
                        }
                        className="h-12 w-full rounded-2xl border border-[#d7dfec] bg-[#fbfcff] px-4 text-sm text-[#0a1d3a] focus:border-[#ef233c] focus:outline-none focus:ring-2 focus:ring-[#ef233c]/15"
                        placeholder="Nom du coach"
                      />
                    </label>

                    <label className="space-y-2">
                      <span className="text-sm font-semibold text-[#43597d]">Telephone</span>
                      <input
                        type="tel"
                        value={formState.coachPhone}
                        onChange={(event) =>
                          setFormState((prev) => ({ ...prev, coachPhone: event.target.value }))
                        }
                        className="h-12 w-full rounded-2xl border border-[#d7dfec] bg-[#fbfcff] px-4 text-sm text-[#0a1d3a] focus:border-[#ef233c] focus:outline-none focus:ring-2 focus:ring-[#ef233c]/15"
                        placeholder="+509 ..."
                      />
                    </label>

                    <label className="space-y-2">
                      <span className="text-sm font-semibold text-[#43597d]">Email</span>
                      <input
                        type="email"
                        value={formState.coachEmail}
                        onChange={(event) =>
                          setFormState((prev) => ({ ...prev, coachEmail: event.target.value }))
                        }
                        className="h-12 w-full rounded-2xl border border-[#d7dfec] bg-[#fbfcff] px-4 text-sm text-[#0a1d3a] focus:border-[#ef233c] focus:outline-none focus:ring-2 focus:ring-[#ef233c]/15"
                        placeholder="coach@club.com"
                      />
                    </label>

                    <label className="space-y-2">
                      <span className="text-sm font-semibold text-[#43597d]">Manager / Contact club</span>
                      <input
                        type="text"
                        value={formState.managerName}
                        onChange={(event) =>
                          setFormState((prev) => ({ ...prev, managerName: event.target.value }))
                        }
                        className="h-12 w-full rounded-2xl border border-[#d7dfec] bg-[#fbfcff] px-4 text-sm text-[#0a1d3a] focus:border-[#ef233c] focus:outline-none focus:ring-2 focus:ring-[#ef233c]/15"
                        placeholder="Responsable club"
                      />
                    </label>
                  </div>
                </section>

                <section className="space-y-4">
                  <div className="flex items-center gap-3">
                    <RiShieldStarLine className="h-5 w-5 text-[#ef233c]" />
                    <h3 className="text-lg font-black uppercase text-[#0a1d3a]">Logo officiel</h3>
                  </div>

                  <div className="grid gap-4 lg:grid-cols-[220px_minmax(0,1fr)]">
                    <div className="grid place-items-center rounded-[28px] border border-dashed border-[#ef233c]/35 bg-[#fff8f9] p-5">
                      {formState.logoPreview ? (
                        <img
                          src={formState.logoPreview}
                          alt="Apercu logo equipe"
                          className="h-32 w-32 rounded-full object-cover shadow-[0_18px_26px_rgba(10,29,58,0.12)]"
                        />
                      ) : (
                        <div className="grid h-32 w-32 place-items-center rounded-full border border-[#ef233c]/25 bg-white text-[#ef233c]">
                          <RiImageAddLine className="h-12 w-12" />
                        </div>
                      )}
                    </div>

                    <div className="rounded-[28px] border border-[#d7dfec] bg-[#fbfcff] p-5">
                      <label className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-[#ef233c] px-5 py-3 text-xs font-black uppercase tracking-[0.16em] text-white transition-colors hover:bg-[#d71931]">
                        <RiImageAddLine className="h-4 w-4" />
                        Importer le logo
                        <input type="file" accept="image/*" className="hidden" onChange={handleLogoChange} />
                      </label>
                      <p className="mt-4 text-sm leading-relaxed text-[#5b6f91]">
                        Format recommande: PNG ou JPG, fond propre, lisible en petit format.
                      </p>
                      <p className="mt-3 text-sm font-semibold text-[#0a1d3a]">
                        {formState.logoName || 'Aucun fichier ajoute'}
                      </p>
                    </div>
                  </div>
                </section>

                <section className="space-y-4">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <RiTeamLine className="h-5 w-5 text-[#ef233c]" />
                      <h3 className="text-lg font-black uppercase text-[#0a1d3a]">Liste des joueurs</h3>
                    </div>

                    <button
                      type="button"
                      onClick={addPlayer}
                      className="inline-flex items-center gap-2 rounded-full border border-[#ef233c]/25 px-4 py-2 text-xs font-black uppercase tracking-[0.14em] text-[#ef233c] transition-colors hover:bg-[#fff5f6]"
                    >
                      <RiAddLine className="h-4 w-4" />
                      Ajouter un joueur
                    </button>
                  </div>

                  <div className="space-y-4">
                    {formState.players.map((player, index) => (
                      <div
                        key={player.id}
                        className="rounded-[26px] border border-[#d7dfec] bg-[#fbfcff] p-4"
                      >
                        <div className="mb-4 flex items-center justify-between gap-3">
                          <p className="text-sm font-black uppercase tracking-[0.08em] text-[#0a1d3a]">
                            Joueur {index + 1}
                          </p>
                          <button
                            type="button"
                            onClick={() => removePlayer(player.id)}
                            className="inline-flex items-center gap-2 rounded-full border border-[#ebc8d1] px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.12em] text-[#c81f34] transition-colors hover:bg-[#fff1f3]"
                          >
                            <RiDeleteBinLine className="h-4 w-4" />
                            Retirer
                          </button>
                        </div>

                        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
                          <label className="space-y-2">
                            <span className="text-sm font-semibold text-[#43597d]">Numero</span>
                            <input
                              type="text"
                              value={player.number}
                              onChange={(event) => updatePlayer(player.id, 'number', event.target.value)}
                              className="h-11 w-full rounded-2xl border border-[#d7dfec] bg-white px-4 text-sm text-[#0a1d3a] focus:border-[#ef233c] focus:outline-none focus:ring-2 focus:ring-[#ef233c]/15"
                              placeholder="10"
                            />
                          </label>

                          <label className="space-y-2 xl:col-span-2">
                            <span className="text-sm font-semibold text-[#43597d]">Nom complet</span>
                            <input
                              type="text"
                              value={player.fullName}
                              onChange={(event) => updatePlayer(player.id, 'fullName', event.target.value)}
                              className="h-11 w-full rounded-2xl border border-[#d7dfec] bg-white px-4 text-sm text-[#0a1d3a] focus:border-[#ef233c] focus:outline-none focus:ring-2 focus:ring-[#ef233c]/15"
                              placeholder="Nom du joueur"
                            />
                          </label>

                          <label className="space-y-2">
                            <span className="text-sm font-semibold text-[#43597d]">Annee</span>
                            <input
                              type="text"
                              value={player.birthYear}
                              onChange={(event) => updatePlayer(player.id, 'birthYear', event.target.value)}
                              className="h-11 w-full rounded-2xl border border-[#d7dfec] bg-white px-4 text-sm text-[#0a1d3a] focus:border-[#ef233c] focus:outline-none focus:ring-2 focus:ring-[#ef233c]/15"
                              placeholder="2009"
                            />
                          </label>

                          <label className="space-y-2">
                            <span className="text-sm font-semibold text-[#43597d]">Poste</span>
                            <input
                              type="text"
                              value={player.position}
                              onChange={(event) => updatePlayer(player.id, 'position', event.target.value)}
                              className="h-11 w-full rounded-2xl border border-[#d7dfec] bg-white px-4 text-sm text-[#0a1d3a] focus:border-[#ef233c] focus:outline-none focus:ring-2 focus:ring-[#ef233c]/15"
                              placeholder="Attaquant"
                            />
                          </label>
                        </div>

                        <label className="mt-4 inline-flex items-center gap-3 text-sm font-semibold text-[#43597d]">
                          <input
                            type="checkbox"
                            checked={player.captain}
                            onChange={(event) => updatePlayer(player.id, 'captain', event.target.checked)}
                            className="h-4 w-4 rounded border-[#d7dfec] text-[#ef233c] focus:ring-[#ef233c]"
                          />
                          Capitaine de l equipe
                        </label>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="space-y-4">
                  <label className="space-y-2">
                    <span className="text-sm font-semibold text-[#43597d]">Objectif ou notes supplementaires</span>
                    <textarea
                      rows={5}
                      value={formState.objective}
                      onChange={(event) =>
                        setFormState((prev) => ({ ...prev, objective: event.target.value }))
                      }
                      className="w-full rounded-[26px] border border-[#d7dfec] bg-[#fbfcff] px-4 py-4 text-sm text-[#0a1d3a] focus:border-[#ef233c] focus:outline-none focus:ring-2 focus:ring-[#ef233c]/15"
                      placeholder="Ex: equipe championne departementale, objectif quart de finale, contraintes horaires..."
                    />
                  </label>
                </section>

                {formError ? (
                  <div className="rounded-2xl border border-[#f0b7c0] bg-[#fff1f3] px-4 py-3 text-sm font-semibold text-[#b61b31]">
                    {formError}
                  </div>
                ) : null}

                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <p className="text-sm leading-relaxed text-[#5b6f91]">
                    En validant, le staff FC TORO peut relire le dossier et revenir vers le coach
                    avec le planning, les conditions et la confirmation d inscription.
                  </p>

                  <button
                    type="submit"
                    className="inline-flex items-center justify-center rounded-full bg-[#ef233c] px-8 py-4 text-sm font-black uppercase tracking-[0.16em] text-white transition-all hover:translate-y-[-1px] hover:bg-[#d71931]"
                  >
                    Valider l inscription
                  </button>
                </div>
              </form>
            </section>
          </div>
        </section>
      </main>
    </div>
  )
}
