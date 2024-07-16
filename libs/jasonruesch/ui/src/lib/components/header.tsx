import { motion, useScroll, useTransform } from 'framer-motion';
import { twMerge } from 'tailwind-merge';

import { useMediaQuery } from '../hooks';
import { useAnimateHeader } from '../hooks/use-animate-header';
import { Logo } from './logo';
import { Nav } from './nav';
import { PageNavLink } from './page-nav-link';

interface HeaderProps {
  className?: string;
}

export const Header = ({ className }: HeaderProps) => {
  const darkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const { scrollY } = useScroll();
  const backgroundColor = useTransform(
    scrollY,
    [0, 56],
    [
      `rgb(from ${darkMode ? 'var(--color-neutral-950)' : 'var(--color-white)'} r g b / 0)`,
      `rgb(from ${darkMode ? 'var(--color-neutral-950)' : 'var(--color-white)'} r g b / 1)`,
    ],
  );
  const boxShadow = useTransform(
    scrollY,
    [0, 56],
    [
      `0 0 0 0 rgb(0 0 0 / 0)`,
      `0 1px 2px 0 rgb(0 0 0 / ${darkMode ? 1 : 0.05})`,
    ],
  );
  const scope = useAnimateHeader();

  return (
    <motion.header
      ref={scope}
      className={twMerge(
        'px-safe-offset-4 fixed z-10 flex h-20 w-full flex-col items-center gap-x-4 gap-y-2 py-2 lg:h-14 lg:flex-row',
        className,
      )}
      style={{
        backgroundColor,
        boxShadow,
      }}
    >
      <PageNavLink to="/" className="inline-block" aria-label="Jason Ruesch">
        <Logo className="size-8" />
      </PageNavLink>

      <Nav />
    </motion.header>
  );
};
