import { use } from 'react';
import { twJoin, twMerge } from 'tailwind-merge';

import { loginPage, logoutPage, pages, primaryNavPages } from '../data';
import { AuthContext, FeatureFlagsContext, findFeatureFlag } from '../hooks';
import { PageNavLink } from './page-nav-link';

interface NavProps {
  className?: string;
}

export const Nav = ({ className }: NavProps) => {
  const [flags] = use(FeatureFlagsContext);
  const allNavigation = findFeatureFlag(flags, 'all_navigation');
  const hiddenNavigation = findFeatureFlag(flags, 'hidden_navigation');
  const { authenticated } = use(AuthContext);
  const navigation = allNavigation?.enabled
    ? pages.concat(authenticated ? [logoutPage] : [loginPage])
    : primaryNavPages(hiddenNavigation?.enabled, authenticated);

  return (
    <nav className={twMerge('flex items-center space-x-2', className)}>
      {navigation.map((page) => (
        <PageNavLink
          key={page.href}
          to={page.href}
          className={({ isActive }) =>
            twJoin(
              'py-2.5 px-1',
              isActive
                ? 'text-cyan-700 dark:text-violet-400'
                : 'text-neutral-600 dark:text-neutral-400',
              'hover:text-neutral-700 dark:hover:text-neutral-300',
              'focus-visible:text-neutral-700 dark:focus-visible:text-neutral-300',
            )
          }
        >
          {page.name}
        </PageNavLink>
      ))}
    </nav>
  );
};
