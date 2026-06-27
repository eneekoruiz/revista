import { defineField, defineType } from 'sanity'

export const flightType = defineType({
  name: 'flight',
  title: 'Vuelos (Eventos)',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título del Vuelo',
      type: 'string',
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
      name: 'flightDate',
      title: 'Fecha del Vuelo',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Lugar / Ciudad',
      type: 'string',
    }),
    defineField({
      name: 'poster',
      title: 'Cartel del Evento',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'description',
      title: 'Descripción Corta',
      type: 'text',
      rows: 3,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'flightDate',
      media: 'poster',
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
