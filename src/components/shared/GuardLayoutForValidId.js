import { Navigate, Outlet, useParams } from 'react-router-dom';

export const GuardLayoutForValidId = () => {
  let { id } = useParams();
  const tempUsers = JSON.parse(localStorage.getItem('STUSERS') || '[]');
  const tempUser = tempUsers.find((item) => item.id === id);

  return tempUser ? <Outlet /> : <Navigate to="/users" />;
};
