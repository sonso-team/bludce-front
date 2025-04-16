import React from 'react';
import { BackButton } from '../../../shared/BackButton';
import { Heading } from '../../../shared/Heading';
import { Paragraph } from '../../../shared/Paragraph';
import './history-page.scss';
import { HistoryItem } from '../../../components/HistoryItem';
import { useAppSelector } from '../../../redux/hooks';

const HistoryPage: React.FC = () => {
  const { historyData, isLoading, isFetched } = useAppSelector(
    (state) => state.historyReducer,
  );

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
        {historyData.map((item) => (
          <HistoryItem
            key={item.id}
            date={item.date}
            billNumber={item.billNumber}
            link={item.link}
          />
        ))}
      </div>
    </div>
  );
};

export default HistoryPage;
