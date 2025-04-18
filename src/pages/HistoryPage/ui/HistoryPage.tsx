import React, { useEffect } from 'react';
import { BackButton } from '../../../shared/BackButton';
import { Heading } from '../../../shared/Heading';
import './history-page.scss';
import { HistoryItem } from '../../../components/HistoryItem';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { getHistory } from '../../../redux/store/history/historyThunks';
import { Header } from '../../../components/header';

const HistoryPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { historyData } = useAppSelector((state) => state.historyReducer);
  useEffect(() => {
    dispatch(getHistory());
  }, [dispatch]);
  //     ^
  //     |        вот этот ебан виноват если все сломалось
  //Я ЕБЛАН, НАЧАЛ ДЕЛАТЬ СТРАНИЦУ АККАУНТА А ПОТОМ ЗАБЫЛ И НАЧАЛ ХУЯЧИТЬ СТРАНИЦУ ИСТОРИИ
  return (
    <div className="HistoryPage">
      <Header
        title={'БЛЮДЦЕ'}
        onBackButtonClick={() => {}}
      />
      <div className="HistoryPage__HistoryItemsWrapper">
        {historyData.length !== 0 ? (
          historyData.map((item) => (
            <HistoryItem
              key={item.id}
              date={item.date}
              billNumber={item.billNumber}
              link={item.link}
            />
          ))
        ) : (
          <Heading level={3}>Упс! Здесь пока пустовато!</Heading>
        )}
      </div>
    </div>
  );
};

export default HistoryPage;
