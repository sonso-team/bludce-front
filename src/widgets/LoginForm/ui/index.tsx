import React from 'react';
import { Link } from 'react-router-dom';
import { Input } from '../../../shared/Input';
import { Heading } from '../../../shared/Heading';
import { Button } from '../../../shared/Button';
import { useLoginForm } from '../api';
import { Paragraph } from '../../../shared/Paragraph';
import { maskPhoneNumber } from '../../../utils/format';

export const LoginForm: React.FC = () => {
  const { isValid, getIsValid, setIsValid, submitHandler, loginRef } =
    useLoginForm();
  return (
    <>
      <Heading
        level={2}
        className="AuthPage__title"
      >
        БЛЮДЦЕ
      </Heading>
      <Heading level={4}>Вход</Heading>
      <div className="AuthPage__inputs">
        <Input
          placeholder="Логин"
          initialValue=""
          name="name"
          ref={loginRef}
          onChange={() => setIsValid(getIsValid())}
          mask={maskPhoneNumber}
          validations={[
            {
              name: 'isEmpty',
              message: 'Введите логин',
            },
            {
              name: 'isInvalidPhoneNumber',
              message: 'Введен некорректный номер телефона',
            },
          ]}
        />
      </div>
      <Button
        custom
        onClick={submitHandler}
        disabled={!isValid}
      >
        Продолжить
      </Button>
      <Paragraph level={4}>
        Нет аккаунта ?{' '}
        <Link
          to="/auth/registration"
          className="AuthPage__link"
        >
          Зарегистрироваться
        </Link>
      </Paragraph>
    </>
  );
};
