import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppSelector } from '../../../redux/hooks';
import { useModal } from '../../../utils/useModal';

interface IUseHomePage {
  successHandler: () => void;
}

export const useHomePage = (): IUseHomePage => {
  const navigate = useNavigate();
  const { isError, message } = useAppSelector((state) => state.billsReducer);
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

  const successHandler = () => {
    navigate('/approve');
  };

  return {
    successHandler,
  };
};
