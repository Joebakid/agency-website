import Link from 'next/link';

type Level = {
  level: string;
  name: string;
  tagline: string;
  price: string;
  inherits?: string;
  features: string[];
  highlight?: boolean;
};

const levels: Level[] = [
  {
    level: 'Level 1',
    name: 'Showroom',
    tagline: 'A fast, beautiful car website that turns visitors into WhatsApp leads.',
    price: '$250',
    features: [
      'Full SEO setup, so buyers find Billy Cars on Google',
      'Custom UI/UX design, mobile-first',
      'Secure frontend and backend',
      'Admin dashboard to add, edit and remove cars',
      'Every car has a one-tap "Buy on WhatsApp" button that opens a chat with your sales number',
    ],
  },
  {
    level: 'Level 2',
    name: 'Marketplace',
    tagline: 'Give customers accounts and show every car in motion.',
    price: '$450',
    inherits: 'Everything in Level 1, plus',
    features: [
      'User accounts: sign up, log in, save favourite cars',
      'Video on every car listing (walk-around, engine, interior)',
      'Customer profiles and enquiry history in the admin dashboard',
      'Extra polish and features based on what Billy Cars needs',
    ],
  },
  {
    level: 'Level 3',
    name: 'Full Platform',
    tagline: 'A complete car-sales system with live chat, analytics and global payments.',
    price: '$850',
    inherits: 'Everything in Level 2, plus',
    highlight: true,
    features: [
      'Live chat system between customers and your sales team',
      'Live visitor counter and traffic analytics',
      'Sales dashboard: orders, revenue, best-selling cars',
      'Payments: crypto, Chinese payments (Alipay, WeChat Pay), cards, bank transfer and more',
      'Customers can upload videos and pictures, and request specific cars',
      '1 full year of support for any issue with the website',
      'Custom features on request: if it can be built, we build it',
    ],
  },
];

const flow = [
  { title: 'Customer finds a car', text: 'From Google, social media or a shared link.' },
  { title: 'Sees photos and video', text: 'Full details on a fast, mobile-friendly page.' },
  { title: 'Chats or pays', text: 'WhatsApp, live chat or direct online payment.' },
  { title: 'You track it all', text: 'Leads, sales and visitors in one dashboard.' },
];

const Check = () => (
  <svg className="w-5 h-5 mt-0.5 shrink-0 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

export default function BillyCarsPackages() {
  return (
    <section id="billy-cars" className="scroll-mt-24">
      {/* Intro */}
      <div className="max-w-3xl mb-12 md:mb-16">
        <p className="text-xs uppercase tracking-[0.2em] text-blue-400 mb-4">Proposal for Billy Cars</p>
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white tracking-tight">
          Sell more cars online, your way.
        </h1>
        <p className="text-base md:text-lg text-gray-400 leading-relaxed mt-5">
          This website is a live example of what we build. Below are three levels for Billy Cars. Start with
          the one that fits today and upgrade as the business grows. Every level builds on the one before.
        </p>
      </div>

      {/* Levels */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-6 items-stretch">
        {levels.map((l) => (
          <div
            key={l.level}
            className={`relative flex flex-col rounded-2xl border p-6 sm:p-8 backdrop-blur-sm transition-colors ${
              l.highlight
                ? 'border-blue-500/60 bg-gray-900/60 shadow-2xl shadow-blue-900/20'
                : 'border-gray-800 bg-gray-900/50 hover:border-gray-600'
            }`}
          >
            {l.highlight && (
              <span className="absolute -top-3 left-6 bg-blue-600 text-white text-[11px] font-semibold uppercase tracking-wider rounded-full px-3 py-1">
                Most complete
              </span>
            )}

            <p className="text-xs uppercase tracking-[0.2em] text-blue-400">{l.level}</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mt-2">{l.name}</h2>
            <p className="text-sm text-gray-400 leading-relaxed mt-3 min-h-[3.5rem]">{l.tagline}</p>

            <div className="mt-6">
              <p className="text-xs text-gray-500 uppercase tracking-wider">Starting from</p>
              <p className="text-3xl sm:text-4xl font-bold text-white mt-1 tracking-tight">{l.price}</p>
              <p className="text-xs text-gray-500 mt-1">One-time payment (USD)</p>
            </div>

            <div className="h-px bg-gray-800 my-6" />

            {l.inherits && <p className="text-sm font-medium text-gray-300 mb-4">{l.inherits}</p>}

            <ul className="space-y-3 text-sm text-gray-300 flex-1">
              {l.features.map((f) => (
                <li key={f} className="flex items-start gap-2.5">
                  <Check />
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            <Link
              href="/booking"
              className={`mt-8 text-center text-sm font-semibold rounded-lg py-3.5 transition-colors ${
                l.highlight
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : 'bg-white text-gray-950 hover:bg-gray-200'
              }`}
            >
              Book a call about {l.level}
            </Link>
          </div>
        ))}
      </div>

      {/* Third-party costs note */}
      <p className="text-xs sm:text-sm text-gray-500 mt-6 max-w-3xl leading-relaxed">
        Prices are in US dollars and cover design and development. Third-party running costs such as the
        domain, hosting, video storage and payment-provider fees are paid directly by Billy Cars to those
        providers, and we will advise you on the cheapest options.
      </p>

      {/* How it works */}
      <div className="mt-16 md:mt-24">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8">How it works for your customers.</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {flow.map((s, i) => (
            <div key={s.title} className="rounded-xl border border-gray-800 bg-gray-900/50 backdrop-blur-sm p-5">
              <span className="text-sm font-bold text-blue-400">0{i + 1}</span>
              <h3 className="text-white font-semibold mt-2">{s.title}</h3>
              <p className="text-sm text-gray-400 mt-1.5 leading-relaxed">{s.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="mt-16 md:mt-24 rounded-2xl border border-gray-800 bg-gray-900/50 backdrop-blur-sm p-8 md:p-12 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-white">Not sure which level fits?</h2>
        <p className="text-gray-400 mt-3 max-w-xl mx-auto text-sm sm:text-base">
          Book a free 30-minute call. We&apos;ll look at how Billy Cars sells today and recommend the right
          starting point.
        </p>
        <Link
          href="/booking"
          className="inline-block mt-6 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-full px-7 py-3.5 transition-colors"
        >
          Book a discovery call
        </Link>
      </div>
    </section>
  );
}