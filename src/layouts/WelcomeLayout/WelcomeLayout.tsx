import React from 'react';
import { Outlet } from 'react-router-dom';
import './welcome-layout.scss';
import bludceUp from './../../assets/images/bludce.png';
import bludceDown from './../../assets/images/bludce-down.png';

export const WelcomeLayout: React.FC = () => {
  return (
    <div className="WelcomeLayout">
      <img
        src={bludceUp}
        className="WelcomeLayout__bgImage WelcomeLayout__bgImage_up"
        alt=""
      />
      <Outlet />
      <img
        src={bludceDown}
        className="WelcomeLayout__bgImage WelcomeLayout__bgImage_down"
        alt=""
      />
    </div>
  );
};
