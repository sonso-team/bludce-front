import { createAsyncThunk } from '@reduxjs/toolkit';
import type { AxiosResponse } from 'axios';
import { BILL_SEND } from '../../../constants/endpoints/endpointConst.ts';
import api from '../../../services/axios/api.ts';
import type { BillData, IBillError, IBillResponse } from './types';

const sendBill = createAsyncThunk<
  IBillResponse,
  BillData,
  { rejectValue: IBillError }
>('auth/login', async (file, { rejectWithValue }) => {
  try {
    const response: AxiosResponse<IBillResponse> = await api.post(
      BILL_SEND,
      file,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    return response.data;
  } catch (error) {
    return rejectWithValue({
      message: error?.response?.data?.message || error.message,
    });
  }
});

export { sendBill };
