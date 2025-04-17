import React from 'react';
import { BackButton } from '../../../shared/BackButton';
import { Heading } from '../../../shared/Heading';
import './account-page.scss';
import { AccountWidget } from '../../../widgets/AccountWidget';
import { Button } from '../../../shared/Button';
import { useAppDispatch } from '../../../redux/hooks';
import { logout } from '../../../redux/store/auth/authThunks';

const AccountPage: React.FC = () => {
  const dispatch = useAppDispatch();
  return (
    <div className="AccountPage">
      <header className="AccountPage__header">
        <BackButton />
        <Heading
          className="AccountPage__header__title"
          level={3}
        >
          БЛЮДЦЕ
        </Heading>
      </header>
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
