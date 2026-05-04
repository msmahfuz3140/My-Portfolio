import type { Metadata } from "next";
import { Space_Grotesk, Manrope } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";

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
  title: "MD MAHFUZUL HAQUE | Web Developer",
  description: "A passionate Web Developer specializing in building exceptional digital experiences with modern web technologies. Diploma in Computer Science Technology student at Mymensingh Polytechnic Institute.",
  keywords: ["Web Developer", "Frontend Developer", "React", "Next.js", "JavaScript", "TypeScript", "MD MAHFUZUL HAQUE", "Portfolio", "Computer Science"],
  authors: [{ name: "MD MAHFUZUL HAQUE" }],
  creator: "MD MAHFUZUL HAQUE",
  openGraph: {
    title: "MD MAHFUZUL HAQUE | Web Developer",
    description: "A passionate Web Developer specializing in building exceptional digital experiences with modern web technologies.",
    url: "https://your-portfolio-url.com",
    siteName: "MD MAHFUZUL HAQUE Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MD MAHFUZUL HAQUE | Web Developer",
    description: "A passionate Web Developer specializing in building exceptional digital experiences with modern web technologies.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
        <link rel="shortcut icon" href="/logo.png" type="image/x-icon" />
      </head>
      <body className={`${spaceGrotesk.variable} ${manrope.variable} font-body-md bg-background text-on-background antialiased transition-colors duration-300`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <div className="fixed inset-0 -z-20 bg-background overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent opacity-20"></div>
            <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-primary/10 blur-[120px] animate-blob"></div>
            <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-secondary/10 blur-[120px] animate-blob animation-delay-2000"></div>
            <div className="absolute top-[30%] left-[20%] w-[30%] h-[30%] rounded-full bg-cyan-500/5 blur-[100px] animate-blob animation-delay-4000"></div>
            <div className="absolute top-[40%] right-[10%] w-[40%] h-[40%] rounded-full bg-blue-600/5 blur-[120px] animate-blob animation-delay-6000"></div>
          </div>
          <SmoothScroll>
            {children}
          </SmoothScroll>
        </ThemeProvider>
        <CustomCursor />
      </body>
    </html>
  );
}
