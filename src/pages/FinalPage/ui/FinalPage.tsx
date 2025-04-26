import React, { useEffect } from 'react';
import './final-page.scss';
import { useNavigate } from 'react-router-dom';
import { Header } from '../../../components/header';
import { Heading } from '../../../shared/Heading';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { BillList } from '../../../widgets/BillList';
import { receiptTypes } from '../../../constants/enums/billEnums';
import { Paragraph } from '../../../shared/Paragraph';
import { Button } from '../../../shared/Button';
import { lobbyClear } from '../../../redux/store/lobby';

export const FinalPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isIniciator, state, amount, fullAmount, receiptType } =
    useAppSelector((state) => state.lobbyReducer);

  useEffect(() => {
    return () => {
      dispatch(lobbyClear());
    };
  }, []);

  if (isIniciator || localStorage.getItem('isIniciator')) {
    return (
      <div className="FinalPage">
        <Header
          title="БЛЮДЦЕ"
          subtitle="ЧЕК"
        />
        <div className="FinalPage__content">
          {receiptType === receiptTypes.PROPORTIONALLY && (
            <BillList
              billItems={state}
              isIniciatorView={true}
            />
          )}
          <div className="FinalPage__finalAmmount">
            <Paragraph level={1}>Итого:</Paragraph>
            <Paragraph
              level={1}
            >{`${amount.toFixed(2)}/${fullAmount}р.`}</Paragraph>
          </div>
        </div>
        <Button
          className="FinalPage__button"
          onClick={() => navigate('/home')}
          disabled={amount !== fullAmount}
        >
          Закрыть счет
        </Button>
      </div>
    );
  }

  return (
    <div className="FinalPage">
      <Header
        title="БЛЮДЦЕ"
        subtitle="Спасибо за доверие !"
      />
      <div className="FinalPage__content">
        <Heading level={2}>Вы успешно оплатили счет ! До новых встреч.</Heading>
      </div>
    </div>
  );
};
