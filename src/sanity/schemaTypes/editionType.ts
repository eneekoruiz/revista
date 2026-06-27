import { defineField, defineType } from 'sanity'

export const editionType = defineType({
  name: 'edition',
  title: 'Ediciones de Revista',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título de la Edición',
      type: 'string',
      description: 'Ej. "Vol. 1: Verano 2026", "Edición Especial Madrid"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'releaseDate',
      title: 'Fecha de Lanzamiento',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'coverImage',
      title: 'Portada de la Edición',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'description',
      title: 'Descripción / Manifiesto',
      type: 'text',
      rows: 4,
    }),
    // Opcional: Relacionar una edición entera con un vuelo
    defineField({
      name: 'relatedFlight',
      title: 'Vuelo Relacionado (Opcional)',
      type: 'reference',
      to: [{ type: 'flight' }],
      description: 'Si esta edición completa gira en torno a un evento específico.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'releaseDate',
      media: 'coverImage',
    },
    prepare(selection) {
      const { title, subtitle, media } = selection
      return {
        title,
        subtitle: subtitle ? new Date(subtitle).toLocaleDateString() : 'Sin fecha',
        media,
      }
    }
  }
})
