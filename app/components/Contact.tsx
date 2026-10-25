"use client";

import Container from './Container';

export default function Contact() {
  return (
    <section id="contact" className="scroll-mt-24 pt-12">
      <Container>
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

            {/* Contact Info */}
            <div>
              <h2 className="text-3xl font-bold text-white mb-4">Book a Meeting.</h2>
              <p className="text-gray-400 mb-8 leading-relaxed">
                Ready to engineer your next big project? Fill out the form to schedule a discovery call with our technical team, or reach out directly via email.
              </p>

              <div className="mb-6">
                <span className="block text-sm font-medium text-gray-500 mb-1">Direct Inquiry</span>
                <a
                  href="mailto:josephbawo@gmail.com"
                  className="text-lg font-semibold text-blue-400 hover:text-blue-300 transition-colors"
                >
                  josephbawo@gmail.com
                </a>
              </div>
            </div>

            {/* Booking Form */}
            <form className="flex flex-col gap-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">Full Name</label>
                <input
                  type="text"
                  id="name"
                  className="w-full bg-gray-950 border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="John Doe"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">Work Email</label>
                <input
                  type="email"
                  id="email"
                  className="w-full bg-gray-950 border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="john@company.com"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">Project Details</label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full bg-gray-950 border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors resize-none"
                  placeholder="Tell us about your requirements..."
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="mt-2 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
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
