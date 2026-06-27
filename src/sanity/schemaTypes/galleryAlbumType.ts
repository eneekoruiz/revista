import { defineField, defineType } from 'sanity'

export const galleryAlbumType = defineType({
  name: 'galleryAlbum',
  title: 'Galería (Álbumes / Fotos)',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título del Paquete / Foto',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'flight',
      title: 'Vuelo (Opcional)',
      type: 'reference',
      to: [{ type: 'flight' }],
      description: 'Si este paquete de fotos pertenece a un Vuelo concreto.',
    }),
    defineField({
      name: 'edition',
      title: 'Sección / Edición (Opcional)',
      type: 'reference',
      to: [{ type: 'edition' }],
      description: 'Si este paquete de fotos pertenece a una sección o edición específica (para agrupar artículos y fotos juntos).',
    }),
    defineField({
      name: 'images',
      title: 'Imágenes',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
      validation: (Rule) => Rule.required().min(1),
      description: 'Si subes 1 foto, se mostrará suelta. Si subes varias, será un paquete/carrusel.',
    }),
    defineField({
      name: 'description',
      title: 'Descripción (Opcional)',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'date',
      title: 'Fecha',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'date',
      images: 'images',
    },
    prepare(selection) {
      const { title, subtitle, images } = selection
      const imageCount = images && images.length ? images.length : 0
      return {
        title: title,
        subtitle: `${imageCount} foto(s) | ${subtitle ? new Date(subtitle).toLocaleDateString() : ''}`,
        media: images && images.length > 0 ? images[0] : null,
      }
    }
  }
})
