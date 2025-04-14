import { Route, Routes } from 'react-router-dom';
import React from 'react';
import { WelcomeLayout } from '../../layouts/WelcomeLayout';
import { WelcomePage } from '../../pages/WelcomePage';
import { AuthPage } from '../../pages/AuthPage';
import HomePage from './../../pages/HomePage/HomePage.tsx';

export const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route element={<WelcomeLayout />}>
        <Route
          path="/"
          element={<WelcomePage />}
        />
        <Route
          path="/auth/*"
          element={<AuthPage />}
        />
      </Route>
    </Routes>
  );
};
