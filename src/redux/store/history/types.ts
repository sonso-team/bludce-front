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
  date: string;
  billNumber: number;
  link: string;
};
