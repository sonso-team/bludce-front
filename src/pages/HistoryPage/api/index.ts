import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { getHistory } from '../../../redux/store/history/historyThunks';

export const useHistoryPage = () => {
  const dispatch = useAppDispatch();
  const { historyData } = useAppSelector((state) => state.historyReducer);
  useEffect(() => {
    dispatch(getHistory());
  }, [dispatch]);
  //     ^
  //     |        вот этот виноват если все сломалось

  return {
    historyData,
  };
};
