import { Route, Routes } from 'react-router-dom';
import React from 'react';
import { WelcomeLayout } from '../../layouts/WelcomeLayout';
import { WelcomePage } from '../../pages/WelcomePage';
import { AuthPage } from '../../pages/AuthPage';
import { PrivateRoute } from '../PrivateRoute';
import { MainLayout } from '../../layouts/MainLayout';
import ApprovePage from '../../pages/ApprovePage/ui/ApprovePage';
import AccountPage from '../../pages/AccountPage/ui/AccountPage';
import HomePage from './../../pages/HomePage/HomePage.tsx';

export const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route element={<WelcomeLayout />}>
        <Route
          path=""
          element={<WelcomePage />}
        />
        <Route
          path="/auth/*"
          element={<AuthPage />}
        />
      </Route>
      {/* <Route element={<PrivateRoute />}> */}
      <Route element={<MainLayout />}>
        <Route
          path="/home"
          element={<HomePage />}
        />
        <Route
          path="/approve"
          element={<ApprovePage />}
        />
        <Route
          path="/account"
          element={<AccountPage />}
        />
      </Route>
      {/* </Route> */}
    </Routes>
  );
};
