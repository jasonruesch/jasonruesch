import { motion } from 'framer-motion';
import { use } from 'react';
import { twJoin, twMerge } from 'tailwind-merge';

import { createPortal } from 'react-dom';
import { useSearchParams } from 'react-router-dom';
import { pageScrollVariants, pageVariants } from '../animations';
import { WillNavigateContext } from '../hooks';
import { Background } from './background';
import { Footer } from './footer';

import styles from './page.module.css';

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
  const backgroundSlot = document.getElementById('background');

  return (
    <>
      {backgroundSlot
        ? createPortal(<Background fixed={transparent} />, backgroundSlot)
        : null}

      <motion.div
        className={twMerge(
          transparent ? '' : styles['background-top'],
          className,
        )}
        initial="initial"
        animate="animate"
        exit="exit"
        custom={{ transparent, slideRight, stageAnimations }}
        variants={pageVariants}
      >
        <motion.div
          className={twJoin(
            'flex min-h-dvh flex-col',
            transparent ? '' : styles['background-bottom'],
          )}
          initial={false}
          animate="animate"
          exit="exit"
          variants={pageScrollVariants}
        >
          <div
            className={twMerge(
              'px-safe-offset-4 grow pt-16 pb-2',
              contentClassName,
            )}
          >
            {children}
          </div>

          {!transparent ? <Footer /> : null}
        </motion.div>
      </motion.div>
    </>
  );
};
