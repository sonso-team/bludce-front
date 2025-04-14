import React, { use, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heading } from '../../../shared/Heading';

export const WelcomePage: React.FC = () => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate('/auth/login');
  };
  useEffect(() => {
    const timeout = setTimeout(() => handleNavigate(), 3000);
    return () => clearInterval(timeout);
  }, []);
  return (
    <div
      className="WelcomePage"
      onClick={handleNavigate}
    >
      <Heading level={1}>БЛЮДЦЕ</Heading>
    </div>
  );
};
