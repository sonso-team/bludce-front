export interface IBillError {
  message: string;
}

export interface IBillState {
  isFetched: boolean;
  isLoading: boolean;
  billsData: BillItem[];
  message: null | string;
}

export type BillData = FormData;

export type BillItem = {
  name: string;
  quantity: number;
  price: number;
};

export type IBillResponse = BillItem[];
