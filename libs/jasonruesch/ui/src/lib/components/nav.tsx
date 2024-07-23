import { useFlags } from 'flagsmith/react';
import { use } from 'react';
import { twJoin, twMerge } from 'tailwind-merge';

import { pages, primaryNavPages } from '../data';
import { FeatureFlagsContext, findFeatureFlag } from '../hooks';
import { PageNavLink } from './page-nav-link';

interface NavProps {
  className?: string;
}

export const Nav = ({ className }: NavProps) => {
  const flags = useFlags(['all_navigation', 'hidden_navigation']);
  const [featureFlags] = use(FeatureFlagsContext);
  const navigation =
    flags.all_navigation.enabled ||
    findFeatureFlag(featureFlags, 'all_navigation')?.enabled
      ? pages
      : primaryNavPages(
          flags.hidden_navigation.enabled ||
            findFeatureFlag(featureFlags, 'hidden_navigation')?.enabled,
        );

  return (
    <nav className={twMerge('flex items-center space-x-4', className)}>
      {navigation.map((page) => (
        <PageNavLink
          key={page.href}
          to={page.href}
          className={({ isActive }) =>
            twJoin(
              isActive
                ? 'text-cyan-700 dark:text-violet-400'
                : 'text-neutral-600 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-300',
              'focus-visible:text-neutral-700 focus-visible:outline-none dark:focus-visible:text-neutral-300',
            )
          }
        >
          {page.name}
        </PageNavLink>
      ))}
    </nav>
  );
};
