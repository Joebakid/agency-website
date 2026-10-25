import Link from 'next/link';
import Container from './Container';

const checks = [
  'Verified Engineering Degrees',
  'Registered Business Entity',
  'Enterprise-Grade Security Standards',
  'Comprehensive Service Level Agreements',
];

export default function Trust() {
  return (
    <section id="trust" className="scroll-mt-24 py-12 md:py-16">
      <Container>
        <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 sm:p-8 md:p-12">
          <div className="flex flex-col md:flex-row justify-between items-stretch md:items-start gap-8">
            <div className="max-w-2xl">
              <h2 className="text-xs sm:text-sm font-bold text-blue-400 tracking-widest uppercase mb-3">
                Expression of Interest
              </h2>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                Certified Engineering &amp; Compliance
              </h3>
              <p className="text-gray-400 mb-6 text-sm sm:text-base leading-relaxed">
                Bawo Digital is built on a foundation of formal engineering education and rigorous technical standards. Every member of our core team holds a degree in Engineering, ensuring our solutions are mathematically sound, highly scalable, and secure by design.
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-gray-300 text-sm sm:text-base">
                {checks.map((c) => (
                  <li key={c} className="flex items-start gap-2.5">
                    <svg className="w-5 h-5 mt-0.5 shrink-0 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    {c}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gray-950/70 p-6 rounded-xl border border-gray-800 w-full md:w-72 shrink-0 flex flex-col items-center text-center">
              <div className="w-14 h-14 bg-gray-800 rounded-full flex items-center justify-center mb-4 text-2xl">
                ⚖️
              </div>
              <h4 className="text-white font-semibold mb-2">Licenses &amp; Credentials</h4>
              <p className="text-sm text-gray-500 mb-6">
                Review our company profile, academic credentials, and compliance metrics.
              </p>
              <Link
                href="/compliance"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg transition-colors text-sm font-medium text-center"
              >
                View Full Details
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}