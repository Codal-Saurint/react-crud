import * as React from 'react';
import { Routes, Route } from 'react-router-dom';
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



function App() {
  return (
    <React.Fragment>
      <Header />
      <Routes>
        <Route path="/" element={<NonAuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        <Route path="/" element={<AuthLayout />}>
          <Route path="users" element={<List />} />
          <Route path="users/add" element={<AddEdit />} />
          <Route path="users/edit/:id" element={<AddEdit />} />
          <Route path="users/view/:id" element={<View />} />
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
        <Route path="*" element={<Login />} />
      </Routes>
      <Footer />
    </React.Fragment>
  );
}

export default App;
