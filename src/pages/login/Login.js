import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import * as faker from '@faker-js/faker';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { RandomUser } from '../../components/shared/RandomUser';
import { Button, Input, FormFeedback } from 'reactstrap';

export const Login = () => {
  const [authenticated, setAuthenticated] = useState(
    localStorage.getItem(localStorage.getItem('authenticated') || false)
  );
  const navigate = useNavigate();

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .required('Email Address field is empty')
      .email('You have entered invalid email format'),
    password: yup
      .string()
      .required('Password is required')
      .min(6, 'Password is too short - should be 6 characters minimum')
  });

  const formik = useFormik({
    initialValues: {
      email: 'sthakkar@codal.com',
      password: ''
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: (data) => {
      const validEmail = 'sthakkar@codal.com';
      const validPassword = '123456';
      if (data.email === validEmail && data.password === validPassword) {
        setAuthenticated(true);
        localStorage.setItem('authenticated', true);
        navigate('/dashboard');
        const tempUsers = RandomUser(10);
        localStorage.setItem('STUSERS', JSON.stringify(tempUsers));
      }
    }
  });

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow rounded-md bg-gray-50 px-[450px] h-96">
        <h1 className="py-4 text-lg text-center">Login</h1>
        <div className="border-2 bg-white p-5 rounded-md border-gray-300">
          <form onSubmit={formik.handleSubmit}>
            <div className="flex flex-col">
              <label for="email" className="mb-2">
                Email Address &nbsp;<span className="text-red-600">*</span>
              </label>
              <Input
                name="email"
                type="text"
                className={
                  'form-control' +
                  (formik.errors.email && formik.touched.email ? ' is-invalid' : '')
                }
                onChange={formik.handleChange}
                value={formik.values.email}
              />
              <FormFeedback>
                {formik.errors.email && formik.touched.email ? formik.errors.email : null}
              </FormFeedback>
            </div>
            <div className="flex flex-col">
              <label for="email" className="mb-2">
                Password &nbsp;<span className="text-red-600">*</span>
              </label>
              <Input
                name="password"
                type="password"
                className={
                  'form-control' +
                  (formik.errors.password && formik.touched.password ? ' is-invalid' : '')
                }
                onChange={formik.handleChange}
                value={formik.values.password}
              />
              <FormFeedback>
                {formik.errors.password && formik.touched.password ? formik.errors.password : null}
              </FormFeedback>
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
