import type React from 'react';
import { Paragraph } from '../../../shared/Paragraph';
import './bill-list.scss';
import type { IBillListProps } from '../model';
import { BillRow } from './BillRow';

export const BillList: React.FC<IBillListProps> = ({ ...props }) => {
  const {
    billItems = [],
    isEditable = false,
    isLiveTime = false,
    isIniciatorView = false,
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
          if (item.paidBy) {
            mode = 'green';
          } else if (item.userId) {
            if (item.userId !== myId) {
              mode = 'yellow';
            } else {
              mode = 'blue';
            }
          } else {
            mode = 'default';
          }
          if (isIniciatorView) {
            return (
              <BillRow
                isIniciatorView={true}
                item={item}
                isEditable={false}
                key={`${item.name}${item.quantity}`}
                index={index}
                mode={mode === 'green' ? mode : 'red'}
              />
            );
          }
          return (
            <BillRow
              isIniciatorView={false}
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
