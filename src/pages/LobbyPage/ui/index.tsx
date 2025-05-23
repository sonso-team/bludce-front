import React from 'react';
import './lobby-page.scss';
import { Navigate } from 'react-router-dom';
import { Header } from '../../../widgets/Header';
import { Button } from '../../../shared/Button';
import { BillList } from '../../../widgets/BillList';
import { Heading } from '../../../shared/Heading';
import { Loader } from '../../../components/Loader';
import { receiptTypes } from '../../../constants/enums/billEnums';
import { PaymentInfoWidget } from '../../../widgets/PaymentInfoWidget';
import { Paragraph } from '../../../shared/Paragraph';
import { useLobbyPage } from '../api';

export const LobbyPage: React.FC = () => {
  const {
    isConfigured,
    isIniciator,
    isLoading,
    backClickHandler,
    paymentHandler,
    isValid,
    getIsValid,
    pickHandler,
    tipsAmount,
    tipsType,
    tipsPercent,
    userId,
    shareLinkHandler,
    receiptType,
    state,
    finalUserAmount,
    finalUserTips,
    userAmount,
    setIsValid,
    fullAmount,
    tipsRef,
  } = useLobbyPage();

  // if (!isConfigured && isIniciator) {
  //   return <Navigate to="/home" />;
  // }

  if (isLoading) {
    return <Loader type="global" />;
  }

  return (
    <div className="LobbyPage">
      <Header
        title="БЛЮДЦЕ"
        subtitle="ЧЕК"
        withBackButton={true}
        onBackButtonClick={backClickHandler}
      />
      <div className="LobbyPage__content">
        {receiptType === receiptTypes.PROPORTIONALLY ? (
          <>
            <Heading
              level={5}
              className="LobbyPage__description"
            >
              Выберите позиции в чеке:
            </Heading>
            <BillList
              billItems={state}
              isLiveTime
              onPick={pickHandler}
              myId={userId}
            />
            <div className="LobbyPage__finalAmounts">
              <div className="LobbyPage__finalTipsAmount">
                <Paragraph level={4}>Чаевые:</Paragraph>
                <Paragraph level={4}>
                  {tipsAmount ? tipsAmount.toFixed(2) : finalUserTips}р.
                </Paragraph>
              </div>
              <div className="LobbyPage__finalAmmount">
                <Heading level={5}>Итого:</Heading>
                <Heading level={5}>
                  {`${finalUserAmount + Number(tipsAmount ? tipsAmount.toFixed(2) : finalUserTips)}р.`}
                </Heading>
              </div>
            </div>
          </>
        ) : (
          <PaymentInfoWidget
            finalAmount={fullAmount}
            personAmount={Number(userAmount.toFixed(2))}
            withoutTips={tipsType === receiptTypes.NONE}
            tipsAmount={
              tipsType === receiptTypes.EVENLY
                ? Number(tipsAmount.toFixed(2))
                : Number(((userAmount * tipsPercent) / 100).toFixed(2))
            }
            onChange={() => setIsValid(getIsValid())}
            ref={tipsRef}
          />
        )}
      </div>
      <div className="LobbyPage__buttons">
        {isIniciator ? (
          <>
            <Button
              className="LobbyPage__nextBtn"
              onClick={paymentHandler}
              disabled={!isValid}
              style="secondary"
            >
              Сохранить
            </Button>
            <Button
              className="LobbyPage__nextBtn"
              onClick={shareLinkHandler}
            >
              Поделиться ссылкой
            </Button>
          </>
        ) : (
          <Button
            onClick={paymentHandler}
            className="LobbyPage__payBtn"
            color="green"
            disabled={!isValid}
          >
            Оплатить
          </Button>
        )}
      </div>
    </div>
  );
};

export default LobbyPage;
