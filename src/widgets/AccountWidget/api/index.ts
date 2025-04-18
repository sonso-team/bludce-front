import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { hideLocalLoader, showLocalLoader } from '../../../redux/store/loader';
import { getUser } from '../../../redux/store/auth/authThunks';

export const useAccountWidget = () => {
  const dispatch = useAppDispatch();
  const authState = useAppSelector((state) => state.authReducer);
  useEffect(() => {
    if (authState.isLoading) {
      dispatch(showLocalLoader());
    } else {
      dispatch(hideLocalLoader());
    }
  }, [dispatch, authState.isLoading]);

  useEffect(() => {
    dispatch(getUser());
  }, []);

  return { authState };
};
