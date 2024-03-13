import { fadePageAnimationVariants } from '../animations';

export const usePage = () => {
  const packageVersion = import.meta.env.PACKAGE_VERSION;
  const transparent = false;
  const slideRight = false;
  const {
    pageContentVariants,
    pageFooterVariants,
    pageScrollVariants,
    pageVariants,
    // } = slidePageAnimationVariants;
  } = fadePageAnimationVariants;

  return {
    packageVersion,
    transparent,
    slideRight,
    pageContentVariants,
    pageFooterVariants,
    pageScrollVariants,
    pageVariants,
  };
};
