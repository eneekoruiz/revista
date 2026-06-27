import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'RAK$ CLUB - Revista de Cultura Urbana',
    short_name: 'RAK$ CLUB',
    description: 'Cultura cruda, música urbana, trap, drill y estilo underground en el País Vasco.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0A0A0A',
    theme_color: '#FC352E',
    orientation: 'portrait',
    categories: ['music', 'entertainment', 'lifestyle'],
    lang: 'es',
    icons: [
      {
        src: '/favicon.ico',
        sizes: '48x48',
        type: 'image/x-icon',
      },
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
    ],
    screenshots: [
      {
        src: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&q=80&w=1200',
        sizes: '1200x630',
        type: 'image/jpeg',
      },
    ],
  }
}
