import React from 'react';
import { Input } from '../../../shared/Input';
import { Heading } from '../../../shared/Heading';
import { Button } from '../../../shared/Button';
import { useLoginForm } from '../api';

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
          validations={[
            {
              name: 'isEmpty',
              message: 'Введите логин',
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
    </>
  );
};
