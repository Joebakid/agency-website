import Link from 'next/link';
import Container from './Container';

export default function Trust() {
  return (
    <section id="trust" className="scroll-mt-24">
      <Container>
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 md:p-12">
          <div className="flex flex-col md:flex-row justify-between items-start gap-8">
            <div className="max-w-2xl">
              <h2 className="text-sm font-bold text-blue-400 tracking-widest uppercase mb-3">Expression of Interest</h2>
              <h3 className="text-3xl font-bold text-white mb-4">Certified Engineering & Compliance</h3>
              <p className="text-gray-400 mb-6">
                Bawo Digital is built on a foundation of formal engineering education and rigorous technical standards. Every member of our core team holds a degree in Engineering, ensuring our solutions are mathematically sound, highly scalable, and secure by design.
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300 mb-8">
                <li className="flex items-center gap-2">✓ Verified Engineering Degrees</li>
                <li className="flex items-center gap-2">✓ Registered Business Entity</li>
                <li className="flex items-center gap-2">✓ Enterprise-Grade Security Standards</li>
                <li className="flex items-center gap-2">✓ Comprehensive Service Level Agreements</li>
              </ul>
            </div>
            <div className="bg-gray-950 p-6 rounded-xl border border-gray-800 w-full md:w-auto flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mb-4 text-2xl">
                ⚖️
              </div>
              <h4 className="text-white font-semibold mb-2">Licenses & Credentials</h4>
              <p className="text-sm text-gray-500 mb-6 max-w-[200px]">Review our company profile, academic credentials, and compliance metrics.</p>
              <Link
                href="/compliance"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition-colors text-sm font-medium text-center inline-block"
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
