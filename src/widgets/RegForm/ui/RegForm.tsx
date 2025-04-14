import React from 'react';
import { Input } from '../../../shared/Input';
import { Heading } from '../../../shared/Heading';
import { ConfirmPersonalData } from '../../../components/ConfirmPersonalData';
import { Button } from '../../../shared/Button';
import { useRegForm } from '../api';

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
          initialValue=""
          name="phone"
          ref={phoneRef}
          onChange={() => setIsValid(getIsValid())}
          validations={[
            {
              name: 'isEmpty',
              message: 'Введите номер',
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
    </>
  );
};
