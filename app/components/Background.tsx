export default function Background() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-gray-950">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-[#070b16] to-gray-950" />

      {/* Drifting glow orbs */}
      <div
        className="bg-orb absolute -top-40 -left-40 h-[700px] w-[700px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(59,130,246,0.22) 0%, transparent 70%)',
          animation: 'orb-a 22s ease-in-out infinite',
        }}
      />
      <div
        className="bg-orb absolute top-1/3 -right-52 h-[800px] w-[800px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(139,92,246,0.18) 0%, transparent 70%)',
          animation: 'orb-b 28s ease-in-out infinite',
        }}
      />
      <div
        className="bg-orb absolute -bottom-52 left-1/4 h-[700px] w-[700px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(6,182,212,0.14) 0%, transparent 70%)',
          animation: 'orb-c 26s ease-in-out infinite',
        }}
      />

      {/* Grid, fading out toward the edges */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            'linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse 70% 60% at 50% 30%, #000 30%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 50% 30%, #000 30%, transparent 100%)',
        }}
      />

      {/* Top spotlight */}
      <div
        className="absolute inset-x-0 top-0 h-[500px]"
        style={{
          background: 'radial-gradient(ellipse 50% 100% at 50% 0%, rgba(96,165,250,0.12), transparent 70%)',
        }}
      />

      {/* Grain texture */}
      <div
        className="absolute inset-0 opacity-[0.05] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        }}
      />

      {/* Edge vignette */}
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse at center, transparent 55%, rgba(3,7,18,0.7) 100%)' }}
      />
    </div>
  );
}