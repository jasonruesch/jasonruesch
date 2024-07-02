import { NavLink } from 'react-router-dom';
import { twJoin, twMerge } from 'tailwind-merge';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },

  { name: 'Blank', href: '/blank' }, // TODO: Remove this
];

interface NavProps {
  className?: string;
}

export const Nav = ({ className }: NavProps) => {
  return (
    <nav className={twMerge('flex items-center space-x-4', className)}>
      {navigation.map((item) => (
        <NavLink
          key={item.name}
          to={item.href}
          className={({ isActive }) =>
            twJoin(
              isActive
                ? ''
                : 'text-neutral-500 hover:text-neutral-400 dark:text-neutral-400 dark:hover:text-neutral-300',
              'focus-visible:outline-none focus-visible:text-neutral-400 dark:focus-visible:text-neutral-300',
            )
          }
        >
          {item.name}
        </NavLink>
      ))}
    </nav>
  );
};
