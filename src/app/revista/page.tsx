import Link from 'next/link'
import { client, urlFor } from '@/sanity/client'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'La Revista | RAK$ CLUB',
  description: 'Repositorio oficial de todas las ediciones y artículos de RAK$ CLUB.',
}

export const revalidate = 60

interface Edition {
  _id: string
  title: string
  slug: { current: string }
  releaseDate: string
  coverImage?: Record<string, unknown>
  description?: string
}

interface Article {
  _id: string
  title: string
  slug: { current: string }
  publishedAt: string
  excerpt?: string
  featuredImage?: Record<string, unknown>
  tags?: string[]
  author?: string
}

async function getData() {
  if ((client.config().projectId ?? 'your-project-id') === 'your-project-id') return { editions: [], articles: [] }

  const editions = await client.fetch<Edition[]>(
    `*[_type == "edition"] | order(releaseDate desc) {
      _id, title, slug, releaseDate, coverImage, description
    }`
  ).catch(() => [])

  const articles = await client.fetch<Article[]>(
    `*[_type == "article" && status == "published"] | order(publishedAt desc) {
      _id, title, slug, publishedAt, excerpt, featuredImage, tags, author
    }`
  ).catch(() => [])

  return { editions, articles }
}

export default async function RevistaPage() {
  const { editions, articles } = await getData()

  return (
    <main className="min-h-screen bg-black pt-24 relative z-20 text-white">
      
      {/* ── HEADER ── */}
      <section className="px-6 md:px-12 py-12 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-4">
          <h1 className="text-[#FC352E] font-anton text-[clamp(4rem,10vw,10rem)] leading-[0.8] tracking-tighter uppercase">
            LA REVISTA
          </h1>
          <Link
            href="/unete"
            className="bg-[#FC352E] text-white px-8 py-4 font-poppins font-bold text-sm tracking-[0.2em] uppercase hover:bg-white hover:text-black transition-colors brutal-shadow mb-2 whitespace-nowrap text-center"
          >
            SUSCRÍBETE →
          </Link>
        </div>
        <p className="text-white/40 font-poppins font-bold text-xs tracking-[0.2em] uppercase mb-16 border-t border-white/10 pt-4">
          ARCHIVO COMPLETO DE CULTURA URBANA
        </p>
      </section>

      {/* ── EDICIONES (MINI-REVISTAS) ── */}
      {editions.length > 0 && (
        <section className="px-6 md:px-12 pb-16">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-white font-anton text-4xl mb-8 border-b-2 border-white/10 pb-4">EDICIONES</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {editions.map(ed => (
                <Link key={ed._id} href={`/revista/${ed.slug.current}`} className="group block">
                  <div className="bg-[#111] aspect-[3/4] relative overflow-hidden brutal-shadow border-2 border-white/5 group-hover:border-[#FC352E] transition-colors">
                    {ed.coverImage ? (
                      <img src={urlFor(ed.coverImage).width(600).url()} alt={ed.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-white/10 font-anton text-6xl rotate-[-45deg]">RAK$</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent flex flex-col justify-end p-6">
                      <h3 className="text-white font-anton text-2xl uppercase group-hover:text-[#FC352E] transition-colors">{ed.title}</h3>
                      {ed.releaseDate && (
                         <p className="text-white/50 font-poppins text-xs font-bold tracking-widest uppercase mt-2">
                          {new Date(ed.releaseDate).toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })}
                        </p>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── TODOS LOS ARTÍCULOS ── */}
      <section className="px-6 md:px-12 py-16 bg-[#0a0a0a] border-t-4 border-[#FC352E]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-[#FC352E] font-anton text-4xl mb-8">ARCHIVO GENERAL</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map(article => (
              <Link key={article._id} href={`/post/${article.slug.current}`} className="group block bg-black border border-white/5 hover:border-[#FC352E] p-6 transition-colors">
                <h3 className="font-anton text-xl uppercase mb-3 group-hover:text-[#FC352E] transition-colors">{article.title}</h3>
                {article.excerpt && <p className="font-poppins text-xs text-white/50 line-clamp-3 mb-4">{article.excerpt}</p>}
                <div className="flex justify-between items-center text-xs font-poppins font-bold uppercase tracking-widest text-white/30">
                  <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
                  <span className="text-[#FC352E] opacity-0 group-hover:opacity-100 transition-opacity">LEER →</span>
                </div>
              </Link>
            ))}
            {articles.length === 0 && (
              <p className="text-white/30 font-poppins text-sm col-span-full">Aún no hay artículos publicados.</p>
            )}
          </div>
        </div>
      </section>

    </main>
  )
}
