export interface IBillError {
  message: string;
}

export interface IBillState {
  isError: boolean;
  receiptId: string | null;
  isFetched: boolean;
  isLoading: boolean;
  billsData: BillItem[];
  message: null | string;
  isConfigured: boolean;
}

export type BillData = FormData;

export type BillItem = {
  name: string;
  quantity: number;
  price: number;
};

export interface IBillResponse {
  receiptId?: string;
}

export interface IBillConfig {
  receiptId: string;
  receiptType: string;
  tipsType: string;
  tipsPercent?: number;
  tipsValue?: number;
  personCount?: number;
}

export type SendBillResponse = BillItem[];
