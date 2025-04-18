import React from 'react';
import './history-item.scss';
import { useNavigate } from 'react-router-dom';
import { Heading } from '../../../shared/Heading';
import type { HistoryItem as HistoryItemModel } from '../model';

export const HistoryItem: React.FC<HistoryItemModel> = ({
  date,
  billNumber,
}) => {
  const navigate = useNavigate();
  return (
    <div
      className="HistoryItem"
      onClick={() => navigate('/prn-endp')}
    >
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
