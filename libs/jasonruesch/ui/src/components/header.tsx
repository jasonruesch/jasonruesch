import clsx from 'clsx';
import { useAnimate } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { headerAnimations } from './animations';
import { Logo } from './logo';
import { Nav } from './nav';

export interface HeaderProps {
  scrolled: boolean;
}

export function Header({ scrolled }: HeaderProps) {
  const { pathname } = useLocation();
  const [scope, animate] = useAnimate();
  const [previousPathname, setPreviousPathname] = useState(pathname);

  useEffect(() => {
    if (previousPathname !== pathname) {
      setPreviousPathname(pathname);
    }
  }, [previousPathname, pathname]);

  useEffect(() => {
    const startAnimation = async () => {
      console.debug('[Header] startAnimation');

      await animate(
        scope.current,
        headerAnimations.out.keyFrames,
        headerAnimations.out.options,
      );
      await animate(
        scope.current,
        headerAnimations.in.keyFrames,
        headerAnimations.in.options,
      );
    };

    if (previousPathname !== pathname) {
      startAnimation();
    }
  }, [previousPathname, pathname, scope, animate]);

  return (
    <header
      ref={scope}
      className={clsx(
        'px-safe-offset-4 lg:px-safe-offset-8 fixed inset-x-0 z-20 flex h-20 flex-col items-center gap-2 py-2 transition-shadow lg:h-16 lg:flex-row',
        scrolled
          ? 'bg-neutral-50 shadow-sm dark:bg-neutral-900 dark:shadow-black'
          : 'bg-transparent',
      )}
    >
      <div className="flex flex-1 items-center leading-none">
        <Link to="/" aria-hidden="true" className="inline-block">
          <Logo className="h-8 w-8" />
        </Link>
      </div>

      <Nav className="flex-1" />
    </header>
  );
}
