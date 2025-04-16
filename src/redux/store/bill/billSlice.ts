import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { IBillState, IBillResponse } from './types.ts';
import { sendBill } from './billThunks.ts';

const initialState: IBillState = {
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
        (state, action: PayloadAction<IBillResponse>) => {
          state.billsData = action.payload;
          state.isFetched = true;
          state.isLoading = false;
        },
      )
      .addCase(sendBill.rejected, (state, action) => {
        state.message = action.payload.message;
        state.isLoading = false;
        state.isFetched = false;
      });
  },
});

export const { clearBillData } = billSlice.actions;
export default billSlice.reducer;
