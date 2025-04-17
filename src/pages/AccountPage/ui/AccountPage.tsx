import React from 'react';
import { BackButton } from '../../../shared/BackButton';
import { Heading } from '../../../shared/Heading';
import { Paragraph } from '../../../shared/Paragraph';
import './account-page.scss';
import { AccountWidget } from '../../../widgets/AccountWidget';
import { Button } from '../../../shared/Button';

const AccountPage: React.FC = () => {
  // const dispatch = useAppDispatch();
  // const { billsData, isLoading, isFetched } = useAppSelector(
  //   (state) => state.billsReducer,
  // );

  // const finalAmount = useMemo(() => {
  //   return billsData.reduce((acc: number, item) => acc + item.price, 0);
  // }, [billsData]);

  // if (!billsData.length) {
  //   return <Navigate to="/home" />;
  // }
  //Я ЕБЛАН, НАЧАЛ ДЕЛАТЬ СТРАНИЦУ АККАУНТА А ПОТОМ ЗАБЫЛ И НАЧАЛ ХУЯЧИТЬ СТРАНИЦУ ИСТОРИИ
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
        onClick={() => {}}
      >
        Выйти из аккаунта
      </Button>
    </div>
  );
};

export default AccountPage;
