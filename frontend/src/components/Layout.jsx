import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/index.jsx';
import routes from '../routes.js';

const Layout = () => {
  const { logOut, user } = useAuth();
  const { token } = user;
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleClick = () => {
    logOut();
    navigate(routes.loginPadePath(), { replace: true });
  };

  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <a className="navbar-brand" href={routes.chatPadePath()}>Hexlet Chat</a>
        {token && <button type="button" className="btn btn-primary" onClick={handleClick}>{t('chat.logOff')}</button>}
      </div>
    </nav>
  );
};

export default Layout;
