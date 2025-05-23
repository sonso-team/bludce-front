import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export const useWelcomePage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigate('/home');
    }, 2000);
  }, []);
};
