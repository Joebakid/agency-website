"use client";

import { FormEvent, useState } from "react";

const field =
  "w-full bg-gray-950/70 border border-gray-800 rounded-lg px-4 py-3 text-base text-white placeholder:text-gray-600 focus:outline-none focus:border-blue-500 transition-colors";

type Status = "idle" | "sending" | "sent";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const f = new FormData(form);

    setStatus("sending");
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(f.entries())),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      form.reset();
      setStatus("sent");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setStatus("idle");
    }
  };

  if (status === "sent") {
    return (
      <div className="flex flex-col items-center text-center py-10">
        <div className="w-14 h-14 bg-green-900/30 border border-green-500/30 rounded-full flex items-center justify-center mb-5">
          <svg className="w-7 h-7 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-white mb-2">Message sent!</h3>
        <p className="text-gray-400 text-sm max-w-xs">
          Thanks for reaching out. We&apos;ll reply to your email shortly.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-6 text-sm text-blue-400 hover:text-blue-300 transition-colors"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:gap-5">
      {/* Honeypot */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
        <div>
          <label htmlFor="cf-name" className="block text-sm font-medium text-gray-400 mb-2">Full Name *</label>
          <input id="cf-name" name="name" type="text" required autoComplete="name" className={field} placeholder="John Doe" />
        </div>
        <div>
          <label htmlFor="cf-email" className="block text-sm font-medium text-gray-400 mb-2">Email *</label>
          <input id="cf-email" name="email" type="email" required autoComplete="email" className={field} placeholder="john@company.com" />
        </div>
      </div>

      <div>
        <label htmlFor="cf-subject" className="block text-sm font-medium text-gray-400 mb-2">Subject</label>
        <input id="cf-subject" name="subject" type="text" className={field} placeholder="e.g. New website for my business" />
      </div>

      <div>
        <label htmlFor="cf-message" className="block text-sm font-medium text-gray-400 mb-2">Message *</label>
        <textarea
          id="cf-message"
          name="message"
          rows={5}
          required
          minLength={5}
          className={`${field} resize-none`}
          placeholder="Tell us about your project..."
        />
      </div>

      {error && (
        <p role="alert" className="text-sm text-red-400 bg-red-950/40 border border-red-900/60 rounded-lg px-4 py-3">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3.5 px-6 rounded-lg transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === "sending" ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}