import Hero from './components/Hero';
import Trust from './components/Trust';
import About from './components/About';
import Services from './components/Services';
import Portfolio from './components/Portfolio';

export default function Home() {
  return (
    <div className="flex flex-col gap-24 pb-24">
      <Hero />
      <Trust />
      <About />
      <Services />
      <Portfolio />
    </div>
  );
}
