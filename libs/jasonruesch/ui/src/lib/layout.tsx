import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { Link, Navigate, Route, Routes } from 'react-router-dom';
import { Logo, Nav } from '../components';
import About from './about/about';
import Contact from './contact/contact';
import Home from './home/home';
import Privacy from './privacy/privacy';

export function Layout() {
  const packageVersion = import.meta.env.PACKAGE_VERSION;

  const [scrollPosition, setScrollPosition] = useState(0);
  const handleScroll = () => {
    const position = window.scrollY;
    setScrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="flex min-h-dvh flex-col py-safe">
      <header
        className={clsx(
          'fixed inset-x-0 z-20 flex h-14 items-center transition-shadow px-safe-offset-4 lg:h-16 lg:px-safe-offset-8',
          scrollPosition > 0
            ? 'bg-neutral-50 shadow-sm dark:bg-neutral-900 dark:shadow-black'
            : 'bg-transparent'
        )}
      >
        <div className="flex-1 leading-none">
          <Link to="/" aria-hidden="true" className="inline-block">
            <Logo className="h-8 w-8" />
          </Link>
        </div>

        <Nav className="flex-1" />
      </header>

      <main className="mt-14 flex flex-1 flex-col py-4 px-safe-offset-4 lg:mt-16 lg:px-safe-offset-8">
        <Routes>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="privacy" element={<Privacy />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>

      <footer className="flex flex-col items-center justify-center gap-1 py-4 px-safe-offset-4 sm:flex-row lg:px-safe-offset-8 text-sm">
        <span className="text-center text-neutral-400 dark:text-neutral-300">
          &copy; {new Date().getFullYear()} Jason Ruesch. All rights reserved.
        </span>
        <Link
          to="/privacy"
          className="text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-500"
        >
          Privacy Policy
        </Link>
        <span className="text-neutral-400 dark:text-neutral-300">&bull;</span>
        <span className="text-neutral-400 dark:text-neutral-300">
          v{packageVersion}
        </span>
      </footer>
    </div>
  );
}

export default Layout;
