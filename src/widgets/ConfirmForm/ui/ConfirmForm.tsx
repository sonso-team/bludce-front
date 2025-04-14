import React from 'react';
import { Input } from '../../../shared/Input';
import { Heading } from '../../../shared/Heading';
import { Button } from '../../../shared/Button';
import { useConfirmForm } from '../api';

export const ConfirmForm: React.FC = () => {
  const { isValid, getIsValid, setIsValid, submitHandler, codeRef } =
    useConfirmForm();
  return (
    <>
      <Heading
        level={2}
        className="AuthPage__title"
      >
        БЛЮДЦЕ
      </Heading>
      <Heading level={4}>Введите 6-значный код, отправленный на почту</Heading>
      <div className="AuthPage__inputs">
        <Input
          placeholder="Код"
          initialValue=""
          name="code"
          ref={codeRef}
          onChange={() => setIsValid(getIsValid())}
          validations={[
            {
              name: 'isEmpty',
              message: 'Введите код',
            },
          ]}
        />
      </div>
      <Button
        custom
        onClick={submitHandler}
        disabled={!isValid}
      >
        Подтвердить почту
      </Button>
    </>
  );
};
