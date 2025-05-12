import React from 'react';
import './home-page.scss';
import { Header } from '../../../components/Header';
import { Paragraph } from '../../../shared/Paragraph';
import { BillInput } from '../../../components/BillInput';
import { Footer } from '../../../widgets/Footer';
import { useHomePage } from '../api';
import heroImage from './../../../assets/images/bludce-full.png';

export const HomePage: React.FC = () => {
  const { successHandler } = useHomePage();

  return (
    <div className="HomePage">
      <Header title="БЛЮДЦЕ" />
      <div className="HomePage__content">
        <Paragraph level={1}>Добро пожаловать в Блюдце!</Paragraph>
        <img
          className="HomePage__image"
          src={heroImage}
          alt="Блюдце"
        />
        <Paragraph level={1}>
          Приложение для разделения счета в ресторанах и кафе
        </Paragraph>
      </div>
      <div className="HomePage__downSide">
        <BillInput onSuccess={successHandler} />
        <Footer />
      </div>
    </div>
  );
};
