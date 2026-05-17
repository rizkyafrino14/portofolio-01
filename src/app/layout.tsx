import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import { Settings } from '@/components/common/Settings'
import { ThemeProvider } from '@/provider/themesProvider'
import Tawk from '@/components/common/Tawk'
import GithubStar from '@/components/common/GithubStar'

export const metadata: Metadata = {
  // ... sisanya sama // Basic
  title: {
    default: "Rizky Mustafa Afrino | Portofolio",
    template: "%s — Rizky Mustafa Afrino",
  },
  description:
    "Rizky Mustafa Afrino — Fullstack Developer from Indonesia specializing in React, Next.js, and TypeScript. Explore my projects, skills, and journey in web development.",
  keywords: ["Rizky Mustafa Afrino", "Fullstack Developer", "React", "Next.js", "TypeScript", "Web Developer Indonesia"],
  authors: [{ name: "Rizky Mustafa Afrino", url: "https://afrino.vercel.app" }],
  creator: "Rizky Mustafa Afrino",

  // Open Graph (Facebook, WhatsApp, LinkedIn, Discord)
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://afrino.vercel.app",
    siteName: "Rizky Mustafa Afrino",
    title: "Rizky Mustafa Afrino | Fullstack Developer",
    description:
      "Fullstack Developer from Indonesia — React, Next.js, TypeScript. Check out my projects and skills.",
    images: [
      {
        url: "https://afrino.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "Rizky Mustafa Afrino — Fullstack Developer Portfolio",
      },
    ],
  },

  // Twitter / X
  twitter: {
    card: "summary_large_image",
    title: "Rizky Mustafa Afrino | Fullstack Developer",
    description:
      "Fullstack Developer from Indonesia — React, Next.js, TypeScript.",
    images: ["https://afrino.vercel.app/og-image.png"],
    creator: "@riz_456d", // ganti kalau ada Twitter/X
  },

  // Canonical URL
  metadataBase: new URL("https://afrino.vercel.app"),
  alternates: {
    canonical: "/",
  },

  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="overflow-x-hidden">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main className="mb-10 p-5 md:p-8">{children}</main>
          {/* <Footer /> */}
          <Settings />
          <GithubStar />
          {/* <Tawk /> */}
        </ThemeProvider>
      </body>
    </html>
  )
}
