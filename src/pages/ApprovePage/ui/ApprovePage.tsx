import React, { useMemo } from 'react';
import './approve-page.scss';
import { Navigate } from 'react-router-dom';
import { Heading } from '../../../shared/Heading';
import { BackButton } from '../../../shared/BackButton';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { clearBillData } from '../../../redux/store/bill';
import { Paragraph } from '../../../shared/Paragraph';

const ApprovePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { billsData, isLoading, isFetched } = useAppSelector(
    (state) => state.billsReducer,
  );

  const finalAmount = useMemo(() => {
    return billsData.reduce((acc: number, item) => acc + item.price, 0);
  }, [billsData]);

  if (!billsData.length) {
    return <Navigate to="/home" />;
  }
  return (
    <div className="ApprovePage">
      <header className="ApprovePage__header">
        <BackButton onClick={() => dispatch(clearBillData())} />
        <Heading level={3}>БЛЮДЦЕ</Heading>
      </header>
      <div className="ApprovePage__content">
        <div className="finalAmount">
          <Paragraph level={4}>Итого:</Paragraph>
          <Paragraph level={4}>{finalAmount}р.</Paragraph>
        </div>
      </div>
    </div>
  );
};

export default ApprovePage;
