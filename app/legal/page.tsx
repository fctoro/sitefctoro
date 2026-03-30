import type { Metadata } from 'next'
import Link from 'next/link'
import { RiArrowRightLine } from '@remixicon/react'
import { HomeNavbar } from '@/components/home-navbar'

export const metadata: Metadata = {
  title: 'Legal | FC TORO',
  description: 'Informations legales relatives au site FC TORO et a son cadre d utilisation.',
}

const legalSections = [
  {
    number: '01',
    title: 'Objet du site',
    body: 'Le site FC TORO presente les activites du club, ses projets, ses formulaires d inscription et ses informations de contact.',
  },
  {
    number: '02',
    title: 'Mise a jour des contenus',
    body: 'Les informations peuvent etre ajustees selon les besoins du club, l evolution des programmes ou les changements d organisation.',
  },
  {
    number: '03',
    title: 'Elements visuels et marque',
    body: 'Les logos, visuels et signes lies a FC TORO participent a l identite du club et ne doivent pas etre repris de maniere trompeuse.',
  },
  {
    number: '04',
    title: 'Liens externes',
    body: 'Le site peut orienter vers des services ou plateformes externes pour les reseaux sociaux, la diffusion ou certaines prises de contact.',
  },
]

export default function LegalPage() {
  return (
    <div className="min-h-screen bg-white text-[#121e34]">
      <HomeNavbar anchorPrefix="/" />

      <main className="pt-[116px] lg:pt-[78px]">
        <section className="border-b border-[#e7ebf2] px-4 py-14 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[1100px]">
            <p className="text-[10px] font-black uppercase tracking-[0.34em] text-[#ef233c]">
              Informations
            </p>
            <h1 className="mt-4 text-[clamp(2.3rem,4vw,4.3rem)] font-black uppercase leading-[0.9] tracking-[-0.05em]">
              Legal
            </h1>
            <p className="mt-5 max-w-[760px] text-base leading-relaxed text-[#617089] sm:text-lg">
              Cette page donne un cadre general de lecture sur le site FC TORO, ses contenus et
              sa fonction d information. Elle reste volontairement claire et simple.
            </p>
          </div>
        </section>

        <section className="px-4 py-10 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[1100px]">
            <div className="grid gap-4">
              {legalSections.map((section) => (
                <article
                  key={section.number}
                  className="grid gap-5 border-t border-[#eceff5] py-6 md:grid-cols-[90px_minmax(0,1fr)]"
                >
                  <p className="text-3xl font-black text-[#dbe3ef]">{section.number}</p>
                  <div>
                    <h2 className="text-xl font-black uppercase text-[#121e34]">{section.title}</h2>
                    <p className="mt-3 max-w-[760px] text-sm leading-relaxed text-[#617089] sm:text-base">
                      {section.body}
                    </p>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-8 rounded-[28px] bg-[#f6f8fc] p-6">
              <p className="text-sm leading-relaxed text-[#52627c]">
                Pour toute question sur un contenu, un formulaire ou une information du site, tu
                peux passer par la page contact du club.
              </p>
              <Link
                href="/contact"
                className="mt-5 inline-flex items-center gap-2 text-sm font-black uppercase tracking-[0.12em] text-[#ef233c]"
              >
                Aller au contact
                <RiArrowRightLine className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
