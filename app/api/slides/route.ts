import { NextResponse } from 'next/server'
import { getActiveHeroSlides } from '@/lib/slides'

export const dynamic = 'force-dynamic'

export async function GET() {
  const slides = await getActiveHeroSlides()

  return NextResponse.json(
    { slides },
    {
      headers: {
        'Cache-Control': 'no-store',
      },
    },
  )
}
