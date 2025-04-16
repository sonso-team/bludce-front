import React from 'react';
import { BackButton } from '../../../shared/BackButton';
import { Heading } from '../../../shared/Heading';
import { Paragraph } from '../../../shared/Paragraph';
import './history-page.scss';
import { HistoryItem } from '../../../components/HistoryItem';

const HistoryPage: React.FC = () => {
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
    <div className="HistoryPage">
      <header className="HistoryPage__header">
        <BackButton />
        <Heading
          className="HistoryPage__header__title"
          level={3}
        >
          БЛЮДЦЕ
        </Heading>
      </header>
      <div className="HistoryPage__HistoryItemsWrapper">
        <HistoryItem
          date="11 сен."
          billNumber={1488}
        />
        <HistoryItem
          date="11 сен."
          billNumber={1488}
        />
      </div>
    </div>
  );
};

export default HistoryPage;
