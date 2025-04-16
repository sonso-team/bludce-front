import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { HistoryItem, IHistoryResponse, IHistoryState } from './types.ts';
import { getHistory, mapBillsToHistory } from './historyThunks.ts';

const initialState: IHistoryState = {
  isLoading: false,
  historyData: null,
  isFetched: false,
  message: null,
};

const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    clearHistoryData(state) {
      state.historyData = null;
    },
    // addBillToHistory(state, action: PayloadAction<{ id: string, bill: HistoryItem }>) {
    //   state.historyData.set(action.payload.id, action.payload.bill);
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getHistory.pending, (state) => {
        state.isLoading = true;
        state.isFetched = false;
        state.message = null;
      })
      .addCase(
        getHistory.fulfilled,
        (state, action: PayloadAction<IHistoryResponse>) => {
          console.log(action.payload);
          state.historyData = mapBillsToHistory(action.payload);
          state.isFetched = true;
          state.isLoading = false;
        },
      )
      .addCase(getHistory.rejected, (state, action) => {
        state.message = action.payload.message;
        state.isLoading = false;
        state.isFetched = false;
      });
  },
});

export const { clearHistoryData } = historySlice.actions;
export default historySlice.reducer;
