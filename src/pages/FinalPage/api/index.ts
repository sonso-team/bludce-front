import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppSelector } from '../../../redux/hooks';
import { closeSocket } from '../../../services/ws';

export const useFinalPage = () => {
  const navigate = useNavigate();
  const { isIniciator, state, amount, fullAmount, receiptType } =
    useAppSelector((state) => state.lobbyReducer);

  useEffect(() => {
    return () => closeSocket();
  }, []);

  const closeHandler = () => {
    navigate('/home');
  };

  return {
    isIniciator,
    state,
    amount,
    fullAmount,
    receiptType,
    closeHandler,
  };
};
