import React from 'react';
import { Button } from '../../../shared/Button';
import './bill-input.scss';
import { useBillInput } from '../api';

interface IBillInputProps {
  onSuccess?: () => void;
}

export const BillInput: React.FC<IBillInputProps> = ({ onSuccess }) => {
  const { handleFileChange, handleButtonClick, inputRef } =
    useBillInput(onSuccess);

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
