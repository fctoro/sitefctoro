import Link from 'next/link'
import Image from 'next/image'
import { RiArrowRightLine, RiMapPinLine, RiTeamLine } from '@remixicon/react'
import {
  eventCards,
  eventReadingDetails,
  type EventSlug,
} from '@/data/events-data'

type EventsPageContentProps = {
  activeSlug: EventSlug
}

export default function EventsPageContent({ activeSlug }: EventsPageContentProps) {
  const activeCard = eventCards.find((card) => card.slug === activeSlug) ?? eventCards[0]
  const activeDetail = eventReadingDetails[activeSlug]

  return (
    <>
      <section id="evenements" className="px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1200px]">
          <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.34em] text-[#ef233c]">
                Parcours
              </p>
              <h2 className="mt-3 text-[clamp(2rem,4vw,3.6rem)] font-black uppercase leading-[0.92] tracking-[-0.05em] text-[#0a1d3a]">
                Trois pages,
                <br />
                une meme energie club.
              </h2>
            </div>

            <p className="max-w-[440px] text-sm font-semibold leading-relaxed text-[#5b6f91] sm:text-base">
              Clique sur un evenement pour lire ses donnees principales, puis ouvre la page
              correspondante pour passer a l action.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {eventCards.map((card) => {
              const isActive = card.slug === activeSlug

              return (
                <Link
                  key={card.slug}
                  href={`/evenements?focus=${card.slug}#lecture-evenement`}
                  className={`group overflow-hidden rounded-[30px] border bg-white shadow-[0_18px_32px_rgba(10,29,58,0.08)] transition-all duration-300 hover:-translate-y-1 ${
                    isActive ? 'border-[#ef233c]/45 ring-2 ring-[#ef233c]/12' : 'border-[#d7dfec]'
                  }`}
                >
                  <div className="relative h-[280px] overflow-hidden bg-[#0a1d3a]">
                    <Image
                      src={card.image}
                      alt={card.title}
                      fill
                      sizes="(min-width: 1024px) 33vw, 100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,29,58,0.08)_0%,rgba(10,29,58,0.88)_100%)]" />

                    <div className="absolute left-5 top-5 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-white">
                      {card.badge}
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/72">
                        {card.dateLabel}
                      </p>
                      <h3 className="mt-2 text-3xl font-black uppercase leading-[0.92] tracking-[-0.04em]">
                        {card.title}
                      </h3>
                    </div>
                  </div>

                  <div className="space-y-5 p-6">
                    <p className="text-sm leading-relaxed text-[#5b6f91] sm:text-[15px]">
                      {card.summary}
                    </p>

                    <div className="rounded-2xl bg-[#f7faff] px-4 py-3">
                      <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#ef233c]">
                        Lire les donnees
                      </p>
                      <p className="mt-2 text-sm font-semibold leading-relaxed text-[#375078]">
                        {eventReadingDetails[card.slug].heading}
                      </p>
                    </div>

                    <span className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-[0.14em] text-[#ef233c] transition-transform duration-300 group-hover:translate-x-1">
                      Selectionner l evenement
                      <span aria-hidden="true">+</span>
                    </span>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      <section id="lecture-evenement" className="px-4 pb-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1200px] overflow-hidden rounded-[34px] border border-[#d8e2ef] bg-white shadow-[0_22px_40px_rgba(10,29,58,0.08)]">
          <div className="grid gap-0 lg:grid-cols-[360px_minmax(0,1fr)]">
            <div className="relative min-h-[320px] overflow-hidden bg-[#0a1d3a]">
              <Image
                src={activeCard.image}
                alt={activeCard.title}
                fill
                sizes="(min-width: 1024px) 30vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,29,58,0.1)_0%,rgba(10,29,58,0.9)_100%)]" />
              <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#ef233c]">
                  {activeDetail.eyebrow}
                </p>
                <h3 className="mt-3 text-3xl font-black uppercase leading-[0.92]">
                  {activeCard.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-white/72">{activeCard.dateLabel}</p>
              </div>
            </div>

            <div className="p-6 sm:p-8 lg:p-10">
              <div className="flex flex-col gap-5 border-b border-[#e8edf5] pb-6 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.24em] text-[#ef233c]">
                    {activeDetail.eyebrow}
                  </p>
                  <h3 className="mt-3 text-[clamp(1.9rem,3vw,3rem)] font-black uppercase leading-[0.94] tracking-[-0.04em] text-[#0a1d3a]">
                    {activeDetail.heading}
                  </h3>
                </div>

                <Link
                  href={activeCard.href}
                  className="inline-flex items-center gap-2 rounded-full bg-[#ef233c] px-6 py-3 text-xs font-black uppercase tracking-[0.16em] text-white transition-colors hover:bg-[#d71931]"
                >
                  {activeDetail.primaryActionLabel}
                  <RiArrowRightLine className="h-4 w-4" />
                </Link>
              </div>

              <p className="mt-6 max-w-[760px] text-base leading-relaxed text-[#526887]">
                {activeDetail.longDescription}
              </p>

              <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {activeDetail.checkpoints.map((item) => (
                  <article
                    key={`${activeSlug}-${item.label}`}
                    className="rounded-2xl border border-[#e4ebf6] bg-[#f8fafc] px-5 py-4"
                  >
                    <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#6c82a3]">
                      {item.label}
                    </p>
                    <p className="mt-2 text-sm font-black uppercase leading-tight text-[#0a1d3a]">
                      {item.value}
                    </p>
                  </article>
                ))}
              </div>

              <div className="mt-8 grid gap-6 xl:grid-cols-[minmax(0,1fr)_280px]">
                <div>
                  <p className="text-sm font-black uppercase tracking-[0.12em] text-[#0a1d3a]">
                    Points a retenir
                  </p>
                  <div className="mt-4 space-y-3">
                    {activeDetail.highlights.map((item) => (
                      <div
                        key={item}
                        className="rounded-2xl border border-[#e7edf6] bg-[#fbfcff] px-4 py-4 text-sm leading-relaxed text-[#526887]"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>

                <aside className="rounded-[28px] bg-[#0a1d3a] p-6 text-white">
                  <div className="flex items-start gap-3">
                    <RiMapPinLine className="mt-0.5 h-5 w-5 text-[#ef233c]" />
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.18em] text-white/52">
                        Lieu / acces
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-white/76">
                        {activeDetail.location}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 flex items-start gap-3">
                    <RiTeamLine className="mt-0.5 h-5 w-5 text-[#ef233c]" />
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.18em] text-white/52">
                        Public concerne
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-white/76">
                        {activeDetail.audience}
                      </p>
                    </div>
                  </div>

                  <Link
                    href={activeCard.href}
                    className="mt-8 inline-flex items-center gap-2 text-sm font-black uppercase tracking-[0.12em] text-[#ffd7de]"
                  >
                    {activeDetail.secondaryActionLabel}
                    <RiArrowRightLine className="h-4 w-4" />
                  </Link>
                </aside>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
