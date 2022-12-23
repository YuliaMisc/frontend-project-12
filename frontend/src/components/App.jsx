import React from 'react';
// import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import '../index.css';
import LoginForm from './LoginForm.jsx';
import ErrorPage from './error-page.jsx';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="*" element={<ErrorPage />} />
      <Route path="/login" element={<LoginForm />} />
    </Routes>
  </BrowserRouter>
);

export default App;
