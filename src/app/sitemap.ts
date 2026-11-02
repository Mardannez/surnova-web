import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  return [
    { url: baseUrl, lastModified: new Date(), priority: 1.0, changeFrequency: 'daily' },
    { url: `${baseUrl}/catalog`, lastModified: new Date(), priority: 0.9, changeFrequency: 'daily' },
    { url: `${baseUrl}/product-detail`, lastModified: new Date(), priority: 0.8, changeFrequency: 'weekly' },
    { url: `${baseUrl}/cart`, lastModified: new Date(), priority: 0.5, changeFrequency: 'monthly' },
    { url: `${baseUrl}/checkout`, lastModified: new Date(), priority: 0.5, changeFrequency: 'monthly' },
    { url: `${baseUrl}/sign-up-login`, lastModified: new Date(), priority: 0.6, changeFrequency: 'monthly' },
  ];
}