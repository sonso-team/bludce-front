import React from 'react';
import './approve-page.scss';
import { Navigate } from 'react-router-dom';
import { Paragraph } from '../../../shared/Paragraph';
import { BillList } from '../../../widgets/BillList';
import { Header } from '../../../widgets/Header';
import { Button } from '../../../shared/Button';
import { useApprovePage } from '../api';

export const ApprovePage: React.FC = () => {
  const { finalAmount, submitHandler, billsData, backClickHandler } =
    useApprovePage();

  if (!billsData.length) {
    return <Navigate to="/home" />;
  } else {
    return (
      <div className="ApprovePage">
        <Header
          title="БЛЮДЦЕ"
          subtitle="ЧЕК"
          withBackButton={true}
          onBackButtonClick={backClickHandler}
        />
        <div className="ApprovePage__content">
          <BillList
            billItems={billsData}
            isEditable={true}
          />
          <div className="finalAmount">
            <Paragraph level={2}>Итого:</Paragraph>
            <Paragraph level={2}>{finalAmount}р.</Paragraph>
          </div>
        </div>
        <Button
          className="ApprovePage__nextBtn"
          onClick={submitHandler}
        >
          Далее
        </Button>
      </div>
    );
  }
};
