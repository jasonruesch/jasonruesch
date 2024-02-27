import { AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useLocation, useOutlet } from 'react-router-dom';
import { Background, Header } from '../components';

export const AnimatedOutlet = ({ context }: { context?: unknown }) => {
  const o = useOutlet(context);
  const [outlet] = useState(o);

  return outlet;
};

export function Layout() {
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;

      if (position === 0) setScrolled(false);
      else if (!scrolled && position > 0) setScrolled(true);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  return (
    <>
      <Background />

      <div className="py-safe">
        <Header scrolled={scrolled} />

        <AnimatePresence initial={false}>
          <AnimatedOutlet key={pathname} />
        </AnimatePresence>
      </div>
    </>
  );
}

export default Layout;
