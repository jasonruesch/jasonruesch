import { use } from 'react';
import { twJoin, twMerge } from 'tailwind-merge';

import { pages, primaryNavPages } from '../data';
import { AuthContext, FeatureFlagsContext, findFeatureFlag } from '../hooks';
import { PageNavLink } from './page-nav-link';

interface MobileNavProps {
  className?: string;
  onItemSelect?: () => void;
}

export const MobileNav = ({ className, onItemSelect }: MobileNavProps) => {
  const [flags] = use(FeatureFlagsContext);
  const allNavigation = findFeatureFlag(flags, 'all_navigation');
  const hiddenNavigation = findFeatureFlag(flags, 'hidden_navigation');
  const { authenticated, logout } = use(AuthContext);
  const navigation = allNavigation?.enabled
    ? pages
    : primaryNavPages(hiddenNavigation?.enabled, authenticated);

  return (
    <nav className={twMerge('space-y-2', className)}>
      {navigation.map((page) => (
        <PageNavLink
          key={page.href}
          to={page.href}
          className={({ isActive }) =>
            twJoin(
              '-mx-safe-offset-4 px-safe-offset-4 block py-2 font-semibold leading-7 text-neutral-900 dark:text-neutral-50',
              isActive ? 'bg-cyan-300 dark:bg-violet-700' : '',
              'hover:bg-neutral-300 dark:hover:bg-neutral-700',
              'focus-visible:bg-neutral-300 dark:focus-visible:bg-neutral-700',
            )
          }
          onClick={onItemSelect}
        >
          {page.name}
        </PageNavLink>
      ))}
      {authenticated ? (
        <button
          type="button"
          className="-mx-safe-offset-4 px-safe-offset-4 block py-2 font-semibold leading-7 text-neutral-900 hover:bg-neutral-300 focus-visible:bg-neutral-300 dark:text-neutral-50 dark:hover:bg-neutral-700 dark:focus-visible:bg-neutral-700"
          onClick={logout}
        >
          Sign Out
        </button>
      ) : null}
    </nav>
  );
};
