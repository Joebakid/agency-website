"use client";

import { useEffect, useRef, useState } from "react";
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
  const [lang, setLang] = useState("en");
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Start loading the translator immediately if a language is already set
  useEffect(() => {
    const current = readLang();
    setLang(current);
    if (current !== "en") loadTranslator().then(() => applyLanguage(current));
  }, []);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const choose = async (code: string) => {
    setOpen(false);
    if (code === lang) return;

    document.cookie = "lang_set=1; path=/; max-age=31536000"; // remember the choice

    // Going back to English needs a clean page, so reload once
    if (code === "en") {
      clearTranslateCookie();
      window.location.reload();
      return;
    }

    clearTranslateCookie();
    document.cookie = `googtrans=/en/${code}; path=/; max-age=31536000`;
    setLang(code);
    setBusy(true);

    await loadTranslator();
    const ok = await applyLanguage(code);
    setBusy(false);

    if (!ok) window.location.reload(); // last resort
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
        <ul
          role="listbox"
          className="absolute right-0 mt-2 w-48 max-h-72 overflow-y-auto rounded-xl border border-gray-800 bg-gray-950/95 backdrop-blur-xl shadow-2xl shadow-black/50 py-1.5 z-[60]"
        >
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
      )}
    </div>
  );
}