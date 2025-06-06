import React from 'react';
import './account-widget.scss';
import { Heading } from '../../../shared/Heading';

import { Paragraph } from '../../../shared/Paragraph';
import { maskPhoneNumber } from '../../../utils/format';
import { useAccountWidget } from '../api';

export const AccountWidget: React.FC = () => {
  const accountWidget = useAccountWidget();
  return (
    <div className="AccountWidget">
      <Heading
        className="AccountWidget__name"
        level={3}
      >
        {accountWidget.authState.user.name
          ? accountWidget.authState.user.name
          : 'Безымянный'}
      </Heading>
      <div className="AccountWidget__element">
        <Paragraph
          className="AccountWidget__element__description"
          level={1}
        >
          Номер телефона:
        </Paragraph>
        <Paragraph
          className="AccountWidget__element__value"
          level={1}
        >
          {accountWidget.authState.user.phoneNumber
            ? maskPhoneNumber(accountWidget.authState.user.phoneNumber)
            : 'Не указан'}
        </Paragraph>
      </div>
      <div className="AccountWidget__element">
        <Paragraph
          className="AccountWidget__element__description"
          level={1}
        >
          Почта:
        </Paragraph>
        <Paragraph
          className="AccountWidget__element__value"
          level={1}
        >
          {accountWidget.authState.user.email
            ? accountWidget.authState.user.email
            : 'Не указан'}
        </Paragraph>
      </div>
    </div>
  );
};
