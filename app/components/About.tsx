import Container from './Container';

export default function About() {
  return (
    <section id="about" className="scroll-mt-24">
      <Container>
        <h2 className="text-3xl font-bold text-white mb-6">Our Origins.</h2>
        <div className="prose prose-invert max-w-3xl text-gray-400">
          <p className="text-lg leading-relaxed">
            Bawo Digital didn't start in a boardroom; it started in a university lab. As engineering students, we bonded over a shared passion for solving complex, practical problems with code. What began as collaborative university projects quickly evolved into building reliable software for real-world clients.
          </p>
          <p className="text-lg leading-relaxed mt-4">
            Because we started together in school, our team chemistry is unmatched. We bring academic rigor to full-stack development, combining clean architecture with thoughtful user experiences. We aren't just developers; we are engineers who understand how to build systems that scale.
          </p>
        </div>
      </Container>
    </section>
  );
}
