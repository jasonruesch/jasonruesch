import { useAnimate } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { headerAnimations } from '../animations';

export const useAnimateHeader = () => {
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

    if (previousPathname !== pathname) {
      startAnimation();
    }
  }, [previousPathname, pathname, scope, animate]);

  return scope;
};
