import React, { useEffect, useState } from 'react';
import Loader from '../../components/Loader';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { refresh } from '../../redux/store/auth/authThunks';
import { AppRouter } from './index.ts';

export const AppInitial: React.FC = () => {
  const dispatch = useAppDispatch();
  const [isFirstStart, setIsFirstStart] = useState<boolean>(true);
  const { isLocalLoaderLoading } = useAppSelector(
    (state) => state.loaderReducer,
  );
  const { isLoading } = useAppSelector((state) => state.authReducer);

  useEffect(() => {
    dispatch(refresh()).finally(() => {
      setIsFirstStart(false);
    });
  }, [dispatch]);

  if (isLoading && isFirstStart) {
    return <Loader type="global" />;
  } else {
    return (
      <>
        <AppRouter />
        {isLocalLoaderLoading && <Loader type="local" />}
      </>
    );
  }
};
