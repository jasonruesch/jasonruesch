import { createContext, useEffect, useState } from 'react';

import { getPageIndex, navigateEventChannel } from '../utils';

export interface WillNavigateValue {
  slideRight: boolean;
  skipAnimations?: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => {};

export const WillNavigateContext = createContext<
  readonly [WillNavigateValue, (partial: Partial<WillNavigateValue>) => void]
>([
  {
    slideRight: false,
    skipAnimations: false,
  },
  noop,
]);

export const useNavigateEvents = () => {
  const [willNavigateValue, setWillNavigateValue] = useState<WillNavigateValue>(
    {
      slideRight: false,
      skipAnimations: false,
    },
  );

  const updateWillNavigateValue = (partial: Partial<WillNavigateValue>) => {
    setWillNavigateValue((prev) => ({
      ...prev,
      ...partial,
    }));
  };

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

  return [willNavigateValue, updateWillNavigateValue] as const;
};
