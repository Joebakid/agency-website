import { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

export default function Container({ children, className = '' }: ContainerProps) {
  return (
    <div className={`w-[85%] md:w-[70%] mx-auto ${className}`}>
      {children}
    </div>
  );
}
