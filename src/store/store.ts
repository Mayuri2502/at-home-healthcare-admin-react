import { configureStore } from '@reduxjs/toolkit';
import { api } from '../services/api';
import { doctorsApi } from '../services/doctorsApi';
import authReducer from './authSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    api: api.reducer,
    doctorsApi: doctorsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware, doctorsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
