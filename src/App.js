import * as React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Login } from './pages/Login';
import { Users } from './pages/users/Users';
import { Add } from './pages/users/Add';
import { Register } from './pages/Register';
import { Dashboard } from './pages/dashboard/Dashboard';
import { Edit } from './pages/users/Edit';
import { View } from './pages/users/View';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
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
          <Route path="users" element={<Users />} />
          <Route path="users/add" element={<Add />} />
          <Route path="users/edit" element={<Edit />} />
          <Route path="users/view" element={<View />} />
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
        <Route path="*" element={<Login />} />
      </Routes>
      <Footer />
    </React.Fragment>
  );
}

export default App;
