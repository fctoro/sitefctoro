import { pool } from './db'

let hasEnsuredAnalyticsTable = false

export async function ensureAnalyticsTable() {
  if (hasEnsuredAnalyticsTable) return

  try {
    await pool.query(`
      create table if not exists analytics_events (
        id bigserial primary key,
        created_at timestamptz not null default now(),
        event_type text not null, -- 'view', 'click', 'submit'
        event_name text not null, -- 'page_home', 'btn_live_click', etc.
        page_path text,
        metadata jsonb, -- Browser info, etc.
        session_id text
      );
    `)
    hasEnsuredAnalyticsTable = true
  } catch (error) {
    console.error('[ANALYTICS-DB] Error ensuring table:', error)
  }
}

export async function logAnalyticsEvent(event: {
  eventType: string
  eventName: string
  pagePath?: string
  metadata?: any
  sessionId?: string
}) {
  await ensureAnalyticsTable()

  try {
    await pool.query(
      `insert into analytics_events (event_type, event_name, page_path, metadata, session_id)
       values ($1, $2, $3, $4, $5)`,
      [
        event.eventType,
        event.eventName,
        event.pagePath,
        JSON.stringify(event.metadata || {}),
        event.sessionId,
      ]
    )
  } catch (error) {
    console.error('[ANALYTICS-DB] Error logging event:', error)
  }
}
