/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://your-domain.vercel.app',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  changefreq: 'daily',
  priority: 0.7,
  exclude: ['/server-sitemap.xml'],
  transform: async (config, path) => {
    // customize the output of each URL
    return {
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: new Date().toISOString(),
    };
  },
  additionalPaths: async (config) => {
    // Read project IDs from dynamic projects.json if it exists, otherwise fall back to static TS parsing
    const fs = require("fs");
    const path = require("path");
    try {
      let ids = [];
      const jsonPath = path.join(__dirname, "data/projects.json");
      
      if (fs.existsSync(jsonPath)) {
        const raw = fs.readFileSync(jsonPath, "utf-8");
        const list = JSON.parse(raw);
        ids = list.map((p) => p.id);
      } else {
        const filePath = path.join(__dirname, "src/data/projects.ts");
        const content = fs.readFileSync(filePath, "utf-8");
        const idRegex = /id:\s*["']([^"']+)["']/g;
        let match;
        while ((match = idRegex.exec(content)) !== null) {
          ids.push(match[1]);
        }
      }
      
      return ids.map((id) => ({
        loc: `/projects/${id}`,
        changefreq: "weekly",
        priority: 0.8,
        lastmod: new Date().toISOString(),
      }));
    } catch (err) {
      console.error("Failed to parse project IDs for sitemap:", err);
      return [];
    }
  },
};
