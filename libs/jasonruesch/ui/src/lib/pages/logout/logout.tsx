import { use, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthContext, WillNavigateContext } from '../../hooks';

export function Logout() {
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
