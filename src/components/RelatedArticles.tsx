import Link from 'next/link'
import Image from 'next/image'
import { DEFAULT_ITEMS } from './BrutalistGallery'

export default function RelatedArticles({ currentSlug }: { currentSlug: string }) {
  const related = DEFAULT_ITEMS.filter(item => item.slug !== currentSlug).slice(0, 3)

  if (related.length === 0) return null

  return (
    <section className="mt-20 pt-10 border-t border-[#FC352E]/20">
      <div className="flex items-center gap-4 mb-10">
        <h2
          className="text-white uppercase whitespace-nowrap"
          style={{
            fontFamily: 'var(--font-anton), Impact, sans-serif',
            fontSize: 'clamp(1.8rem, 3vw, 3rem)',
          }}
        >
          SIGUE <span className="text-[#FC352E]">EXPLORANDO</span>
        </h2>
        <div className="flex-1 h-px bg-[#FC352E]/20" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {related.map((post) => (
          <Link
            href={`/post/${post.slug || post._id}`}
            key={post._id}
            className="group cursor-pointer block bg-[#0A0A0A] border border-white/5 hover:border-[#FC352E]/50 transition-all duration-300"
          >
            <div className="relative aspect-[16/10] w-full overflow-hidden">
              {post.featureImage ? (
                <Image
                  src={post.featureImage}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-black to-[#FC352E]/30" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              {/* Red border on hover */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#FC352E]/60 transition-colors" />
            </div>

            <div className="p-4">
              {(post.tags || []).length > 0 && (
                <div className="flex gap-1.5 mb-2">
                  {(post.tags || []).slice(0, 2).map((tag: string) => (
                    <span
                      key={tag}
                      className="text-[9px] font-bold text-[#FC352E] uppercase tracking-[0.2em] border border-[#FC352E]/30 px-2 py-0.5"
                      style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              <h3
                className="text-white/80 group-hover:text-white transition-colors leading-tight line-clamp-2 uppercase"
                style={{
                  fontFamily: 'var(--font-archivo), Arial Black, sans-serif',
                  fontSize: '1rem',
                }}
              >
                {post.title}
              </h3>
              <p className="text-[#FC352E] text-xs font-bold tracking-widest uppercase mt-3 group-hover:underline"
                style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                LEER →
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
