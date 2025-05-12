import { useNavigate } from 'react-router-dom';
import { useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { useModal } from '../../../utils/useModal';
import { hideLocalLoader, showLocalLoader } from '../../../redux/store/loader';
import { confirmBill } from '../../../redux/store/bill/billThunks';
import { clearBillData } from '../../../redux/store/bill';

export const useApprovePage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { showModal } = useModal();
  const { billsData, isFetched, receiptId, isError, message } = useAppSelector(
    (state) => state.billsReducer,
  );

  useEffect(() => {
    if (isFetched && receiptId) {
      navigate('/config');
    }
  }, [receiptId]);

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

  const submitHandler = () => {
    dispatch(showLocalLoader());
    dispatch(confirmBill(billsData)).then(() => {
      dispatch(hideLocalLoader());
    });
  };

  const backClickHandler = () => {
    dispatch(clearBillData());
  };

  const finalAmount = useMemo(() => {
    return billsData.reduce(
      (acc: number, item) => acc + item.price * item.quantity,
      0,
    );
  }, [billsData]);

  return {
    submitHandler,
    finalAmount,
    billsData,
    backClickHandler,
  };
};
