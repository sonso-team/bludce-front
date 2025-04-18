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
  userId: string;
  state: IBillStateItem[];
}

export interface ILobbyMessage {
  type: 'INIT' | 'UPDATE';
  state: IBillStateItem[];
  receiptType?: 'EVENLY' | 'PROPORTIONALLY';
  tipsType?: 'EVENLY' | 'PROPORTIONALLY' | 'NONE' | 'FOR_KICKS';
  userId?: string;
  amount?: number;
  fullAmount?: number;
}
