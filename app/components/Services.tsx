import Container from './Container';

const services = [
  { title: 'Full Stack Development', desc: 'End-to-end web applications built with Next.js, Node, and robust database architectures.' },
  { title: 'UI/UX Design', desc: 'Thoughtful, user-centric interfaces that convert visitors into loyal customers.' },
  { title: 'Content Generation', desc: 'Strategic copy and content solutions that align perfectly with your digital presence.' },
  { title: 'Brand & Logo Design', desc: 'Memorable brand identities that capture the essence of your business.' },
];

export default function Services() {
  return (
    <section id="services" className="scroll-mt-24 py-12 md:py-16">
      <Container>
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 md:mb-8">What We Do.</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
          {services.map((service) => (
            <div
              key={service.title}
              className="p-5 md:p-6 bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl hover:border-gray-600 transition-colors"
            >
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">{service.title}</h3>
              <p className="text-gray-400 text-sm sm:text-base">{service.desc}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}