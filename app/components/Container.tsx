import { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

export default function Container({ children, className = '' }: ContainerProps) {
  return (
    <div className={`w-[90%] md:w-[85%] lg:w-[75%] max-w-6xl mx-auto ${className}`}>
      {children}
    </div>
  );
}