import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ProvidersResponse, ProvidersListParams } from '../types/provider';

export const providersApi = createApi({
  reducerPath: 'providersApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_BASE_URL || 'http://163.227.92.122:3047',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('authToken');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Providers'],
  endpoints: (builder) => ({
    getProviders: builder.query<ProvidersResponse, ProvidersListParams>({
      query: (params) => ({
        url: '/admin/providers',
        method: 'GET',
        params,
      }),
      providesTags: ['Providers'],
    }),
  }),
});

export const { useGetProvidersQuery } = providersApi;
