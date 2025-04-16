import React from 'react';
import { BackButton } from '../../../shared/BackButton';
import { Heading } from '../../../shared/Heading';
import { Paragraph } from '../../../shared/Paragraph';
import './account-page.scss';

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
      {/* <div className="ApprovePage__content">
          <div className="finalAmount">
            <Paragraph level={4}>Итого:</Paragraph>
            <Paragraph level={4}>{finalAmount}р.</Paragraph>
          </div>
        </div> */}
    </div>
  );
};

export default AccountPage;
