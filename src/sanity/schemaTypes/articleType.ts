import { defineField, defineType } from 'sanity'

export const articleType = defineType({
  name: 'article',
  title: 'Artículos Oficiales',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título',
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
      name: 'isPinned',
      title: '📌 Fijar en Portada Principal',
      type: 'boolean',
      description: 'Si se activa, este artículo aparecerá en la página principal (Home).',
      initialValue: false,
    }),
    defineField({
      name: 'edition',
      title: 'Edición (Opcional)',
      type: 'reference',
      to: [{ type: 'edition' }],
      description: 'Asignar este artículo a una revista/edición específica.',
    }),
    defineField({
      name: 'flight',
      title: 'Vuelo (Opcional)',
      type: 'reference',
      to: [{ type: 'flight' }],
      description: 'Asignar este artículo a un evento o vuelo específico.',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Fecha de Publicación',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'status',
      title: 'Estado',
      type: 'string',
      options: {
        list: [
          { title: '📝 Borrador', value: 'draft' },
          { title: '✍️ En Revisión', value: 'in_review' },
          { title: '🚀 Publicado', value: 'published' },
        ],
        layout: 'radio',
      },
      initialValue: 'draft',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Autor / Colaborador',
      type: 'string',
      description: 'Nombre del redactor o colaborador que firma el artículo.',
    }),
    defineField({
      name: 'excerpt',
      title: 'Extracto',
      type: 'text',
      description: 'Breve descripción brutalista para listas y SEO.',
      rows: 3,
    }),
    defineField({
      name: 'featuredImage',
      title: 'Imagen Destacada',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Texto Alternativo',
          validation: (Rule) => Rule.required(),
        }
      ]
    }),
    defineField({
      name: 'content',
      title: 'Contenido',
      type: 'array',
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Texto Alternativo',
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Pie de foto',
            }
          ]
        },
        // We can add a custom block type for 3D model injection in the future
      ]
    }),
    defineField({
      name: 'tags',
      title: 'Etiquetas',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      }
    }),
    // 3D/WebGL Settings (Our Brutalist Lead Tech Touch)
    defineField({
      name: 'webglSettings',
      title: 'Configuración WebGL / 3D',
      type: 'object',
      description: 'Ajustes del canvas 3D dinámico asociado a este artículo.',
      fields: [
        {
          name: 'enable3D',
          title: 'Habilitar Experiencia 3D',
          type: 'boolean',
          initialValue: false,
        },
        {
          name: 'modelUrl',
          title: 'Ruta al Modelo 3D (.glb / .gltf)',
          type: 'string',
          description: 'URL o path absoluto del modelo 3D cargado en Three.js.',
        },
        {
          name: 'interactivity',
          title: 'Tipo de Interacción 3D',
          type: 'string',
          options: {
            list: [
              { title: 'Orbit Controls (Rotar/Zoom libre)', value: 'orbit' },
              { title: 'Follow Mouse (El modelo sigue al cursor)', value: 'follow-mouse' },
              { title: 'Parallax Scroll (Efecto según scroll de página)', value: 'parallax' },
            ]
          },
          initialValue: 'orbit',
        },
        {
          name: 'accentColor',
          title: 'Color del Canvas (Hex)',
          type: 'string',
          description: 'Color de las partículas o luces de la escena.',
        }
      ]
    })
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'publishedAt',
      media: 'featuredImage',
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
