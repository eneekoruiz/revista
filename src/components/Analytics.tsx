'use client'

import { useEffect } from 'react'

// Vercel Analytics - lightweight, privacy-first
declare global {
  interface Window {
    va?: (event: string, data?: Record<string, string>) => void
  }
}

export default function Analytics() {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') return;

    // Vercel Analytics removed temporarily due to 404 errors.
    // Ensure @vercel/analytics is properly installed and enabled in dashboard first.
  }, [])

  return null
}

// Helper to track custom events (e.g. sponsor click, newsletter signup)
export function trackEvent(eventName: string, data?: Record<string, string>) {
  if (typeof window !== 'undefined' && window.va) {
    window.va('event', { name: eventName, ...data })
  }
}
