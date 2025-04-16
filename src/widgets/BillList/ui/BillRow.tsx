import React, { memo, useState } from 'react';
import { iconMap } from '../../../utils/iconMap';
import type { BillItem } from '../../../redux/store/bill/types';
import { Paragraph } from '../../../shared/Paragraph';
import { removeBillItem, updateBillData } from '../../../redux/store/bill';
import { useAppDispatch } from '../../../redux/hooks';

interface IBillRowProps {
  item: BillItem;
  isEditable: boolean;
  index: number;
}

interface IEditButtonsProps {
  isEditing: boolean;
  deleteHandle: () => unknown;
  editHandle: () => unknown;
}

const EditButtons: React.FC<IEditButtonsProps> = ({
  isEditing,
  deleteHandle,
  editHandle,
}) => {
  return (
    <>
      <button onClick={() => editHandle()}>
        <img
          src={isEditing ? iconMap.check : iconMap.pencil}
          alt="pencil"
        />
      </button>
      <button onClick={deleteHandle}>
        <img
          src={iconMap.cross}
          alt="cross"
        />
      </button>
    </>
  );
};

export const BillRow: React.FC<IBillRowProps> = memo(
  ({ item, isEditable, index }) => {
    const dispatch = useAppDispatch();
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(item.name);
    const [quantity, setQuantity] = useState(item.quantity);
    const [price, setPrice] = useState(item.price);

    const editHandler = () => {
      if (!isEditing) {
        setIsEditing(true);
      } else {
        dispatch(updateBillData({ index, item: { name, quantity, price } }));
        setIsEditing(false);
      }
    };

    const deleteHandler = () => {
      dispatch(removeBillItem(index));
    };
    return (
      <div className="BillList__row BillList__row">
        {isEditing ? (
          <input
            type="text"
            className="BillList__input"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        ) : (
          <Paragraph level={1}>{name}</Paragraph>
        )}
        {isEditing ? (
          <input
            type="text"
            className="BillList__input"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
          />
        ) : (
          <Paragraph level={1}>{quantity}</Paragraph>
        )}
        <div className="BillList__column">
          {isEditing ? (
            <input
              type="text"
              className="BillList__input"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
            />
          ) : (
            <Paragraph level={1}>{price}р.</Paragraph>
          )}
          {isEditable && (
            <EditButtons
              isEditing={isEditing}
              deleteHandle={deleteHandler}
              editHandle={editHandler}
            />
          )}
        </div>
      </div>
    );
  },
);
