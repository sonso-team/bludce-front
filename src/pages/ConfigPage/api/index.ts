import { useNavigate } from 'react-router-dom';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { useModal } from '../../../utils/useModal';
import type { SelectorRef } from '../../../shared/Selector';
import type { InputRef } from '../../../shared/Input';
import { clearError, clearReceiptData } from '../../../redux/store/bill';
import { setIsIniciator } from '../../../redux/store/lobby';
import { receiptTypes } from '../../../constants/enums/billEnums';
import { hideLocalLoader, showLocalLoader } from '../../../redux/store/loader';
import type { IBillConfig } from '../../../redux/store/bill/types';
import { configBill } from '../../../redux/store/bill/billThunks';

export const useConfigPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { showModal } = useModal();
  const [isValid, setIsValid] = useState<boolean>(false);
  const [receiptType, setReceiptType] = useState<string>(null);
  const [tipsType, setTipsType] = useState<string>(null);
  const { billsData, isConfigured, isFetched, receiptId, isError, message } =
    useAppSelector((state) => state.billsReducer);
  const receiptRef = useRef<SelectorRef>(null);
  const quantityRef = useRef<InputRef>(null);
  const tipsRef = useRef<SelectorRef>(null);
  const amountRef = useRef<InputRef>(null);

  useEffect(() => {
    dispatch(clearError());
    if (isError) {
      showModal({
        body: message,
        isPopup: true,
        icon: 'error',
        primaryText: 'Понятно',
      });
    }
  }, [isError]);

  useEffect(() => {
    if (isFetched && isConfigured) {
      dispatch(setIsIniciator());
      navigate('/lobby');
    }
  }, [isConfigured]);

  const getIsValid = useCallback(() => {
    setReceiptType(receiptRef.current?.value);
    setTipsType(tipsRef.current?.value);

    const quantityValid =
      !quantityRef.current?.isError && quantityRef.current?.isDirty;

    const amountValid =
      tipsRef.current?.value === receiptTypes.EVENLY ||
      tipsRef.current?.value === receiptTypes.PROPORTIONALLY
        ? !amountRef.current?.isError && amountRef.current?.isDirty
        : true;

    return (
      receiptRef.current?.value !== '' &&
      tipsRef.current?.value !== '' &&
      quantityValid &&
      amountValid
    );
  }, []);

  const submitHadler = () => {
    dispatch(showLocalLoader());
    const result: IBillConfig = {
      receiptId,
      receiptType,
      tipsType,
    };

    result['personCount'] = Number(quantityRef.current?.value);

    if (tipsType === receiptTypes.EVENLY) {
      result['tipsValue'] = Number(amountRef.current?.value);
    } else if (tipsType === receiptTypes.PROPORTIONALLY) {
      result['tipsPercent'] = Number(amountRef.current?.value);
    }

    dispatch(configBill(result)).then(() => {
      dispatch(hideLocalLoader());
    });
  };

  const finalAmount = useMemo(() => {
    return billsData.reduce(
      (acc: number, item) => acc + item.price * item.quantity,
      0,
    );
  }, [billsData]);

  const backClickHandler = () => {
    dispatch(clearReceiptData());
  };

  return {
    finalAmount,
    submitHadler,
    getIsValid,
    setIsValid,
    isValid,
    receiptId,
    receiptRef,
    receiptTypes,
    quantityRef,
    tipsRef,
    amountRef,
    tipsType,
    backClickHandler,
  };
};
