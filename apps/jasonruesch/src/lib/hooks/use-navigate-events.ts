import { createContext, useEffect, useState } from 'react';

import { getPage, navigateEventChannel } from '../utils';

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
      ({ page, pathname }) => {
        if (page) {
          const currentPage = getPage(pathname);
          const currentPageIndex = currentPage?.index as number;
          const slideRight = currentPageIndex > page.index;
          setWillNavigateValue({ slideRight });
        }
      },
    );

    return () => {
      unsubscribeOnWillNavigate();
    };
  }, []);

  return willNavigateValue;
};
