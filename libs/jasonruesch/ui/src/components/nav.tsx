import clsx from 'clsx';
import { NavLink } from 'react-router-dom';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Projects', href: '/projects' },
  { name: 'Contact', href: '/contact' },
];

export interface NavProps {
  className?: string;
}

export const Nav = ({ className }: NavProps) => {
  return (
    <nav className={clsx('flex items-center justify-end', className)}>
      <div className="flex items-center gap-4 uppercase text-neutral-500 dark:text-neutral-400">
        {navigation.map((link) => (
          <NavLink
            key={link.href}
            to={link.href}
            className={({ isActive }) =>
              clsx(
                'hover:text-primary-600 dark:hover:text-primary-500',
                isActive ? 'text-primary-500 dark:text-primary-400' : '',
              )
            }
          >
            {link.name}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};
