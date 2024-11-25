import { useAnimate } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router';

import { headerAnimations } from '../animations';

export const useAnimateHeader = (skipAnimations = false) => {
  const [searchParams] = useSearchParams();
  const stageAnimations = searchParams.get('stage') === 'true';
  const { pathname } = useLocation();
  const [scope, animate] = useAnimate();
  const [previousPathname, setPreviousPathname] = useState(pathname);

  useEffect(() => {
    if (previousPathname !== pathname) {
      setPreviousPathname(pathname);
    }
  }, [previousPathname, pathname]);

  useEffect(() => {
    const startAnimation = async () => {
      console.debug('[Header] startAnimation');

      await animate(
        scope.current,
        headerAnimations.out.keyFrames,
        headerAnimations.out.options,
      );
      await animate(
        scope.current,
        headerAnimations.in.keyFrames,
        headerAnimations.in.options,
      );
    };

    if (!skipAnimations && previousPathname !== pathname) {
      startAnimation();
    }
  }, [previousPathname, pathname, scope, skipAnimations, animate]);

  useEffect(() => {
    if (stageAnimations) {
      animate(
        scope.current,
        headerAnimations.out.keyFrames,
        headerAnimations.out.options,
      );
    }
  }, [stageAnimations, scope, animate]);

  return scope;
};
