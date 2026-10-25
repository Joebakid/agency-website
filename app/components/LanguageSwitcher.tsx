"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { LANGUAGES } from "../lib/languages";

declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google?: any;
  }
}

const SCRIPT_ID = "google-translate-script";

function readLang() {
  const m = document.cookie.match(/(?:^|;\s*)googtrans=\/[^/]+\/([^;]+)/);
  return m ? decodeURIComponent(m[1]) : "en";
}

function clearTranslateCookie() {
  const host = window.location.hostname;
  const past = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
  document.cookie = `${past}; path=/`;
  document.cookie = `${past}; path=/; domain=${host}`;
  document.cookie = `${past}; path=/; domain=.${host}`;
}

// Builds the current page URL with ?lang=xx (keeps other params and the #hash)
function urlWithLang(code: string) {
  const u = new URL(window.location.href);
  u.searchParams.set("lang", code);
  return u.toString();
}

// Shows the language in the address bar without reloading
function reflectInUrl(code: string) {
  window.history.replaceState(window.history.state, "", urlWithLang(code));
}

// Loads Google's translator once and resolves when it is ready
let loader: Promise<void> | null = null;
function loadTranslator(): Promise<void> {
  if (loader) return loader;
  loader = new Promise((resolve) => {
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: LANGUAGES.map((l) => l.code).join(","),
          autoDisplay: false,
        },
        "google_translate_element"
      );
      resolve();
    };
    if (!document.getElementById(SCRIPT_ID)) {
      const s = document.createElement("script");
      s.id = SCRIPT_ID;
      s.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      s.async = true;
      document.head.appendChild(s);
    }
  });
  return loader;
}

// Tells Google's hidden dropdown to switch language (no page reload)
function applyLanguage(code: string): Promise<boolean> {
  return new Promise((resolve) => {
    let tries = 0;
    const timer = setInterval(() => {
      const combo = document.querySelector<HTMLSelectElement>(".goog-te-combo");
      if (combo) {
        combo.value = code;
        combo.dispatchEvent(new Event("change"));
        clearInterval(timer);
        resolve(true);
      } else if (++tries > 60) {
        clearInterval(timer);
        resolve(false);
      }
    }, 100);
  });
}

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const [lang, setLang] = useState("en");
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [copied, setCopied] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // On first load: start the translator if a language is set
  useEffect(() => {
    const current = readLang();
    setLang(current);
    if (current !== "en") loadTranslator().then(() => applyLanguage(current));
  }, []);

  // Keep ?lang=xx in the address bar, including after moving to another page
  useEffect(() => {
    const current = readLang();
    const hasParam = new URL(window.location.href).searchParams.has("lang");
    if (current !== "en" || hasParam) reflectInUrl(current);
  }, [pathname]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const choose = async (code: string) => {
    setOpen(false);
    if (code === lang) {
      reflectInUrl(code);
      return;
    }

    document.cookie = "lang_set=1; path=/; max-age=31536000"; // remember the choice

    // Going back to English needs a clean page: reload with ?lang=en in the URL
    if (code === "en") {
      clearTranslateCookie();
      window.location.href = urlWithLang("en");
      return;
    }

    clearTranslateCookie();
    document.cookie = `googtrans=/en/${code}; path=/; max-age=31536000`;
    setLang(code);
    reflectInUrl(code); // address bar now shows ?lang=zh-CN
    setBusy(true);

    await loadTranslator();
    const ok = await applyLanguage(code);
    setBusy(false);

    if (!ok) window.location.reload(); // last resort
  };

  const copyLink = async () => {
    const link = urlWithLang(lang);
    try {
      await navigator.clipboard.writeText(link);
    } catch {
      // Older browsers: fall back to a temporary input
      const t = document.createElement("input");
      t.value = link;
      document.body.appendChild(t);
      t.select();
      document.execCommand("copy");
      document.body.removeChild(t);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const current = LANGUAGES.find((l) => l.code === lang) ?? LANGUAGES[0];

  return (
    <div ref={ref} translate="no" className="relative">
      {/* Kept in the page (not display:none) because Google needs it to render */}
      <div
        id="google_translate_element"
        aria-hidden
        className="absolute w-px h-px overflow-hidden opacity-0 pointer-events-none"
      />

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Change language"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-300 hover:text-white border border-gray-700 hover:border-gray-500 rounded-full px-3.5 py-1.5 transition-colors"
      >
        {busy ? (
          <span className="w-4 h-4 rounded-full border-2 border-gray-600 border-t-blue-400 animate-spin" />
        ) : (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )}
        {current.short}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-52 rounded-xl border border-gray-800 bg-gray-950/95 backdrop-blur-xl shadow-2xl shadow-black/50 z-[60] overflow-hidden">
          <ul role="listbox" className="max-h-64 overflow-y-auto py-1.5">
            {LANGUAGES.map((l) => (
              <li key={l.code} role="option" aria-selected={l.code === lang}>
                <button
                  type="button"
                  onClick={() => choose(l.code)}
                  className={`w-full text-left px-4 py-2.5 text-sm transition-colors hover:bg-gray-800/70 ${
                    l.code === lang ? "text-blue-400 font-medium" : "text-gray-300"
                  }`}
                >
                  {l.label}
                </button>
              </li>
            ))}
          </ul>

          <div className="border-t border-gray-800 p-2">
            <button
              type="button"
              onClick={copyLink}
              className="w-full flex items-center justify-center gap-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg py-2.5 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              {copied ? "Link copied!" : "Copy link in this language"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}