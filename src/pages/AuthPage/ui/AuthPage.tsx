import React, { useEffect } from 'react';
import './auth-page.scss';
import { useLocation } from 'react-router-dom';
import { LoginForm } from '../../../widgets/LoginForm';
import { RegForm } from '../../../widgets/RegForm';
import { ConfirmForm } from '../../../widgets/ConfirmForm';
import { useAppSelector } from '../../../redux/hooks';
import { useModal } from '../../../utils/useModal';

export const AuthPage: React.FC = () => {
  const location = useLocation();
  const { isError, message } = useAppSelector((state) => state.authReducer);
  const { showModal } = useModal();

  useEffect(() => {
    if (isError) {
      showModal({
        body: message,
        isPopup: true,
        icon: 'error',
        primaryText: 'Понятно',
      });
    }
  }, [isError]);

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
