import React from 'react';
import './account-page.scss';
import { AccountWidget } from '../../../widgets/AccountWidget';
import { Button } from '../../../shared/Button';
import { Header } from '../../../components/Header';
import { useAccountPage } from '../api';

export const AccountPage: React.FC = () => {
  const { backClickHandler } = useAccountPage();
  return (
    <div className="AccountPage">
      <Header
        title={'БЛЮДЦЕ'}
        withBackButton
      />
      <AccountWidget />
      <Button
        className="AccountPage__button"
        onClick={backClickHandler}
        color="red"
      >
        Выйти из аккаунта
      </Button>
    </div>
  );
};
