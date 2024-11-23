import { motion } from 'framer-motion';
import { createPortal } from 'react-dom';
import { twJoin, twMerge } from 'tailwind-merge';

import { pageScrollVariants, pageVariants } from '../animations';
import { usePage } from '../hooks';
import { Background } from './background';
import { Footer } from './footer';
import { PageBackground } from './page-background';

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
  const {
    page,
    stageAnimations,
    slideRight,
    skipAnimations,
    backgroundSlot,
    authenticated,
  } = usePage();

  return page?.authenticated && !authenticated ? null : (
    <>
      {backgroundSlot
        ? createPortal(
            <Background fixed={transparent || stageAnimations} />,
            backgroundSlot,
          )
        : null}

      <motion.div
        className={twMerge(
          'relative',
          transparent ? '' : 'bg-neutral-50 dark:bg-neutral-900',
          transparent
            ? ''
            : '[&]:[background-image:url("/backgrounds/top-light.svg")] [&]:[background-position:top_left] [&]:[background-repeat:repeat-x] [&]:[background-size:64px]',
          transparent
            ? ''
            : 'dark:[&]:[background-image:url("/backgrounds/top-dark.svg")]',
          transparent ? '' : 'sm:[&]:[background-size:96px]',
          className,
        )}
        initial="initial"
        animate="animate"
        exit="exit"
        custom={{ transparent, slideRight, stageAnimations, skipAnimations }}
        variants={pageVariants}
      >
        <motion.div
          className={twJoin(
            'relative flex min-h-dvh flex-col',
            transparent
              ? ''
              : '[&]:[background-image:url("/backgrounds/bottom-light.svg")] [&]:[background-position:bottom_left] [&]:[background-repeat:repeat-x] [&]:[background-size:64px]',
            transparent
              ? ''
              : 'dark:[&]:[background-image:url("/backgrounds/bottom-dark.svg")]',
            transparent ? '' : 'sm:[&]:[background-size:96px]',
          )}
          initial={false}
          animate="animate"
          exit="exit"
          variants={pageScrollVariants}
        >
          {transparent ? null : (
            <PageBackground className="text-neutral-200/50 sm:text-neutral-200 dark:text-neutral-950" />
          )}

          <div
            className={twMerge(
              'px-safe-offset-4 relative z-10 grow pb-2 pt-16',
              contentClassName,
            )}
          >
            {children}
          </div>

          {!transparent ? <Footer className="z-10" /> : null}
        </motion.div>
      </motion.div>
    </>
  );
};
