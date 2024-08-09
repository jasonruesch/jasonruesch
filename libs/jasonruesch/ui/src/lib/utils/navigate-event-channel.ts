import { eventbus } from './event-bus';

type NavigateBus = {
  onWillNavigate: (payload: {
    pageIndex?: number;
    pathname?: string;
    skipAnimations?: boolean;
  }) => void;

  onNavigateStart: () => void;
  onNavigateEnd: () => void;
};

export const navigateEventChannel = eventbus<NavigateBus>();
