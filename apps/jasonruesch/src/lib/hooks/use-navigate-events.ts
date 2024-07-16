import { createContext, useEffect, useState } from 'react';

import { getPageIndex, navigateEventChannel } from '../utils';

export interface WillNavigateValue {
  slideRight: boolean;
}

export const WillNavigateContext = createContext<WillNavigateValue>({
  slideRight: false,
});

export const useNavigateEvents = () => {
  const [willNavigateValue, setWillNavigateValue] = useState<WillNavigateValue>(
    {
      slideRight: false,
    },
  );

  useEffect(() => {
    const unsubscribeOnWillNavigate = navigateEventChannel.on(
      'onWillNavigate',
      ({ pageIndex, pathname }) => {
        const currentPageIndex = getPageIndex(pathname);
        const slideRight = currentPageIndex > pageIndex;
        setWillNavigateValue({ slideRight });
      },
    );

    return () => {
      unsubscribeOnWillNavigate();
    };
  }, []);

  return willNavigateValue;
};
