import type React from 'react';
import type { BillItem } from '../../../redux/store/bill/types';
import { Paragraph } from '../../../shared/Paragraph';
import './bill-list.scss';
import type { IBillStateItem } from '../../../redux/store/lobby/types';
import { BillRow } from './BillRow';

interface IBillListProps {
  billItems: IBillStateItem[];
  isEditable?: boolean;
  isLiveTime?: boolean;
  onPick?: (item: IBillStateItem, index: number) => void;
  myId?: string;
}

export const BillList: React.FC<IBillListProps> = ({ ...props }) => {
  const {
    billItems = [],
    isEditable = false,
    isLiveTime = false,
    onPick,
    myId,
  } = props;

  return (
    <section className="BillList">
      <div className="BillList__row BillList__row_head">
        <Paragraph
          level={4}
          className="BillList__column"
        >
          Позиция
        </Paragraph>
        <Paragraph
          level={4}
          className="BillList__column"
        >
          Кол-во
        </Paragraph>
        <Paragraph
          level={4}
          className="BillList__column"
        >
          Цена
        </Paragraph>
      </div>
      <div className="BillList__data">
        {billItems.map((item, index) => {
          if (!isLiveTime) {
            return (
              <BillRow
                item={item}
                isEditable={isEditable}
                key={`${item.name}${item.quantity}`}
                index={index}
              />
            );
          }
          let mode;
          if (item.userId) {
            if (item.paidBy) {
              mode = 'green';
            }
            if (item.userId !== myId) {
              mode = 'yellow';
            } else {
              mode = 'blue';
            }
          } else {
            mode = 'default';
          }
          return (
            <BillRow
              item={item}
              isEditable={isEditable}
              key={`${item.name}${item.quantity}`}
              index={index}
              mode={mode}
              onClick={() => onPick(item, index)}
            />
          );
        })}
      </div>
    </section>
  );
};
