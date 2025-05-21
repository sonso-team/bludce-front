import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { hideLocalLoader, showLocalLoader } from '../../../redux/store/loader';
import { login } from '../../../redux/store/auth/authThunks';
import type { OTPInputRef } from '../../../components/OtpInput';
import { setGoConfirmStep } from '../../../redux/store/auth';

export const useConfirmForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const authState = useAppSelector((state) => state.authReducer);
  const [isValid, setIsValid] = useState<boolean>(false);
  const codeRef = useRef<OTPInputRef>(null);

  useEffect(() => {
    if (authState.isLoading) {
      dispatch(showLocalLoader());
    } else {
      dispatch(hideLocalLoader());
    }
  }, [dispatch, authState.isLoading]);

  useEffect(() => {
    if (authState.isAuth) {
      navigate('/home');
    }
  }, [dispatch, authState.isAuth]);

  useEffect(() => {
    dispatch(setGoConfirmStep(false));
  }, [dispatch]);

  const submitHandler = () => {
    dispatch(
      login({
        login: authState.user.phoneNumber,
        password: codeRef.current.value,
      }),
    );
  };

  const getIsValid = useCallback(() => {
    return codeRef.current?.isValid;
  }, []);

  return {
    submitHandler,
    codeRef,
    setIsValid,
    getIsValid,
    isValid,
  };
};
