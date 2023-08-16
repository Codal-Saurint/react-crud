import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';

export const Register = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow rounded-md bg-gray-50 px-[250px] pb-56">
        <div className="py-4 text-lg text-center">
          <h1>Register</h1>
          <div className="py-4 bg-white m-4 text-left px-4 border">Coming soon...</div>
          <div className="text-left pl-3">
            <i className="fa fa-arrow-left fa-xs me-4"></i>
            <Link to="/login" className="underline text-blue-500">
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
