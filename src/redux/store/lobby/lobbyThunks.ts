import { createAsyncThunk } from '@reduxjs/toolkit';
import type { AxiosResponse } from 'axios';
import api from '../../../services/axios/api.ts';
import type { IBillError } from '../bill/types';
import type { IPaymentData, IPaymentResponse } from './types';

const makePayment = createAsyncThunk<
  IPaymentResponse,
  IPaymentData,
  { rejectValue: IBillError }
>('lobby/makePayment', async (data, { rejectWithValue }) => {
  try {
    const response: AxiosResponse<IPaymentResponse> = await api.post(
      `/api/receipt/${data.receiptId}/finish/${data.userId}`,
      data,
    );
    return response.data;
  } catch (error) {
    return rejectWithValue({
      message: error?.response?.data?.message || error.message,
    });
  }
});

export { makePayment };
