import { configureStore } from '@reduxjs/toolkit';
import { api } from '../services/api';
import { doctorsApi } from '../services/doctorsApi';
import { providersApi } from '../services/providersApi';
import authReducer from './authSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    api: api.reducer,
    doctorsApi: doctorsApi.reducer,
    providersApi: providersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware, doctorsApi.middleware, providersApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
