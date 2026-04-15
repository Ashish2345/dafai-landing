import type { Metadata } from 'next'
import { Inter, Lora } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const lora = Lora({ subsets: ['latin'], variable: '--font-lora' })

export const metadata: Metadata = {
  metadataBase: new URL('https://merodafa.com'),
  title: 'Mero Dafa — Compliance at the Speed of Thought',
  description: "Nepal's first hierarchy-aware AI for financial professionals. Ask questions, get cited answers, and view the original Nepal Gazette side-by-side.",
  keywords: ['Nepal tax', 'Income Tax Act', 'compliance', 'CA Nepal', 'legal AI', 'Mero Dafa', 'Nepal Gazette', 'TDS Nepal'],
  openGraph: {
    title: 'Mero Dafa — Compliance at the Speed of Thought',
    description: "Nepal's first hierarchy-aware AI for financial professionals.",
    url: 'https://merodafa.com',
    siteName: 'Mero Dafa',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Mero Dafa — Compliance at the Speed of Thought',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mero Dafa — Compliance at the Speed of Thought',
    description: "Nepal's first hierarchy-aware AI for financial professionals.",
    images: ['/og-image.png'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${lora.variable}`}>
      <body className="font-body antialiased">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
