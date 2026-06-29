'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

export default function BrutalistNav() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  if (pathname?.startsWith('/studio')) {
    return null
  }

  const links = [
    { name: 'INICIO', path: '/' },
    { name: 'LA REVISTA', path: '/revista' },
    { name: 'GALERÍA', path: '/galeria' },
    { name: 'VUELOS', path: '/vuelos' },
    { name: 'COMUNIDAD', path: '/comunidad' },
    { name: 'QUIÉNES SOMOS', path: '/quienes-somos' },
  ]

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 bg-black/95 backdrop-blur-md border-b border-white/10 px-4 py-4 md:px-6 lg:px-8 lg:py-5 xl:px-12">
        <div className="w-full flex justify-between items-center gap-5 pointer-events-auto">
          <Link
            href="/"
            className="text-white hover:text-[#FC352E] transition-colors leading-[0.88] flex shrink-0 flex-col"
            style={{ fontFamily: 'var(--font-anton), Impact, sans-serif' }}
          >
            <span className="text-2xl md:text-[1.7rem] lg:text-3xl xl:text-4xl uppercase">RAK$ CLUB</span>
            <span className="text-[0.62rem] md:text-xs lg:text-sm text-[#FC352E] uppercase tracking-[0.24em] lg:tracking-widest">MAGAZINE</span>
          </Link>

          <div className="hidden lg:flex min-w-0 items-center justify-end gap-4 xl:gap-8">
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.path}
                className={`text-[0.68rem] xl:text-sm font-bold tracking-[0.12em] xl:tracking-[0.2em] uppercase transition-colors whitespace-nowrap ${
                  pathname === link.path ? 'text-[#FC352E]' : 'text-white hover:text-[#FC352E]'
                }`}
                style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
              >
                {link.name}
              </Link>
            ))}

            <Link
              href="/unete"
              className="bg-[#FC352E] text-white px-4 py-2 text-[0.68rem] xl:px-5 xl:py-2.5 xl:text-xs font-bold tracking-[0.16em] xl:tracking-[0.2em] uppercase hover:bg-white hover:text-black transition-colors"
              style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
            >
              ÚNETE
            </Link>
          </div>

          <button
            className="lg:hidden text-white font-bold tracking-[0.2em] text-xs uppercase"
            onClick={() => setIsOpen(!isOpen)}
            style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
          >
            {isOpen ? 'CERRAR' : 'MENÚ'}
          </button>
        </div>
      </nav>

      <div
        className={`fixed inset-0 bg-[#FC352E] z-40 overflow-y-auto overscroll-contain px-8 pb-12 pt-[calc(6.5rem+env(safe-area-inset-top))] sm:px-12 sm:pb-16 sm:pt-[calc(7rem+env(safe-area-inset-top))] transition-transform duration-500 ease-[cubic-bezier(0.77,0,0.175,1)] ${
          isOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
        aria-hidden={!isOpen}
      >
        <div className="flex min-h-full flex-col justify-center gap-5 py-4 sm:gap-6">
          {links.map((link, i) => (
            <Link
              key={link.name}
              href={link.path}
              onClick={() => setIsOpen(false)}
              className="text-black uppercase leading-[0.9] hover:text-white transition-colors"
              style={{
                fontFamily: 'var(--font-anton), Impact, sans-serif',
                fontSize: 'clamp(2.7rem, 12vw, 5.8rem)',
                transform: isOpen ? 'translateY(0)' : 'translateY(40px)',
                opacity: isOpen ? 1 : 0,
                transition: `transform 0.5s ease ${i * 0.1 + 0.3}s, opacity 0.5s ease ${i * 0.1 + 0.3}s, color 0.2s ease`
              }}
            >
              {link.name}
            </Link>
          ))}

          <Link
            href="/unete"
            onClick={() => setIsOpen(false)}
            className="text-white uppercase leading-[0.9] mt-8"
            style={{
              fontFamily: 'var(--font-anton), Impact, sans-serif',
              fontSize: 'clamp(2.7rem, 12vw, 5.8rem)',
              transform: isOpen ? 'translateY(0)' : 'translateY(40px)',
              opacity: isOpen ? 1 : 0,
              transition: `transform 0.5s ease ${(links.length) * 0.1 + 0.3}s, opacity 0.5s ease ${(links.length) * 0.1 + 0.3}s, color 0.2s ease`
            }}
          >
            ÚNETE
          </Link>
        </div>
      </div>
    </>
  )
}
