import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { usePage } from '../hooks';

const stageAnimations = false; // Used for testing what the page looks like during animations

export interface PageProps {
  children: React.ReactNode;
}

export function Page({ children }: PageProps) {
  const {
    packageVersion,
    transparent,
    slideRight,
    pageContentVariants,
    pageFooterVariants,
    pageScrollVariants,
    pageVariants,
  } = usePage();

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
        className="px-safe-offset-4 lg:px-safe-offset-8 py-safe z-10 flex flex-1 flex-col bg-neutral-50 dark:bg-neutral-900"
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

        <motion.footer
          className="flex flex-col items-center justify-center gap-1 py-4 text-sm text-neutral-400 sm:flex-row dark:text-neutral-300"
          initial="initial"
          animate="animate"
          exit="exit"
          custom={{ stageAnimations }}
          variants={pageFooterVariants}
        >
          <span>
            &copy; {new Date().getFullYear()} Jason Ruesch. All rights reserved.
          </span>
          <span className="hidden sm:flex">&bull;</span>
          <span>v{packageVersion}</span>
          <span className="hidden sm:flex">&bull;</span>
          <Link
            to="/privacy"
            className="text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-500"
          >
            Privacy Policy
          </Link>
        </motion.footer>
      </motion.div>
    </motion.div>
  );
}
