import React from 'react';
import './auth-page.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import { LoginForm } from '../../../widgets/LoginForm';
import { RegForm } from '../../../widgets/RegForm';
import { ConfirmForm } from '../../../widgets/ConfirmForm';

export const AuthPage: React.FC = () => {
  const location = useLocation();
  switch (location.pathname) {
    case '/auth/login':
      return (
        <div className="AuthPage">
          <LoginForm />
        </div>
      );
    case '/auth/registration':
      return (
        <div className="AuthPage">
          <RegForm />
        </div>
      );
    case '/auth/confirm':
      return (
        <div className="AuthPage">
          <ConfirmForm />
        </div>
      );
    default:
      return (
        <div className="AuthPage">
          <LoginForm />
        </div>
      );
  }
};
