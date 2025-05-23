import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppSelector } from '../../../redux/hooks';
import { useModal } from '../../../utils/useModal';

export const useAuthPage = () => {
  const location = useLocation();
  const { isError, message } = useAppSelector((state) => state.authReducer);
  const { showModal } = useModal();

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

  return {
    location,
  };
};
