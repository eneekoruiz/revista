import { defineField, defineType } from 'sanity'

export const homePageType = defineType({
  name: 'homePage',
  title: 'Portada (Home)',
  type: 'document',
  fields: [
    defineField({
      name: 'heroTextTop',
      title: 'Texto Hero Arriba',
      type: 'string',
      initialValue: 'Eusko',
    }),
    defineField({
      name: 'heroTextBottom',
      title: 'Texto Hero Abajo',
      type: 'string',
      initialValue: 'Beats',
    }),
    defineField({
      name: 'heroLinkText',
      title: 'Texto del Enlace Principal',
      type: 'string',
      initialValue: 'EMPEZAR A DESCUBRIR',
    }),
    defineField({
      name: 'participants',
      title: 'Participantes',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', type: 'string', title: 'Nombre' },
            { name: 'role', type: 'string', title: 'Rol / Descripción' },
            { name: 'photo', type: 'image', title: 'Foto' },
          ],
        },
      ],
    }),
    defineField({
      name: 'sections',
      title: 'Secciones Gigantes',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', type: 'string', title: 'Título' },
            { name: 'url', type: 'string', title: 'URL o Ancla' },
          ],
        },
      ],
    }),
    defineField({
      name: 'footerSlogan',
      title: 'Slogan del Footer',
      type: 'string',
      initialValue: 'talento joven, sonido propio',
    }),
    defineField({
      name: 'footerDescription',
      title: 'Descripción del Footer',
      type: 'text',
      initialValue: 'Es un proyecto cultural y creativo centrado en la música urbana en el País Vasco...',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Contenido de Portada',
      }
    },
  },
})
