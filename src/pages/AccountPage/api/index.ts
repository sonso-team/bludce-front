import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { useModal } from '../../../utils/useModal';
import { logout } from '../../../redux/store/auth/authThunks';

export const useAccountPage = () => {
  const dispatch = useAppDispatch();
  const { showModal } = useModal();
  const { isError, message } = useAppSelector((state) => state.authReducer);

  useEffect(() => {
    if (isError) {
      showModal({
        body: message,
        isPopup: true,
        icon: 'error',
        primaryText: 'Понятно',
      });
    }
  }, [isError]);

  const backClickHandler = () => {
    dispatch(logout());
  };

  return {
    backClickHandler,
  };
};
