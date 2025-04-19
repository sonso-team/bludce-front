import React, { useEffect } from 'react';
import './account-page.scss';
import { AccountWidget } from '../../../widgets/AccountWidget';
import { Button } from '../../../shared/Button';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { logout } from '../../../redux/store/auth/authThunks';
import { Header } from '../../../components/header';
import { useModal } from '../../../utils/useModal';

const AccountPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { showModal } = useModal();
  const { isError, message } = useAppSelector((state) => state.authReducer);

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

  return (
    <div className="AccountPage">
      <Header
        title={'БЛЮДЦЕ'}
        withBackButton
      />
      <AccountWidget />
      <Button
        className="AccountPage__button"
        onClick={() => {
          dispatch(logout());
        }}
        color="red"
      >
        Выйти из аккаунта
      </Button>
    </div>
  );
};

export default AccountPage;
