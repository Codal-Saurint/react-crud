import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import * as faker from '@faker-js/faker';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { RandomUser } from '../../components/shared/RandomUser';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(
    localStorage.getItem(localStorage.getItem('authenticated') || false)
  );
  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();
    const validEmail = 'sthakkar@codal.com';
    const validPassword = '123456';
    if (email === validEmail && password === validPassword) {
      setAuthenticated(true);
      localStorage.setItem('authenticated', true);
      navigate('/dashboard');
      const tempUsers = RandomUser(10);
      localStorage.setItem('STUSERS', JSON.stringify(tempUsers));
    } else {
      alert('Invalid credentials. Please try again.');
    }
  };

  const validationSchema = yup.object().shape({
    firstName: yup.string().required('FirstName field is empty'),
    lastName: yup.string().required('LastName field is empty'),
    email: yup
      .string()
      .required('Email Address field is empty')
      .email('You have entered invalid email format')
  });

  useEffect(() => {
    setEmail('sthakkar@codal.com');
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow rounded-md bg-gray-50 px-[450px] h-96">
        <h1 className="py-4 text-lg text-center">Login</h1>
        <div className="border-2 bg-white p-5 rounded-md border-gray-300">
          <form onSubmit={handleLogin}>
            <div className="flex flex-col">
              <label for="email" className="mb-2">
                Email Address &nbsp;<span className="text-red-600">*</span>
              </label>
              <input
                className="border-2 p-2 focus:outline-1 focus:outline-blue-200 mb-1 rounded-md"
                type="text"
                placeholder="sthakkar@codal.com"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="text-gray-400 text-xs pb-4">Hint: sthakkar@codal.com</div>
            </div>
            <div className="flex flex-col">
              <label for="email" className="mb-2">
                Password &nbsp;<span className="text-red-600">*</span>
              </label>
              <input
                className="border-2 p-2 focus:outline-1 focus:outline-blue-400 mb-1 rounded-md"
                type="password"
                placeholder="123456"
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="text-gray-400 text-xs pb-4">Hint: 123456</div>
            </div>
            <div>
              <button type="submit" className="bg-blue-700 text-white w-full h-9 rounded-md mb-2">
                Login
                <i className="fa fa-arrow-right w-1 ms-3"></i>
              </button>
              <div>
                Don't have an account?
                <Link to="/register" className="text-blue-700 underline">
                  Sign Up
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
