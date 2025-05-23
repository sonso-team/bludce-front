export interface IBillStateItem {
  id?: string;
  name: string;
  quantity: number;
  price: number;
  userId?: null | 'UUID пользователя, который выбрал позицию';
  paidBy?: null | 'UUID пользователя, оплатившего позицию';
}

export interface ILobbyState {
  isConnected?: boolean;
  isLoading?: boolean;
  isIniciator: boolean;
  tipsPercent: number;
  tipsAmount: number;
  userAmount: number;
  userId: string;
  receiptType?: 'EVENLY' | 'PROPORTIONALLY';
  tipsType?: 'EVENLY' | 'PROPORTIONALLY' | 'NONE' | 'FOR_KICKS';
  state: IBillStateItem[];
  amount?: number;
  isPayed: boolean;
  isError: boolean;
  message: string;
  fullAmount?: number;
}

export interface ILobbyMessage {
  type: 'INIT' | 'UPDATE';
  state: IBillStateItem[];
  initiatorId?: string;
  receiptType?: 'EVENLY' | 'PROPORTIONALLY';
  tipsType?: 'EVENLY' | 'PROPORTIONALLY' | 'NONE' | 'FOR_KICKS';
  userId?: string;
  amount?: number;
  tipsPercent: number;
  tipsAmount: number;
  userAmount: number;
  fullAmount?: number;
}

export interface IPaymentData {
  receiptId: string;
  userId: string;
  tips: number;
}

export interface IPaymentResponse {
  amount: number;
  tips: number;
  total: number;
}
