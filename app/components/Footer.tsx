import Container from './Container';
import Logo from './Logo';

export default function Footer() {
  return (
    <footer className="mt-24 bg-gray-900 border-t border-gray-800 text-white rounded-t-[3rem] sm:rounded-t-[4rem] relative overflow-hidden pb-8">
      {/* Subtle Grid Background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '100px 100px',
          backgroundPosition: 'center top'
        }}
      ></div>

      <Container className="relative z-10 pt-24 pb-16 flex flex-col items-center">
        {/* Heading Section with Star Decorations */}
        <div className="text-center relative w-full max-w-5xl mx-auto px-4">
          {/* Left Star */}
          <svg className="absolute bottom-4 left-0 md:left-12 w-6 h-6 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0l2.5 8.5L23 11l-8.5 2.5L12 22l-2.5-8.5L1 11l8.5-2.5z" />
          </svg>

          <h2 className="text-5xl md:text-7xl lg:text-[7rem] font-bold leading-[1.1] tracking-tight">
            Work Inquiry?<br />
            Send a message
          </h2>

          {/* Right Star */}
          <svg className="absolute top-0 right-0 md:right-12 w-10 h-10 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0l2.5 8.5L23 11l-8.5 2.5L12 22l-2.5-8.5L1 11l8.5-2.5z" />
          </svg>
        </div>

        {/* Blue CTA Button */}
        <div className="mt-16 md:mt-24 w-full max-w-4xl">
          <a href="#contact" className="bg-blue-600 text-white rounded-full flex items-center justify-between p-2 pl-8 sm:pl-12 hover:scale-[1.02] transition-transform duration-300 w-full group shadow-lg shadow-blue-900/20">
            <span className="text-3xl sm:text-5xl lg:text-6xl font-medium tracking-tight">
              Let's <span className="italic underline decoration-2 underline-offset-4 text-blue-200">Discuss & Start.</span>
            </span>
            <div className="bg-gray-950 text-blue-400 p-4 sm:p-6 lg:p-8 rounded-full group-hover:bg-black group-hover:text-blue-300 transition-colors">
              <svg className="w-8 h-8 sm:w-10 sm:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>
          </a>
        </div>
      </Container>

      {/* Bottom Bar Section */}
      <div className="relative z-10 border-t border-gray-800 mt-12 pt-8">
        <Container>
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">

            {/* Left: Brand Text Logo */}
            <Logo />

            {/* Center: Social Icons */}
            <div className="flex gap-8">
              {/* Twitter/X */}
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              {/* LinkedIn */}
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                 <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
              </a>
              {/* Instagram */}
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                 <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
            </div>

            {/* Right: Links */}
            <div className="flex gap-6 text-sm font-medium">
              <a href="/compliance" className="text-gray-400 hover:text-white transition-colors">Licenses & Policy</a>
              <a href="#contact" className="text-gray-400 hover:text-white transition-colors">Contact Us</a>
            </div>

          </div>
        </Container>
      </div>

      {/* Floating WhatsApp Button */}
      <a href="https://wa.me/your_number_here" target="_blank" rel="noreferrer" className="absolute bottom-8 right-8 md:right-12 z-20 hover:scale-110 transition-transform">
        <div className="bg-blue-600 rounded-full p-3 shadow-lg shadow-blue-900/30">
           <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
             <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
           </svg>
        </div>
      </a>
    </footer>
  );
}
