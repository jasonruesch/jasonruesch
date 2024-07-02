import { twMerge } from 'tailwind-merge';

import { Nav } from './nav';

interface HeaderProps {
  className?: string;
}

export const Header = ({ className }: HeaderProps) => {
  return (
    <header
      className={twMerge(
        'z-10 fixed w-full px-4 flex items-center h-14 border-b border-solid border-transparent',
        'animate-header [animation-timeline:scroll()] [animation-range:0_var(--spacing-14)]',
        'dark:animate-header-dark dark:[animation-timeline:scroll()] dark:[animation-range:0_var(--spacing-14)]',
        className,
      )}
    >
      <Nav />
    </header>
  );
};
