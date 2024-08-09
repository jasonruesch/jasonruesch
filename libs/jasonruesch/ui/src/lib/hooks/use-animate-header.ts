import { useAnimate } from 'framer-motion';
import { use, useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';

import { headerAnimations } from '../animations';
import { NavigationContext } from './use-navigation';

export const useAnimateHeader = () => {
  const [searchParams] = useSearchParams();
  const stageAnimations = searchParams.get('stage') === 'true';
  const { skipAnimations } = use(NavigationContext);
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

    if (!skipAnimations?.current && previousPathname !== pathname) {
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
