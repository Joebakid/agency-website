import Link from 'next/link';

interface LogoProps {
  className?: string;
}

export default function Logo({ className = '' }: LogoProps) {
  return (
    <Link
      href="/"
      className={`font-bold text-xl text-white tracking-tight flex items-center gap-2 hover:opacity-90 transition-opacity ${className}`}
    >
      <div className="bg-blue-600 text-white w-8 h-8 rounded-md flex items-center justify-center font-bold text-lg shadow-sm shadow-blue-900/50">
        B
      </div>
       Digital.
    </Link>
  );
}
