import React, { useEffect } from 'react';
import { BackButton } from '../../../shared/BackButton';
import { Heading } from '../../../shared/Heading';
import { Paragraph } from '../../../shared/Paragraph';
import './history-page.scss';
import { HistoryItem } from '../../../components/HistoryItem';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { useDispatch } from 'react-redux';
import { getHistory } from '../../../redux/store/history/historyThunks';

const HistoryPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { historyData, isLoading, isFetched } = useAppSelector(
    (state) => state.historyReducer,
  );
  useEffect(() => {
    dispatch(getHistory());
  }, []);

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
        {historyData ? (
          historyData.map((item) => (
            <HistoryItem
              key={item.id}
              date={item.date}
              billNumber={item.billNumber}
              link={item.link}
            />
          ))
        ) : (
          <Heading level={3}>Упс! Тут пока пустовато!</Heading>
        )}
      </div>
    </div>
  );
};

export default HistoryPage;
