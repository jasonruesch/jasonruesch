import clsx from 'clsx';
import { NavLink } from 'react-router-dom';

export interface NavProps {
  className?: string;
}

export const Nav = ({ className }: NavProps) => {
  return (
    <nav className={clsx('flex items-center justify-end', className)}>
      <div className="flex items-center gap-4 uppercase text-neutral-500 dark:text-neutral-400">
        <NavLink
          to="/"
          className={({ isActive }) =>
            clsx(
              'hover:text-primary-600 dark:hover:text-primary-500',
              isActive ? 'text-primary-500 dark:text-primary-400' : ''
            )
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            clsx(
              'hover:text-primary-600 dark:hover:text-primary-500',
              isActive ? 'text-primary-500 dark:text-primary-400' : ''
            )
          }
        >
          About
        </NavLink>
        <NavLink
          to="/contact"
          className={({ isActive }) =>
            clsx(
              'hover:text-primary-600 dark:hover:text-primary-500',
              isActive ? 'text-primary-500 dark:text-primary-400' : ''
            )
          }
        >
          Contact
        </NavLink>
      </div>
    </nav>
  );
};
