import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heading } from '../../../shared/Heading';

export const WelcomePage: React.FC = () => {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigate('/home');
    }, 2000);
  }, []);
  return (
    <div className="WelcomePage">
      <Heading level={1}>БЛЮДЦЕ</Heading>
    </div>
  );
};
