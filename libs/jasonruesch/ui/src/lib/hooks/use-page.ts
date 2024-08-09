import { use, useEffect } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

import { getPage, navigateEventChannel } from '../utils';
import { AuthContext } from './use-auth';
import { NavigationContext } from './use-navigation';

export const usePage = () => {
  const [searchParams] = useSearchParams();
  const stageAnimations = searchParams.get('stage') === 'true';
  const { slideRight, skipAnimations } = use(NavigationContext);
  const { authenticated } = use(AuthContext);
  const navigate = useNavigate();
  const backgroundSlot = document.getElementById('background');
  const { pathname } = useLocation();
  const page = getPage(pathname);

  useEffect(() => {
    if (page?.authenticated && !authenticated) {
      navigateEventChannel.emit('onWillNavigate', { skipAnimations: true });
      navigate('/');
    }
  }, [page, authenticated, navigate]);

  useEffect(() => {
    if (skipAnimations?.current) {
      navigateEventChannel.emit('onWillNavigate', { skipAnimations: false });
    }
  }, [skipAnimations]);

  return {
    page,
    stageAnimations,
    slideRight: slideRight?.current ?? false,
    skipAnimations: skipAnimations?.current ?? false,
    backgroundSlot,
    authenticated,
  };
};
