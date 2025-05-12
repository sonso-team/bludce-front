import React from 'react';
import { Heading } from '../../../shared/Heading';
import { useWelcomePage } from '../api';

export const WelcomePage: React.FC = () => {
  useWelcomePage();

  return (
    <div className="WelcomePage">
      <Heading level={1}>БЛЮДЦЕ</Heading>
    </div>
  );
};
