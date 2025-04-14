import { useCallback, useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import type { CheckboxRef } from '../../../shared/Checkbox';
import type { InputRef } from '../../../shared/Input';
import { hideLocalLoader, showLocalLoader } from '../../../redux/store/loader';
import {
  login,
  registration,
  sendCode,
} from '../../../redux/store/auth/authThunks';
import { unmaskPhoneNumber } from '../../../utils/format';

export const useConfirmForm = () => {
  const dispatch = useAppDispatch();
  const authState = useAppSelector((state) => state.authReducer);
  const [isValid, setIsValid] = useState<boolean>(false);
  const codeRef = useRef<InputRef>(null);

  useEffect(() => {
    if (authState.isLoading) {
      dispatch(showLocalLoader());
    } else {
      dispatch(hideLocalLoader());
    }
  }, [authState.isLoading]);

  const submitHandler = () => {
    dispatch(
      login({
        login: authState.user.phoneNumber,
        password: '123123',
      }),
    );
  };
  const getIsValid = useCallback(() => {
    return !codeRef.current?.isError && codeRef.current?.isDirty;
  }, []);

  return {
    getIsValid,
    setIsValid,
    isValid,
    submitHandler,
    codeRef,
  };
};
