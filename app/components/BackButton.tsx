"use client";

import { useRouter } from "next/navigation";

interface BackButtonProps {
  text?: string;
  fallbackHref?: string;
  className?: string;
}

export default function BackButton({ text = "Back", fallbackHref = "/", className = "" }: BackButtonProps) {
  const router = useRouter();

  const handleBack = () => {
    // If there's no previous page in this tab's history, go to the fallback instead
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push(fallbackHref);
    }
  };

  return (
    <button
      type="button"
      onClick={handleBack}
      aria-label={text}
      className={`group inline-flex items-center gap-2 -ml-2 px-2 py-2.5 min-h-[44px] rounded-lg text-gray-400 hover:text-white active:text-white transition-colors text-sm font-medium mb-4 sm:mb-6 ${className}`}
    >
      <svg
        className="w-4 h-4 sm:group-hover:-translate-x-1 transition-transform"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
      </svg>
      {text}
    </button>
  );
}