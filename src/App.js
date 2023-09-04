import * as React from 'react';
import { Routes, Route, useLocation, useParams } from 'react-router-dom';
import { Login } from './pages/login/Login';
import { List } from './pages/users/List';
import { AddEdit } from './pages/users/AddEdit';
import { Register } from './pages/register/Register';
import { Dashboard } from './pages/dashboard/Dashboard';
import { View } from './pages/users/View';
import { Header } from './layouts/Header';
import { Footer } from './layouts/Footer';
import { AuthLayout } from './layouts/AuthLayout';
import { NonAuthLayout } from './layouts/NonAuthLayout';
import { GuardLayoutForValidId } from './components/shared/GuardLayoutForValidId';
import NotFound from './pages/404/NotFound';

function App() {
  const location = useLocation();

  const routesWithHeaderAndFooter = [
    '/',
    '/login',
    '/register',
    '/users',
    '/dashboard',
    '/users/add',
    '/users/edit/*',
    '/users/view/*'
  ];

  const shouldShowHeaderAndFooter = () => {
    const currentPath = location.pathname;

    return routesWithHeaderAndFooter.some((route) => {
      if (route.includes('*')) {
        // Use a wildcard route with regular expression to match edit and view with any ID
        const regex = new RegExp(`^${route.replace('*', '(.*)')}$`);
        return regex.test(currentPath);
      }
      return currentPath === route;
    });
  };
  return (
    <React.Fragment>
      {shouldShowHeaderAndFooter() && (
        <React.Fragment>
          <Header />
        </React.Fragment>
      )}
      <Routes>
        <Route path="/" element={<NonAuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        <Route path="/" element={<AuthLayout />}>
          <Route path="users" element={<List />} />
          <Route path="users/add" element={<AddEdit />} />
          <Route path="/" element={<GuardLayoutForValidId />}>
            <Route path="users/edit/:id" element={<AddEdit />} />
            <Route path="users/view/:id" element={<View />} />
          </Route>
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      {shouldShowHeaderAndFooter() && (
        <React.Fragment>
          <Footer />
        </React.Fragment>
      )}
    </React.Fragment>
  );
}

export default App;
