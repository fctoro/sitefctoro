import { NextRequest, NextResponse } from 'next/server'
import { logAnalyticsEvent } from '@/lib/analytics-db'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { eventType, eventName, pagePath, metadata, sessionId } = body

    if (!eventType || !eventName) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // On ne bloque pas la réponse pour l'écriture en DB (Fire and forget)
    logAnalyticsEvent({
      eventType,
      eventName,
      pagePath,
      metadata,
      sessionId,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[API-ANALYTICS] Error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
