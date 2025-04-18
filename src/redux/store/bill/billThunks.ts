import { createAsyncThunk } from '@reduxjs/toolkit';
import type { AxiosResponse } from 'axios';
import {
  BILL_CONFIRM,
  BILL_SEND,
} from '../../../constants/endpoints/endpointConst.ts';
import api from '../../../services/axios/api.ts';
import type {
  BillData,
  BillItem,
  IBillConfig,
  ConfirmBillResponse,
  IBillError,
  SendBillResponse,
} from './types';

const sendBill = createAsyncThunk<
  SendBillResponse,
  BillData,
  { rejectValue: IBillError }
>('bill/sendCode', async (file, { rejectWithValue }) => {
  try {
    const response: AxiosResponse<SendBillResponse> = await api.post(
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

const confirmBill = createAsyncThunk<
  ConfirmBillResponse,
  BillItem[],
  { rejectValue: IBillError }
>('bill/confirm', async (billData, { rejectWithValue }) => {
  try {
    const response: AxiosResponse<ConfirmBillResponse> = await api.post(
      BILL_CONFIRM,
      billData,
    );
    return response.data;
  } catch (error) {
    return rejectWithValue({
      message: error?.response?.data?.message || error.message,
    });
  }
});

const configBill = createAsyncThunk<
  ConfirmBillResponse,
  IBillConfig,
  { rejectValue: IBillError }
>('bill/config', async (billData, { rejectWithValue }) => {
  try {
    const response: AxiosResponse<ConfirmBillResponse> = await api.put(
      BILL_SEND,
      billData,
    );
    return response.data;
  } catch (error) {
    return rejectWithValue({
      message: error?.response?.data?.message || error.message,
    });
  }
});

export { sendBill, confirmBill, configBill };
