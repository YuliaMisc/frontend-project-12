import React from 'react';
import { Navigate } from 'react-router-dom';

const RequestAuth = ({ children }) => {
  console.log(localStorage.token);
  console.log(children);
  return localStorage.token ? children : <Navigate to="/login" />;
};

export default RequestAuth;
