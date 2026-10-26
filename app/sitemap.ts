import type { MetadataRoute } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://agency.josephbawo.fun';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${siteUrl}/`, lastModified: now, changeFrequency: 'monthly', priority: 1 },
    { url: `${siteUrl}/booking`, lastModified: now, changeFrequency: 'yearly', priority: 0.8 },
    { url: `${siteUrl}/compliance`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${siteUrl}/policy`, lastModified: now, changeFrequency: 'yearly', priority: 0.5 },
  ];
}
