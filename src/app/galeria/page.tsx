import StrictGallery from '@/components/StrictGallery'
import { client } from '@/sanity/client'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Galería | RAK$ CLUB',
  description: 'Galería de fotografías de la escena underground. Eventos, artistas y cultura urbana del norte.',
}

export const revalidate = 60

async function getGalleryData() {
  if ((client.config().projectId ?? 'your-project-id') === 'your-project-id') return []
  return client.fetch(`
    *[_type == "galleryAlbum"] | order(date desc) {
      _id,
      title,
      description,
      date,
      "flightName": flight->title,
      "images": images[] { asset->{_id, url}, hotspot, crop }
    }
  `).catch(() => [])
}

export default async function GaleriaPage() {
  const albums = await getGalleryData()

  return (
    <main className="min-h-screen bg-black pt-24">
      <div className="px-6 md:px-12 py-12 max-w-6xl mx-auto">
        <h1 className="text-[#FC352E] font-anton text-[clamp(4rem,10vw,10rem)] leading-[0.8] tracking-tighter uppercase mb-4">
          GALERÍA
        </h1>
        <p className="text-white/40 font-poppins font-bold text-xs tracking-[0.2em] uppercase mb-16">
          MOMENTOS CRUDOS DE LA ESCENA
        </p>
      </div>
      <StrictGallery albums={albums} />
    </main>
  )
}
