'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { RiArrowRightLine, RiSearchLine } from '@remixicon/react'
import type { StageOpening } from '@/lib/stages'

type StagesBoardProps = {
  stages: StageOpening[]
  detailBasePath?: string
}

const getUniqueOptions = (values: string[]) => Array.from(new Set(values)).sort()

export function StagesBoard({ stages, detailBasePath = '/stages' }: StagesBoardProps) {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')
  const [type, setType] = useState('all')
  const [location, setLocation] = useState('all')
  const [ageGroup, setAgeGroup] = useState('all')
  const [language, setLanguage] = useState('all')

  const categoryOptions = getUniqueOptions(stages.map((stage) => stage.category))
  const typeOptions = getUniqueOptions(stages.map((stage) => stage.type))
  const locationOptions = getUniqueOptions(stages.map((stage) => stage.location))
  const ageGroupOptions = getUniqueOptions(stages.map((stage) => stage.ageGroup))
  const languageOptions = getUniqueOptions(stages.flatMap((stage) => stage.languages))
  const normalizedSearch = search.trim().toLowerCase()

  const filteredStages = stages.filter((stage) => {
    const matchesSearch =
      normalizedSearch.length === 0 ||
      stage.title.toLowerCase().includes(normalizedSearch) ||
      stage.summary.toLowerCase().includes(normalizedSearch) ||
      stage.category.toLowerCase().includes(normalizedSearch) ||
      stage.location.toLowerCase().includes(normalizedSearch)

    const matchesCategory = category === 'all' || stage.category === category
    const matchesType = type === 'all' || stage.type === type
    const matchesLocation = location === 'all' || stage.location === location
    const matchesAgeGroup = ageGroup === 'all' || stage.ageGroup === ageGroup
    const matchesLanguage = language === 'all' || stage.languages.includes(language)

    return (
      matchesSearch &&
      matchesCategory &&
      matchesType &&
      matchesLocation &&
      matchesAgeGroup &&
      matchesLanguage
    )
  })

  return (
    <section id="offres" className="bg-white px-4 py-12 sm:px-6 lg:px-8 lg:py-14">
      <div className="mx-auto max-w-[1380px]">
        <div className="rounded-[24px] border border-[#dde5f1] bg-[#fbfcfe] p-4 shadow-[0_12px_34px_rgba(10,29,58,0.05)] sm:p-6">
          <div className="relative">
            <RiSearchLine className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8ea1c1]" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Rechercher un stage FC TORO"
              className="w-full rounded-[14px] border border-[#d6dfec] bg-white py-3 pl-11 pr-4 text-sm font-medium text-[#0a1d3a] outline-none transition-colors focus:border-[#ef233c]"
            />
          </div>

          <div className="mt-4 grid gap-3 md:grid-cols-3 xl:grid-cols-5">
            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className="rounded-[12px] border border-[#d6dfec] bg-white px-4 py-3 text-sm font-medium text-[#0a1d3a] outline-none transition-colors focus:border-[#ef233c]"
            >
              <option value="all">Toutes catégories</option>
              {categoryOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>

            <select
              value={type}
              onChange={(event) => setType(event.target.value)}
              className="rounded-[12px] border border-[#d6dfec] bg-white px-4 py-3 text-sm font-medium text-[#0a1d3a] outline-none transition-colors focus:border-[#ef233c]"
            >
              <option value="all">Tous formats</option>
              {typeOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>

            <select
              value={location}
              onChange={(event) => setLocation(event.target.value)}
              className="rounded-[12px] border border-[#d6dfec] bg-white px-4 py-3 text-sm font-medium text-[#0a1d3a] outline-none transition-colors focus:border-[#ef233c]"
            >
              <option value="all">Toutes localisations</option>
              {locationOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>

            <select
              value={ageGroup}
              onChange={(event) => setAgeGroup(event.target.value)}
              className="rounded-[12px] border border-[#d6dfec] bg-white px-4 py-3 text-sm font-medium text-[#0a1d3a] outline-none transition-colors focus:border-[#ef233c]"
            >
              <option value="all">Tous groupes</option>
              {ageGroupOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>

            <select
              value={language}
              onChange={(event) => setLanguage(event.target.value)}
              className="rounded-[12px] border border-[#d6dfec] bg-white px-4 py-3 text-sm font-medium text-[#0a1d3a] outline-none transition-colors focus:border-[#ef233c]"
            >
              <option value="all">Toutes langues</option>
              {languageOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-8 overflow-hidden border border-[#dce4f0] bg-white shadow-[0_16px_34px_rgba(10,29,58,0.05)]">
          <div className="hidden grid-cols-[minmax(0,3.1fr)_0.95fr_1.35fr_0.85fr_1fr_0.95fr] gap-6 border-b border-[#e7edf5] bg-[#f8fafc] px-7 py-4 text-[11px] font-black uppercase tracking-[0.14em] text-[#6f84a7] lg:grid">
            <p>Opportunité</p>
            <p>Format</p>
            <p>Localisation</p>
            <p>Groupe</p>
            <p>Langues</p>
            <p className="text-right">Détails</p>
          </div>

          {filteredStages.length === 0 ? (
            <div className="px-6 py-12 text-center">
              <p className="text-lg font-black uppercase text-[#0a1d3a]">Aucun stage trouvé</p>
              <p className="mt-2 text-sm font-medium text-[#5c6f90]">
                Ajustez les filtres pour voir les opportunités disponibles.
              </p>
            </div>
          ) : (
            <div>
              {filteredStages.map((stage, index) => (
                <motion.div
                  key={stage.slug}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: index * 0.04 }}
                  viewport={{ once: true, amount: 0.15 }}
                  className="border-b border-[#edf2f8] last:border-b-0"
                >
                  <Link
                    href={`${detailBasePath}/${stage.slug}`}
                    className="grid gap-3 px-5 py-5 transition-colors hover:bg-[#fbfcff] lg:grid-cols-[minmax(0,3.1fr)_0.95fr_1.35fr_0.85fr_1fr_0.95fr] lg:items-start lg:gap-6 lg:px-7"
                  >
                    <div>
                      <p className="text-[1.15rem] font-black leading-[1.08] text-[#0a1d3a] underline-offset-4 transition-colors hover:text-[#ef233c] lg:text-[1.25rem]">
                        {stage.title}
                      </p>
                      <p className="mt-2 max-w-[680px] text-sm font-medium leading-relaxed text-[#587090] lg:text-[15px]">
                        {stage.summary}
                      </p>
                    </div>

                    <div className="text-sm font-semibold text-[#445b7f]">
                      <p className="font-black uppercase tracking-[0.08em] text-[#0a1d3a] lg:hidden">Format</p>
                      <p>{stage.type}</p>
                    </div>

                    <div className="text-sm font-semibold text-[#445b7f]">
                      <p className="font-black uppercase tracking-[0.08em] text-[#0a1d3a] lg:hidden">Localisation</p>
                      <p>{stage.location}</p>
                    </div>

                    <div className="text-sm font-semibold text-[#445b7f]">
                      <p className="font-black uppercase tracking-[0.08em] text-[#0a1d3a] lg:hidden">Groupe</p>
                      <p>{stage.ageGroup}</p>
                    </div>

                    <div className="text-sm font-semibold text-[#445b7f]">
                      <p className="font-black uppercase tracking-[0.08em] text-[#0a1d3a] lg:hidden">Langues</p>
                      <p>{stage.languages.join(', ')}</p>
                    </div>

                    <div className="flex items-start justify-end">
                      <span className="inline-flex items-center whitespace-nowrap text-[11px] font-black uppercase tracking-[0.1em] text-[#1f4ea1]">
                        Voir détails <RiArrowRightLine className="ml-1 h-4 w-4" />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
