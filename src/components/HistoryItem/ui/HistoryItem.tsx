import React from 'react';
import './history-item.scss';
import { Heading } from '../../../shared/Heading';

interface HistoryItemProps {
  date: string;
  billNumber: number;
}

export const HistoryItem: React.FC<HistoryItemProps> = ({
  date,
  billNumber,
}) => {
  return (
    <div className="HistoryItem">
      <Heading
        className="HistoryItem__Heading date"
        level={4}
      >
        {date}
      </Heading>
      <Heading
        className="HistoryItem__Heading"
        level={4}
      >{`Счет №${billNumber}`}</Heading>
    </div>
  );
};
