import Container from './Container';

export default function About() {
  return (
    <section id="about" className="scroll-mt-24 py-12 md:py-16">
      <Container>
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-5 md:mb-6">Our Origins.</h2>
        <div className="max-w-3xl text-gray-400 space-y-4">
          <p className="text-base sm:text-lg leading-relaxed">
            Bawo Digital didn&apos;t start in a boardroom; it started in a university lab. As engineering students, we bonded over a shared passion for solving complex, practical problems with code. What began as collaborative university projects quickly evolved into building reliable software for real-world clients.
          </p>
          <p className="text-base sm:text-lg leading-relaxed">
            Because we started together in school, our team chemistry is unmatched. We bring academic rigor to full-stack development, combining clean architecture with thoughtful user experiences. We aren&apos;t just developers; we are engineers who understand how to build systems that scale.
          </p>
        </div>
      </Container>
    </section>
  );
}