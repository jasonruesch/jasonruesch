import clsx from 'clsx';
import { Link } from 'react-router-dom';

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
        <Link
          to="/"
          className="text-blue-600 hover:text-blue-500 dark:text-blue-500 dark:hover:text-blue-400"
        >
          Home
        </Link>
        <Link
          to="/about"
          className="text-blue-600 hover:text-blue-500 dark:text-blue-500 dark:hover:text-blue-400"
        >
          About
        </Link>
      </nav>
    </header>
  );
};
