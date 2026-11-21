import type React from "react"
import type { Metadata } from "next"
import { Inter, Farro } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import InitialLoader from "@/components/InitialLoader"
import SmoothScroll from "@/components/SmoothScroll"
import ScrollToTop from "@/components/ScrollToTop"
// PREVIOUS UI: import { Analytics } from "@vercel/analytics/next" (switched off below; Vercel-only)
import { MEDIA_RETRY_SCRIPT } from "@/lib/media-retry"

// Load Inter and Farro fonts
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const farro = Farro({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-farro",
})

export const metadata: Metadata = {
  title: "Tsalla Aerospace - Unmanned Systems & AI Technology",
  description:
    "We Don't Build Drones. We Build Unfair Advantages. Leading aerospace technology company specializing in unmanned systems and AI.",
  keywords: "aerospace, drones, unmanned systems, AI, defense technology",
  generator: "Tsalla Aerospace",
  icons: {
    icon: { url: "/tsalla-favicon.png", type: "image/png", sizes: "512x512" },
    apple: { url: "/tsalla-favicon.png", type: "image/png", sizes: "512x512" },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${farro.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: MEDIA_RETRY_SCRIPT }} />
        {/* PREVIOUS UI: four Google Fonts stylesheets loaded here, and each held up the first paint.
            Chakra Petch, Anton and Pontano Sans aren't used on any live page; Orbit now comes from
            /fonts/orbit-latin.woff2 (same file Google served, @font-face in globals.css).
        <link
          href="https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link href="https://fonts.googleapis.com/css2?family=Anton&display=swap" rel="stylesheet" />
        <link
          href="https://fonts.googleapis.com/css2?family=Pontano+Sans:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Orbit:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        */}
        <link rel="preload" href="/fonts/orbit-latin.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />

      </head>
      <body className="bg-black text-white font-orbit" suppressHydrationWarning>
        <SmoothScroll>
          <ScrollToTop />
          <InitialLoader />
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
          {/* PREVIOUS UI: <Analytics /> (Vercel Analytics). It only works on Vercel hosting; on Wix its
              /_vercel/insights/script.js request 404s on every page and costs the Best Practices score.
          <Analytics />
          */}
        </SmoothScroll>
      </body>
    </html>
  )
} 
