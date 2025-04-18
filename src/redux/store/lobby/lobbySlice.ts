import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { IBillStateItem, ILobbyMessage, ILobbyState } from './types.ts';

const initialState: ILobbyState = {
  isConnected: false,
  isLoading: true,
  isIniciator: false,
  userId: null,
  state: [],
};

const lobbySlice = createSlice({
  name: 'lobby',
  initialState,
  reducers: {
    setIsIniciator(state) {
      state.isIniciator = true;
    },
    lobbyInit(state, action: PayloadAction<ILobbyMessage>) {
      state.isConnected = true;
      state.state = action.payload.state;
      state.userId = action.payload.userId;
      state.isLoading = false;
    },
    lobbyUpdate(state, action: PayloadAction<ILobbyMessage>) {
      state.state = action.payload.state;
    },
    lobbyUpdateState(state, action: PayloadAction<IBillStateItem[]>) {
      state.state = action.payload;
    },
  },
});

export const { setIsIniciator, lobbyInit, lobbyUpdate, lobbyUpdateState } =
  lobbySlice.actions;
export default lobbySlice.reducer;
