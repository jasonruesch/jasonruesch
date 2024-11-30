import { use, useEffect } from 'react';
import { useNavigate } from 'react-router';

import { AuthContext, WillNavigateContext } from '@jasonruesch/jasonruesch-ui';

export async function clientLoader() {
  return {
    title: 'Logout',
  };
}

export default function Logout() {
  const { logout } = use(AuthContext);
  const [, setWillNavigateValue] = use(WillNavigateContext);
  const navigate = useNavigate();

  useEffect(() => {
    logout();
    setWillNavigateValue({ skipAnimations: true });
    navigate('/');
  }, [logout, setWillNavigateValue, navigate]);

  return null;
}
