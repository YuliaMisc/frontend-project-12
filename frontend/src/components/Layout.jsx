import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../hooks/index.jsx';

const Layout = () => {
  const { logOut } = useAuth();
  const { t } = useTranslation();
  const button = !localStorage.getItem('username') ? '' : <button type="button" className="btn btn-primary" onClick={logOut}>{t('chat.logOff')}</button>;

  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <a className="navbar-brand" href="/">Hexlet Chat</a>
        {button}
      </div>
    </nav>
  );
};

export default Layout;
