import Container from './Container';

const services = [
  { title: 'Full Stack Development', desc: 'End-to-end web applications built with Next.js, Node, and robust database architectures.' },
  { title: 'UI/UX Design', desc: 'Thoughtful, user-centric interfaces that convert visitors into loyal customers.' },
  { title: 'Content Generation', desc: 'Strategic copy and content solutions that align perfectly with your digital presence.' },
  { title: 'Brand & Logo Design', desc: 'Memorable brand identities that capture the essence of your business.' }
];

export default function Services() {
  return (
    <section id="services" className="scroll-mt-24">
      <Container>
        <h2 className="text-3xl font-bold text-white mb-8">What We Do.</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, idx) => (
            <div key={idx} className="p-6 bg-gray-900 border border-gray-800 rounded-xl hover:border-gray-600 transition-colors">
              <h3 className="text-xl font-semibold text-white mb-2">{service.title}</h3>
              <p className="text-gray-400">{service.desc}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
