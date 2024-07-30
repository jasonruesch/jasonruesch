import { PageMeta } from '../models';
import { eventbus } from './event-bus';

type NavigateBus = {
  onWillNavigate: (payload: {
    page?: PageMeta;
    pageIndex: number;
    pathname: string;
  }) => void;

  onNavigateStart: () => void;
  onNavigateEnd: () => void;
};

export const navigateEventChannel = eventbus<NavigateBus>();
