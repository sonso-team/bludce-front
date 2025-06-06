import React from 'react';
import './final-page.scss';
import { Header } from '../../../widgets/Header';
import { Heading } from '../../../shared/Heading';
import { BillList } from '../../../widgets/BillList';
import { receiptTypes } from '../../../constants/enums/billEnums';
import { Paragraph } from '../../../shared/Paragraph';
import { Button } from '../../../shared/Button';
import { useFinalPage } from '../api';

export const FinalPage: React.FC = () => {
  const { isIniciator, receiptType, state, amount, fullAmount, closeHandler } =
    useFinalPage();

  if (isIniciator) {
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
              isLiveTime={true}
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
          onClick={closeHandler}
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
