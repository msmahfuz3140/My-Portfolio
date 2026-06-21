import type { Metadata } from "next";
import { Space_Grotesk, Manrope } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import BackToTop from "@/components/BackToTop";
import PageLoader from "@/components/PageLoader";
import WhatsAppChat from "@/components/WhatsAppChat";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

import { ThemeProvider } from "@/components/ThemeProvider";

export const metadata: Metadata = {
  metadataBase: new URL("https://mdmahfuzulhaque3140.vercel.app"),

  title: {
    default: "Md Mahfuzul Haque | Full Stack Developer",
    template: "%s | Md Mahfuzul Haque",
  },

  description:
    "Md Mahfuzul Haque is a passionate Full Stack Developer specializing in Next.js, React, Node.js, TypeScript & MongoDB. Building fast, modern and SEO-optimized web applications.",

  keywords: [
    "Md Mahfuzul Haque",
    "Full Stack Developer",
    "Next.js Developer",
    "React Developer",
    "MERN Stack Developer",
    "Web Developer Bangladesh",
    "Next.js Portfolio",
    "Freelance Web Developer",
    "Mymensingh Developer",
    "TypeScript Developer",
    "Node.js Developer",
  ],

  authors: [{ name: "Md Mahfuzul Haque" }],
  creator: "Md Mahfuzul Haque",
  publisher: "Md Mahfuzul Haque",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    title: "Md Mahfuzul Haque | Full Stack Developer Portfolio",
    description:
      "Explore modern web applications built with Next.js, React, Node.js, TypeScript & MongoDB.",
    url: "https://mdmahfuzulhaque3140.vercel.app",
    siteName: "Md Mahfuzul Haque Portfolio",
    images: [
      {
        url: "https://mdmahfuzulhaque3140.vercel.app/images/my-photo.jpg",
        width: 1200,
        height: 630,
        alt: "Md Mahfuzul Haque - Full Stack Developer",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Md Mahfuzul Haque | Full Stack Developer",
    description:
      "Full Stack Developer specializing in Next.js, React & Node.js",
    images: ["https://mdmahfuzulhaque3140.vercel.app/images/my-photo.jpg"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  icons: {
    icon: "/images/my-photo.jpg",
    shortcut: "/images/my-photo.jpg",
    apple: "/images/my-photo.jpg",
  },

  viewport: "width=device-width, initial-scale=1",
  category: "technology",
  classification: "portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* seo meta */}
        <meta name="google-site-verification" content="y0F7MnypH0HYZXy2Uwrs_9qXexXYkee42rGrFdFIUc4" />
        
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
        <link rel="shortcut icon" href="/images/my-photo.jpg" type="image/x-icon" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Md Mahfuzul Haque",
              "jobTitle": "Full Stack Developer",
              "url": "https://mdmahfuzulhaque3140.vercel.app",
              "image": "https://mdmahfuzulhaque3140.vercel.app/images/my-photo.jpg",
              "sameAs": ["https://www.linkedin.com/in/msmahfuz3140"],
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Mymensingh",
                "addressCountry": "BD"
              },
              "knowsAbout": [
                "Next.js",
                "React",
                "Node.js",
                "TypeScript",
                "MongoDB",
                "Web Development"
              ]
            })
          }}
        />
      </head>
      <body className={`${spaceGrotesk.variable} ${manrope.variable} font-body-md bg-background text-on-background antialiased transition-colors duration-300`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <div className="fixed inset-0 -z-20 bg-background overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent opacity-20"></div>
            <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-primary/10 blur-[120px] animate-blob"></div>
            <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-secondary/10 blur-[120px] animate-blob animation-delay-2000"></div>
            <div className="absolute top-[30%] left-[20%] w-[30%] h-[30%] rounded-full bg-cyan-500/5 blur-[100px] animate-blob animation-delay-4000"></div>
            <div className="absolute top-[40%] right-[10%] w-[40%] h-[40%] rounded-full bg-blue-600/5 blur-[120px] animate-blob animation-delay-6000"></div>
          </div>
          <SmoothScroll>
            {children}
          </SmoothScroll>
        </ThemeProvider>
        <PageLoader />
        <CustomCursor />
        <WhatsAppChat />
        <BackToTop />
      </body>
    </html>
  );
}
