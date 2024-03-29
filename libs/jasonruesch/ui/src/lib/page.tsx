import clsx from 'clsx';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { usePage } from '../hooks';

const stageAnimations = false; // Used for testing what the page looks like during animations

export interface PageProps {
  children?: ReactNode;
  transparent?: boolean;
}

export function Page({ children, transparent }: PageProps) {
  const {
    packageVersion,
    slideRight,
    pageContentVariants,
    pageFooterVariants,
    pageScrollVariants,
    pageVariants,
  } = usePage({ transparent });

  return (
    <motion.div
      className="flex min-h-dvh flex-1 flex-col"
      initial="initial"
      animate="animate"
      exit="exit"
      custom={{ transparent, slideRight, stageAnimations }}
      variants={pageVariants}
    >
      <motion.div
        className={clsx(
          'px-safe-offset-4 lg:px-safe-offset-8 py-safe z-10 flex flex-1 flex-col',
          transparent ? 'bg-transparent' : 'bg-neutral-50 dark:bg-neutral-900',
        )}
        initial={false}
        animate="animate"
        exit="exit"
        variants={pageScrollVariants}
        transition={{ duration: 0 }}
      >
        <motion.main
          className="mt-20 flex flex-1 flex-col py-4 lg:mt-16"
          initial="initial"
          animate="animate"
          exit="exit"
          variants={pageContentVariants}
        >
          {children}
        </motion.main>

        {!transparent ? (
          <motion.footer
            className="flex flex-col items-center justify-center gap-1 py-4 text-sm text-neutral-400 sm:flex-row dark:text-neutral-300"
            initial="initial"
            animate="animate"
            exit="exit"
            custom={{ stageAnimations }}
            variants={pageFooterVariants}
          >
            <span>
              &copy; {new Date().getFullYear()} Jason Ruesch. All rights
              reserved.
            </span>
            <span className="hidden sm:flex">&bull;</span>
            <div className="flex items-center gap-1">
              <span>v{packageVersion}</span>
              <span>&bull;</span>
              <Link
                to="/privacy"
                className="text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-500"
              >
                Privacy Policy
              </Link>
            </div>
          </motion.footer>
        ) : null}
      </motion.div>
    </motion.div>
  );
}
