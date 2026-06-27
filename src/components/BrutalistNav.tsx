'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

export default function BrutalistNav() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  // Don't render the nav inside the Sanity Studio
  if (pathname?.startsWith('/studio')) {
    return null;
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
      <nav className="fixed top-0 left-0 w-full z-50 bg-black/95 backdrop-blur-md border-b border-white/10 px-6 py-6 md:px-12">
        <div className="w-full flex justify-between items-center pointer-events-auto">
          <Link
            href="/"
            className="text-white hover:text-[#FC352E] transition-colors leading-[0.9] flex flex-col"
            style={{ fontFamily: 'var(--font-anton), Impact, sans-serif' }}
          >
            <span className="text-3xl md:text-4xl uppercase">RAK$ CLUB</span>
            <span className="text-sm md:text-base text-[#FC352E] uppercase tracking-widest">MAGAZINE</span>
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-4 lg:gap-8">
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.path}
                className={`text-xs lg:text-sm font-bold tracking-widest lg:tracking-[0.2em] uppercase transition-colors whitespace-nowrap ${
                  pathname === link.path ? 'text-[#FC352E]' : 'text-white hover:text-[#FC352E]'
                }`}
                style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
              >
                {link.name}
              </Link>
            ))}
            
            {/* ÚNETE BUTTON */}
            <Link
              href="/unete"
              className="bg-[#FC352E] text-white px-5 py-2.5 text-xs font-bold tracking-[0.2em] uppercase hover:bg-white hover:text-black transition-colors"
              style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
            >
              ÚNETE
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-white font-bold tracking-[0.2em] text-xs uppercase"
            onClick={() => setIsOpen(!isOpen)}
            style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
          >
            {isOpen ? 'CERRAR' : 'MENÚ'}
          </button>
        </div>
      </nav>

      {/* Mobile Fullscreen Menu */}
      <div 
        className={`fixed inset-0 bg-[#FC352E] z-40 flex flex-col justify-center px-12 transition-transform duration-500 ease-[cubic-bezier(0.77,0,0.175,1)] ${
          isOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="flex flex-col gap-6">
          {links.map((link, i) => (
            <Link
              key={link.name}
              href={link.path}
              onClick={() => setIsOpen(false)}
              className="text-black uppercase leading-[0.9] hover:text-white transition-colors"
              style={{ 
                fontFamily: 'var(--font-anton), Impact, sans-serif', 
                fontSize: 'clamp(3rem, 15vw, 6rem)',
                transform: isOpen ? 'translateY(0)' : 'translateY(40px)',
                opacity: isOpen ? 1 : 0,
                transition: `transform 0.5s ease ${i * 0.1 + 0.3}s, opacity 0.5s ease ${i * 0.1 + 0.3}s, color 0.2s ease`
              }}
            >
              {link.name}
            </Link>
          ))}
          
          {/* Mobile ÚNETE BUTTON */}
          <Link
            href="/unete"
            onClick={() => setIsOpen(false)}
            className="text-white uppercase leading-[0.9] mt-8"
            style={{ 
              fontFamily: 'var(--font-anton), Impact, sans-serif', 
              fontSize: 'clamp(3rem, 15vw, 6rem)',
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
