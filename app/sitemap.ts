import { getBlogPosts, getEditions } from '@/lib/firestore';

const URL = 'https://your-website-url.com';

export default async function sitemap() {
  const [editions, blogPosts] = await Promise.all([
    getEditions(),
    getBlogPosts(),
  ]);

  const editionUrls = editions.map((edition) => ({
    url: `${URL}/editions/${edition.slug}`,
    lastModified: new Date(),
  }));

  const blogPostUrls = blogPosts.map((post) => ({
    url: `${URL}/blog/${post.slug}`,
    lastModified: new Date(),
  }));

  const staticUrls = [
    {
      url: URL,
      lastModified: new Date(),
    },
    {
      url: `${URL}/editions`,
      lastModified: new Date(),
    },
    {
      url: `${URL}/blog`,
      lastModified: new Date(),
    },
    {
      url: `${URL}/about`,
      lastModified: new Date(),
    },
    {
      url: `${URL}/contact`,
      lastModified: new Date(),
    },
  ];

  return [...staticUrls, ...editionUrls, ...blogPostUrls];
}
