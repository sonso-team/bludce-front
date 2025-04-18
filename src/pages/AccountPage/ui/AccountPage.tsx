import React from 'react';
import './account-page.scss';
import { AccountWidget } from '../../../widgets/AccountWidget';
import { Button } from '../../../shared/Button';
import { useAppDispatch } from '../../../redux/hooks';
import { logout } from '../../../redux/store/auth/authThunks';
import { Header } from '../../../components/header';

const AccountPage: React.FC = () => {
  const dispatch = useAppDispatch();
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
      >
        Выйти из аккаунта
      </Button>
    </div>
  );
};

export default AccountPage;
