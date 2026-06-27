import { client, urlFor } from '@/sanity/client'
import { PortableText } from '@portabletext/react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { DEFAULT_ITEMS } from '@/components/BrutalistGallery'
import type { Metadata } from 'next'
import ReadingProgress from '@/components/ReadingProgress'
import SponsorBanner from '@/components/SponsorBanner'
import RelatedArticles from '@/components/RelatedArticles'

export const revalidate = 60

// ── Next.js 15+: params is now a Promise ──
type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const query = `*[_type in ["article", "contribution"] && slug.current == $slug][0]`
  const post = await client.fetch(query, { slug }).catch(() => null)

  if (!post) {
    const fallbackItem = DEFAULT_ITEMS.find((item) => item.slug === slug || item._id === slug)
    if (fallbackItem) {
      return {
        title: fallbackItem.title,
        description: fallbackItem.excerpt,
        openGraph: {
          title: fallbackItem.title,
          description: fallbackItem.excerpt,
          images: [fallbackItem.featureImage || ''],
        },
      }
    }
    return { title: 'Post no encontrado' }
  }

  const imageUrl = post.featuredImage ? urlFor(post.featuredImage).width(1200).url() : ''

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: imageUrl ? [imageUrl] : [],
    },
  }
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params
  const query = `*[_type in ["article", "contribution"] && slug.current == $slug][0]`
  let post = await client.fetch(query, { slug }).catch(() => null)

  if (!post) {
    const fallbackItem = DEFAULT_ITEMS.find((item) => item.slug === slug || item._id === slug)
    if (!fallbackItem) notFound()

    post = {
      title: fallbackItem!.title,
      publishedAt: fallbackItem!.publishedAt,
      contributorName: fallbackItem!.contributorName,
      featureImageFallback: fallbackItem!.featureImage,
      tags: fallbackItem!.tags,
      readingTime: fallbackItem!.readingTime,
      excerpt: fallbackItem!.excerpt,
      content: [
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              marks: [],
              text: fallbackItem!.excerpt + ' (Artículo de demostración. Edítalo en Sanity).',
            },
          ],
        },
      ],
    }
  }

  const hasContent = post.content && post.content.length > 0
  const heroImage = post.featuredImage
    ? urlFor(post.featuredImage).width(1400).url()
    : post.featureImageFallback

  return (
    <div className="min-h-screen bg-black text-white selection:bg-[#FC352E] selection:text-white">
      <ReadingProgress />

      {/* ── STICKY HEADER ── */}
      <header className="w-full border-b border-[#FC352E]/20 py-4 px-6 flex items-center justify-between sticky top-0 bg-black/95 backdrop-blur-md z-50">
        <Link
          href="/#articulos"
          className="text-white/60 hover:text-[#FC352E] transition-colors text-xs font-bold tracking-[0.2em] uppercase"
          style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
        >
          ← REVISTA
        </Link>
        <span
          className="text-white"
          style={{ fontFamily: 'var(--font-anton), Impact, sans-serif', fontSize: '1.2rem', letterSpacing: '0.08em' }}
        >
          RAK$ CLUB
        </span>
        <span
          className="text-white/30 text-xs font-bold tracking-[0.2em] uppercase hidden md:block"
          style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
        >
          {post.type === 'contribution' ? 'APORTE' : 'ARTÍCULO'}
        </span>
      </header>

      {/* ── HERO IMAGE ── */}
      {heroImage ? (
        <div className="w-full aspect-[21/9] relative overflow-hidden">
          <Image src={heroImage} alt={post.title || 'Imagen'} fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/10" />
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-14 max-w-5xl">
            {(post.tags || []).length > 0 && (
              <div className="flex gap-2 mb-4">
                {(post.tags as string[]).slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="bg-[#FC352E] text-white text-xs font-bold px-3 py-1 tracking-[0.2em] uppercase"
                    style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
            <h1
              className="text-white uppercase leading-[0.88] mb-4"
              style={{ fontFamily: 'var(--font-anton), Impact, sans-serif', fontSize: 'clamp(2.5rem,6vw,6rem)' }}
            >
              {post.title}
            </h1>
            <div
              className="flex flex-wrap items-center gap-4 text-white/40 text-xs font-bold tracking-[0.15em] uppercase"
              style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
            >
              {post.publishedAt && (
                <time>
                  {new Date(post.publishedAt as string).toLocaleDateString('es-ES', {
                    day: '2-digit', month: 'long', year: 'numeric',
                  })}
                </time>
              )}
              {post.readingTime && <span>· {post.readingTime as number} MIN</span>}
              {post.contributorName && (
                <span className="text-[#FC352E]">· {post.contributorName as string}</span>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full bg-[#080808] border-b border-[#FC352E]/20 px-8 md:px-14 py-20">
          {(post.tags || []).length > 0 && (
            <div className="flex gap-2 mb-6">
              {(post.tags as string[]).slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="bg-[#FC352E] text-white text-xs font-bold px-3 py-1 tracking-[0.2em] uppercase"
                  style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          <h1
            className="text-white uppercase leading-[0.88] mb-6"
            style={{ fontFamily: 'var(--font-anton), Impact, sans-serif', fontSize: 'clamp(2.5rem,6vw,6rem)' }}
          >
            {post.title}
          </h1>
          <div
            className="flex flex-wrap items-center gap-4 text-white/40 text-xs font-bold tracking-[0.15em] uppercase"
            style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
          >
            {post.publishedAt && (
              <time>
                {new Date(post.publishedAt as string).toLocaleDateString('es-ES', {
                  day: '2-digit', month: 'long', year: 'numeric',
                })}
              </time>
            )}
            {post.readingTime && <span>· {post.readingTime as number} MIN</span>}
            {post.contributorName && (
              <span className="text-[#FC352E]">· {post.contributorName as string}</span>
            )}
          </div>
        </div>
      )}

      {/* ── ARTICLE BODY ── */}
      <main className="max-w-3xl mx-auto px-6 pt-14 pb-24">
        {post.excerpt && (
          <p
            className="text-white/70 text-xl md:text-2xl leading-relaxed mb-12 border-l-4 border-[#FC352E] pl-6"
            style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
          >
            {post.excerpt as string}
          </p>
        )}

        <article
          className="prose prose-invert prose-lg max-w-none leading-relaxed prose-headings:uppercase prose-headings:tracking-tight prose-a:text-[#FC352E] hover:prose-a:text-white prose-strong:text-white prose-blockquote:border-l-[#FC352E] prose-blockquote:text-white/50 mb-16"
          style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
        >
          {hasContent ? (
            <PortableText value={post.content} />
          ) : (
            <div className="p-10 bg-[#0A0A0A] border border-[#FC352E]/20 text-center">
              <p className="text-[#FC352E] text-xs font-bold tracking-[0.3em] uppercase mb-3">
                PRÓXIMAMENTE
              </p>
              <p className="text-white/40 text-sm">
                El contenido completo se está editando en Sanity. Vuelve pronto.
              </p>
            </div>
          )}
        </article>

        {(post.tags || []).length > 0 && (
          <div className="flex flex-wrap gap-2 mb-12 pt-8 border-t border-white/5">
            {(post.tags as string[]).map((tag) => (
              <span
                key={tag}
                className="border border-[#FC352E]/30 text-[#FC352E] text-xs font-bold px-3 py-1.5 tracking-[0.15em] uppercase"
                style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <SponsorBanner />
        <RelatedArticles currentSlug={slug} />
      </main>
    </div>
  )
}
