import React from 'react';
import { iconMap } from '../../../utils/iconMap';
import { goBack } from '../api';
import './back-button.scss';

interface IBackButtonProps {
  onClick?: () => void;
}

export const BackButton: React.FC<IBackButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={() => {
        onClick?.();
        goBack();
      }}
      className="GoBackButton"
    >
      <img
        src={iconMap.back}
        alt="back"
      />
    </button>
  );
};
