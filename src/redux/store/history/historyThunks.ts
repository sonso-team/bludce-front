import { createAsyncThunk } from '@reduxjs/toolkit';
import type { AxiosResponse } from 'axios';
import { HISTORY_GET } from '../../../constants/endpoints/endpointConst.ts';
import api from '../../../services/axios/api.ts';
import type { IHistoryError, IHistoryResponse } from './types.ts';

const getHistory = createAsyncThunk<
  IHistoryResponse,
  void,
  { rejectValue: IHistoryError }
>('receipt/history', async (_, { rejectWithValue }) => {
  try {
    const response: AxiosResponse<IHistoryResponse> =
      await api.get(HISTORY_GET);
    return response.data;
  } catch (error) {
    return rejectWithValue({
      message: error?.response?.data?.message || error.message,
    });
  }
});

export { getHistory };
