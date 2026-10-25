import Link from 'next/link';
import Container from './Container';

export default function Hero() {
  return (
    <section className="pt-16 pb-12 sm:pt-24 md:py-40 text-center md:text-left">
      <Container>
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-5 md:mb-6 tracking-tight leading-[1.1]">
          Engineering reliable software <br className="hidden md:block" />
          with clean architecture.
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl mx-auto md:mx-0 mb-8 md:mb-10">
          We are a collective of engineering graduates building modern web applications, tools, and scalable digital products for businesses that demand excellence.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center md:justify-start">
          <Link
            href="/billy-cars"
            className="bg-white text-gray-950 px-6 py-3.5 rounded-md font-semibold text-center hover:bg-gray-200 transition-colors"
          >
            Billy Cars Quotation
          </Link>
          <Link
            href="/#portfolio"
            className="border border-gray-700 bg-gray-950/30 backdrop-blur-sm text-white px-6 py-3.5 rounded-md font-semibold text-center hover:bg-gray-800/60 transition-colors"
          >
            See Our Work
          </Link>
        </div>
      </Container>
    </section>
  );
}