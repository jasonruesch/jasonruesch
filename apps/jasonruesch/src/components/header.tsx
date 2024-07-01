import clsx from 'clsx';
import { NavLink } from 'react-router-dom';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

export const Header = () => {
  return (
    <header
      className={clsx(
        'z-10 fixed w-full px-4 flex items-center h-14 border-b border-solid border-transparent',
        'animate-header [animation-timeline:scroll()] [animation-range:0_var(--spacing-14)]',
        'dark:animate-header-dark dark:[animation-timeline:scroll()] dark:[animation-range:0_var(--spacing-14)]',
      )}
    >
      <nav className="flex items-center space-x-4">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            className={({ isActive }) =>
              clsx(
                isActive
                  ? 'text-fuchsia-600 dark:text-teal-500'
                  : 'text-cyan-600 hover:text-cyan-500 dark:text-violet-500 dark:hover:text-violet-400',
              )
            }
          >
            {item.name}
          </NavLink>
        ))}
      </nav>
    </header>
  );
};
