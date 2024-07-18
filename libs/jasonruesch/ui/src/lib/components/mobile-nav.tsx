import { twJoin, twMerge } from 'tailwind-merge';

import { pages } from '../data';
import { PageNavLink } from './page-nav-link';

const navigation = pages.filter((page) => page.type === 'primary');

interface MobileNavProps {
  className?: string;
  onItemSelect?: () => void;
}

export const MobileNav = ({ className, onItemSelect }: MobileNavProps) => {
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
              '-mx-4 block py-2 px-4 font-semibold leading-7 text-neutral-900 dark:text-neutral-50',
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
