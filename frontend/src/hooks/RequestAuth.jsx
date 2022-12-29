import React from 'react';
import { Navigate } from 'react-router-dom';

const RequestAuth = ({ children }) => {
  const Component = localStorage.token ? children : <Navigate to="/login" />;
  return Component;
};

export default RequestAuth;
