import React from 'react';
import './account-widget.scss';
import { Heading } from '../../../shared/Heading';

import { Paragraph } from '../../../shared/Paragraph';
import { maskPhoneNumber } from '../../../utils/format';
import { useAccountWidget } from '../api';

export const AccountWidget: React.FC = () => {
  const accountWidget = useAccountWidget();
  //   const { isValid, getIsValid, setIsValid, submitHandler, loginRef } =
  //     useLoginForm();
  return (
    <div className="AccountWidget">
      <Heading
        className="AccountWidget__name"
        level={3}
      >
        {accountWidget.user.name ? accountWidget.user.name : 'Безымянный'}
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
          {accountWidget.user.phoneNumber
            ? maskPhoneNumber(accountWidget.user.phoneNumber)
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
          {accountWidget.user.email ? accountWidget.user.email : 'Не указан'}
        </Paragraph>
      </div>
    </div>
  );
};
