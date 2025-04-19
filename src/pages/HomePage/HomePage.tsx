import React, { useEffect } from 'react';
import './home-page.scss';
import { useNavigate } from 'react-router-dom';
import { Paragraph } from '../../shared/Paragraph';
import { Footer } from '../../widgets/Footer';
import { BillInput } from '../../components/BillInput';
import { Header } from '../../components/header';
import { useAppSelector } from '../../redux/hooks';
import { useModal } from '../../utils/useModal';
import bludce from './../../assets/images/bludce-full.png';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { isError, message } = useAppSelector((state) => state.billsReducer);
  const { showModal } = useModal();

  useEffect(() => {
    if (isError) {
      showModal({
        body: message,
        isPopup: true,
        icon: 'error',
        primaryText: 'Понятно',
      });
    }
  }, [isError]);

  return (
    <div className="HomePage">
      <Header title="БЛЮДЦЕ" />
      <div className="HomePage__content">
        <Paragraph level={1}>Добро пожаловать в Блюдце!</Paragraph>
        <img
          className="HomePage__image"
          src={bludce}
          alt="Блюдце"
        />
        <Paragraph level={1}>
          Приложение для разделения счета в ресторанах и кафе
        </Paragraph>
      </div>
      <div className="HomePage__downSide">
        <BillInput onSuccess={() => navigate('/approve')} />
        <Footer />
      </div>
    </div>
  );
};

export default HomePage;
