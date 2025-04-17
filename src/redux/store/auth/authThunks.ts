import { createAsyncThunk } from '@reduxjs/toolkit';
import type { AxiosResponse } from 'axios';
import {
  AUTH_LOGIN,
  AUTH_LOGOUT,
  AUTH_REFRESH,
  AUTH_REG,
  AUTH_SEND_CODE,
  AUTH_WHO_AM_I,
} from '../../../constants/endpoints/endpointConst.ts';
import api from '../../../services/axios/api.ts';
import type {
  IAuthData,
  IAuthError,
  IAuthResponse,
  IWhoAmIResponse,
} from './types.ts';

const login = createAsyncThunk<
  IAuthResponse,
  IAuthData,
  { rejectValue: IAuthError }
>('auth/login', async ({ login, password }, { rejectWithValue }) => {
  try {
    const response: AxiosResponse<IAuthResponse> = await api.post(AUTH_LOGIN, {
      login,
      password,
    });
    return response.data;
  } catch (error) {
    return rejectWithValue({
      message: error?.response?.data?.message || error.message,
    });
  }
});

const registration = createAsyncThunk<
  IAuthResponse,
  IAuthData,
  { rejectValue: IAuthError }
>(
  'auth/registration',
  async ({ name, phoneNumber, email }, { rejectWithValue }) => {
    try {
      const response: AxiosResponse<IAuthResponse> = await api.post(AUTH_REG, {
        name,
        phoneNumber,
        email,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue({
        message: error?.response?.data?.message || error.message,
      });
    }
  },
);

const logout = createAsyncThunk<object, void, { rejectValue: IAuthError }>(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.put(AUTH_LOGOUT);
      return response.data;
    } catch (error) {
      return rejectWithValue({
        message: error?.response?.data?.message || error.message,
      });
    }
  },
);

const refresh = createAsyncThunk<
  IAuthResponse,
  void,
  { rejectValue: IAuthError }
>('auth/refresh', async (_, { rejectWithValue }) => {
  try {
    const response: AxiosResponse<IAuthResponse> = await api.get(AUTH_REFRESH);
    return response.data;
  } catch (error) {
    return rejectWithValue({
      message: error?.response?.data?.message || error.message,
    });
  }
});

const sendCode = createAsyncThunk<
  IAuthResponse,
  IAuthData,
  { rejectValue: IAuthError }
>('auth/sendCode', async ({ phoneNumber }, { rejectWithValue }) => {
  try {
    const response: AxiosResponse = await api.post(AUTH_SEND_CODE, {
      login: phoneNumber,
    });
    return response.data;
  } catch (error) {
    return rejectWithValue({
      message: error?.response?.data?.message || error.message,
    });
  }
});

const getUser = createAsyncThunk<
  IWhoAmIResponse,
  void,
  { rejectValue: IAuthError }
>('auth/who-am-i', async (_, { rejectWithValue }) => {
  try {
    const response: AxiosResponse = await api.get(AUTH_WHO_AM_I);
    return response.data;
  } catch (error) {
    return rejectWithValue({
      message: error?.response?.data?.message || error.message,
    });
  }
});

export { login, registration, logout, refresh, sendCode, getUser };
