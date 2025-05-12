import React from 'react';
import './loader.scss';
import type { LoaderProps } from '../model';

export const Loader: React.FC<LoaderProps> = ({ type }) => {
  return (
    <div
      className={`loader__wrapper ${type === 'local' ? 'loader__wrapper_local' : ''}`}
    >
      <div className="loader__container">
        <div className="loader__bullet" />
        <div className="loader__bullet" />
        <div className="loader__bullet" />
        <div className="loader__bullet" />
      </div>
    </div>
  );
};
