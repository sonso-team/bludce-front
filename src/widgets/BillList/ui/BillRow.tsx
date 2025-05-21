import React, { memo } from 'react';
import { iconMap } from '../../../utils/iconMap';
import { Paragraph } from '../../../shared/Paragraph';
import type { IBillRowProps, IEditButtonsProps } from '../model';
import { useBillRow } from '../api';

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
  ({ item, isEditable, index, onClick, mode, isIniciatorView }) => {
    const {
      isEditing,
      name,
      quantity,
      price,
      setName,
      setPrice,
      setQuantity,
      deleteHandler,
      editHandler,
    } = useBillRow(item, index);

    return (
      <div
        className={`BillList__row ${mode && !isIniciatorView ? `BillList__row_${mode}` : ''}`}
        onClick={onClick}
      >
        {isEditing ? (
          <input
            type="text"
            className="BillList__input BillList__column"
            value={name || ''}
            onChange={(e) => setName(e.target.value)}
          />
        ) : (
          <Paragraph level={1}>{name}</Paragraph>
        )}
        {isEditing ? (
          <input
            type="text"
            className="BillList__input BillList__column"
            value={quantity || 0}
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
              value={price || 0}
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
          {isIniciatorView && (
            <div
              className={`BillList__statusDot BillList__statusDot_${mode}`}
            />
          )}
        </div>
      </div>
    );
  },
);
