import React from 'react';
import { Link } from 'react-router-dom';
import { Input } from '../../../shared/Input';
import { Heading } from '../../../shared/Heading';
import { ConfirmPersonalData } from '../../../components/ConfirmPersonalData';
import { Button } from '../../../shared/Button';
import { useRegForm } from '../api';
import { Paragraph } from '../../../shared/Paragraph';
import { maskPhoneNumber } from '../../../utils/format';

export const RegForm: React.FC = () => {
  const {
    isValid,
    getIsValid,
    setIsValid,
    submitHandler,
    loginRef,
    phoneRef,
    emailRef,
    confirmRef,
  } = useRegForm();
  return (
    <>
      <Heading
        level={2}
        className="AuthPage__title"
      >
        БЛЮДЦЕ
      </Heading>
      <Heading level={4}>Регистрация</Heading>
      <div className="AuthPage__inputs">
        <Input
          placeholder="Имя"
          initialValue=""
          name="name"
          ref={loginRef}
          onChange={() => setIsValid(getIsValid())}
          validations={[
            {
              name: 'isEmpty',
              message: 'Введите имя',
            },
          ]}
        />
        <Input
          placeholder="Почта"
          initialValue=""
          name="email"
          ref={emailRef}
          onChange={() => setIsValid(getIsValid())}
          validations={[
            {
              name: 'isEmpty',
              message: 'Введите почту',
            },
            {
              name: 'isEmail',
              message: 'Введите корректный адрес почты',
            },
          ]}
        />
        <Input
          placeholder="Номер"
          mask={maskPhoneNumber}
          initialValue=""
          name="phone"
          ref={phoneRef}
          onChange={() => setIsValid(getIsValid())}
          validations={[
            {
              name: 'isEmpty',
              message: 'Введите номер',
            },
            {
              name: 'isInvalidPhoneNumber',
              message: 'Введен некорректный номер телефона',
            },
          ]}
        />
        <ConfirmPersonalData
          ref={confirmRef}
          onClick={() => setIsValid(getIsValid())}
        />
      </div>
      <Button
        custom
        onClick={submitHandler}
        disabled={!isValid}
      >
        Зарегистрироваться
      </Button>
      <Paragraph level={4}>
        Есть аккаунт ?{' '}
        <Link
          to="/auth/login"
          className="AuthPage__link"
        >
          Войти
        </Link>
      </Paragraph>
    </>
  );
};
