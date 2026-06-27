import Link from 'next/link'
import { client, urlFor } from '@/sanity/client'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import BrutalistSubscribe from '@/components/BrutalistSubscribe'

export const revalidate = 60

interface EditionPageProps {
  params: { edition: string }
}

interface Article {
  _id: string
  title: string
  slug: { current: string }
  publishedAt: string
  excerpt?: string
  featuredImage?: Record<string, unknown>
  author?: string
}

interface EditionData {
  _id: string
  title: string
  description?: string
  coverImage?: Record<string, unknown>
  articles: Article[]
}

export async function generateMetadata({ params }: EditionPageProps): Promise<Metadata> {
  const edition = await client.fetch(`*[_type == "edition" && slug.current == $slug][0]{ title, description }`, { slug: params.edition })
  if (!edition) return { title: 'Edición no encontrada' }
  return {
    title: `${edition.title} | RAK$ CLUB`,
    description: edition.description || `Artículos de la edición ${edition.title}`,
  }
}

async function getEditionData(slug: string): Promise<EditionData | null> {
  if ((client.config().projectId ?? 'your-project-id') === 'your-project-id') return null

  // Fetch the edition and its related articles (articles that reference this edition)
  const data = await client.fetch(`
    *[_type == "edition" && slug.current == $slug][0] {
      _id, title, description, coverImage,
      "articles": *[_type == "article" && references(^._id) && status == "published"] | order(publishedAt desc) {
        _id, title, slug, publishedAt, excerpt, featuredImage, author
      }
    }
  `, { slug }).catch(() => null)
  
  return data
}

export default async function EditionPage({ params }: EditionPageProps) {
  const data = await getEditionData(params.edition)
  
  if (!data) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-black pt-24 relative z-20 text-white">
      
      {/* ── EDITION HEADER ── */}
      <section className="px-6 md:px-12 py-12 max-w-6xl mx-auto flex flex-col md:flex-row gap-12 items-end">
        {data.coverImage && (
          <div className="w-full md:w-1/3 aspect-[3/4] bg-[#111] brutal-shadow border-4 border-[#FC352E]">
            <img src={urlFor(data.coverImage).width(600).url()} alt={data.title} className="w-full h-full object-cover grayscale" />
          </div>
        )}
        <div className="w-full md:w-2/3">
          <Link href="/revista" className="text-white/40 font-poppins font-bold text-xs tracking-widest uppercase hover:text-[#FC352E] transition-colors mb-4 inline-block">
            ← VOLVER A LA REVISTA
          </Link>
          <h1 className="text-[#FC352E] font-anton text-5xl md:text-8xl uppercase tracking-tighter leading-none mb-6">
            {data.title}
          </h1>
          {data.description && (
            <p className="text-white/70 font-poppins text-lg leading-relaxed max-w-2xl">
              {data.description}
            </p>
          )}
        </div>
      </section>

      {/* ── ARTICLES IN THIS EDITION ── */}
      <section className="px-6 md:px-12 py-16 bg-[#0a0a0a] border-t-2 border-white/10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-white font-anton text-3xl mb-12">ARTÍCULOS EN ESTE NÚMERO</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {data.articles && data.articles.length > 0 ? (
              data.articles.map((article, i) => (
                <Link key={article._id} href={`/post/${article.slug.current}`} className={`group flex flex-col bg-black border border-white/10 hover:border-[#FC352E] transition-colors ${i === 0 ? 'md:col-span-2 md:flex-row' : ''}`}>
                  {article.featuredImage && (
                    <div className={`overflow-hidden bg-[#111] ${i === 0 ? 'md:w-1/2 h-64 md:h-full' : 'h-48'}`}>
                      <img src={urlFor(article.featuredImage).width(800).url()} alt={article.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105" />
                    </div>
                  )}
                  <div className={`p-6 flex flex-col justify-center ${i === 0 && article.featuredImage ? 'md:w-1/2' : 'w-full'}`}>
                    <h3 className={`font-anton uppercase group-hover:text-[#FC352E] transition-colors mb-4 ${i === 0 ? 'text-4xl' : 'text-2xl'}`}>
                      {article.title}
                    </h3>
                    {article.excerpt && <p className="font-poppins text-sm text-white/50 mb-6">{article.excerpt}</p>}
                    <div className="flex justify-between items-center text-xs font-poppins font-bold uppercase tracking-widest text-white/30 mt-auto">
                      <span>{article.author ? `Por ${article.author}` : new Date(article.publishedAt).toLocaleDateString()}</span>
                      <span className="text-[#FC352E] opacity-0 group-hover:opacity-100 transition-opacity">LEER →</span>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <p className="text-white/30 font-poppins col-span-full py-12 text-center border border-dashed border-white/10">Esta edición aún no tiene artículos publicados.</p>
            )}
          </div>
        </div>
      </section>

      {/* ── SUSCRIPCIÓN ── */}
      <BrutalistSubscribe />

    </main>
  )
}
