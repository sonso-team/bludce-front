import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import './config-page.scss';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { clearError, clearReceiptData } from '../../../redux/store/bill';
import { Paragraph } from '../../../shared/Paragraph';
import { Header } from '../../../components/header';
import { Button } from '../../../shared/Button';
import type { SelectorRef } from '../../../shared/Selector';
import { Selector } from '../../../shared/Selector';
import { receiptTypes } from '../../../constants/enums/billEnums';
import type { InputRef } from '../../../shared/Input';
import { hideLocalLoader, showLocalLoader } from '../../../redux/store/loader';
import { configBill } from '../../../redux/store/bill/billThunks';
import type { IBillConfig } from '../../../redux/store/bill/types';
import { setIsIniciator } from '../../../redux/store/lobby';
import { CommonInput } from '../../../shared/СommonInput';
import { useModal } from '../../../utils/useModal';

export const ConfigPage: React.FC = () => {
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

  if (!receiptId) {
    return <Navigate to="/home" />;
  }
  return (
    <div className="ConfigPage">
      <Header
        title="БЛЮДЦЕ"
        subtitle="ЧЕК"
        withBackButton={true}
        onBackButtonClick={() => dispatch(clearReceiptData())}
      />
      <div className="ConfigPage__content">
        <div className="finalAmount">
          <Paragraph level={1}>Итого:</Paragraph>
          <Paragraph level={1}>{finalAmount}р.</Paragraph>
        </div>
        <Selector
          ref={receiptRef}
          label="Способ деления счёта"
          options={[
            { key: receiptTypes.EVENLY, value: 'Равномерно' },
            { key: receiptTypes.PROPORTIONALLY, value: 'Пропорционально' },
          ]}
          onChange={() => setIsValid(getIsValid())}
        />
        {receiptRef.current?.value && (
          <CommonInput
            className="ConfigPage__input"
            placeholder="Введите гостей"
            type="number"
            label="Кол-во персон"
            initialValue=""
            name="quantity"
            ref={quantityRef}
            onChange={() => setIsValid(getIsValid())}
            validations={[
              {
                name: 'isEmpty',
                message: 'Поле не должно быть пустым',
              },
              {
                name: 'isInRange',
                message: 'Минимальное количество - 1',
                params: {
                  min: 1,
                  max: 100,
                },
              },
            ]}
          />
        )}
        <Selector
          ref={tipsRef}
          label="Способ деления чаевых"
          options={[
            { key: receiptTypes.NONE, value: 'Без чаевых' },
            { key: receiptTypes.EVENLY, value: 'Равномерно' },
            { key: receiptTypes.PROPORTIONALLY, value: 'Пропорционально' },
            { key: receiptTypes.FOR_KICKS, value: 'По-кайфу' },
          ]}
          onChange={() => setIsValid(getIsValid())}
        />
        {tipsType === receiptTypes.EVENLY ? (
          <CommonInput
            className="ConfigPage__input"
            placeholder="Введите сумму"
            label="Чаевые"
            initialValue=""
            name="quantity"
            ref={amountRef}
            onChange={() => setIsValid(getIsValid())}
            validations={[
              {
                name: 'isEmpty',
                message: 'Поле не должно быть пустым',
              },
            ]}
          />
        ) : tipsType === receiptTypes.PROPORTIONALLY ? (
          <CommonInput
            className="ConfigPage__input"
            placeholder="Введите процент"
            label="Процент чаевых"
            initialValue=""
            name="quantity"
            ref={amountRef}
            onChange={() => setIsValid(getIsValid())}
            validations={[
              {
                name: 'isEmpty',
                message: 'Поле не должно быть пустым',
              },
              {
                name: 'isInRange',
                message: 'Процент должен быть от 1 до 100',
                params: {
                  min: 1,
                  max: 100,
                },
              },
            ]}
          />
        ) : null}
      </div>
      <Button
        className="ConfigPage__nextBtn"
        onClick={submitHadler}
        disabled={!isValid}
      >
        Далее
      </Button>
    </div>
  );
};

export default ConfigPage;
