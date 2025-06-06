import React from 'react';
import { Outlet } from 'react-router-dom';
import './main-layout.scss';

export const MainLayout: React.FC = () => {
  return (
    <div className="MainLayout">
      <Outlet />
    </div>
  );
};
