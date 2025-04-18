import React, { useEffect } from 'react';
import { Heading } from '../../../shared/Heading';
import './history-page.scss';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { getHistory } from '../../../redux/store/history/historyThunks';
import { Header } from '../../../components/header';
import { HistoryItem } from '../../../components/HistoryItem';

const HistoryPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { historyData } = useAppSelector((state) => state.historyReducer);
  useEffect(() => {
    dispatch(getHistory());
  }, [dispatch]);
  //     ^
  //     |        вот этот виноват если все сломалось
  return (
    <div className="HistoryPage">
      <Header
        title={'БЛЮДЦЕ'}
        withBackButton
      />
      <div className="HistoryPage__HistoryItemsWrapper">
        {historyData.length !== 0 ? (
          historyData.map((item) => (
            <HistoryItem
              key={item.id}
              date={item.date}
              billNumber={item.billNumber}
              id={item.id}
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
