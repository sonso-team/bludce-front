import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type {
  IBillStateItem,
  ILobbyMessage,
  ILobbyState,
  IPaymentResponse,
} from './types.ts';
import { makePayment } from './lobbyThunks';

const initialState: ILobbyState = {
  isConnected: false,
  isLoading: true,
  isPayed: false,
  isError: false,
  message: null,
  tipsAmount: null,
  tipsPercent: null,
  userAmount: null,
  isIniciator: false,
  amount: null,
  fullAmount: null,
  tipsType: null,
  receiptType: null,
  userId: null,
  state: [],
};

const lobbySlice = createSlice({
  name: 'lobby',
  initialState,
  reducers: {
    setIsIniciator(state) {
      state.isIniciator = true;
    },
    lobbyInit(state, action: PayloadAction<ILobbyMessage>) {
      state.isConnected = true;
      state.state = action.payload.state;
      state.userAmount = action.payload.userAmount;
      state.tipsAmount = action.payload.tipsAmount;
      state.tipsPercent = action.payload.tipsPercent;
      state.userId = action.payload.userId;
      state.amount = action.payload.amount;
      state.fullAmount = action.payload.fullAmount;
      state.tipsType = action.payload.tipsType;
      state.receiptType = action.payload.receiptType;
      state.isLoading = false;
    },
    lobbyUpdate(state, action: PayloadAction<ILobbyMessage>) {
      state.state = action.payload.state;
    },
    lobbyUpdateState(state, action: PayloadAction<IBillStateItem[]>) {
      state.state = action.payload;
    },
    lobbyClearState(state) {
      state = initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(makePayment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        makePayment.fulfilled,
        (state, action: PayloadAction<IPaymentResponse>) => {
          state.isPayed = true;
          state.amount = action.payload.amount;
          state.isLoading = false;
        },
      )
      .addCase(makePayment.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload.message;
        state.isLoading = false;
      });
  },
});

export const {
  setIsIniciator,
  lobbyClearState,
  lobbyInit,
  lobbyUpdate,
  lobbyUpdateState,
} = lobbySlice.actions;
export default lobbySlice.reducer;
