import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type {
  IBillState,
  SendBillResponse,
  BillItem,
  ConfirmBillResponse,
} from './types.ts';
import { configBill, confirmBill, sendBill } from './billThunks.ts';

const initialState: IBillState = {
  receiptId: null,
  isError: false,
  isLoading: false,
  billsData: [],
  isFetched: false,
  message: null,
  isConfigured: false,
};

const billSlice = createSlice({
  name: 'bill',
  initialState,
  reducers: {
    clearBillData(state) {
      state.billsData = [];
    },
    clearReceiptData(state) {
      state.receiptId = null;
    },
    updateBillData(
      state,
      action: PayloadAction<{ index: number; item: BillItem }>,
    ) {
      state.billsData[action.payload.index] = action.payload.item;
    },
    removeBillItem(state, action: PayloadAction<number>) {
      const result = Array.from(state.billsData);
      result.splice(action.payload, 1);
      state.billsData = result;
    },
    unsetIsConfigured(state) {
      state.isConfigured = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendBill.pending, (state) => {
        state.isLoading = true;
        state.isFetched = false;
        state.isError = false;
        state.message = null;
      })
      .addCase(
        sendBill.fulfilled,
        (state, action: PayloadAction<SendBillResponse>) => {
          state.billsData = action.payload;
          state.isFetched = true;
          state.isError = false;
          state.isLoading = false;
        },
      )
      .addCase(sendBill.rejected, (state, action) => {
        state.message = action.payload.message;
        state.isError = true;
        state.isLoading = false;
        state.isFetched = false;
      })
      .addCase(confirmBill.pending, (state) => {
        state.receiptId = null;
        state.isError = false;
        state.isLoading = true;
        state.isFetched = false;
        state.message = null;
      })
      .addCase(
        confirmBill.fulfilled,
        (state, action: PayloadAction<ConfirmBillResponse>) => {
          state.receiptId = action.payload.receiptId;
          state.isError = false;
          state.isFetched = true;
          state.isLoading = false;
        },
      )
      .addCase(confirmBill.rejected, (state, action) => {
        state.message = action.payload.message;
        state.isLoading = false;
        state.isError = true;
        state.isFetched = false;
      })
      .addCase(configBill.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isFetched = false;
        state.message = null;
        state.isConfigured = false;
      })
      .addCase(configBill.fulfilled, (state) => {
        state.isFetched = true;
        state.isError = false;
        state.isConfigured = true;
        state.isLoading = false;
      })
      .addCase(configBill.rejected, (state, action) => {
        state.message = action.payload.message;
        state.isError = true;
        state.isConfigured = false;
        state.isFetched = false;
        state.isLoading = false;
      });
  },
});

export const {
  clearBillData,
  clearReceiptData,
  removeBillItem,
  unsetIsConfigured,
  updateBillData,
} = billSlice.actions;
export default billSlice.reducer;
