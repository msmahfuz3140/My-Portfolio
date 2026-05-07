import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://mdmahfuzulhaque3140.vercel.app';
  
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/private/', '/admin/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
