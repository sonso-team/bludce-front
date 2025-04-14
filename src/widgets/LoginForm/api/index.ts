import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import type { InputRef } from '../../../shared/Input';
import { hideLocalLoader, showLocalLoader } from '../../../redux/store/loader';
import { login, sendCode } from '../../../redux/store/auth/authThunks';
import { setLogin } from '../../../redux/store/auth';
import { unmaskPhoneNumber } from '../../../utils/format';

export const useLoginForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLoading, goConfirmStep } = useAppSelector(
    (state) => state.authReducer,
  );
  const [isValid, setIsValid] = useState<boolean>(false);
  const loginRef = useRef<InputRef>(null);

  useEffect(() => {
    if (isLoading) {
      dispatch(showLocalLoader());
    } else {
      dispatch(hideLocalLoader());
      if (goConfirmStep) {
        navigate('/auth/confirm');
      }
    }
  }, [isLoading]);

  const submitHandler = () => {
    dispatch(setLogin({ login: unmaskPhoneNumber(loginRef.current.value) }));
    navigate('/auth/confirm');
    // dispatch(
    //   sendCode({
    //     phoneNumber: loginRef.current.value,
    //   }),
    // );
  };
  const getIsValid = useCallback(() => {
    return !loginRef.current?.isError && loginRef.current?.isDirty;
  }, []);

  return {
    getIsValid,
    setIsValid,
    isValid,
    submitHandler,
    loginRef,
  };
};
