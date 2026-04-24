import { NextResponse } from 'next/server'
import { getLatestLiveMatch } from '@/lib/live'

export const dynamic = 'force-dynamic'

export async function GET() {
  const liveMatch = await getLatestLiveMatch()

  return NextResponse.json(
    { liveMatch },
    {
      headers: {
        'Cache-Control': 'no-store',
      },
    },
  )
}
