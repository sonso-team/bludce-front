import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import loaderReducer from './loader/loaderSlice';
import billsReducer from './bill/billSlice';
import historyReducer from './history/historySlice';

export const rootReducer = combineReducers({
  authReducer,
  loaderReducer,
  billsReducer,
  historyReducer,
});
export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
export type RootState = ReturnType<typeof rootReducer>;
