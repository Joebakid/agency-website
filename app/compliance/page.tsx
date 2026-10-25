import Container from '../components/Container';
import BackButton from '../components/BackButton';
import DesignGallery from '../components/DesignGallery';

export const metadata = {
  title: 'About, Team & Compliance',
  description:
    'Meet Bawo Digital: an engineering-driven agency of three marine engineering graduates building websites, products and brands.',
  alternates: { canonical: '/compliance' },
  openGraph: { url: '/compliance' },
};

const team = [
  {
    name: 'Joseph Bawo',
    role: 'Full-Stack Developer',
    degree: 'B.Eng Marine Engineering',
    bio: 'Builds the engineering backbone of every project, from fast front ends to the databases and APIs behind them.',
    skills: [
      'React', 'Next.js', 'TypeScript', 'Svelte', 'GSAP', 'Framer Motion',
      'Node.js', 'Express', 'Python', 'Supabase', 'Firebase', 'Neon', 'PocketBase',
    ],
    link: { label: 'View portfolio', href: 'https://www.josephbawo.fun/' },
  },
  {
    name: 'Solomon',
    role: 'Product & Brand Designer',
    degree: 'B.Eng Marine Engineering',
    bio: 'Shapes how products look, feel and speak, from the logo to the interface to the words on the screen.',
    skills: ['Product Design', 'Logo Design', 'UI/UX Design', 'Copywriting', 'Content Creation'],
    link: { label: 'See his work below', href: '#design-work' },
  },
  {
    name: 'Noah',
    role: 'UI/UX & Motion Designer',
    degree: 'B.Eng Marine Engineering',
    bio: 'Designs interfaces and packaging, and brings them to life with polished motion and high-fidelity Framer builds.',
    skills: ['UI/UX Design', 'Product Design', 'Box Design', 'Framer Design', 'Motion Design'],
    link: null,
  },
];

const figmaProjects = [
  {
    name: 'BASE-360',
    url: 'https://www.figma.com/design/ucx0xv09XNYqZKx6Bd6ZGF/BASE-360?node-id=0-1&t=C2Cz9onspic5LP92-1',
  },
  {
    name: "Xander's Mindcraft",
    url: 'https://www.figma.com/design/xC4zmXjjSyRKO3yLMqslbw/Xander-s-mindcraft?t=C2Cz9onspic5LP92-1',
  },
  {
    name: 'Pitch',
    url: 'https://www.figma.com/design/mh3HGaMBKEPgSP9Yqre91g/Pitch?node-id=0-1',
  },
];

const principles = [
  { title: 'Engineering mindset', text: 'We plan, test and build like engineers: structured, measurable and made to hold up under load.' },
  { title: 'Design and code, one team', text: 'Designers and developers work side by side, so what is designed is exactly what ships.' },
  { title: 'Built to be handed over', text: 'Clean structure, clear documentation and full IP transfer, so clients are never locked in.' },
];

const compliance = [
  {
    icon: '🎓',
    title: 'Academic Credentials',
    text: 'Our core team are engineering graduates. What began as an academic initiative has grown into a commercial studio.',
    items: ['B.Eng Marine Engineering (all three founders)', 'Self-driven, hands-on training in software and design'],
  },
  {
    icon: '🏢',
    title: 'Business Entity',
    text: 'Bawo Digital operates as a registered business, so every client engagement is covered by a clear agreement.',
    status: true,
  },
  {
    icon: '🔒',
    title: 'Security Standards',
    text: 'We build systems that scale safely, with client data, authentication and payments handled to modern standards.',
    items: [
      'SSL/TLS encryption on all platforms',
      'Secure API integrations and sanitized databases',
      'Adherence to data protection best practices',
    ],
  },
  {
    icon: '🤝',
    title: 'Service Level Agreements',
    text: 'Every project is backed by a clear SLA covering delivery, support response and ongoing maintenance.',
    items: [
      'Transparent milestone delivery',
      'Dedicated post-launch support periods',
      'Clear IP transfer upon project completion',
    ],
  },
];

const card = 'bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl';

export default function CompliancePage() {
  return (
    <div className="py-12 md:py-24">
      <Container>
        <BackButton text="Back to Home" fallbackHref="/" />

        {/* 1. THE COMPANY */}
        <section className="mb-20 md:mb-28">
          <p className="text-xs uppercase tracking-[0.2em] text-blue-400 mb-4">About Bawo Digital</p>
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white tracking-tight max-w-4xl">
            An engineering-driven studio for brands that want to scale.
          </h1>
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-10 mt-8 md:mt-10">
            <p className="text-base md:text-lg text-gray-400 leading-relaxed">
              Bawo Digital started as an academic project between three friends and grew into a full digital agency.
              We design and build websites, web apps, e-commerce stores and brand identities for businesses that
              need more than a template.
            </p>
            <p className="text-base md:text-lg text-gray-400 leading-relaxed">
              Because we come from engineering, we treat every project as a system: researched, designed, built and
              maintained with care. The result is work that looks sharp, performs fast and keeps working after launch.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4 md:gap-6 mt-10 md:mt-12">
            {principles.map((p) => (
              <div key={p.title} className={`${card} p-6`}>
                <h3 className="text-white font-semibold mb-2">{p.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{p.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 2. THE TEAM */}
        <section className="mb-20 md:mb-28">
          <p className="text-xs uppercase tracking-[0.2em] text-blue-400 mb-4">The team</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight mb-3">The people behind the work.</h2>
          <p className="text-gray-400 max-w-2xl mb-10 md:mb-12">
            Three marine engineering graduates who turned a shared love for technology and design into a studio.
          </p>

          <div className="grid lg:grid-cols-3 gap-4 md:gap-6">
            {team.map((m) => (
              <div key={m.name} className={`${card} p-6 md:p-7 flex flex-col hover:border-gray-600 transition-colors`}>
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center text-xl font-bold text-white mb-5">
                  {m.name[0]}
                </div>
                <h3 className="text-xl font-semibold text-white">{m.name}</h3>
                <p className="text-sm text-blue-400 mt-1">{m.role}</p>
                <p className="text-xs text-gray-500 mt-1">🎓 {m.degree}</p>
                <p className="text-sm text-gray-400 leading-relaxed mt-4">{m.bio}</p>
                <div className="flex flex-wrap gap-2 mt-5">
                  {m.skills.map((s) => (
                    <span key={s} className="text-[11px] text-gray-300 bg-gray-950/70 border border-gray-800 rounded-full px-2.5 py-1">
                      {s}
                    </span>
                  ))}
                </div>
                {m.link && (
                  <a
                    href={m.link.href}
                    {...(m.link.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="mt-auto pt-6 text-sm font-medium text-white hover:text-blue-400 transition-colors"
                  >
                    {m.link.label} →
                  </a>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* 3. DESIGN WORK */}
        <section id="design-work" className="mb-20 md:mb-28 scroll-mt-24">
          <p className="text-xs uppercase tracking-[0.2em] text-blue-400 mb-4">Design work</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight mb-3">Selected designs by Solomon.</h2>
          <p className="text-gray-400 max-w-2xl mb-10 md:mb-12">
            Tap any project to explore the live Figma file. Scroll, zoom and pan around inside it.
          </p>

          <DesignGallery designs={figmaProjects} />
        </section>

        {/* 4. LICENSES & COMPLIANCE */}
        <section>
          <p className="text-xs uppercase tracking-[0.2em] text-blue-400 mb-4">Trust</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight mb-3">Licenses &amp; Compliance</h2>
          <p className="text-gray-400 max-w-3xl mb-10 md:mb-12">
            Transparency and technical rigor are the cornerstones of Bawo Digital. Here is how we operate.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {compliance.map((c) => (
              <div key={c.title} className={`${card} p-6 md:p-8`}>
                <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-3">
                  <span>{c.icon}</span> {c.title}
                </h3>
                <p className="text-gray-400 leading-relaxed mb-4">{c.text}</p>
                {c.items && (
                  <ul className="space-y-3 text-gray-300 text-sm">
                    {c.items.map((i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-blue-400">•</span>
                        <span>{i}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {c.status && (
                  <div className="bg-gray-950/70 p-4 rounded-lg border border-gray-800">
                    <p className="text-sm text-gray-500">
                      Registration Status: <span className="text-green-400 font-medium">Active</span>
                    </p>
                    <p className="text-sm text-gray-500 mt-2">Registration ID: Available upon request</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </Container>
    </div>
  );
}