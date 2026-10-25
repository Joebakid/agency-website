"use client";

import { FormEvent } from 'react';
import Container from './Container';

const EMAIL = 'josephbawo@gmail.com';
const field =
  'w-full bg-gray-950/70 border border-gray-800 rounded-lg px-4 py-3 text-base text-white placeholder:text-gray-600 focus:outline-none focus:border-blue-500 transition-colors';

export default function Contact() {
  // Opens the visitor's email app with the form details filled in.
  // Swap this for an API route / Formspree later if you want it to send directly.
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const subject = encodeURIComponent(`Meeting request from ${f.get('name')}`);
    const body = encodeURIComponent(
      `Name: ${f.get('name')}\nEmail: ${f.get('email')}\n\n${f.get('message')}`
    );
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="scroll-mt-24 py-12 md:py-16">
      <Container>
        <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 sm:p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {/* Contact Info */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Book a Meeting.</h2>
              <p className="text-gray-400 mb-6 md:mb-8 leading-relaxed text-sm sm:text-base">
                Ready to engineer your next big project? Fill out the form to schedule a discovery call with our technical team, or reach out directly via email.
              </p>
              <div>
                <span className="block text-sm font-medium text-gray-500 mb-1">Direct Inquiry</span>
                <a
                  href={`mailto:${EMAIL}`}
                  className="text-base sm:text-lg font-semibold text-blue-400 hover:text-blue-300 transition-colors break-all"
                >
                  {EMAIL}
                </a>
              </div>
            </div>

            {/* Booking Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:gap-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">Full Name</label>
                <input type="text" id="name" name="name" autoComplete="name" className={field} placeholder="John Doe" required />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">Work Email</label>
                <input type="email" id="email" name="email" autoComplete="email" className={field} placeholder="john@company.com" required />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">Project Details</label>
                <textarea id="message" name="message" rows={4} className={`${field} resize-none`} placeholder="Tell us about your requirements..." required />
              </div>
              <button
                type="submit"
                className="mt-1 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3.5 px-6 rounded-lg transition-colors"
              >
                Request Meeting
              </button>
            </form>
          </div>
        </div>
      </Container>
    </section>
  );
}