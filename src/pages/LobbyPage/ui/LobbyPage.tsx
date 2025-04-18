import React, { useMemo } from 'react';
import './lobby-page.scss';
import { Navigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { clearReceiptData } from '../../../redux/store/bill';
import { Header } from '../../../components/header';
import { Button } from '../../../shared/Button';
import { BillList } from '../../../widgets/BillList';
import { Heading } from '../../../shared/Heading';

export const LobbyPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { billsData, isConfigured } = useAppSelector(
    (state) => state.billsReducer,
  );

  const finalAmount = useMemo(() => {
    return billsData.reduce(
      (acc: number, item) => acc + item.price * item.quantity,
      0,
    );
  }, [billsData]);

  if (!isConfigured) {
    return <Navigate to="/home" />;
  }
  return (
    <div className="LobbyPage">
      <Header
        title="БЛЮДЦЕ"
        subtitle="ЧЕК"
        withBackButton={true}
        onBackButtonClick={() => dispatch(clearReceiptData())}
      />
      <div className="LobbyPage__content">
        <Heading
          level={5}
          className="LobbyPage__description"
        >
          Выберите позиции в чеке:
        </Heading>
        <BillList billItems={billsData} />
      </div>
      <div className="LobbyPage__buttons">
        <Button
          className="LobbyPage__nextBtn"
          onClick={() => 1}
          style="secondary"
        >
          Сохранить
        </Button>
        <Button
          className="LobbyPage__nextBtn"
          onClick={() => 1}
        >
          Поделиться ссылкой
        </Button>
      </div>
    </div>
  );
};

export default LobbyPage;
