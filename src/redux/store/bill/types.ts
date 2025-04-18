import type { IUser } from '../auth/types';

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

// все что приходит по чеку
export interface Bill {
  receiptId: string;
  receiptType: string;
  tipsType: string;
  tipsPercent: number;
  personCount: number;
  createdAt: string;
  updatedAt: string;
  initiator: IUser;
  positions: BillItem[];
}

export interface ConfirmBillResponse {
  receiptId: string;
}

export type SendBillResponse = BillItem[];
