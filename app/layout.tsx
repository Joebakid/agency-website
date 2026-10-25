import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../globals.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Background from './components/Background';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Bawo Digital | Engineering-Driven Agency',
  description: 'Comprehensive digital agency offering UI/UX, Full-Stack Development, and more.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} text-gray-200 min-h-screen flex flex-col`}>
        <Background />
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}