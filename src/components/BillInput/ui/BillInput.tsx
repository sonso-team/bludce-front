import React, { useEffect, useRef } from 'react';
import { Button } from '../../../shared/Button';
import './bill-input.scss';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { sendBill } from '../../../redux/store/bill/billThunks';
import { hideLocalLoader, showLocalLoader } from '../../../redux/store/loader';

interface IBillInputProps {
  onSuccess?: () => void;
}

export const BillInput: React.FC<IBillInputProps> = ({ onSuccess }) => {
  const dispatch = useAppDispatch();
  const { billsData, isFetched } = useAppSelector(
    (state) => state.billsReducer,
  );
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleButtonClick = () => {
    inputRef.current?.click();
  };

  useEffect(() => {
    if (isFetched && billsData.length) {
      onSuccess?.();
    }
  }, [isFetched]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }
    const formData = new FormData();
    formData.append('file', file);
    dispatch(showLocalLoader());
    dispatch(sendBill(formData)).then(() => {
      dispatch(hideLocalLoader());
      if (inputRef.current) {
        inputRef.current.value = '';
      }
    });
  };

  return (
    <div className="BillInput">
      <Button onClick={handleButtonClick}>Загрузить чек</Button>
      <input
        ref={inputRef}
        type="file"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
    </div>
  );
};
