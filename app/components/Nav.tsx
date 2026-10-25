import Link from 'next/link';

interface NavProps {
  isMobile?: boolean;
  onLinkClick?: () => void;
}

export default function Nav({ isMobile = false, onLinkClick }: NavProps) {
  const linkStyles = "hover:text-white transition-colors";

  const navStyles = isMobile
    ? "md:hidden flex flex-col gap-4 pt-4 pb-6 text-sm font-medium text-gray-400 border-t border-gray-800 mt-2"
    : "hidden md:flex gap-8 text-sm font-medium text-gray-400";

  const links = [
    { name: "Trust & EOI", href: "#trust" },
    { name: "Our Story", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Work", href: "#portfolio" },
  ];

  return (
    <nav className={navStyles}>
      {links.map((link) => (
        <Link
          key={link.name}
          href={link.href}
          onClick={onLinkClick}
          className={linkStyles}
        >
          {link.name}
        </Link>
      ))}
    </nav>
  );
}
