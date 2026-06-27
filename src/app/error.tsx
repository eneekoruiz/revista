'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6">
      <div className="relative z-10 max-w-2xl w-full border-2 border-[#FC352E] bg-[#0A0A0A] overflow-hidden">
        {/* Top bar */}
        <div className="bg-[#FC352E] px-6 py-2 flex items-center justify-between">
          <span className="font-mono text-black text-xs tracking-widest uppercase font-bold">
            RAK$ CLUB · SISTEMA
          </span>
          <span className="font-mono text-black text-xs tracking-widest">
            RAK-500-ERROR
          </span>
        </div>

        {/* Content */}
        <div className="p-10 text-center">
          <p className="text-[#FC352E] font-bold text-xs tracking-[0.4em] uppercase mb-4 font-mono">
            [ ERROR DEL SISTEMA ]
          </p>
          <h2
            className="text-white mb-4 uppercase"
            style={{ fontFamily: 'var(--font-anton), Impact, sans-serif', fontSize: 'clamp(3rem,8vw,7rem)', lineHeight: '0.9' }}
          >
            ALGO SALIÓ<br />MUY MAL
          </h2>
          <p className="text-white/40 text-sm mb-10 font-medium">
            Nuestros ingenieros de sonido están arreglando los cables. Vuelve a intentarlo.
          </p>

          <div className="border-t border-dashed border-white/10 my-8" />

          <div className="flex gap-4 justify-center flex-wrap">
            <button
              onClick={() => reset()}
              className="border-2 border-white/30 text-white hover:border-[#FC352E] hover:text-[#FC352E] font-bold text-sm px-8 py-4 transition-colors tracking-[0.15em] uppercase"
              style={{ fontFamily: 'var(--font-archivo), Arial Black, sans-serif' }}
            >
              REINTENTAR
            </button>
            <Link
              href="/"
              className="bg-[#FC352E] text-white hover:bg-white hover:text-[#FC352E] font-bold text-sm px-8 py-4 transition-colors tracking-[0.15em] uppercase"
              style={{ fontFamily: 'var(--font-archivo), Arial Black, sans-serif' }}
            >
              VOLVER AL CLUB
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
