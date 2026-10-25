"use client";

import { useEffect, useState } from "react";

type Design = { name: string; url: string };

// Turns a normal Figma link into Figma's current embed link
function toEmbedUrl(url: string) {
  try {
    const u = new URL(url);
    u.hostname = "embed.figma.com";
    u.searchParams.delete("t");
    u.searchParams.set("embed-host", "share");
    return u.toString();
  } catch {
    return url;
  }
}

const gradients = [
  "from-blue-600/30 via-indigo-600/20 to-transparent",
  "from-violet-600/30 via-fuchsia-600/20 to-transparent",
  "from-cyan-600/30 via-blue-600/20 to-transparent",
];

function DesignModal({ design, onClose }: { design: Design; onClose: () => void }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] h-[100dvh] flex flex-col bg-black/80 backdrop-blur-md sm:p-6 md:p-8"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${design.name} design`}
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
              aria-label="Close"
              className="p-2 -ml-1 rounded-full text-gray-300 hover:text-white hover:bg-gray-800 transition-colors shrink-0"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-white leading-none truncate">{design.name}</p>
              <p className="text-[11px] text-gray-500 mt-1">Figma · by Solomon</p>
            </div>
          </div>

          <a
            href={design.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-medium text-black bg-white hover:bg-gray-200 transition-colors rounded-lg px-3 sm:px-4 py-2 shrink-0"
          >
            Open in Figma ↗
          </a>
        </div>

        {/* Viewport */}
        <div className="relative flex-1 min-h-0 bg-gray-900/50">
          {!loaded && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-gray-500 text-sm">
              <div className="w-8 h-8 rounded-full border-2 border-gray-700 border-t-blue-500 animate-spin" />
              Loading design...
            </div>
          )}
          <iframe
            src={toEmbedUrl(design.url)}
            title={`${design.name} Figma design`}
            allowFullScreen
            onLoad={() => setLoaded(true)}
            className="absolute inset-0 w-full h-full border-0"
          />
        </div>

        <p className="px-4 py-2 text-[11px] text-gray-500 bg-gray-900 border-t border-gray-800 text-center">
          Blank or asking for access? The file needs to be set to &ldquo;Anyone with the link can view&rdquo; in Figma.
        </p>
      </div>
    </div>
  );
}

export default function DesignGallery({ designs }: { designs: Design[] }) {
  const [active, setActive] = useState<Design | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {designs.map((d, i) => (
          <button
            key={d.name}
            onClick={() => setActive(d)}
            className="group text-left rounded-2xl overflow-hidden border border-gray-800 bg-gray-900/50 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-gray-600 hover:shadow-2xl hover:shadow-blue-500/10"
          >
            <div className={`relative aspect-[16/10] bg-gradient-to-br ${gradients[i % gradients.length]} flex items-center justify-center`}>
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.15) 1px, transparent 1px)",
                  backgroundSize: "28px 28px",
                }}
              />
              <span className="relative text-5xl sm:text-6xl font-bold text-white/90 tracking-tight">
                {d.name[0]}
              </span>
              <span className="absolute bottom-3 right-3 bg-black/60 backdrop-blur text-white text-[11px] font-medium rounded-full px-3 py-1.5 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                View design
              </span>
            </div>
            <div className="p-5 flex items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-semibold text-white">{d.name}</h3>
                <p className="text-xs text-gray-500 mt-1">Figma design file</p>
              </div>
              <svg
                className="w-5 h-5 text-gray-500 group-hover:text-blue-400 transition-colors shrink-0"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4h4M20 8V4h-4M4 16v4h4M20 16v4h-4" />
              </svg>
            </div>
          </button>
        ))}
      </div>

      {active && <DesignModal design={active} onClose={() => setActive(null)} />}
    </>
  );
}