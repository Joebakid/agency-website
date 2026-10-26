"use client";

import { useEffect, useState } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";
import Container from "../components/Container";
import BackButton from "../components/BackButton";
import ContactForm from "../components/ContactForm";

const CAL_LINK = "joseph-bawo-3jzeyt/30min";
const EMAIL = "josephbawo@gmail.com";

// Your language codes -> Cal.com locale codes
const CAL_LOCALE: Record<string, string> = {
  en: "en",
  "zh-CN": "zh-CN",
  "zh-TW": "zh-TW",
  fr: "fr",
  es: "es",
  pt: "pt",
  de: "de",
  it: "it",
  nl: "nl",
  ru: "ru",
  ar: "ar",
  tr: "tr",
  ja: "ja",
  ko: "ko",
  hi: "hi",
};

// The page language: ?lang= in the URL first, then the translate cookie
function readPageLang(): string {
  const fromUrl = new URL(window.location.href).searchParams.get("lang");
  if (fromUrl && fromUrl !== "auto") return fromUrl;
  const m = document.cookie.match(/(?:^|;\s*)googtrans=\/[^/]+\/([^;]+)/);
  return m ? decodeURIComponent(m[1]) : "en";
}

export default function Booking() {
  const [lang, setLang] = useState("en");

  // Follow the page language, including when it changes from the menu
  useEffect(() => {
    const update = () => setLang(readPageLang());
    update();
    window.addEventListener("langchange", update);
    return () => window.removeEventListener("langchange", update);
  }, []);

  const locale = CAL_LOCALE[lang] ?? "en";

  useEffect(() => {
    (async () => {
      const cal = await getCalApi();
      cal("ui", {
        theme: "dark",
        layout: "month_view",
        styles: { branding: { brandColor: "#2563eb" } },
      });
    })();
  }, []);

  return (
    <section id="booking" className="scroll-mt-24 pt-6 pb-12 sm:pt-10 md:py-16">
      <Container>
        <BackButton text="Back" fallbackHref="/" />

        <div className="mb-6 sm:mb-8 max-w-2xl">
          <p className="text-xs uppercase tracking-[0.2em] text-blue-400 mb-2 sm:mb-3">Book a call</p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
            Discovery Call
          </h1>
          <p className="text-gray-400 mt-3 text-sm sm:text-base leading-relaxed">
            Pick a time that suits you. You&apos;ll get an instant confirmation email with the meeting link.{" "}
            <a href="#message" className="text-blue-400 hover:text-blue-300 underline underline-offset-2">
              Prefer to write? Send us a message.
            </a>
          </p>
        </div>

        {/* Calendar: re-created when the language changes so Cal.com reloads in it */}
        <div
          translate="no"
          className="rounded-xl sm:rounded-2xl border border-gray-800 bg-gray-900/50 backdrop-blur-sm overflow-hidden min-h-[640px] sm:min-h-[700px]"
        >
          <Cal
            key={locale}
            calLink={`${CAL_LINK}?lang=${locale}&locale=${locale}`}
            style={{ width: "100%", height: "100%", overflow: "auto" }}
            config={{ layout: "month_view", theme: "dark", lang: locale, locale }}
          />
        </div>

        <p className="text-center text-xs sm:text-sm text-gray-500 mt-5 sm:mt-6">
          Calendar not loading?{" "}
          <a
            href={`https://cal.com/${CAL_LINK}?lang=${locale}&locale=${locale}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 underline underline-offset-2"
          >
            Open it in a new tab
          </a>
        </p>

        {/* Divider */}
        <div className="flex items-center gap-4 my-12 sm:my-16">
          <div className="flex-1 h-px bg-gray-800" />
          <span className="text-xs uppercase tracking-[0.2em] text-gray-500">or</span>
          <div className="flex-1 h-px bg-gray-800" />
        </div>

        {/* Message section */}
        <div id="message" className="scroll-mt-24">
          <div className="rounded-xl sm:rounded-2xl border border-gray-800 bg-gray-900/50 backdrop-blur-sm p-6 sm:p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-12">
              <div className="md:col-span-2">
                <p className="text-xs uppercase tracking-[0.2em] text-blue-400 mb-3">Send a message</p>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Not ready for a call?</h2>
                <p className="text-gray-400 text-sm sm:text-base leading-relaxed mb-6">
                  Tell us about your project and we&apos;ll get back to you by email, usually within one business day.
                </p>
                <span className="block text-sm font-medium text-gray-500 mb-1">Or email us directly</span>
                <a
                  href={`mailto:${EMAIL}`}
                  className="text-base sm:text-lg font-semibold text-blue-400 hover:text-blue-300 transition-colors break-all"
                >
                  {EMAIL}
                </a>
              </div>

              <div className="md:col-span-3">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
