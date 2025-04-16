import type React from 'react';
import type { BillItem } from '../../../redux/store/bill/types';
import { Paragraph } from '../../../shared/Paragraph';
import { iconMap } from '../../../utils/iconMap';
import './bill-list.scss';
import { BillRow } from './BillRow';

interface IBillListProps {
  billItems: BillItem[];
  isEditable?: boolean;
  isLiveTime?: boolean;
}

export const BillList: React.FC<IBillListProps> = ({ ...props }) => {
  const { billItems = [], isEditable = true, isLiveTime = false } = props;

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
          return (
            <BillRow
              item={item}
              isEditable={isEditable}
              key={`${item.name}${item.quantity}`}
              index={index}
            />
          );
        })}
      </div>
    </section>
  );
};
