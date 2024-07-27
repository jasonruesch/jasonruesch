import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { motion, useScroll, useTransform } from 'framer-motion';
import { twMerge } from 'tailwind-merge';

import { Dialog, DialogPanel } from '@headlessui/react';
import { useState } from 'react';
import { useMediaQuery } from '../hooks';
import { useAnimateHeader } from '../hooks/use-animate-header';
import { Logo } from './logo';
import { MobileNav } from './mobile-nav';
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleMobileMenuOpen = (open: boolean) => {
    setMobileMenuOpen(open);
  };

  return (
    <motion.header
      ref={scope}
      className={twMerge(
        'px-safe-offset-4 fixed z-20 flex h-14 w-full items-center gap-x-4',
        className,
      )}
      style={{
        backgroundColor,
        boxShadow,
      }}
    >
      <div className="flex grow lg:hidden">
        <button
          type="button"
          onClick={() => handleMobileMenuOpen(true)}
          className="-m-2.5 rounded-md p-2.5 text-neutral-700 dark:text-neutral-200"
        >
          <span className="sr-only">Open main menu</span>
          <Bars3Icon aria-hidden="true" className="size-6" />
        </button>
      </div>

      <PageNavLink to="/" className="inline-block" aria-label="Jason Ruesch">
        <Logo className="size-8" />
      </PageNavLink>

      <Nav className="hidden lg:flex" />

      <div className="flex grow justify-end lg:hidden">
        <div className="size-6">
          {/* Placeholder for right side of header */}
        </div>
      </div>

      <Dialog
        open={mobileMenuOpen}
        onClose={handleMobileMenuOpen}
        className="lg:hidden"
        aria-label="Main menu"
      >
        <div className="fixed inset-0 z-20" />
        <DialogPanel className="px-safe-offset-4 fixed inset-y-0 z-20 w-full overflow-y-auto bg-white dark:bg-neutral-950">
          <div className="flex h-14 items-center gap-x-4">
            <div className="flex grow">
              <button
                type="button"
                onClick={() => handleMobileMenuOpen(false)}
                className="-m-2.5 rounded-md p-2.5 text-neutral-700 dark:text-neutral-200"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="size-6" />
              </button>
            </div>

            <PageNavLink
              to="/"
              className="inline-block"
              aria-label="Jason Ruesch"
            >
              <Logo className="size-8" />
            </PageNavLink>

            <div className="flex grow justify-end">
              <div className="size-6">
                {/* Placeholder for right side of header */}
              </div>
            </div>
          </div>

          <div className="mt-4">
            <MobileNav onItemSelect={() => handleMobileMenuOpen(false)} />
          </div>
        </DialogPanel>
      </Dialog>
    </motion.header>
  );
};
