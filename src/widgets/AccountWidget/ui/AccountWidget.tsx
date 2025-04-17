import React from 'react';
import './account-widget.scss';
import { Link } from 'react-router-dom';
import { Input } from '../../../shared/Input';
import { Heading } from '../../../shared/Heading';
import { Button } from '../../../shared/Button';

import { Paragraph } from '../../../shared/Paragraph';
import { maskPhoneNumber } from '../../../utils/format';

export const AccountWidget: React.FC = () => {
  //   const { isValid, getIsValid, setIsValid, submitHandler, loginRef } =
  //     useLoginForm();
  return (
    <div className="AccountWidget">
      <Heading
        className="AccountWidget__name"
        level={3}
      >
        Иван
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
          88005553535
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
          ivanzapara04@mail.ru
        </Paragraph>
      </div>
    </div>
  );
};
