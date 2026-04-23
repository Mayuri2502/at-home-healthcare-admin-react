import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { DoctorsResponse, DoctorsListParams } from '../types/doctor';

export const doctorsApi = createApi({
  reducerPath: 'doctorsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://163.227.92.122:3047',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('authToken');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Doctors'],
  endpoints: (builder) => ({
    getDoctors: builder.query<DoctorsResponse, DoctorsListParams>({
      query: (params) => ({
        url: '/admin/doctors',
        method: 'GET',
        params,
      }),
      providesTags: ['Doctors'],
    }),
  }),
});

export const { useGetDoctorsQuery } = doctorsApi;
