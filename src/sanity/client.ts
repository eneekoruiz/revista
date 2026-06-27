import { createClient } from 'next-sanity'
import { createImageUrlBuilder } from '@sanity/image-url'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'your-project-id';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';

export const client = createClient({
  projectId,
  dataset,
  apiVersion: '2026-06-25',
  useCdn: true,
})

const builder = createImageUrlBuilder(client)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function urlFor(source: any) {
  return builder.image(source)
}

export async function sanityFetch<const QueryString extends string>({
  query,
  params = {},
  revalidate = 60,
}: {
  query: QueryString
  params?: Record<string, unknown>
  revalidate?: number
}) {
  if (projectId === 'your-project-id') return [];
  return client.fetch(query, params, {
    next: {
      revalidate,
    },
  })
}

export async function getPosts() {
  if (projectId === 'your-project-id') return [];
  return client.fetch(`*[_type in ["article", "contribution"]] | order(publishedAt desc)`).catch(() => [])
}
