import { use } from 'react';
import { twJoin, twMerge } from 'tailwind-merge';

import { pages, primaryNavPages } from '../data';
import { FlagsContext } from '../hooks';
import { PageNavLink } from './page-nav-link';

interface MobileNavProps {
  className?: string;
  onItemSelect?: () => void;
}

export const MobileNav = ({ className, onItemSelect }: MobileNavProps) => {
  const [flags] = use(FlagsContext);
  const navigation = flags.showAllNavigation
    ? pages
    : primaryNavPages(flags.showHiddenNavigation);

  return (
    <nav className={twMerge('space-y-2', className)}>
      {navigation.map((page) => (
        <PageNavLink
          key={page.href}
          to={page.href}
          className={({ isActive }) =>
            twJoin(
              isActive
                ? 'bg-cyan-300 dark:bg-violet-700'
                : 'hover:bg-neutral-300 dark:hover:bg-neutral-700',
              'focus-visible:bg-neutral-300 focus-visible:outline-none dark:focus-visible:bg-neutral-700',
              '-mx-safe-offset-4 px-safe-offset-4 block py-2 font-semibold leading-7 text-neutral-900 dark:text-neutral-50',
            )
          }
          onClick={onItemSelect}
        >
          {page.name}
        </PageNavLink>
      ))}
    </nav>
  );
};
