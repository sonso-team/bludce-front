import React from 'react';
import { iconMap } from '../../../utils/iconMap';
import { Paragraph } from '../../../shared/Paragraph';
import './footer.scss';

export const Footer: React.FC = () => {
  return (
    <footer className="Footer">
      <nav className="Footer__nav">
        <div className="Footer__item">
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
