import { Navigate, Outlet, useLocation } from 'react-router-dom';

export const AuthLayout = () => {
  const location = useLocation();
  const authLogin = localStorage.getItem('authenticated');
  console.log('AUTH', location.pathname);

  return authLogin ? <Outlet /> : <Navigate to="/login" replace state={{ from: location }} />;
};
