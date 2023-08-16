import { useEffect } from 'react';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';

export const NonAuthLayout = () => {
  const authLogin = localStorage.getItem('authenticated');
  const navigate = useNavigate();
  let location = useLocation();

  useEffect(() => {
    if (authLogin) {
      navigate('/dashboard');
    }
    if (location.pathname === '/') {
      navigate('/login');
    }
  }, [authLogin, navigate, location.pathname]);
  return <Outlet />;
};
