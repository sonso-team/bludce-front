import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import type { CheckboxRef } from '../../../shared/Checkbox';
import type { InputRef } from '../../../shared/Input';
import { hideLocalLoader, showLocalLoader } from '../../../redux/store/loader';
import { registration } from '../../../redux/store/auth/authThunks';
import { unmaskPhoneNumber } from '../../../utils/format';

export const useRegForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLoading, goConfirmStep } = useAppSelector(
    (state) => state.authReducer,
  );
  const [isValid, setIsValid] = useState<boolean>(false);
  const confirmRef = useRef<CheckboxRef>(null);
  const loginRef = useRef<InputRef>(null);
  const emailRef = useRef<InputRef>(null);
  const phoneRef = useRef<InputRef>(null);

  useEffect(() => {
    if (isLoading) {
      dispatch(showLocalLoader());
    } else {
      if (goConfirmStep) {
        navigate('/auth/confirm');
      }
      dispatch(hideLocalLoader());
    }
  }, [isLoading]);

  const submitHandler = () => {
    dispatch(
      registration({
        name: loginRef.current.value,
        email: emailRef.current.value,
        phoneNumber: unmaskPhoneNumber(phoneRef.current.value),
      }),
    );
  };
  const getIsValid = useCallback(() => {
    return (
      !loginRef.current?.isError &&
      loginRef.current?.isDirty &&
      !emailRef.current?.isError &&
      emailRef.current?.isDirty &&
      !phoneRef.current?.isError &&
      phoneRef.current?.isDirty &&
      confirmRef.current.isChecked
    );
  }, []);

  return {
    getIsValid,
    setIsValid,
    isValid,
    submitHandler,
    loginRef,
    phoneRef,
    emailRef,
    confirmRef,
  };
};
