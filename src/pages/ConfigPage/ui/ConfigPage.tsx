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
import { clearReceiptData } from '../../../redux/store/bill';
import { Paragraph } from '../../../shared/Paragraph';
import { Header } from '../../../components/header';
import { Button } from '../../../shared/Button';
import type { SelectorRef } from '../../../shared/Selector';
import { Selector } from '../../../shared/Selector';
import { receiptTypes } from '../../../constants/enums/billEnums';
import type { InputRef } from '../../../shared/Input';
import { Input } from '../../../shared/Input';
import { hideLocalLoader, showLocalLoader } from '../../../redux/store/loader';
import { configBill } from '../../../redux/store/bill/billThunks';
import type { IBillConfig } from '../../../redux/store/bill/types';

export const ConfigPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const [isValid, setIsValid] = useState<boolean>(false);
  const navigate = useNavigate();
  const [receiptType, setReceiptType] = useState<string>(null);
  const [tipsType, setTipsType] = useState<string>(null);
  const { billsData, isConfigured, isFetched, receiptId } = useAppSelector(
    (state) => state.billsReducer,
  );
  const receiptRef = useRef<SelectorRef>(null);
  const quantityRef = useRef<InputRef>(null);
  const tipsRef = useRef<SelectorRef>(null);
  const amountRef = useRef<InputRef>(null);

  const getIsValid = useCallback(() => {
    setReceiptType(receiptRef.current?.value);
    setTipsType(tipsRef.current?.value);

    const quantityValid =
      receiptRef.current?.value === receiptTypes.EVENLY
        ? !quantityRef.current?.isError && quantityRef.current?.isDirty
        : true;

    const amountValid =
      tipsRef.current?.value === receiptTypes.EVENLY
        ? !amountRef.current?.isError && amountRef.current?.isDirty
        : true;

    return (
      receiptRef.current?.value !== '' &&
      tipsRef.current?.value !== '' &&
      quantityValid &&
      amountValid
    );
  }, []);

  useEffect(() => {
    if (isFetched && isConfigured) {
      navigate('/lobby');
    }
  }, [isConfigured]);

  const submitHadler = () => {
    dispatch(showLocalLoader());
    const result: IBillConfig = {
      receiptId,
      receiptType,
      tipsType,
    };
    if (receiptType === receiptTypes.EVENLY) {
      result['personCount'] = Number(quantityRef.current?.value);
    }
    if (tipsType === receiptTypes.EVENLY) {
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
        {receiptType === receiptTypes.EVENLY && (
          <Input
            className="ConfigPage__input"
            placeholder="Кол-во персон"
            type="number"
            initialValue=""
            name="quantity"
            ref={quantityRef}
            onChange={() => setIsValid(getIsValid())}
            validations={[
              {
                name: 'isEmpty',
                message: 'Введите количество персон',
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
        {tipsType === receiptTypes.EVENLY && (
          <Input
            className="ConfigPage__input"
            placeholder="Чаевые на человека"
            initialValue=""
            name="quantity"
            ref={amountRef}
            onChange={() => setIsValid(getIsValid())}
            validations={[
              {
                name: 'isEmpty',
                message: 'Введите количество персон',
              },
            ]}
          />
        )}
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
