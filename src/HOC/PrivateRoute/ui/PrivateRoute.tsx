import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../../../redux/hooks';

export const PrivateRoute: React.FC = () => {
  const { isAuth } = useAppSelector((state) => state.authReducer);
  return isAuth ? (
    <Outlet />
  ) : (
    <Navigate
      to="/auth/login"
      replace
    />
  );
};
