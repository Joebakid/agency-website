import Link from 'next/link';

interface NavProps {
  isMobile?: boolean;
  onLinkClick?: () => void;
}

const links = [
  { name: 'Trust & EOI', href: '/#trust' },
  { name: 'Our Story', href: '/#about' },
  { name: 'Services', href: '/#services' },
  { name: 'Work', href: '/#portfolio' },
  { name: 'Team', href: '/compliance' },
];

export default function Nav({ isMobile = false, onLinkClick }: NavProps) {
  if (isMobile) {
    return (
      <nav className="md:hidden flex flex-col border-t border-gray-800 mt-2 pb-5 text-base font-medium text-gray-300">
        {links.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            onClick={onLinkClick}
            className="py-3.5 border-b border-gray-800/60 hover:text-white transition-colors"
          >
            {link.name}
          </Link>
        ))}
        <Link
          href="/booking"
          onClick={onLinkClick}
          className="mt-5 bg-blue-600 hover:bg-blue-700 text-white text-center rounded-lg py-3 transition-colors"
        >
          Book a Meeting
        </Link>
      </nav>
    );
  }

  return (
    <nav className="hidden md:flex gap-6 lg:gap-8 text-sm font-medium text-gray-400">
      {links.map((link) => (
        <Link key={link.name} href={link.href} className="hover:text-white transition-colors">
          {link.name}
        </Link>
      ))}
    </nav>
  );
}