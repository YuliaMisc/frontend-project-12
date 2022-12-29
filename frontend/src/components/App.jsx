import React, { useState } from 'react';
import '../index.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';

import AuthContext from '../hooks/AuthContextProvider.jsx';
import LoginPage from './LoginPage.jsx';
import ErrorPage from './ErrorPage.jsx';
import SignupPage from './SignupPage.jsx';
import ChatPage from './ChatPade.jsx';
import RequestAuth from '../hooks/RequestAuth.jsx';

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  const logIn = () => setLoggedIn(true);

  const logOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ // eslint-disable-line
      loggedIn, logIn, logOut,
    }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const App = () => (
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route index element={(<RequestAuth><ChatPage /></RequestAuth>)} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  </AuthProvider>
);

export default App;
