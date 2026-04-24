import { NextResponse } from 'next/server'
import { getEliteRoster } from '@/lib/players'

export const dynamic = 'force-dynamic'

export async function GET() {
  const eliteRoster = await getEliteRoster({ useFallback: false })

  return NextResponse.json(
    { eliteRoster },
    {
      headers: {
        'Cache-Control': 'no-store',
      },
    },
  )
}
