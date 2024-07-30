import { createContext, useEffect, useState } from 'react';

import { getPageIndex, navigateEventChannel } from '../utils';

export interface WillNavigateValue {
  slideRight: boolean;
  skipAnimations?: boolean;
}

export const WillNavigateContext = createContext<WillNavigateValue>({
  slideRight: false,
  skipAnimations: false,
});

export const useNavigateEvents = () => {
  const [willNavigateValue, setWillNavigateValue] = useState<WillNavigateValue>(
    {
      slideRight: false,
      skipAnimations: false,
    },
  );

  useEffect(() => {
    const unsubscribeOnWillNavigate = navigateEventChannel.on(
      'onWillNavigate',
      ({ page, pageIndex, pathname }) => {
        const currentPageIndex = getPageIndex(pathname);
        const slideRight = currentPageIndex > pageIndex;
        setWillNavigateValue({
          slideRight,
          skipAnimations: page?.skipAnimations,
        });
      },
    );

    return () => {
      unsubscribeOnWillNavigate();
    };
  }, []);

  return willNavigateValue;
};
