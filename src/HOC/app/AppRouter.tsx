import { Route, Routes } from 'react-router-dom';
import React from 'react';
import { WelcomeLayout } from '../../layouts/WelcomeLayout';
import { WelcomePage } from '../../pages/WelcomePage';
import { AuthPage } from '../../pages/AuthPage';
import { PrivateRoute } from '../PrivateRoute';
import { MainLayout } from '../../layouts/MainLayout';
import { ConfigPage } from '../../pages/ConfigPage';
import { ApprovePage } from '../../pages/ApprovePage';
import { AccountPage } from '../../pages/AccountPage';
import { HistoryPage } from '../../pages/HistoryPage';
import { LobbyPage } from '../../pages/LobbyPage';
import { FinalPage } from '../../pages/FinalPage';
import { HomePage } from '../../pages/HomePage';

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
      <Route element={<MainLayout />}>
        <Route
          path="/lobby/*"
          element={<LobbyPage />}
        />
        <Route
          path="/final"
          element={<FinalPage />}
        />
      </Route>
      <Route element={<PrivateRoute />}>
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
          <Route
            path="/history"
            element={<HistoryPage />}
          />
          <Route
            path="/config"
            element={<ConfigPage />}
          />
        </Route>
      </Route>
    </Routes>
  );
};
