import { twJoin, twMerge } from 'tailwind-merge';

import { pages } from '../data';
import { PageNavLink } from './page-nav-link';

const navigation = pages.filter((page) => page.type === 'primary');

interface NavProps {
  className?: string;
}

export const Nav = ({ className }: NavProps) => {
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
