import type { Metadata } from 'next';
import Link from 'next/link';
import Container from '../components/Container';
import BackButton from '../components/BackButton';

export const metadata: Metadata = {
  title: 'Licenses & Policy',
  description:
    'Bawo Digital licenses, privacy policy, terms of service, payment terms, intellectual property and support commitments.',
  alternates: { canonical: '/policy' },
  openGraph: { url: '/policy' },
};

const EMAIL = 'josephbawo@gmail.com';
const UPDATED = 'October 26, 2026';

type Section = { id: string; title: string; intro?: string; points: string[] };

const sections: Section[] = [
  {
    id: 'licenses',
    title: 'Licenses & credentials',
    intro: 'Who we are and what we are qualified to do.',
    points: [
      'Bawo Digital is a digital agency run by three B.Eng Marine Engineering graduates working in software development, design and branding.',
      // Only keep the next line if the business is formally registered (e.g. with the CAC in Nigeria):
      'Business registration details are available on request.',
      'We do not hold any regulated professional licence. Our credentials are our academic degrees and our published work.',
      'Third-party tools we use (hosting, payments, analytics) are licensed to the client or to us under those providers\u2019 own terms.',
    ],
  },
  {
    id: 'privacy',
    title: 'Privacy policy',
    intro: 'We collect as little as we need, and we never sell personal data.',
    points: [
      'What we collect: the name, email address and message you submit through our contact form, and the details you give when you book a call.',
      'How we use it: only to reply to you, schedule meetings and deliver the work you asked for.',
      'Who processes it: our email provider (Resend) delivers contact messages, and Cal.com handles call scheduling. Each has its own privacy policy.',
      'How long we keep it: only as long as needed to handle your enquiry or project, unless the law requires longer.',
      'Your rights: you can ask to see, correct or delete your data at any time by emailing us. We handle data in line with the Nigeria Data Protection Act 2023.',
      'Security: our site uses HTTPS, and we validate and limit what our forms accept.',
    ],
  },
  {
    id: 'terms',
    title: 'Terms of service',
    intro: 'The ground rules for working with us.',
    points: [
      'Each project starts with a written scope that lists the deliverables, timeline and price. Work outside that scope is quoted separately.',
      'Prices are in US dollars unless the quote says otherwise.',
      'Clients provide content, images and approvals on time. Delays on the client side can move the delivery date.',
      'We may show completed work in our portfolio, unless you ask us in writing not to.',
      'Either side can end a project in writing. Work completed up to that point remains payable.',
      'To the extent the law allows, our liability is limited to the amount paid for the project.',
    ],
  },
  {
    id: 'payments',
    title: 'Payments & refunds',
    intro: 'How billing works.',
    points: [
      // Edit these to match what you really offer:
      'Projects are normally paid in stages: a deposit to start, a milestone payment at the demo, and the balance on launch.',
      'Third-party running costs such as the domain, hosting, video storage and payment-provider fees are paid by the client directly to those providers.',
      'The deposit covers work already scheduled and is non-refundable once work has begun.',
      'If we cannot deliver what the scope promised, we will fix it or refund the part of the payment for the undelivered work.',
    ],
  },
  {
    id: 'ip',
    title: 'Intellectual property',
    intro: 'Who owns what.',
    points: [
      'Once the final payment is made, the client owns the custom design and code we wrote for the project.',
      'We keep ownership of our general tools, reusable components and know-how, and grant the client a licence to use them within the project.',
      'Open-source libraries stay under their own licences (for example MIT).',
      'Content, logos and images supplied by the client remain the client\u2019s property, and the client confirms they have the right to use them.',
    ],
  },
  {
    id: 'support',
    title: 'Support & service levels',
    intro: 'What happens after launch.',
    points: [
      'Support periods are stated in each package. For example, the Full Platform package includes one year of support.',
      'Support covers bug fixes, security patches and keeping the delivered features working.',
      'Support does not cover new features, redesigns or problems caused by third-party services we do not control. We quote those separately.',
      'We aim to reply to support requests within one business day.',
    ],
  },
  {
    id: 'cookies',
    title: 'Cookies & third-party services',
    intro: 'What runs in your browser when you visit this site.',
    points: [
      'Language cookies: we save your chosen language so the page opens the way you left it.',
      'Google Translate: when you pick a language other than English, Google\u2019s translation tool loads and processes the page text under Google\u2019s own terms.',
      'Embedded content: the booking calendar (Cal.com), Figma designs and live project previews are provided by those sites and may set their own cookies.',
      'You can clear or block cookies in your browser settings. The site still works, but your language choice will not be remembered.',
    ],
  },
  {
    id: 'contact',
    title: 'Contact & changes',
    points: [
      `Questions about any of this? Email ${EMAIL} or message us on WhatsApp.`,
      `We may update this page as our services change. The date at the top shows the latest version (currently ${UPDATED}).`,
    ],
  },
];

const card = 'bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl';

export default function PolicyPage() {
  return (
    <div className="py-12 md:py-24">
      <Container>
        <BackButton text="Back" fallbackHref="/" />

        {/* Header */}
        <div className="max-w-3xl mb-10 md:mb-14">
          <p className="text-xs uppercase tracking-[0.2em] text-blue-400 mb-4">Legal</p>
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white tracking-tight">
            Licenses &amp; Policy
          </h1>
          <p className="text-base md:text-lg text-gray-400 leading-relaxed mt-5">
            Clear, plain-language rules for how we work, how we handle your data and what you can expect from us.
          </p>
          <p className="text-xs text-gray-500 mt-4">Last updated: {UPDATED}</p>
        </div>

        <div className="lg:grid lg:grid-cols-[220px_1fr] lg:gap-12">
          {/* Contents: sticky on desktop, scrolling chips on mobile */}
          <aside className="mb-8 lg:mb-0">
            <nav
              aria-label="Page contents"
              className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 lg:sticky lg:top-28"
            >
              {sections.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="whitespace-nowrap text-sm text-gray-400 hover:text-white border border-gray-800 lg:border-0 lg:border-l-2 lg:border-gray-800 lg:hover:border-blue-500 rounded-full lg:rounded-none px-4 py-2 lg:py-1.5 lg:px-4 transition-colors"
                >
                  {s.title}
                </a>
              ))}
            </nav>
          </aside>

          {/* Sections */}
          <div className="space-y-5 md:space-y-6">
            {sections.map((s, i) => (
              <section key={s.id} id={s.id} className={`${card} p-6 sm:p-8 scroll-mt-28`}>
                <p className="text-xs font-bold text-blue-400 mb-2">0{i + 1}</p>
                <h2 className="text-xl sm:text-2xl font-bold text-white">{s.title}</h2>
                {s.intro && <p className="text-gray-400 mt-2 text-sm sm:text-base">{s.intro}</p>}
                <ul className="mt-5 space-y-3 text-sm sm:text-base text-gray-300">
                  {s.points.map((p) => (
                    <li key={p} className="flex items-start gap-3 leading-relaxed">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </section>
            ))}

            {/* CTA */}
            <div className={`${card} p-8 text-center`}>
              <h2 className="text-xl sm:text-2xl font-bold text-white">Need something clarified?</h2>
              <p className="text-gray-400 mt-2 text-sm sm:text-base">
                Ask before you sign. We are happy to walk through any of this on a call.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center mt-6">
                <Link
                  href="/booking"
                  className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-full px-6 py-3 transition-colors"
                >
                  Book a call
                </Link>
                <Link
                  href="/compliance"
                  className="border border-gray-700 hover:bg-gray-800/60 text-white text-sm font-semibold rounded-full px-6 py-3 transition-colors"
                >
                  Meet the team
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
