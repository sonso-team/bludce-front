import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { IAuthState, IAuthResponse } from './types.ts';
import {
  login,
  logout,
  refresh,
  registration,
  sendCode,
  getUser,
} from './authThunks.ts';

const initialState: IAuthState = {
  isLoading: true,
  isAuth: false,
  user: null,
  message: null,
  goConfirmStep: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLogin(state, action: PayloadAction<{ login: string }>) {
      state.user = {
        phoneNumber: action.payload.login,
        id: null,
        email: null,
        name: null,
      };
    },
    setGoConfirmStep(state, action: PayloadAction<boolean>) {
      state.goConfirmStep = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.message = null;
      })
      .addCase(
        login.fulfilled,
        (state, action: PayloadAction<IAuthResponse>) => {
          console.log(11111);
          state.isLoading = false;
          state.message = action.payload.message;
          localStorage.setItem('token', action.payload.token);
          state.isAuth = true;
        },
      )
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.message;
      })
      .addCase(registration.pending, (state) => {
        state.isLoading = true;
        state.message = null;
      })
      .addCase(
        registration.fulfilled,
        (state, action: PayloadAction<IAuthResponse>) => {
          state.isLoading = false;
          state.user = action.payload.user;
          state.goConfirmStep = true;
        },
      )
      .addCase(registration.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.message;
      })
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
        state.message = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        localStorage.removeItem('token');
        state.isAuth = false;
      })
      .addCase(logout.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.message;
      })
      .addCase(refresh.pending, (state) => {
        state.isLoading = true;
        state.message = null;
      })
      .addCase(
        refresh.fulfilled,
        (state, action: PayloadAction<IAuthResponse>) => {
          state.user = action.payload.user;
          localStorage.setItem('token', action.payload.token);
          state.isAuth = true;
          state.isLoading = false;
        },
      )
      .addCase(refresh.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.message;
      })
      .addCase(sendCode.pending, (state) => {
        state.isLoading = true;
        state.message = null;
      })
      .addCase(sendCode.fulfilled, (state) => {
        state.goConfirmStep = true;
        state.isLoading = false;
      })
      .addCase(sendCode.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.message;
      })
      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
        state.message = null;
      })
      .addCase(getUser.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.message;
      });
  },
});

export const { setLogin, setGoConfirmStep } = authSlice.actions;
export default authSlice.reducer;
