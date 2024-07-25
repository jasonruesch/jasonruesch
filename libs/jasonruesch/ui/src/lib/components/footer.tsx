import { PageNavLink } from './page-nav-link';

export const Footer = () => {
  const packageVersion = import.meta.env.PACKAGE_VERSION;

  return (
    <footer className="px-safe-offset-4 pb-safe-offset-3 sm:pb-safe-offset-5 flex flex-col items-center justify-center pt-3 text-sm text-neutral-600 sm:flex-row sm:gap-x-1 sm:pt-5 sm:text-base dark:text-neutral-400">
      <span>
        &copy; {new Date().getFullYear()} Jason Ruesch. All rights reserved.
      </span>
      <span className="hidden sm:flex">&bull;</span>
      <div className="flex items-center gap-x-1">
        <span>v{packageVersion}</span>
        <span>&bull;</span>
        <PageNavLink to="/privacy">Privacy Policy</PageNavLink>
      </div>
    </footer>
  );
};
