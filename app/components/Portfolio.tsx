'use client';

import { useEffect, useRef, useState } from 'react';
import Container from './Container';

type Project = { name: string; url: string; tag: string; desc: string };

const projects: Project[] = [
  { name: 'Vibelux', url: 'https://vibelux.ng/', tag: 'Ticketing Platform', desc: 'Discover events and purchase party tickets seamlessly.' },
  { name: 'Chronolite', url: 'https://www.chronolite.com.ng/', tag: 'Digital Platform', desc: 'A modern platform built with robust architecture for scale and performance.' },
  { name: 'LiveOutLoud', url: 'https://liveoutloud.com.ng/', tag: 'E-commerce', desc: 'Wellness and fashion store with a soft, mobile-first shopping experience.' },
  { name: 'TechJojo', url: 'https://www.techjojo.store/', tag: 'E-commerce', desc: 'Gadget store with structured product management for seamless client hand-offs.' },
  { name: 'PDFHouse', url: 'https://pdfhouse.vercel.app/', tag: 'Web App', desc: 'A web-based utility for managing, viewing, and processing PDF documents.' },
  { name: 'Win-Toju', url: 'https://www.win-toju.com.ng/', tag: 'Corporate Website', desc: 'A professional web presence focused on streamlined digital services.' },
];

const hostname = (url: string) => new URL(url).hostname.replace('www.', '');

/* Renders the real site at 1440x900, then scales it down to fit its container */
function LivePreview({ url, name }: { url: string; name: string }) {
  const W = 1440;
  const H = 900;
  const wrapRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.25);
  const [inView, setInView] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setScale(entry.contentRect.width / W));
    ro.observe(el);
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { rootMargin: '200px' }
    );
    io.observe(el);
    return () => {
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  return (
    <div ref={wrapRef} className="relative w-full overflow-hidden bg-gray-950" style={{ aspectRatio: `${W} / ${H}` }}>
      {!loaded && <div className="absolute inset-0 animate-pulse bg-gray-900" />}
      {inView && (
        <iframe
          src={url}
          title={`${name} live preview`}
          tabIndex={-1}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          className={`absolute top-0 left-0 border-0 pointer-events-none origin-top-left transition-opacity duration-700 ${loaded ? 'opacity-100' : 'opacity-0'}`}
          style={{ width: W, height: H, transform: `scale(${scale})` }}
        />
      )}
    </div>
  );
}

function BrowserBar({ url }: { url: string }) {
  return (
    <div className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-2.5 bg-gray-900 border-b border-gray-800">
      <div className="flex gap-1.5">
        <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-red-500/80" />
        <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-yellow-500/80" />
        <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-green-500/80" />
      </div>
      <div className="flex-1 max-w-xs mx-auto text-center text-[10px] sm:text-[11px] text-gray-400 bg-gray-950 border border-gray-800 rounded-md py-1 truncate px-3">
        {hostname(url)}
      </div>
      <div className="w-8 sm:w-10" />
    </div>
  );
}

function PreviewModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const [device, setDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const widths = { desktop: '100%', tablet: '768px', mobile: '390px' };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] h-[100dvh] flex flex-col bg-black/80 backdrop-blur-md sm:p-6 md:p-8"
      onClick={onClose}
    >
      <div
        className="flex flex-col flex-1 min-h-0 max-w-7xl w-full mx-auto bg-gray-950 sm:border border-gray-800 sm:rounded-2xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Toolbar */}
        <div className="flex items-center justify-between gap-3 px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-900 border-b border-gray-800">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <button
              onClick={onClose}
              aria-label="Close preview"
              className="p-2 -ml-1 rounded-full text-gray-300 hover:text-white hover:bg-gray-800 transition-colors shrink-0"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-white leading-none truncate">{project.name}</p>
              <p className="text-[11px] text-gray-500 mt-1 truncate">{hostname(project.url)}</p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-1 bg-gray-950 border border-gray-800 rounded-lg p-1">
            {(['desktop', 'tablet', 'mobile'] as const).map((d) => (
              <button
                key={d}
                onClick={() => setDevice(d)}
                className={`px-3 py-1 text-xs capitalize rounded-md transition-colors ${
                  device === d ? 'bg-white text-black' : 'text-gray-400 hover:text-white'
                }`}
              >
                {d}
              </button>
            ))}
          </div>

          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-medium text-black bg-white hover:bg-gray-200 transition-colors rounded-lg px-3 sm:px-4 py-2 shrink-0"
          >
            Visit site ↗
          </a>
        </div>

        {/* Viewport */}
        <div className="flex-1 min-h-0 flex justify-center bg-gray-900/50 overflow-auto">
          <iframe
            src={project.url}
            title={`${project.name} full preview`}
            className="h-full border-0 bg-white transition-all duration-500"
            style={{ width: widths[device], maxWidth: '100%' }}
          />
        </div>
      </div>
    </div>
  );
}

export default function Portfolio() {
  const [active, setActive] = useState<Project | null>(null);

  return (
    <section id="portfolio" className="scroll-mt-24 py-14 md:py-24">
      <Container>
        <div className="mb-10 md:mb-14 max-w-2xl">
          <p className="text-xs uppercase tracking-[0.2em] text-blue-400 mb-3 md:mb-4">Portfolio</p>
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">Selected work.</h2>
          <p className="text-gray-400 mt-3 md:mt-4 text-sm sm:text-base">
            Real products, live in production. Tap any project to explore it.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-8 lg:gap-10">
          {projects.map((project) => (
            <article key={project.name} className="group">
              <button
                onClick={() => setActive(project)}
                className="block w-full text-left rounded-xl overflow-hidden border border-gray-800 bg-gray-900 shadow-lg shadow-black/40 transition-all duration-500 md:group-hover:-translate-y-1 group-hover:border-gray-600 group-hover:shadow-2xl group-hover:shadow-blue-500/10"
              >
                <BrowserBar url={project.url} />
                <div className="relative">
                  <LivePreview url={project.url} name={project.name} />

                  {/* Desktop hover overlay */}
                  <div className="hidden md:flex absolute inset-0 items-center justify-center bg-black/0 group-hover:bg-black/50 transition-colors duration-300">
                    <span className="opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 bg-white text-black text-sm font-medium rounded-full px-5 py-2.5">
                      View live preview
                    </span>
                  </div>

                  {/* Touch hint (no hover on phones) */}
                  <span className="md:hidden absolute bottom-2 right-2 bg-black/70 backdrop-blur text-white text-[11px] font-medium rounded-full px-3 py-1.5">
                    Tap to explore
                  </span>
                </div>
              </button>

              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4 mt-4 sm:mt-5 px-1">
                <div>
                  <h3 className="text-lg font-semibold text-white">{project.name}</h3>
                  <p className="text-sm text-gray-400 mt-1 max-w-md">{project.desc}</p>
                </div>
                <span className="self-start text-[11px] text-gray-400 border border-gray-800 rounded-full px-3 py-1 whitespace-nowrap">
                  {project.tag}
                </span>
              </div>
            </article>
          ))}
        </div>
      </Container>

      {active && <PreviewModal project={active} onClose={() => setActive(null)} />}
    </section>
  );
}