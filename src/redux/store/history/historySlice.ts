import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { IHistoryState } from './types.ts';

const initialState: IHistoryState = {
  isLoading: false,
  historyData: [],
  isFetched: false,
  message: null,
};

const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    clearHistoryData(state) {
      state.historyData = [];
    },
    addBillToHistory(state) {
      state.historyData = [];
    },
  },
  extraReducers: (builder) => {
    // builder
    //   .addCase(sendBill.pending, (state) => {
    //     state.isLoading = true;
    //     state.isFetched = false;
    //     state.message = null;
    //   })
    // //   .addCase(
    // //     sendBill.fulfilled,
    // //     (state, action: PayloadAction<IBillResponse>) => {
    // //       state.billsData = action.payload;
    // //       state.isFetched = true;
    // //       state.isLoading = false;
    // //     },
    // //   )
    //   .addCase(sendBill.rejected, (state, action) => {
    //     state.message = action.payload.message;
    //     state.isLoading = false;
    //     state.isFetched = false;
    //   });
  },
});

export const { clearHistoryData } = historySlice.actions;
export default historySlice.reducer;
