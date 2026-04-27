/**
 * Utilitaire client pour envoyer des événements d'analyse au CMS.
 */
export async function trackEvent(
  eventName: string,
  eventType: 'view' | 'click' | 'submit' = 'click',
  metadata: any = {}
) {
  try {
    const body = {
      eventType,
      eventName,
      pagePath: typeof window !== 'undefined' ? window.location.pathname : '',
      metadata: {
        ...metadata,
        userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
        screenSize: typeof window !== 'undefined' ? `${window.innerWidth}x${window.innerHeight}` : '',
      },
      sessionId: getSessionId(),
    }

    fetch('/api/analytics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    }).catch(() => {}) // Fire and forget
  } catch (err) {
    // Silently fail analytics
  }
}

function getSessionId() {
  if (typeof window === 'undefined') return ''
  let id = localStorage.getItem('fctoro_session_id')
  if (!id) {
    id = Math.random().toString(36).substring(2, 15)
    localStorage.setItem('fctoro_session_id', id)
  }
  return id
}
