import { MetadataRoute } from 'next'
import { getPosts } from '@/sanity/client'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPosts()

  const postEntries: MetadataRoute.Sitemap = posts.map((post: Record<string, unknown>) => ({
    url: `https://raksclub.com/post/${(post.slug as { current?: string })?.current}`,
    lastModified: new Date((post.publishedAt as string) || Date.now()),
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  return [
    {
      url: 'https://raksclub.com',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    ...postEntries,
  ]
}
