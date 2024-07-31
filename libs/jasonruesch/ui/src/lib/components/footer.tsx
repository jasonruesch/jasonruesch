import { twMerge } from 'tailwind-merge';

import { PageNavLink } from './page-nav-link';

export interface FooterProps {
  className?: string;
}

export const Footer = ({ className }: FooterProps) => {
  const packageVersion = import.meta.env.PACKAGE_VERSION;

  return (
    <footer
      className={twMerge(
        'px-safe-offset-4 mb-safe flex h-14 flex-col items-center justify-center text-sm text-neutral-600 sm:flex-row sm:gap-x-1 sm:text-base dark:text-neutral-400',
        className,
      )}
    >
      <span
        role="complementary"
        aria-label={`Copyright ${new Date().getFullYear()} Jason Ruesch. All rights reserved.`}
      >
        <span aria-hidden="true">
          &copy; {new Date().getFullYear()} Jason Ruesch. All rights reserved.
        </span>
      </span>
      <span className="hidden sm:flex" aria-hidden="true">
        &bull;
      </span>
      <div className="flex items-center gap-x-1">
        <span role="complementary" aria-label={`Version ${packageVersion}`}>
          <span aria-hidden="true">v{packageVersion}</span>
        </span>
        <span aria-hidden="true">&bull;</span>
        <PageNavLink to="/privacy">Privacy Policy</PageNavLink>
      </div>
    </footer>
  );
};
