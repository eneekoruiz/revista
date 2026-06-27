import AirplaneExperience from '@/components/AirplaneExperience'
import BrutalistCanvas from '@/components/BrutalistCanvas'
import Link from 'next/link'
import { client, urlFor } from '@/sanity/client'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'RAK$ CLUB | Revista de Cultura Urbana',
  description: 'La revista digital de cultura urbana, trap, hip hop y escena underground del norte de España.',
}

export const revalidate = 60

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

async function getArticles(): Promise<Article[]> {
  if ((client.config().projectId ?? 'your-project-id') === 'your-project-id') return []
  return client
    .fetch(
      `*[_type == "article" && status == "published" && isPinned == true] | order(publishedAt desc) {
        _id, title, slug, publishedAt, excerpt, featuredImage, tags, author
      }`
    )
    .catch(() => [])
}

async function getSiteConfig() {
  if ((client.config().projectId ?? 'your-project-id') === 'your-project-id') return null
  return client
    .fetch(`*[_type == "siteConfig"][0]`)
    .catch(() => null)
}

// ─── Article Card ─────────────────────────────────────────────────────────────
function ArticleCard({ article, featured = false }: { article: Article; featured?: boolean }) {
  const imageUrl = article.featuredImage
    ? urlFor(article.featuredImage).width(featured ? 1200 : 600).quality(90).url()
    : null

  const date = article.publishedAt
    ? new Date(article.publishedAt).toLocaleDateString('es-ES', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      })
    : null

  return (
    <Link
      href={`/post/${article.slug?.current ?? article._id}`}
      className={`group block bg-black border-2 border-white/10 hover:border-[#FC352E] transition-all duration-300 brutal-shadow ${featured ? 'col-span-full md:col-span-2' : ''}`}
    >
      {imageUrl && (
        <div className={`overflow-hidden ${featured ? 'h-[50vh]' : 'h-48 md:h-64'}`}>
          <img
            src={imageUrl}
            alt={article.title}
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
          />
        </div>
      )}
      {!imageUrl && (
        <div className={`bg-[#0a0a0a] flex items-center justify-center ${featured ? 'h-[20vh]' : 'h-24'}`}>
          <span className="text-white/10 font-anton text-6xl">RAK$</span>
        </div>
      )}
      <div className="p-6 md:p-8">
        {article.tags && article.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {article.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="text-[#FC352E] font-poppins font-bold text-[0.6rem] tracking-[0.2em] uppercase">
                #{tag}
              </span>
            ))}
          </div>
        )}
        <h2
          className={`text-white font-anton uppercase leading-[0.9] tracking-tight mb-4 group-hover:text-[#FC352E] transition-colors ${featured ? 'text-4xl md:text-6xl' : 'text-2xl md:text-3xl'}`}
        >
          {article.title}
        </h2>
        {article.excerpt && (
          <p className="text-white/60 font-poppins text-sm leading-relaxed mb-4 line-clamp-3">
            {article.excerpt}
          </p>
        )}
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/10">
          {date && <span className="text-white/40 font-poppins text-xs tracking-widest uppercase">{date}</span>}
          {article.author && <span className="text-white/40 font-poppins text-xs tracking-widest uppercase">Por {article.author}</span>}
          <span className="text-[#FC352E] font-poppins font-bold text-xs tracking-[0.2em] uppercase group-hover:translate-x-1 transition-transform inline-block">
            LEER →
          </span>
        </div>
      </div>
    </Link>
  )
}

// ─── Empty State ─────────────────────────────────────────────────────────────
function EmptyState() {
  return (
    <div className="col-span-full text-center py-32 border-2 border-dashed border-white/10">
      <p className="text-white/20 font-anton text-4xl uppercase mb-4">Sin artículos aún</p>
      <p className="text-white/30 font-poppins text-sm">
        Los artículos publicados en Sanity Studio aparecerán aquí automáticamente.
      </p>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default async function Home() {
  const articles = await getArticles()
  const siteConfig = await getSiteConfig()
  const [featured, ...rest] = articles

  return (
    <>
      <BrutalistCanvas />

      <main className="text-white relative z-20">

        {/* ── HERO: 3D Airplane + giant title ── */}
        <AirplaneExperience globalSettings={siteConfig} />

        {/* ── FEED HEADER ── */}
        <section className="bg-black py-12 px-6 md:px-12 border-t-4 border-[#FC352E]">
          <div className="max-w-6xl mx-auto flex items-center justify-between gap-6">
            <h2 className="text-[#FC352E] uppercase font-anton text-4xl md:text-6xl whitespace-nowrap">
              LA REVISTA
            </h2>
            <div className="hidden md:block h-[3px] flex-1 bg-[#FC352E]/20" />
            <p className="text-white/40 font-poppins text-xs font-bold tracking-[0.2em] uppercase whitespace-nowrap">
              ACTUALIZADO 24H
            </p>
          </div>
        </section>

        {/* ── ARTICLE GRID ── */}
        <section className="bg-black py-16 px-6 md:px-12">
          <div className="max-w-6xl mx-auto">
            {articles.length === 0 ? (
              <div className="grid grid-cols-1">
                <EmptyState />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Featured article: full-width */}
                {featured && <ArticleCard article={featured} featured />}
                {/* Rest */}
                {rest.map((article) => (
                  <ArticleCard key={article._id} article={article} />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer className="w-full bg-black py-20 px-8 border-t-8 border-[#FC352E] text-center">
          <h2 className="text-white uppercase leading-[0.8] tracking-tighter opacity-10 mb-8 font-anton"
            style={{ fontSize: 'clamp(5rem, 20vw, 15rem)' }}>
            RAK$ CLUB
          </h2>
          <div className="flex justify-center gap-8 mb-12">
            <a href="https://instagram.com/raksclub" target="_blank" rel="noopener noreferrer"
              className="text-white font-poppins font-bold tracking-[0.2em] uppercase text-sm hover:text-[#FC352E] transition-colors">
              INSTAGRAM
            </a>
            <a href="https://t.me/raksclub" target="_blank" rel="noopener noreferrer"
              className="text-white font-poppins font-bold tracking-[0.2em] uppercase text-sm hover:text-[#FC352E] transition-colors">
              TELEGRAM
            </a>
          </div>
          <p className="text-white/30 font-poppins text-xs tracking-[0.2em] uppercase">
            © {new Date().getFullYear()} RAK$ CLUB. ALL RIGHTS RESERVED.<br />
            DISEÑADO PARA LA CULTURA URBANA DEL NORTE.
          </p>
        </footer>

      </main>
    </>
  )
}
