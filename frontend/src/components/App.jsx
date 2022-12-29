import React, { useState } from 'react';
import '../index.css';
import {
  Routes,
  Route,
  useNavigate,
} from 'react-router-dom';
import axios from 'axios';

import AuthContext from '../hooks/AuthContextProvider.jsx';
import LoginPage from './LoginPage.jsx';
import ErrorPage from './ErrorPage.jsx';
import SignupPage from './SignupPage.jsx';
import ChatPage from './ChatPade.jsx';
import RequestAuth from '../hooks/RequestAuth.jsx';
import Layout from './Layout.jsx';

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  const logIn = async (values) => {
    const { data } = await axios.post('/api/v1/login', values);
    localStorage.setItem('token', data.token);
    localStorage.setItem('username', data.username);
    navigate('/', { replace: true });
    setLoggedIn(true);
  };

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
    <div className="h-100">
      <div className="h-100" id="chat">
        <div className="d-flex flex-column h-100">
          <Layout />
          <Routes>
            <Route index element={(<RequestAuth><ChatPage /></RequestAuth>)} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </div>
      </div>
    </div>
  </AuthProvider>
);

export default App;
