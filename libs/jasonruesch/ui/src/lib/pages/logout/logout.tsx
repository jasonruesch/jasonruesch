import { use, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from '../../hooks';

export function Logout() {
  const { logout } = use(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    logout();
    navigate('/');
  }, [logout, navigate]);

  return null;
}
