import {
  DOMKeyframesDefinition,
  DynamicAnimationOptions,
  Variants,
} from 'framer-motion';

interface CustomVariantData {
  transparent?: boolean;
  slideRight?: boolean;
  stageAnimations?: boolean;
}

export const duration = 3; // Duration in seconds

export const pageVariants: Variants = {
  initial: ({ transparent, slideRight }: CustomVariantData) => {
    return {
      opacity: 0,
      ...(transparent ? { y: '-100%' } : { x: slideRight ? '-100%' : '100%' }),
      scale: 0.5,
      width: '100dvw',
      height: '100dvh',
      position: 'fixed',
      overflow: 'hidden',
      borderRadius: '2rem',
      // Using a timeline for boxShadow in animate to avoid an issue with initial bleeding into view
      boxShadow: '0 0 0 0 rgb(0 0 0 / 0), 0 0 0 0 rgb(0 0 0 / 0)',
      pointerEvents: 'none',
    };
  },
  animate: ({ transparent, stageAnimations }: CustomVariantData) => {
    if (stageAnimations) {
      return {
        opacity: 1,
        x: 0,
        y: 0,
        scale: 0.5,
        width: '100dvw',
        height: '100dvh',
        position: 'fixed',
        overflow: 'hidden',
        borderRadius: '2rem',
        boxShadow: transparent
          ? '0 0 0 0 rgb(0 0 0 / 0), 0 0 0 0 rgb(0 0 0 / 0)'
          : '0 0 0 1px rgb(0 0 0 / 0.5), 0 25px 50px -12px rgb(0 0 0 / 0.75)',
        pointerEvents: 'none',
      };
    }

    return {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      width: '100%',
      height: '100%',
      position: 'relative',
      overflow: 'visible',
      borderRadius: '0rem',
      // Using a timeline for boxShadow to avoid an issue with initial bleeding into view
      boxShadow: transparent
        ? '0 0 0 0 rgb(0 0 0 / 0), 0 0 0 0 rgb(0 0 0 / 0)'
        : [
            '0 0 0 0 rgb(0 0 0 / 0), 0 0 0 0 rgb(0 0 0 / 0)',
            '0 0 0 0 rgb(0 0 0 / 0), 0 0 0 0 rgb(0 0 0 / 0)',
            '0 0 0 1px rgb(0 0 0 / 0.5), 0 25px 50px -12px rgb(0 0 0 / 0.75)',
            '0 0 0 0 rgb(0 0 0 / 0), 0 0 0 0 rgb(0 0 0 / 0)',
          ],
      pointerEvents: 'auto',
      transition: {
        opacity: {
          duration: 0,
        },
        x: {
          delay: (4 / 10) * duration,
          duration: (3 / 10) * duration,
          type: 'spring',
        },
        y: {
          delay: (4 / 10) * duration,
          duration: (3 / 10) * duration,
          type: 'spring',
        },
        position: { delay: duration },
        overflow: { delay: duration },
        boxShadow: {
          ...(transparent ? {} : { times: [0, 0.4, 0.45, 1] }),
          duration,
          ease: 'backIn',
        },
        pointerEvents: { delay: duration },
        default: {
          delay: (7 / 10) * duration,
          duration: (3 / 10) * duration,
          ease: 'backIn',
        },
      },
    };
  },
  exit: ({ transparent, slideRight }: CustomVariantData) => {
    return {
      opacity: 0,
      ...(transparent ? { y: '-100%' } : { x: slideRight ? '100%' : '-100%' }),
      scale: 0.5,
      width: '100dvw',
      height: '100dvh',
      position: 'fixed',
      overflow: 'hidden',
      borderRadius: '2rem',
      boxShadow: transparent
        ? '0 0 0 0 rgb(0 0 0 / 0), 0 0 0 0 rgb(0 0 0 / 0)'
        : '0 0 0 1px rgb(0 0 0 / 0.5), 0 25px 50px -12px rgb(0 0 0 / 0.75)',
      pointerEvents: 'none',
      transition: {
        opacity: {
          delay: (5 / 10) * duration,
          duration: 0,
        },
        x: {
          delay: (3 / 10) * duration,
          duration: (3 / 10) * duration,
          ease: 'anticipate',
        },
        y: {
          delay: (3 / 10) * duration,
          duration: (3 / 10) * duration,
          ease: 'anticipate',
        },
        scale: { duration: (3 / 10) * duration, ease: 'backOut' },
        borderRadius: { duration: (3 / 10) * duration, ease: 'backOut' },
        default: { duration: 0 },
      },
    };
  },
};

export const pageScrollVariants: Variants = {
  animate: () => {
    return { y: 0, transition: { duration: 0 } };
  },
  exit: () => {
    return { y: `-${window.scrollY}px`, transition: { duration: 0 } };
  },
};

export const headerAnimations = {
  out: {
    keyFrames: { y: '-100%', opacity: 0 } as DOMKeyframesDefinition,
    options: {
      y: {
        duration: (2 / 10) * duration,
        ease: 'easeOut',
      },
      opacity: {
        delay: (2 / 10) * duration,
        duration: 0,
      },
    } as DynamicAnimationOptions,
  },
  in: {
    keyFrames: { y: 0, opacity: 1 } as DOMKeyframesDefinition,
    options: {
      y: {
        delay: (6 / 10) * duration,
        duration: (2 / 10) * duration,
        ease: 'easeIn',
      },
      opacity: {
        delay: (6 / 10) * duration,
        duration: 0,
      },
    } as DynamicAnimationOptions,
  },
};

export const handleAnimationComplete =
  (element: HTMLElement | null) => (definition: string) => {
    if (definition === 'animate') {
      setTimeout(() => {
        if (element) element.style.transform = 'none';
      }, 100);
    }
  };
