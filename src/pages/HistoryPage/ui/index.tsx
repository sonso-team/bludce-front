import React from 'react';
import { Heading } from '../../../shared/Heading';
import './history-page.scss';
import { Header } from '../../../widgets/Header';
import { HistoryItem } from '../../../components/HistoryItem';
import { useHistoryPage } from '../api';

export const HistoryPage: React.FC = () => {
  const { historyData } = useHistoryPage();
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
              key={item.billNumber}
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
