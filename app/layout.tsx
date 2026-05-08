import type { Metadata } from 'next'
import Script from 'next/script'
import { Inter, Lora } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { JsonLd } from '@/components/seo/JsonLd'
import { organizationSchema, websiteSchema } from '@/lib/seo/schema'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const lora = Lora({ subsets: ['latin'], variable: '--font-lora' })

const SITE_NAME = 'Mero Dafa'
const HOME_TITLE = 'Mero Dafa — AI Legal Research for Nepal'
const HOME_DESCRIPTION =
  "Ask questions about Nepal's tax acts, NRB directives, and IRD circulars. Get cited answers with exact page numbers and section references."

export const metadata: Metadata = {
  metadataBase: new URL('https://merodafa.com'),
  title: {
    default: HOME_TITLE,
    template: '%s — Mero Dafa',
  },
  description: HOME_DESCRIPTION,
  alternates: { canonical: '/' },
  openGraph: {
    title: HOME_TITLE,
    description:
      "Ask questions about Nepal's tax acts and directives. Get cited answers with exact page and section references.",
    url: 'https://merodafa.com',
    siteName: SITE_NAME,
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: HOME_TITLE,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: HOME_TITLE,
    description:
      "Ask questions about Nepal's tax acts and directives. Get cited answers with exact page and section references.",
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
  applicationName: SITE_NAME,
  authors: [{ name: 'Mero Dafa' }],
  creator: 'Mero Dafa',
  publisher: 'Mero Dafa',
  formatDetection: { email: false, address: false, telephone: false },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${lora.variable}`}
    >
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-5FM2BL5MXR"
        strategy="afterInteractive"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-5FM2BL5MXR');
        `}
      </Script>
      <body className="font-body antialiased">
        <JsonLd id="ld-organization" data={organizationSchema()} />
        <JsonLd id="ld-website" data={websiteSchema()} />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
