'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface Item {
  _id: string
  slug?: string
  type: 'article' | 'contribution'
  title: string
  excerpt: string
  publishedAt: string
  tags?: string[]
  contributorName?: string
  contributorLink?: string
  featureImage?: string
  readingTime?: number
}

export const DEFAULT_ITEMS: Item[] = [
  {
    _id: 'origen-raks',
    slug: 'el-origen-de-raks-club',
    type: 'article',
    title: 'EL ORIGEN DE RAK$ CLUB: CÓMO TITO Y TELMO CREARON LA NOCHE VASCA',
    excerpt: 'Alejandro (Tito) y Telmo fundaron RAK$ CLUB con una misión clara: traer la mejor música urbana al norte de España. Lo que empezó como una fiesta en Donostia se convirtió en el sello de la escena.',
    publishedAt: new Date().toISOString(),
    tags: ['HISTORIA', 'RAK$ CLUB', 'DONOSTIA'],
    featureImage: 'https://images.unsplash.com/photo-1571266028243-d220c6a0497d?auto=format&fit=crop&q=80&w=1000',
    readingTime: 5,
  },
  {
    _id: 'dabadaba-heart',
    slug: 'dabadaba-corazon-escena-donostia',
    type: 'article',
    title: 'DABADABA: LA SALA QUE SE CONVIRTIÓ EN EL CORAZÓN DE LA ESCENA URBANA DE DONOSTIA',
    excerpt: 'La sala Dabadaba de San Sebastián ha acogido algunos de los mejores "vuelos" de RAK$ CLUB. Un espacio alternativo que de día es lounge y de noche se transforma en el epicentro del trap vasco.',
    publishedAt: new Date(Date.now() - 86400000).toISOString(),
    tags: ['DABADABA', 'DONOSTIA', 'SALA'],
    featureImage: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=1000',
    readingTime: 4,
  },
  {
    _id: 'vuelo-50-bilbao',
    slug: 'vuelo-50-santana27-bilbao',
    type: 'article',
    title: 'VUELO N°50: LA FIESTA QUE ROMPIÓ TODOS LOS RECORDS EN SANTANA 27 BILBAO',
    excerpt: 'El vuelo número 50 de RAK$ CLUB en la sala Santana 27 de Bilbao fue histórico. Sold out en 48 horas, artistas invitados y una noche que nadie olvidará. Crónica completa.',
    publishedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    tags: ['BILBAO', 'VUELOS', 'CRÓNICA'],
    featureImage: 'https://images.unsplash.com/photo-1574169208507-84376144848b?auto=format&fit=crop&q=80&w=1000',
    readingTime: 6,
  },
  {
    _id: 'guia-lista',
    slug: 'como-conseguir-lista-raks-club',
    type: 'contribution',
    title: 'CÓMO CONSEGUIR LISTA EN RAK$ CLUB: GUÍA COMPLETA PARA LA ESCENA',
    excerpt: 'Todo lo que necesitas saber para entrar gratis o con descuento en los próximos vuelos. Desde las listas VIP hasta los canales de Telegram de la comunidad RAK$.',
    publishedAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    contributorName: 'La Comunidad RAK$',
    tags: ['GUÍA', 'LISTA', 'CONSEJOS'],
    featureImage: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&q=80&w=1000',
    readingTime: 3,
  },
  {
    _id: 'artistas-trap-vasco',
    slug: 'trap-vasco-artistas-raks-club',
    type: 'article',
    title: 'TRAP VASCO EN ASCENSO: LOS ARTISTAS QUE SUENAN EN CADA VUELO DE RAK$ CLUB',
    excerpt: 'De Donostia a Irun, pasando por Bilbao. Estos son los nombres del trap, reggaeton y dancehall vasco que RAK$ CLUB ha puesto en el mapa de la música urbana del norte.',
    publishedAt: new Date(Date.now() - 86400000 * 4).toISOString(),
    tags: ['MÚSICA', 'TRAP', 'ARTISTAS'],
    featureImage: 'https://images.unsplash.com/photo-1493676304819-0d7a8d026dcf?auto=format&fit=crop&q=80&w=1000',
    readingTime: 7,
  },
  {
    _id: 'expansion-norte',
    slug: 'expansion-raks-club-norte-espana',
    type: 'article',
    title: 'DESDE IRÚN HASTA EL MUNDO: LA EXPANSIÓN DE RAK$ CLUB POR EL NORTE',
    excerpt: 'Lo que empezó en Donostia ya llega a Irún (Sala CBA), Bilbao (Santana 27) y más ciudades. RAK$ CLUB está redibujando el mapa de la fiesta urbana en el norte de España.',
    publishedAt: new Date(Date.now() - 86400000 * 5).toISOString(),
    tags: ['EXPANSIÓN', 'IRUN', 'BILBAO'],
    featureImage: 'https://images.unsplash.com/photo-1598387993281-cecf8b71a8f8?auto=format&fit=crop&q=80&w=1000',
    readingTime: 4,
  },
]

interface BrutalistGalleryProps {
  initialItems?: Item[]
}

export default function BrutalistGallery({ initialItems }: BrutalistGalleryProps) {
  const items = initialItems && initialItems.length > 0 ? initialItems : DEFAULT_ITEMS
  const [filter, setFilter] = useState<'all' | 'article' | 'contribution'>('all')
  const [search, setSearch] = useState('')

  const filteredItems = items.filter((item) => {
    const matchesFilter = filter === 'all' || item.type === filter
    const matchesSearch =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.excerpt.toLowerCase().includes(search.toLowerCase()) ||
      (item.tags && item.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()))) ||
      (item.contributorName && item.contributorName.toLowerCase().includes(search.toLowerCase()))
    return matchesFilter && matchesSearch
  })

  return (
    <div data-hover-tooltip>
      {/* Category filters & Search input */}
      <div className="max-w-7xl mx-auto px-6 pt-12 pb-6 flex flex-col md:flex-row gap-6 justify-between items-center bg-[#0A0A0A] border-b border-[#FC352E]/20">
        {/* Navigation Categories */}
        <div className="flex flex-wrap gap-3 w-full md:w-auto">
          <button
            onClick={() => setFilter('all')}
            className={`px-5 py-2 text-xs font-black tracking-widest uppercase transition-all duration-200 border-2 ${
              filter === 'all'
                ? 'bg-[#FC352E] text-white border-[#FC352E]'
                : 'bg-transparent text-gray-500 border-gray-800 hover:text-white hover:border-[#FC352E]/50'
            }`}
          >
            TODOS ({items.length})
          </button>
          <button
            onClick={() => setFilter('article')}
            className={`px-5 py-2 text-xs font-black tracking-widest uppercase transition-all duration-200 border-2 ${
              filter === 'article'
                ? 'bg-[#FC352E] text-white border-[#FC352E]'
                : 'bg-transparent text-gray-500 border-gray-800 hover:text-white hover:border-[#FC352E]/50'
            }`}
          >
            ARTÍCULOS
          </button>
          <button
            onClick={() => setFilter('contribution')}
            className={`px-5 py-2 text-xs font-black tracking-widest uppercase transition-all duration-200 border-2 ${
              filter === 'contribution'
                ? 'bg-[#FC352E] text-white border-[#FC352E]'
                : 'bg-transparent text-gray-500 border-gray-800 hover:text-white hover:border-[#FC352E]/50'
            }`}
          >
            APORTES
          </button>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-80 flex items-center">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="BUSCAR EN LA REVISTA..."
            className="w-full bg-[#111111] text-white font-bold border-2 border-gray-800 px-5 py-2.5 outline-none focus:border-[#FC352E] placeholder-gray-600 uppercase text-xs transition-colors"
          />
        </div>
      </div>

      {/* Main Grid */}
      <main className="rp-home-main mt-16">
        {filteredItems.length > 0 ? (
          <div className={`rp-home-feed ${filter === 'all' ? 'rp-home-feed-has-highlight' : ''}`}>
            {filteredItems.map((item, index) => {
              const isHighlight = filter === 'all' && index === 0

              return (
                <article key={item._id} className={`rp-card ${isHighlight ? 'rp-card-highlight' : ''}`}>
                  {/* Card Image Wrapper */}
                  <Link className="rp-card-image-link" href={`/post/${item.slug || item._id}`}>
                    {item.featureImage ? (
                      <div className="rp-card-image relative w-full h-full">
                        <Image
                          src={item.featureImage}
                          alt={item.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          priority={index < 2}
                        />
                      </div>
                    ) : (
                      <div className="rp-card-image-placeholder">
                        <span className="rp-card-placeholder-text">
                          {item.type === 'article' ? 'RAK$' : 'COMM'}
                        </span>
                      </div>
                    )}
                    {/* Red-tint hover overlay */}
                    <div className="rp-card-image-overlay"></div>
                  </Link>

                  {/* Card Content Body */}
                  <div className="rp-card-body">
                    {/* Category Tag */}
                    {item.tags && item.tags.length > 0 && (
                      <div className="mb-2">
                        <span className="rp-card-tag">{item.tags[0]}</span>
                      </div>
                    )}

                    {/* Post Title */}
                    <h2 className="rp-card-title">
                      <Link href={`/post/${item.slug || item._id}`}>{item.title}</Link>
                    </h2>

                    {/* Excerpt */}
                    <p className="rp-card-excerpt">{item.excerpt}</p>

                    {/* Contributor notice */}
                    {item.type === 'contribution' && (
                      <div className="text-[11px] font-black uppercase text-[#FC352E] mb-3 tracking-wider">
                        APORTE POR: {item.contributorName || 'Anónimo'}
                      </div>
                    )}

                    {/* Footer Row */}
                    <div className="rp-card-footer">
                      <time className="rp-card-date">
                        {new Date(item.publishedAt).toLocaleDateString('es-ES', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </time>
                      <span className="rp-card-read-time">
                        {item.readingTime || 5} min
                      </span>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        ) : (
          <div className="w-full text-center border-2 border-[#FC352E]/20 p-16 bg-[#111111]">
            <p className="text-sm font-black tracking-widest uppercase text-gray-500">
              No hay contenidos que coincidan con &ldquo;{search}&rdquo;
            </p>
          </div>
        )}
      </main>
    </div>
  )
}
