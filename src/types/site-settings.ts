export interface SiteSettings {
  siteTitle: string;
  siteDescription: string;
  logoUrl: string;
  faviconUrl: string;
  contactEmail: string;
  contactPhone: string;
  socialLinks: {
    github: string;
    linkedin: string;
    whatsapp: string;
    instagram: string;
    facebook: string;
  };
  aboutContent: string;
  seoKeywords: string[];
}