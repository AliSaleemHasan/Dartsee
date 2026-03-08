import type { ReactNode } from 'react';
import { Header } from '../Header';
import { Navigation } from '../Navigation';

interface PageShellProps {
  children: ReactNode;
  /** Tailwind classes applied to the `<main>` element. */
  className?: string;
}

/**
 * Wraps every page with the shared Header + Navigation + a `<main>` block.
 * Keeps layout concerns out of individual pages.
 */
export function PageShell({ children, className = 'px-8 py-8' }: PageShellProps) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Navigation />
      <main className={className}>{children}</main>
    </div>
  );
}
