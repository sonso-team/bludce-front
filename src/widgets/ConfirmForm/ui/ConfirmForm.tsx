import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heading } from '../../../shared/Heading';
import { Button } from '../../../shared/Button';
import { useConfirmForm } from '../api';
import { Paragraph } from '../../../shared/Paragraph';
import { useAppDispatch } from '../../../redux/hooks';
import { setGoConfirmStep } from '../../../redux/store/auth';
import { OtpInput } from '../../../components/OtpInput';

export const ConfirmForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isValid, submitHandler, codeRef, setIsValid, getIsValid } =
    useConfirmForm();

  useEffect(() => {
    dispatch(setGoConfirmStep(false));
  }, [dispatch]);

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
        <OtpInput
          ref={codeRef}
          onChange={() => setIsValid(getIsValid())}
        />
      </div>
      <Button
        custom
        onClick={submitHandler}
        disabled={!isValid}
      >
        Подтвердить почту
      </Button>
      <Paragraph level={4}>
        Неправильный номер ?{' '}
        <Link
          to="/auth/"
          className="AuthPage__link"
        >
          Назад
        </Link>
      </Paragraph>
    </>
  );
};
