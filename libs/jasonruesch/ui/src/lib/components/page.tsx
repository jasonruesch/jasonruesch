import { motion } from 'framer-motion';
import { use } from 'react';
import { twMerge } from 'tailwind-merge';

import { useSearchParams } from 'react-router-dom';
import { pageScrollVariants, pageVariants } from '../animations';
import { WillNavigateContext } from '../hooks';
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

  return (
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
        className="px-safe-offset-4 flex min-h-dvh flex-col"
        initial={false}
        animate="animate"
        exit="exit"
        variants={pageScrollVariants}
      >
        <div className={twMerge('grow pt-16', contentClassName)}>
          {children}
        </div>

        {!transparent ? (
          <footer className="flex flex-col items-center justify-center gap-1 pt-10 pb-6 text-sm text-neutral-600 sm:flex-row dark:text-neutral-400">
            <span>
              &copy; {new Date().getFullYear()} Jason Ruesch. All rights
              reserved.
            </span>
            <span className="hidden sm:flex">&bull;</span>
            <div className="flex items-center gap-1">
              <span>v{packageVersion}</span>
              <span>&bull;</span>
              <PageNavLink to="/privacy">Privacy Policy</PageNavLink>
            </div>
          </footer>
        ) : null}
      </motion.div>
    </motion.div>
  );
};
