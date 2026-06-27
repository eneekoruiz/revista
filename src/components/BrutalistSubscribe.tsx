'use client'

import React, { useState, FormEvent } from 'react'
import { Send, CheckCircle2, AlertOctagon } from 'lucide-react'

export default function BrutalistSubscribe(): React.ReactElement {
  const [email, setEmail] = useState('')
  const [preferences, setPreferences] = useState({ articulos: true, vuelos: true })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!email || (!preferences.articulos && !preferences.vuelos)) return

    setStatus('loading')
    setMessage('')

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, preferences }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Ocurrió un error al suscribirte.')
      }

      setStatus('success')
      setMessage(data.message || '¡Te has suscrito correctamente!')
      setEmail('')
    } catch (err: unknown) {
      setStatus('error')
      setMessage((err as Error).message || 'Error de conexión. Inténtalo de nuevo.')
    }
  }

  return (
    <section className="w-full bg-[#080808] border-t border-b border-[#FC352E]/20 px-6 py-16">
      <div className="max-w-3xl mx-auto text-center">
        {/* Label */}
        <p className="font-mono text-[#FC352E] text-xs tracking-[0.35em] uppercase mb-5">
          [ BOLETÍN OFICIAL ]
        </p>

        {/* Title */}
        <h3
          className="text-white uppercase leading-[0.9] mb-4"
          style={{
            fontFamily: 'var(--font-anton), Impact, sans-serif',
            fontSize: 'clamp(2.5rem, 6vw, 5.5rem)',
          }}
        >
          ÚNETE A LA ESCENA
        </h3>

        <p className="text-white/40 text-sm mb-10 max-w-md mx-auto leading-relaxed"
          style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
          Crónicas de vuelos, artistas, entrevistas exclusivas y anuncios de nuevos eventos. Sin spam.
        </p>

        {status === 'success' ? (
          <div className="bg-black border border-[#FC352E]/40 p-6 flex flex-col items-center gap-3">
            <CheckCircle2 className="text-[#FC352E]" size={28} />
            <p className="font-bold text-sm uppercase tracking-[0.2em] text-white"
              style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
              ¡REGISTRO COMPLETADO!
            </p>
            <p className="text-white/40 text-xs">{message}</p>
            <button
              onClick={() => setStatus('idle')}
              className="mt-2 text-xs font-bold uppercase tracking-widest text-[#FC352E] hover:text-white transition-colors underline"
            >
              Suscribir otro correo
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-5 max-w-xl mx-auto">
            
            {/* Preferences Checkboxes */}
            <div className="flex flex-col sm:flex-row justify-center gap-6 mb-2">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input 
                  type="checkbox" 
                  checked={preferences.articulos}
                  onChange={(e) => setPreferences({...preferences, articulos: e.target.checked})}
                  className="w-4 h-4 accent-[#FC352E] bg-black border-white/20"
                />
                <span className="text-white/70 text-xs font-bold uppercase tracking-widest group-hover:text-white transition-colors">
                  Nuevos Artículos
                </span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer group">
                <input 
                  type="checkbox" 
                  checked={preferences.vuelos}
                  onChange={(e) => setPreferences({...preferences, vuelos: e.target.checked})}
                  className="w-4 h-4 accent-[#FC352E] bg-black border-white/20"
                />
                <span className="text-white/70 text-xs font-bold uppercase tracking-widest group-hover:text-white transition-colors">
                  Nuevos Vuelos
                </span>
              </label>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-grow">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="TU-CORREO@DOMINIO.COM"
                  required
                  disabled={status === 'loading'}
                  className="w-full bg-[#111111] text-white placeholder-white/20 font-bold border-2 border-white/10 px-5 py-3.5 outline-none text-xs uppercase tracking-widest focus:border-[#FC352E] disabled:opacity-50 transition-colors"
                  style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
                />
              </div>
              <button
                type="submit"
                disabled={status === 'loading' || !email || (!preferences.articulos && !preferences.vuelos)}
                className="inline-flex items-center justify-center bg-[#FC352E] hover:bg-white text-white hover:text-[#FC352E] font-bold text-xs uppercase tracking-[0.2em] py-3.5 px-8 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
                style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
              >
                <Send size={13} className="mr-2" />
                <span>{status === 'loading' ? 'ENVIANDO...' : 'SUSCRIBIRSE'}</span>
              </button>
            </div>
            
            {(!preferences.articulos && !preferences.vuelos) && (
              <p className="text-[#FC352E]/80 text-xs font-bold uppercase tracking-widest mt-2">
                Selecciona al menos una preferencia.
              </p>
            )}
          </form>
        )}

        {status === 'error' && (
          <div className="border border-[#FC352E]/40 p-4 mt-6 flex items-center justify-center gap-2 text-[#FC352E] text-xs font-bold uppercase tracking-widest max-w-xl mx-auto">
            <AlertOctagon size={14} />
            <span>{message}</span>
          </div>
        )}
      </div>
    </section>
  )
}
