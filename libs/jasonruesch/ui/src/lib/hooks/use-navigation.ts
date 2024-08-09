import { createContext, useEffect, useRef } from 'react';

import { getPageIndex, navigateEventChannel } from '../utils';

export const NavigationContext = createContext<{
  slideRight?: React.RefObject<boolean>;
  skipAnimations?: React.RefObject<boolean>;
}>({});

export const useNavigation = () => {
  const slideRight = useRef(false);
  const skipAnimations = useRef(false);

  useEffect(() => {
    const unsubscribeOnWillNavigate = navigateEventChannel.on(
      'onWillNavigate',
      ({ pageIndex, pathname, skipAnimations: skip }) => {
        if (pageIndex !== undefined && pathname) {
          const currentPageIndex = getPageIndex(pathname);
          const right = currentPageIndex > pageIndex;
          slideRight.current = right;
        }

        if (skip !== undefined) skipAnimations.current = skip;
      },
    );

    return () => {
      unsubscribeOnWillNavigate();
    };
  }, [skipAnimations]);

  return { slideRight, skipAnimations };
};
