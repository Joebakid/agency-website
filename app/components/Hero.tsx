import Container from './Container';

export default function Hero() {
  return (
    <section className="pt-32 pb-16 text-center md:text-left md:py-40">
      <Container>
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
          Engineering reliable software <br className="hidden md:block" />
          with clean architecture.
        </h1>
        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mb-10">
          We are a collective of engineering graduates building modern web applications, tools, and scalable digital products for businesses that demand excellence.
        </p>
        <div className="flex gap-4 justify-center md:justify-start">
          <a href="#trust" className="bg-white text-gray-950 px-6 py-3 rounded-md font-semibold hover:bg-gray-200 transition-colors">
            View Expression of Interest
          </a>
          <a href="#portfolio" className="border border-gray-700 text-white px-6 py-3 rounded-md font-semibold hover:bg-gray-800 transition-colors">
            See Our Work
          </a>
        </div>
      </Container>
    </section>
  );
}
