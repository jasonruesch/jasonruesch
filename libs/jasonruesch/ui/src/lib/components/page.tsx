import { motion } from 'framer-motion';
import { use } from 'react';
import { twMerge } from 'tailwind-merge';

import { createPortal } from 'react-dom';
import { useSearchParams } from 'react-router-dom';
import { pageScrollVariants, pageVariants } from '../animations';
import { WillNavigateContext } from '../hooks';
import { Background } from './background';
import { PageNavLink } from './page-nav-link';

interface PageProps {
  children?: React.ReactNode;
  transparent?: boolean;
  className?: string;
  contentClassName?: string;
}

export const Page = ({
  children,
  transparent,
  className,
  contentClassName,
}: PageProps) => {
  const [searchParams] = useSearchParams();
  const stageAnimations = searchParams.get('stage') === 'true';
  const { slideRight } = use(WillNavigateContext);
  const packageVersion = import.meta.env.PACKAGE_VERSION;
  const backgroundSlot = document.getElementById('background');

  return (
    <>
      {backgroundSlot
        ? createPortal(<Background fixed={transparent} />, backgroundSlot)
        : null}

      <motion.div
        className={twMerge(
          transparent ? '' : 'bg-neutral-50 dark:bg-neutral-900',
          className,
        )}
        initial="initial"
        animate="animate"
        exit="exit"
        custom={{ transparent, slideRight, stageAnimations }}
        variants={pageVariants}
      >
        <motion.div
          className="flex min-h-dvh flex-col"
          initial={false}
          animate="animate"
          exit="exit"
          variants={pageScrollVariants}
        >
          <div
            className={twMerge('px-safe-offset-4 grow pt-16', contentClassName)}
          >
            {children}
          </div>

          {!transparent ? (
            <footer className="px-safe-offset-4 pb-safe-offset-4 sm:pb-safe-offset-4 flex flex-col items-center justify-center pt-2 text-sm text-neutral-600 sm:flex-row sm:gap-x-1 sm:pt-6 sm:text-base dark:text-neutral-400">
              <span>
                &copy; {new Date().getFullYear()} Jason Ruesch. All rights
                reserved.
              </span>
              <span className="hidden sm:flex">&bull;</span>
              <div className="flex items-center gap-x-1">
                <span>v{packageVersion}</span>
                <span>&bull;</span>
                <PageNavLink to="/privacy">Privacy Policy</PageNavLink>
              </div>
            </footer>
          ) : null}
        </motion.div>
      </motion.div>
    </>
  );
};
