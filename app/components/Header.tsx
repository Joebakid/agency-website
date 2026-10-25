"use client";

import { useState } from 'react';
import Link from 'next/link';
import Container from './Container';
import Nav from './Nav';
import Logo from './Logo';

export default function Header() {
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen((v) => !v);

  return (
    <header className="sticky top-0 z-50 bg-gray-950/60 backdrop-blur-xl border-b border-gray-800/80">
      <Container>
        <div className="flex justify-between items-center py-3.5 md:py-4">
          <Logo />
          <Nav />

          <div className="flex items-center gap-3">
            <Link
              href="/booking"
              className="hidden md:inline-flex bg-white text-gray-950 text-sm font-semibold rounded-full px-5 py-2 hover:bg-gray-200 transition-colors"
            >
              Let&apos;s talk
            </Link>

            <button
              className="md:hidden -mr-2 p-2 text-gray-300 hover:text-white focus:outline-none"
              onClick={toggle}
              aria-label="Toggle navigation"
              aria-expanded={open}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {open ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {open && (
          <div className="max-h-[calc(100dvh-4rem)] overflow-y-auto">
            <Nav isMobile onLinkClick={toggle} />
          </div>
        )}
      </Container>
    </header>
  );
}