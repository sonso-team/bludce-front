import React from 'react';
import './history-item.scss';
import { Heading } from '../../../shared/Heading';

const HistoryItem: React.FC = () => {
  return (
    <div className="HistoryItem">
      <Heading level={1}>11 апр.</Heading>
      <Heading level={1}>Счет №1</Heading>
    </div>
  );
};
export default HistoryItem;
