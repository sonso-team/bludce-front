import type { HistoryItem } from '../../../components/HistoryItem/model';
import type { Bill } from '../bill/types';

export interface IHistoryError {
  message: string;
}

export interface IHistoryState {
  isFetched: boolean;
  isLoading: boolean;
  historyData: HistoryItem[];
  message: null | string;
}

export type IHistoryResponse = Bill[];
