import React, { useEffect, useMemo } from 'react';
import './approve-page.scss';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { clearBillData } from '../../../redux/store/bill';
import { Paragraph } from '../../../shared/Paragraph';
import { BillList } from '../../../widgets/BillList';
import { Header } from '../../../components/header';
import { Button } from '../../../shared/Button';
import { hideLocalLoader, showLocalLoader } from '../../../redux/store/loader';
import { confirmBill } from '../../../redux/store/bill/billThunks';

const ApprovePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { billsData, isFetched, receiptId } = useAppSelector(
    (state) => state.billsReducer,
  );

  useEffect(() => {
    if (isFetched && receiptId) {
      navigate('/config');
    }
  }, [receiptId]);

  const submitHadler = () => {
    dispatch(showLocalLoader());
    dispatch(confirmBill(billsData)).then(() => {
      dispatch(hideLocalLoader());
    });
  };

  const finalAmount = useMemo(() => {
    return billsData.reduce(
      (acc: number, item) => acc + item.price * item.quantity,
      0,
    );
  }, [billsData]);

  if (!billsData.length) {
    return <Navigate to="/home" />;
  }
  return (
    <div className="ApprovePage">
      <Header
        title="БЛЮДЦЕ"
        subtitle="ЧЕК"
        withBackButton={true}
        onBackButtonClick={() => dispatch(clearBillData())}
      />
      <div className="ApprovePage__content">
        <BillList
          billItems={billsData}
          isEditable={true}
          isLiveTime={false}
        />
        <div className="finalAmount">
          <Paragraph level={2}>Итого:</Paragraph>
          <Paragraph level={2}>{finalAmount}р.</Paragraph>
        </div>
      </div>
      <Button
        className="ApprovePage__nextBtn"
        onClick={submitHadler}
      >
        Далее
      </Button>
    </div>
  );
};

export default ApprovePage;
