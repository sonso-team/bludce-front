export interface IBillError {
  message: string;
}

export interface IBillState {
  receiptId: string | null;
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

export interface IBillResponse {
  receiptId: string;
}
export type SendBillResponse = BillItem[];
