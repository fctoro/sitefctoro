import { NextResponse } from 'next/server'
import { getPublishedCmsArticles } from '@/lib/articles'

export const dynamic = 'force-dynamic'

export async function GET() {
  const articles = await getPublishedCmsArticles()

  return NextResponse.json(
    { articles },
    {
      headers: {
        'Cache-Control': 'no-store',
      },
    },
  )
}
