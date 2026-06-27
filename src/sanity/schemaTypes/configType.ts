import { defineField, defineType } from 'sanity'

export const configType = defineType({
  name: 'siteConfig',
  title: 'Configuración General',
  type: 'document',
  fields: [
    defineField({
      name: 'siteName',
      title: 'Nombre del Sitio',
      type: 'string',
      initialValue: 'Revista Brutalista',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'siteDescription',
      title: 'Descripción del Sitio',
      type: 'text',
      description: 'Meta descripción para SEO y subtítulo global.',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroTitleLine1',
      title: 'Hero Title (Línea 1)',
      type: 'string',
      description: 'Ej: RAK$ CLUB',
      initialValue: 'RAK$ CLUB',
    }),
    defineField({
      name: 'heroTitleLine2',
      title: 'Hero Title (Línea 2)',
      type: 'string',
      description: 'Ej: MAGAZINE',
      initialValue: 'MAGAZINE',
    }),
    defineField({
      name: 'heroTagline',
      title: 'Hero Tagline',
      type: 'string',
      description: 'Ej: Cultura Urbana · Norte de España',
      initialValue: 'Cultura Urbana · Norte de España',
    }),
    defineField({
      name: 'participantsHeading',
      title: 'Encabezado de Participantes',
      type: 'string',
      initialValue: 'PARTICIPANTES',
    }),
    defineField({
      name: 'galleryHeading',
      title: 'Encabezado de Galería',
      type: 'string',
      initialValue: 'GALERÍA',
    }),
    defineField({
      name: 'logo',
      title: 'Logo del Sitio',
      type: 'image',
      description: 'Logo oficial de la revista (preferiblemente SVG o PNG transparente).',
    }),
    defineField({
      name: 'accentColor',
      title: 'Color de Acento Brutalista (Hex)',
      type: 'string',
      initialValue: '#FF0055',
      description: 'Color primordial para botones, enlaces y luces del canvas (ej: #FF0055, #00FFCC).',
      validation: (Rule) => Rule.regex(/^#[0-9A-Fa-f]{6}$/, 'hex').error('Debe ser un código de color hexadecimal válido (ej: #FF0055).')
    }),
    defineField({
      name: 'bannerTickerText',
      title: 'Texto de la Marquesina (Ticker)',
      type: 'string',
      description: 'Texto animado que corre por la pantalla al estilo marquesina brutalista.',
      initialValue: '★ NUEVA CONVOCATORIA ABIERTA PARA MODELADO 3D ★ SUBE TU APORTE YA ★',
    }),
    defineField({
      name: 'footerText',
      title: 'Texto del Pie de Página',
      type: 'text',
      rows: 2,
      initialValue: '© 2026 Revista Brutalista. Desarrollado con Next.js + Sanity + Three.js en Vercel.',
    }),
    defineField({
      name: 'socialLinks',
      title: 'Enlaces de Redes Sociales',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'socialLink',
          title: 'Enlace Social',
          fields: [
            {
              name: 'platform',
              title: 'Plataforma',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'url',
              title: 'URL',
              type: 'url',
              validation: (Rule) => Rule.required(),
            }
          ]
        }
      ]
    })
  ],
  preview: {
    prepare() {
      return {
        title: 'Ajustes Globales del Sitio',
        subtitle: 'Gestionar logos, colores y SEO global.',
      }
    }
  }
})
