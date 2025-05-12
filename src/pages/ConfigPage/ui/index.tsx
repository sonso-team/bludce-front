import React from 'react';
import './config-page.scss';
import { Navigate } from 'react-router-dom';
import { Paragraph } from '../../../shared/Paragraph';
import { Header } from '../../../components/Header';
import { Button } from '../../../shared/Button';
import { Selector } from '../../../shared/Selector';
import { CommonInput } from '../../../shared/СommonInput';
import { useConfigPage } from '../api';

export const ConfigPage: React.FC = () => {
  const {
    receiptRef,
    receiptTypes,
    receiptId,
    tipsRef,
    quantityRef,
    amountRef,
    backClickHandler,
    setIsValid,
    getIsValid,
    finalAmount,
    submitHadler,
    tipsType,
    isValid,
  } = useConfigPage();

  if (!receiptId) {
    return <Navigate to="/home" />;
  }
  return (
    <div className="ConfigPage">
      <Header
        title="БЛЮДЦЕ"
        subtitle="ЧЕК"
        withBackButton={true}
        onBackButtonClick={backClickHandler}
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
