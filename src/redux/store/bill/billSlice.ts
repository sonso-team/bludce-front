import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type {
  IBillState,
  SendBillResponse,
  BillItem,
  ConfirmBillResponse,
} from './types.ts';
import { confirmBill, sendBill } from './billThunks.ts';

const initialState: IBillState = {
  receiptId: null,
  isLoading: false,
  billsData: [],
  isFetched: false,
  message: null,
};

const billSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearBillData(state) {
      state.billsData = [];
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendBill.pending, (state) => {
        state.isLoading = true;
        state.isFetched = false;
        state.message = null;
      })
      .addCase(
        sendBill.fulfilled,
        (state, action: PayloadAction<SendBillResponse>) => {
          state.billsData = action.payload;
          state.isFetched = true;
          state.isLoading = false;
        },
      )
      .addCase(sendBill.rejected, (state, action) => {
        state.message = action.payload.message;
        state.isLoading = false;
        state.isFetched = false;
      })
      .addCase(confirmBill.pending, (state) => {
        state.receiptId = null;
        state.isLoading = true;
        state.isFetched = false;
        state.message = null;
      })
      .addCase(
        confirmBill.fulfilled,
        (state, action: PayloadAction<ConfirmBillResponse>) => {
          state.receiptId = action.payload.receiptId;
          state.isFetched = true;
          state.isLoading = false;
        },
      )
      .addCase(confirmBill.rejected, (state, action) => {
        state.message = action.payload.message;
        state.isLoading = false;
        state.isFetched = false;
      });
  },
});

export const { clearBillData, removeBillItem, updateBillData } =
  billSlice.actions;
export default billSlice.reducer;
