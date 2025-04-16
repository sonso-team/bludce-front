import React from 'react';
import { iconMap } from '../../../utils/iconMap';
import { Paragraph } from '../../../shared/Paragraph';
import './footer.scss';
import { logout } from '../../../redux/store/auth/authThunks';
import { useAppDispatch } from '../../../redux/hooks';

export const Footer: React.FC = () => {
  const dispatch = useAppDispatch();
  return (
    <footer className="Footer">
      <nav className="Footer__nav">
        <div
          className="Footer__item"
          onClick={() => dispatch(logout())}
        >
          <img
            src={iconMap.account}
            alt="account"
          />
          <Paragraph level={4}>Аккаунт</Paragraph>
        </div>
        <div className="Footer__item">
          <img
            src={iconMap.deposit}
            alt="deposit"
          />
          <Paragraph level={4}>История счетов</Paragraph>
        </div>
      </nav>
    </footer>
  );
};
