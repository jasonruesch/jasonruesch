import { slidePageAnimationVariants } from '../animations';

interface PageProps {
  transparent?: boolean;
}

export const usePage = ({ transparent }: PageProps) => {
  const packageVersion = import.meta.env.PACKAGE_VERSION;
  const slideRight = false;
  const {
    pageContentVariants,
    pageFooterVariants,
    pageScrollVariants,
    pageVariants,
  } = slidePageAnimationVariants;
  // } = fadePageAnimationVariants;

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
