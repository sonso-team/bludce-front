import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { hideLocalLoader, showLocalLoader } from '../../../redux/store/loader';
import { getUser } from '../../../redux/store/auth/authThunks';

export const useAccountWidget = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const authState = useAppSelector((state) => state.authReducer);
  const user = authState.user;
  useEffect(() => {
    if (authState.isLoading) {
      dispatch(showLocalLoader());
    } else {
      dispatch(hideLocalLoader());
    }
  }, [dispatch, authState.isLoading]);

  useEffect(() => {
    dispatch(getUser());
    if (!authState.user) {
      navigate('/login');
    }
  }, [dispatch, authState.user, navigate]);

  return { user };
};
