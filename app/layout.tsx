import type { Metadata } from 'next'
import Script from 'next/script'
import { Inter, Lora } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const lora = Lora({ subsets: ['latin'], variable: '--font-lora' })

export const metadata: Metadata = {
  metadataBase: new URL('https://merodafa.com'),
  title: 'Mero Dafa — AI Legal Research for Nepal',
  description: "Ask questions about Nepal's tax acts, NRB directives, and IRD circulars. Get AI-powered answers with exact citations, page numbers, and section references — in English or Nepali.",
  keywords: ['Nepal tax', 'Income Tax Act', 'compliance', 'CA Nepal', 'legal AI', 'Mero Dafa', 'Nepal Gazette', 'TDS Nepal', 'NRB directives', 'IRD circulars', 'VAT Nepal'],
  openGraph: {
    title: 'Mero Dafa — AI Legal Research for Nepal',
    description: "Ask questions about Nepal's tax acts and directives. Get cited answers with exact page and section references.",
    url: 'https://merodafa.com',
    siteName: 'Mero Dafa',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Mero Dafa — AI Legal Research for Nepal',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mero Dafa — AI Legal Research for Nepal',
    description: "Ask questions about Nepal's tax acts and directives. Get cited answers with exact page and section references.",
    images: ['/og-image.png'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${lora.variable}`}>
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
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
