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

export type HistoryItem = {
  id: string;
  date: string;
  billNumber: number;
  link: string;
};

export type IHistoryResponse = Bill[];
