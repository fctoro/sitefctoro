import Image from 'next/image'
import Link from 'next/link'
import { RiArrowRightLine, RiCalendarEventLine } from '@remixicon/react'
import type { NewsCard } from '@/lib/joueur'

type NewsBarcaGridProps = {
  items: NewsCard[]
  heading: string
  eyebrow?: string
  ctaHref?: string
  ctaLabel?: string
  limit?: number
}

export function NewsBarcaGrid({ items, heading, eyebrow, ctaHref, ctaLabel, limit = 8 }: NewsBarcaGridProps) {
  const cards = items.slice(0, limit)

  return (
    <div className="mx-auto max-w-[1320px]">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div className="w-full text-center">
          {eyebrow ? (
            <p className="text-[11px] font-black uppercase tracking-[0.16em] text-[#1d4ea1]">{eyebrow}</p>
          ) : null}
          <h2 className="mt-2 text-[clamp(2rem,4vw,3.6rem)] font-black uppercase leading-[0.9] text-[#0a1d3a]">
            {heading}
          </h2>
        </div>
        {ctaHref && ctaLabel ? (
          <div className="w-full text-center">
            <Link
              href={ctaHref}
              className="inline-flex items-center text-[11px] font-black uppercase tracking-[0.08em] text-[#12366f] transition-colors hover:text-[#ef233c]"
            >
              {ctaLabel} <RiArrowRightLine className="ml-1 h-4 w-4" />
            </Link>
          </div>
        ) : null}
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <Link
            key={`barca-news-${card.title}`}
            href={`/actualites/${card.slug}`}
            className="group aspect-square overflow-hidden bg-white shadow-[0_10px_18px_rgba(10,29,58,0.1)] transition-transform duration-300 hover:-translate-y-1"
          >
            <div className="relative h-[56%] overflow-hidden bg-[#f3f6fb]">
              <Image
                src={card.image}
                alt={card.title}
                fill
                sizes="(min-width: 1280px) 24vw, (min-width: 640px) 48vw, 100vw"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
            </div>

            <div className="flex h-[44%] flex-col px-3.5 py-3">
              <h3 className="text-[1.45rem] font-black leading-[0.9] text-[#0a1d3a]">{card.title}</h3>
              <p className="mt-1.5 text-[12px] leading-snug text-[#556987]">{card.excerpt}</p>

              <div className="mt-auto flex items-center justify-between pt-2">
                <p className="inline-flex items-center text-[10px] font-black uppercase tracking-[0.08em] text-[#ef233c]">
                  <span className="mr-1.5 h-2 w-2 bg-[#ef233c]" />
                  {card.category}
                </p>
                <p className="inline-flex items-center text-[10px] font-semibold text-[#607398]">
                  <RiCalendarEventLine className="mr-1 h-3.5 w-3.5 text-[#607398]" />
                  {card.dateLabel}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
