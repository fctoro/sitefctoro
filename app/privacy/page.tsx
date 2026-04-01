import type { Metadata } from 'next'
import Link from 'next/link'
import { RiArrowRightLine, RiShieldCheckLine } from '@remixicon/react'
import { HomeNavbar } from '@/components/home-navbar'

export const metadata: Metadata = {
  title: 'Privacy | FC TORO',
  description: 'Informations sur la gestion des donnees partagees via le site FC TORO.',
}

const privacyFaq = [
  {
    question: 'Quelles informations sont generalement demandees ?',
    answer:
      'Principalement les coordonnees utiles, les informations de dossier et les elements necessaires pour repondre ou organiser un suivi.',
  },
  {
    question: 'Pourquoi le club demande ces donnees ?',
    answer:
      'Pour traiter une inscription, repondre a un message, organiser un evenement ou garder un canal de communication propre avec la personne concernee.',
  },
  {
    question: 'Qui utilise ces informations ?',
    answer:
      'Le staff ou les personnes du club qui en ont reellement besoin pour traiter la demande et assurer son suivi.',
  },
]

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#f4f8f6] text-[#17332d]">
      <HomeNavbar anchorPrefix="/" />

      <main className="pt-[116px] lg:pt-[78px]">
        <section className="px-4 py-14 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-[1100px] gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div className="rounded-[34px] bg-[#17332d] p-8 text-white shadow-[0_24px_40px_rgba(23,51,45,0.18)] sm:p-10">
              <RiShieldCheckLine className="h-10 w-10 text-[#7ce0bc]" />
              <p className="mt-6 text-[10px] font-black uppercase tracking-[0.34em] text-[#7ce0bc]">
                Informations
              </p>
              <h1 className="mt-4 text-[clamp(1.9rem,3.3vw,3.2rem)] font-black uppercase leading-[0.9] tracking-[-0.05em]">
                Privacy
              </h1>
            </div>

            <div>
              <p className="text-base leading-relaxed text-[#4f6761] sm:text-lg">
                La page privacy explique simplement comment les informations partagees via le site
                FC TORO peuvent etre utilisees pour traiter les demandes et garder un suivi clair.
              </p>

              <Link
                href="/contact"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#17332d] px-6 py-3 text-xs font-black uppercase tracking-[0.16em] text-white transition-colors hover:bg-[#244941]"
              >
                Ecrire au club
                <RiArrowRightLine className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        <section className="px-4 pb-10 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[1100px] space-y-4">
            {privacyFaq.map((item) => (
              <article
                key={item.question}
                className="rounded-[28px] border border-[#d7e4df] bg-white p-6 shadow-[0_14px_26px_rgba(23,51,45,0.06)]"
              >
                <h2 className="text-lg font-black uppercase leading-tight text-[#17332d]">
                  {item.question}
                </h2>
                <p className="mt-3 max-w-[820px] text-sm leading-relaxed text-[#556d67] sm:text-base">
                  {item.answer}
                </p>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
