import { motion } from 'framer-motion';
import { use } from 'react';
import { createPortal } from 'react-dom';
import { useSearchParams } from 'react-router-dom';
import { twJoin, twMerge } from 'tailwind-merge';

import { pageScrollVariants, pageVariants } from '../animations';
import { WillNavigateContext } from '../hooks';
import { Background } from './background';
import { Footer } from './footer';
import { PageBackground } from './page-background';

import styles from './background-gradients.module.css';

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
  // const pageRef = useRef<HTMLDivElement>(null);
  const [searchParams] = useSearchParams();
  const { slideRight } = use(WillNavigateContext);

  const stageAnimations = searchParams.get('stage') === 'true';
  const backgroundSlot = document.getElementById('background');

  // const handleAnimationComplete = (definition: string) => {
  //   if (definition === 'animate') {
  //     setTimeout(() => {
  //       if (pageRef.current) pageRef.current.style.transform = 'none';
  //     }, 100);
  //   }
  // };

  return (
    <>
      {backgroundSlot
        ? createPortal(<Background fixed={transparent} />, backgroundSlot)
        : null}

      <motion.div
        // ref={pageRef}
        className={twMerge(
          'relative',
          transparent ? '' : 'bg-neutral-50 dark:bg-neutral-900',
          transparent ? '' : styles['background-top'],
          className,
        )}
        initial="initial"
        animate="animate"
        exit="exit"
        custom={{ transparent, slideRight, stageAnimations }}
        variants={pageVariants}
        // onAnimationComplete={handleAnimationComplete}
      >
        <motion.div
          className={twJoin(
            'relative flex min-h-dvh flex-col',
            transparent ? '' : styles['background-bottom'],
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
              'px-safe-offset-4 relative z-10 grow pt-16 pb-2',
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
