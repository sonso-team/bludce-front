import React from 'react';
import './history-item.scss';
import { useNavigate } from 'react-router-dom';
import { Heading } from '../../../shared/Heading';

interface HistoryItemProps {
  date: string;
  billNumber: number;
  link: string;
}

export const HistoryItem: React.FC<HistoryItemProps> = ({
  date,
  billNumber,
  link,
}) => {
  const navigate = useNavigate();
  return (
    <div
      className="HistoryItem"
      onClick={() => navigate(link)}
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
