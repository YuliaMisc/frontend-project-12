import React, { useState } from 'react';
import '../index.css';
import {
  Routes,
  Route,
  useNavigate,
  Navigate,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import AuthContext from '../hooks/AuthContextProvider.jsx';
import LoginPage from './LoginPage.jsx';
import ErrorPage from './ErrorPage.jsx';
import SignupPage from './SignupPage.jsx';
import ChatPage from './ChatPade.jsx';
import Layout from './Layout.jsx';
import routes from '../routes.js';

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const currentUsername = localStorage.getItem('username');
  const currentToken = localStorage.getItem('token');
  const [user, setUser] = useState({ username: currentUsername || '', token: currentToken || '' });

  const logIn = async (data) => {
    localStorage.setItem('token', data.token);
    localStorage.setItem('username', data.username);
    navigate(routes.chatPadePath(), { replace: true });
    setUser({ username: localStorage.getItem('username'), token: localStorage.getItem('token') });
  };

  const logOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setUser({ username: localStorage.getItem('username'), token: localStorage.getItem('token') });
    navigate(routes.loginPadePath(), { replace: true });
  };

  const getAuthHeader = () => ({ Authorization: `Bearer ${localStorage.getItem('token')}` });

  return (
    <AuthContext.Provider value={{ // eslint-disable-line
      logIn, logOut, getAuthHeader, user,
    }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const RequestAuth = ({ children }) => {
  const Component = localStorage.token ? children : <Navigate to={routes.loginPadePath()} />;
  return Component;
};

const App = () => (
  <AuthProvider>
    <div className="h-100">
      <div className="h-100" id="chat">
        <div className="d-flex flex-column h-100">
          <Layout />
          <Routes>
            <Route index element={(<RequestAuth><ChatPage /></RequestAuth>)} />
            <Route path={routes.signupPadePath()} element={<SignupPage />} />
            <Route path={routes.loginPadePath()} element={<LoginPage />} />
            <Route path={routes.errorPagePath()} element={<ErrorPage />} />
          </Routes>
        </div>
      </div>
    </div>
    <ToastContainer />
  </AuthProvider>
);

export default App;
