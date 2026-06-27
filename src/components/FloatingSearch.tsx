'use client'

import { useEffect, useState, useRef } from 'react'
import { Search } from 'lucide-react'

export default function FloatingSearch() {
  const [coords, setCoords] = useState({ x: -200, y: -200 })
  const [isVisible, setIsVisible] = useState(false)
  const currentCoords = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      currentCoords.current = { x: e.clientX, y: e.clientY }
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.closest('[data-hover-tooltip]')) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('mouseover', handleMouseOver, { passive: true })

    // Animation loop for spring lag effect (smoother follow than pure CSS)
    let animId: number
    const tick = () => {
      setCoords((prev) => {
        const dx = currentCoords.current.x - prev.x
        const dy = currentCoords.current.y - prev.y
        // Lerp value 0.15 for smooth lag
        return {
          x: prev.x + dx * 0.15,
          y: prev.y + dy * 0.15,
        }
      })
      animId = requestAnimationFrame(tick)
    }
    animId = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseover', handleMouseOver)
      cancelAnimationFrame(animId)
    }
  }, [])

  if (!isVisible) return null

  return (
    <div
      className="fixed z-50 pointer-events-none"
      style={{
        left: `${coords.x + 20}px`,
        top: `${coords.y + 20}px`,
      }}
    >
      <div className="bg-white text-black border-2 border-black brutalist-shadow-solid-sm px-4 py-2 flex items-center gap-2 font-black uppercase text-xs tracking-wider animate-pulse">
        <Search size={14} className="text-accent stroke-[3px]" />
        <span>CONVOCATORIA: CLICK EN ENLACES</span>
      </div>
    </div>
  )
}
