import { useState } from 'react';
import { useAppDispatch } from '../../../redux/hooks';
import { removeBillItem, updateBillData } from '../../../redux/store/bill';

export const useBillRow = (item, index) => {
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

  return {
    editHandler,
    deleteHandler,
    isEditing,
    setName,
    setQuantity,
    setPrice,
    name,
    quantity,
    price,
  };
};
