import React from 'react';
import { BackButton } from '../../../shared/BackButton';
import { Heading } from '../../../shared/Heading';
import './header.scss';

interface IHeaderProps {
  title: string;
  subtitle?: string;
  withBackButton: boolean;
  onBackButtonClick?: () => unknown;
}

export const Header: React.FC<IHeaderProps> = ({
  title,
  subtitle,
  withBackButton,
  onBackButtonClick,
}) => {
  return (
    <header className="header">
      <div className="header__upper">
        {withBackButton && <BackButton onClick={onBackButtonClick} />}
        <Heading level={3}>{title}</Heading>
      </div>
      {subtitle && <Heading level={4}>{subtitle}</Heading>}
    </header>
  );
};
