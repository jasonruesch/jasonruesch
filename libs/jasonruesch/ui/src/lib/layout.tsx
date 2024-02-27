import clsx from 'clsx';
import { AnimatePresence, useAnimate } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Link, useLocation, useOutlet } from 'react-router-dom';
import { Background, Logo, Nav, headerAnimations } from '../components';

export const AnimatedOutlet = ({ context }: { context?: unknown }) => {
  const o = useOutlet(context);
  const [outlet] = useState(o);

  return outlet;
};

export function Layout() {
  const { pathname } = useLocation();
  const [scope, animate] = useAnimate();
  const [scrollPosition, setScrollPosition] = useState(0);
  const [previousPathname, setPreviousPathname] = useState(pathname);

  const handleScroll = () => {
    const position = window.scrollY;
    setScrollPosition(position);
  };

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

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <Background />

      <div className="py-safe">
        <header
          ref={scope}
          className={clsx(
            'px-safe-offset-4 lg:px-safe-offset-8 fixed inset-x-0 z-20 flex h-14 items-center transition-shadow lg:h-16',
            scrollPosition > 0
              ? 'bg-neutral-50 shadow-sm dark:bg-neutral-900 dark:shadow-black'
              : 'bg-transparent',
          )}
        >
          <div className="flex-1 leading-none">
            <Link to="/" aria-hidden="true" className="inline-block">
              <Logo className="h-8 w-8" />
            </Link>
          </div>

          <Nav className="flex-1" />
        </header>

        <AnimatePresence initial={false}>
          <AnimatedOutlet key={pathname} />
        </AnimatePresence>
      </div>
    </>
  );
}

export default Layout;
