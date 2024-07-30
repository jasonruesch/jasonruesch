import { use, useEffect, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

import { getPage } from '../utils';
import { AuthContext } from './use-auth';
import { WillNavigateContext } from './use-navigate-events';

export const usePage = () => {
  const [searchParams] = useSearchParams();
  const stageAnimations = searchParams.get('stage') === 'true';
  const [
    { slideRight, skipAnimations: skipAnimationsFromContext },
    setWillNavigateValue,
  ] = use(WillNavigateContext);
  const [skipAnimations, setSkipAnimations] = useState(
    searchParams.get('skip') === 'true' || skipAnimationsFromContext,
  );
  const { authenticated } = use(AuthContext);
  const navigate = useNavigate();
  const backgroundSlot = document.getElementById('background');
  const { pathname } = useLocation();
  const page = getPage(pathname);

  useEffect(() => {
    if (page?.authenticated && !authenticated) {
      setWillNavigateValue({ skipAnimations: true });
      navigate('/');
    }
  }, [page, authenticated, setWillNavigateValue, navigate]);

  useEffect(() => {
    if (skipAnimations) {
      setWillNavigateValue({ skipAnimations: false });
      setSkipAnimations(false);
    }
  }, [skipAnimations, setWillNavigateValue]);

  return {
    page,
    stageAnimations,
    slideRight,
    skipAnimations,
    backgroundSlot,
    authenticated,
  };
};
