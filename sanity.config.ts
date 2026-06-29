import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './src/sanity/schemaTypes'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'your-project-id'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

const singletonTypes = ['siteConfig', 'homePage']

export default defineConfig({
  name: 'default',
  title: 'RAK$ Club Studio',

  projectId,
  dataset,
  basePath: '/studio',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('RAK$ Club')
          .items([
            S.listItem()
              .title('Configuración General')
              .id('siteConfig')
              .child(
                S.document()
                  .schemaType('siteConfig')
                  .documentId('siteConfig')
                  .title('Configuración General')
              ),
            S.listItem()
              .title('Portada')
              .id('homePage')
              .child(
                S.document()
                  .schemaType('homePage')
                  .documentId('homePage')
                  .title('Portada')
              ),
            S.divider(),
            S.listItem()
              .title('Artículos')
              .child(
                S.list()
                  .title('Artículos')
                  .items([
                    S.listItem()
                      .title('Todos')
                      .child(S.documentTypeList('article').title('Todos los artículos')),
                    S.listItem()
                      .title('Fijados en portada')
                      .child(
                        S.documentList()
                          .title('Fijados en portada')
                          .schemaType('article')
                          .filter('_type == "article" && isPinned == true')
                          .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])
                      ),
                    S.listItem()
                      .title('Publicados')
                      .child(
                        S.documentList()
                          .title('Publicados')
                          .schemaType('article')
                          .filter('_type == "article" && status == "published"')
                          .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])
                      ),
                    S.listItem()
                      .title('Borradores y revisión')
                      .child(
                        S.documentList()
                          .title('Borradores y revisión')
                          .schemaType('article')
                          .filter('_type == "article" && status in ["draft", "in_review"]')
                          .defaultOrdering([{ field: '_updatedAt', direction: 'desc' }])
                      ),
                  ])
              ),
            S.listItem()
              .title('Contribuciones')
              .child(
                S.list()
                  .title('Contribuciones')
                  .items([
                    S.listItem()
                      .title('Todas')
                      .child(S.documentTypeList('contribution').title('Todas las contribuciones')),
                    S.listItem()
                      .title('Pendientes de revisión')
                      .child(
                        S.documentList()
                          .title('Pendientes de revisión')
                          .schemaType('contribution')
                          .filter('_type == "contribution" && status in ["draft", "in_review", "changes_requested"]')
                          .defaultOrdering([{ field: '_updatedAt', direction: 'desc' }])
                      ),
                    S.listItem()
                      .title('Aprobadas y publicadas')
                      .child(
                        S.documentList()
                          .title('Aprobadas y publicadas')
                          .schemaType('contribution')
                          .filter('_type == "contribution" && status in ["approved", "published"]')
                          .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])
                      ),
                  ])
              ),
            S.divider(),
            S.listItem().title('Ediciones').child(S.documentTypeList('edition').title('Ediciones')),
            S.listItem().title('Vuelos').child(S.documentTypeList('flight').title('Vuelos')),
            S.listItem().title('Galería').child(S.documentTypeList('galleryAlbum').title('Galería')),
            S.divider(),
            ...S.documentTypeListItems().filter((item) => {
              const id = item.getId()
              return id ? ![...singletonTypes, 'article', 'contribution', 'edition', 'flight', 'galleryAlbum'].includes(id) : true
            }),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
    templates: (prev) => prev.filter((template) => !singletonTypes.includes(template.id)),
  },

  document: {
    actions: (prev, context) => {
      return singletonTypes.includes(context.schemaType)
        ? prev.filter((action) => !['delete', 'duplicate', 'unpublish'].includes(action.action || ''))
        : prev
    },
  },
})
