import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { RiCalendarEventLine } from '@remixicon/react'
import { Breadcrumb } from '@/components/breadcrumb'
import { HomeNavbar } from '@/components/home-navbar'
import {
  getPublishedCmsArticleBySlug,
  getPublishedCmsArticles,
} from '@/lib/articles'
import type { NewsCard } from '@/lib/joueur'

export const dynamic = 'force-dynamic'

type ArticlePageProps = {
  params: Promise<{
    slug: string
  }>
}

const getArticleBySlug = async (slug: string): Promise<NewsCard | null> => {
  return getPublishedCmsArticleBySlug(slug)
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params
  const article = await getArticleBySlug(slug)

  if (!article) {
    return {
      title: 'Actualité | FC TORO',
    }
  }

  return {
    title: `${article.title} | FC TORO`,
    description: article.excerpt,
  }
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params
  const article = await getArticleBySlug(slug)

  if (!article) {
    notFound()
  }

  const cmsArticles = await getPublishedCmsArticles()
  const relatedArticles = cmsArticles
    .filter((item) => item.slug !== article.slug)
    .slice(0, 3)
  const articleImage = article.image || '/placeholder.jpg'

  return (
    <div className="min-h-screen bg-[#f3f4f8] text-[#0a1d3a]">
      <HomeNavbar anchorPrefix="/" />

      <main className="pt-[116px] lg:pt-[78px]">
        <Breadcrumb
          items={[
            { label: 'Accueil', href: '/' },
            { label: 'Actualités', href: '/actualites' },
            { label: article.title },
          ]}
        />
        <section className="relative overflow-hidden bg-[#091a35] px-4 py-14 text-white sm:px-6 lg:px-8 lg:py-16">
          <Image
            src={articleImage}
            alt={article.title}
            fill
            priority
            className="object-cover scale-[1.01] transform-gpu opacity-28"
          />
          <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(9,26,53,0.95)_0%,rgba(9,26,53,0.8)_58%,rgba(9,26,53,0.92)_100%)]" />

          <div className="relative mx-auto max-w-[980px]">
            <div className="mt-8">
              <p className="text-[10px] font-black uppercase tracking-[0.32em] text-[#ef233c]">
                {article.category}
              </p>
              <h1 className="mt-4 max-w-[820px] text-[clamp(1.9rem,3.5vw,3.4rem)] font-black uppercase leading-[0.9] tracking-[-0.05em]">
                {article.title}
              </h1>
              <p className="mt-5 max-w-[760px] text-base leading-relaxed text-white/74 sm:text-lg">
                {article.intro}
              </p>

              <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] font-black uppercase tracking-[0.14em] text-white/76">
                <RiCalendarEventLine className="h-4 w-4 text-[#ef233c]" />
                {article.dateLabel}
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-8 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-[1200px] gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
            <article className="overflow-hidden rounded-[30px] border border-[#d7dfec] bg-white shadow-[0_18px_34px_rgba(10,29,58,0.08)]">
              <div className="relative h-[280px] sm:h-[360px]">
                <Image
                  src={articleImage}
                  alt={article.title}
                  fill
                  sizes="(min-width: 1280px) 70vw, 100vw"
                  className="object-cover scale-[1.01] transform-gpu"
                />
              </div>

              <div className="p-6 sm:p-8">
                <div className="space-y-5 text-[15px] leading-relaxed text-[#4f6484] sm:text-base">
                  {article.content.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </article>

            <aside className="space-y-6">
              <div className="rounded-[28px] border border-[#d7dfec] bg-white p-6 shadow-[0_16px_28px_rgba(10,29,58,0.08)]">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#ef233c]">
                  Lire aussi
                </p>
                <div className="mt-4 space-y-3">
                  {relatedArticles.map((item) => (
                    <Link
                      key={item.slug}
                      href={`/actualites/${item.slug}`}
                      className="block rounded-2xl border border-[#e7edf6] bg-[#fbfcff] px-4 py-4 transition-colors hover:border-[#ef233c]/35 hover:bg-[#fff7f8]"
                    >
                      <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#ef233c]">
                        {item.category}
                      </p>
                      <p className="mt-2 text-sm font-black uppercase leading-tight text-[#0a1d3a]">
                        {item.title}
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-[#5c718f]">{item.excerpt}</p>
                    </Link>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </section>
      </main>
    </div>
  )
}
