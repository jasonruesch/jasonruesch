import { motion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';

import { pageVariants } from '../animations';
// import { useMediaQuery } from '../hooks';

// interface CustomVariantData {
//   darkMode: boolean;
// }

// const blankPageVariants: Variants = {
//   initial: ({ darkMode }: CustomVariantData) => ({
//     backgroundColor: darkMode
//       ? 'var(--color-neutral-900)'
//       : 'var(--color-neutral-50)',
//   }),
//   animate: ({ darkMode }: CustomVariantData) => ({
//     // Must use transparent hex code to animate background color
//     backgroundColor: darkMode
//       ? 'var(--color-transparent-black)'
//       : 'var(--color-transparent-white)',
//     transition: { duration: 0.5 },
//   }),
//   exit: ({ darkMode }: CustomVariantData) => ({
//     backgroundColor: darkMode
//       ? 'var(--color-neutral-900)'
//       : 'var(--color-neutral-50)',
//     transition: { duration: 0.25 },
//   }),
// };

interface BlankPageProps {
  children?: React.ReactNode;
  className?: string;
}

export const BlankPage = ({ children, className }: BlankPageProps) => {
  // const darkMode = useMediaQuery('(prefers-color-scheme: dark)');

  return (
    <motion.div
      className={twMerge('px-safe-offset-4 min-h-dvh py-16', className)}
      initial="initial"
      animate="animate"
      exit="exit"
      // custom={{ darkMode }}
      // variants={blankPageVariants}
      custom={{ transparent: true, slideRight: false, stageAnimations: false }}
      variants={pageVariants}
    >
      <div
        dangerouslySetInnerHTML={{
          __html: '<!-- This is a blank page -->',
        }}
      />
      {children}
    </motion.div>
  );
};
