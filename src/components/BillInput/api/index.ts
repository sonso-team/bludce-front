import type React from 'react';
import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { hideLocalLoader, showLocalLoader } from '../../../redux/store/loader';
import { sendBill } from '../../../redux/store/bill/billThunks';

export const useBillInput = (onSuccess) => {
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

  return {
    handleButtonClick,
    handleFileChange,
    inputRef,
  };
};
