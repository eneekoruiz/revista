import { defineField, defineType } from 'sanity'

export const contributionType = defineType({
  name: 'contribution',
  title: 'Contribuciones de la Comunidad',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título del Aporte',
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
      name: 'contributorName',
      title: 'Nombre del Autor/Contribuidor',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'contributorLink',
      title: 'Enlace del Contribuidor',
      type: 'url',
      description: 'Link al portfolio, GitHub, Twitter o web personal.',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Fecha de Aprobación/Publicación',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'status',
      title: 'Estado de Moderación',
      type: 'string',
      options: {
        list: [
          { title: 'Borrador', value: 'draft' },
          { title: 'En Revisión', value: 'in_review' },
          { title: 'Cambios Solicitados', value: 'changes_requested' },
          { title: 'Aprobado', value: 'approved' },
          { title: 'Publicado', value: 'published' },
        ],
        layout: 'radio',
      },
      initialValue: 'draft',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Extracto',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'content',
      title: 'Contenido del Aporte',
      type: 'array',
      of: [{ type: 'block' }]
    }),
    defineField({
      name: 'fileAttachment',
      title: 'Archivo Adjunto',
      type: 'file',
      description: 'Sube un archivo relevante para la comunidad (código, modelo 3D, pdf, etc.)',
    }),
    defineField({
      name: 'tags',
      title: 'Etiquetas',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      }
    })
  ],
  preview: {
    select: {
      title: 'title',
      contributor: 'contributorName',
      status: 'status',
    },
    prepare(selection) {
      const { title, contributor, status } = selection
      const statusMap: { [key: string]: string } = {
        draft: '📝 Borrador',
        in_review: '🟡 En Revisión',
        changes_requested: '🟠 Cambios',
        approved: '🟢 Aprobado',
        published: '🚀 Publicado',
      }
      return {
        title,
        subtitle: `Por: ${contributor || 'Anónimo'} | ${statusMap[status] || status}`,
      }
    }
  }
})
