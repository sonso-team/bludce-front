import React from 'react';
import './home-page.scss';
import { Heading } from '../../shared/Heading';
import { Paragraph } from '../../shared/Paragraph';
import { Button } from '../../shared/Button';
import { useAppDispatch } from '../../redux/hooks';
import { logout } from '../../redux/store/auth/authThunks';
import { hideLocalLoader, showLocalLoader } from '../../redux/store/loader';
import bludce from './../../assets/images/bludce-full.png';

const HomePage: React.FC = () => {
  const dispatch = useAppDispatch();

  const clickHandler = () => {
    dispatch(showLocalLoader());
    dispatch(logout()).finally(() => {
      hideLocalLoader();
    });
  };

  return (
    <div className="HomePage">
      <Heading level={3}>БЛЮДЦЕ</Heading>
      <div className="HomePage__content">
        <Paragraph level={1}>Добро пожаловать в Блюдце!</Paragraph>
        <img
          className="HomePage__image"
          src={bludce}
          alt="Блюдце"
        />
        <Paragraph level={1}>
          Приложение для раздела счета в ресторанах и кафе
        </Paragraph>
      </div>
      <Button
        className="HomePage__scanBtn"
        onClick={clickHandler}
      >
        Логаут (Пока что)
      </Button>
    </div>
  );
};

export default HomePage;
