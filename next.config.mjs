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
      {
        protocol: "https",
        hostname: "mdmahfuzulhaque3140.vercel.app",
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "ghchart.rshah.org",
      },
    ],
    formats: ['image/webp', 'image/avif'],
  },
  trailingSlash: false,
  skipTrailingSlashRedirect: true,
  experimental: {
    missingSuspenseWithCSRBug: true,
  },
};

export default nextConfig;
