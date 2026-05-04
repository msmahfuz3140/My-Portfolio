/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "skillicons.dev",
      },
      {
        protocol: "https",
        hostname: "cdn.simpleicons.org",
      },
    ],
    formats: ['image/webp', 'image/avif'],
  },
  output: 'export',
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  distDir: 'out',
  experimental: {
    missingSuspenseWithCSRBug: true,
  },
};

export default nextConfig;
