import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './src/sanity/schemaTypes'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'your-project-id'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

export default defineConfig({
  name: 'default',
  title: 'Revista Studio',

  projectId,
  dataset,
  basePath: '/studio',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Contenido')
          .items([
            // Singleton for General Configuration
            S.listItem()
              .title('Configuración General')
              .id('siteConfig')
              .child(
                S.document()
                  .schemaType('siteConfig')
                  .documentId('siteConfig')
                  .title('Configuración General')
              ),
            S.divider(),
            // Other document types, filtering out the singleton so it doesn't show up twice
            ...S.documentTypeListItems().filter(
              (item) => item.getId() !== 'siteConfig'
            ),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
    // Hide the singleton from the new document creation templates list
    templates: (prev) => prev.filter((template) => template.id !== 'siteConfig'),
  },

  document: {
    // Restrict actions on the singleton: disable delete, duplicate, and unpublish
    actions: (prev, context) => {
      return context.schemaType === 'siteConfig'
        ? prev.filter((action) => !['delete', 'duplicate', 'unpublish'].includes(action.action || ''))
        : prev
    },
  },
})
