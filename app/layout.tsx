import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react'; // Add this import
import '../globals.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Background from './components/Background';

const inter = Inter({ subsets: ['latin'] });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://agency.josephbawo.fun';
const title = 'Bawo Digital | Engineering-Driven Web & Design Agency';
const description =
  'Bawo Digital is an engineering-driven agency building websites, web apps, e-commerce stores, UI/UX design and brand identities for businesses in Nigeria and beyond.';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: '%s | Bawo Digital',
  },
  description,
  applicationName: 'Bawo Digital',
  keywords: [
    'web development agency Nigeria',
    'full-stack developers',
    'Next.js developers',
    'UI/UX design',
    'logo and brand design',
    'e-commerce website development',
    'Lagos web design',
  ],
  authors: [{ name: 'Bawo Digital', url: siteUrl }],
  creator: 'Bawo Digital',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: '/',
    siteName: 'Bawo Digital',
    title,
    description,
    locale: 'en_NG',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#030712',
};

// Structured data: tells Google what the business is
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Bawo Digital',
  url: siteUrl,
  description,
  email: 'josephbawo@gmail.com',
  areaServed: 'Worldwide',
  address: { '@type': 'PostalAddress', addressCountry: 'NG' },
  knowsAbout: ['Web development', 'UI/UX design', 'Brand design', 'E-commerce', 'Motion design'],
  founder: { '@type': 'Person', name: 'Joseph Bawo', url: 'https://www.josephbawo.fun/' },
  // Add your real profiles when you have them:
  // sameAs: ['https://www.linkedin.com/...', 'https://x.com/...', 'https://www.instagram.com/...'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} text-gray-200 min-h-screen flex flex-col`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
        />
        <Background />
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
        <Analytics /> {/* Add the Analytics component here */}
      </body>
    </html>
  );
}
