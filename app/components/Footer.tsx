import Container from './Container';
import Logo from './Logo';

const WHATSAPP_NUMBER = '2349037291405'; 
const EMAIL_ADDRESS = 'josephbawo@gmail.com';

const star = 'M12 0l2.5 8.5L23 11l-8.5 2.5L12 22l-2.5-8.5L1 11l8.5-2.5z';

export default function Footer() {
  return (
    <footer className="mt-16 md:mt-24 bg-gray-900/70 backdrop-blur-sm border-t border-gray-800 text-white rounded-t-[2rem] sm:rounded-t-[4rem] relative overflow-hidden pb-6">
      {/* Subtle grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          backgroundPosition: 'center top',
        }}
      />

      <Container className="relative z-10 pt-14 sm:pt-24 pb-10 sm:pb-16 flex flex-col items-center">
        <div className="text-center relative w-full max-w-5xl mx-auto px-2 sm:px-4">
          <svg className="hidden sm:block absolute bottom-4 left-0 md:left-12 w-6 h-6 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
            <path d={star} />
          </svg>

          <h2 className="text-4xl sm:text-6xl lg:text-[7rem] font-bold leading-[1.1] tracking-tight">
            Work Inquiry?<br />
            Send a message
          </h2>

          <svg className="hidden sm:block absolute top-0 right-0 md:right-12 w-10 h-10 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
            <path d={star} />
          </svg>
        </div>

        <div className="mt-10 sm:mt-16 md:mt-24 w-full max-w-4xl">
          {/* UPDATED: Points to the /booking route instead of /#booking */}
          <a
            href="/booking"
            className="bg-blue-600 text-white rounded-full flex items-center justify-between gap-3 p-1.5 pl-5 sm:p-2 sm:pl-12 hover:scale-[1.02] transition-transform duration-300 w-full group shadow-lg shadow-blue-900/20"
          >
            <span className="text-lg sm:text-4xl lg:text-6xl font-medium tracking-tight leading-tight">
              Let&apos;s <span className="italic underline decoration-2 underline-offset-4 text-blue-200">Discuss &amp; Start.</span>
            </span>
            <div className="bg-gray-950 text-blue-400 p-3 sm:p-6 lg:p-8 rounded-full shrink-0 group-hover:bg-black group-hover:text-blue-300 transition-colors">
              <svg className="w-6 h-6 sm:w-10 sm:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>
          </a>
        </div>
      </Container>

      {/* Bottom bar */}
      <div className="relative z-10 border-t border-gray-800 pt-8 pb-16 sm:pb-4">
        <Container>
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <Logo />

            <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-sm font-medium">
              <a 
                href={`https://wa.me/${WHATSAPP_NUMBER}`} 
                target="_blank" 
                rel="noreferrer" 
                className="text-gray-400 hover:text-blue-400 transition-colors flex items-center gap-2"
              >
                WhatsApp: 09037291405
              </a>
              <a 
                href={`mailto:${EMAIL_ADDRESS}`} 
                className="text-gray-400 hover:text-blue-400 transition-colors flex items-center gap-2"
              >
                Email: {EMAIL_ADDRESS}
              </a>
            </div>

            <div className="flex gap-6 text-sm font-medium">
              <a href="/compliance" className="text-gray-400 hover:text-white transition-colors">Licenses &amp; Policy</a>
              <a href={`mailto:${EMAIL_ADDRESS}`} className="text-gray-400 hover:text-white transition-colors">Contact Us</a>
            </div>
          </div>
        </Container>
      </div>

      {/* Floating WhatsApp Widget */}
      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}`}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-5 right-5 sm:bottom-8 sm:right-8 z-40 hover:scale-110 transition-transform"
      >
        <div className="bg-green-500 rounded-full p-3 shadow-lg shadow-green-900/40">
          <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
          </svg>
        </div>
      </a>
    </footer>
  );
}