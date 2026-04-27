import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { DoctorsResponse, DoctorsListParams, DoctorDetailResponse, DoctorStatusUpdateRequest, DoctorStatusUpdateResponse, InternalNotesRequest, InternalNotesResponse } from '../types/doctor';

export const doctorsApi = createApi({
  reducerPath: 'doctorsApi',
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
    getDoctorDetails: builder.query<DoctorDetailResponse, string>({
      query: (doctorId) => ({
        url: `/admin/doctors/${doctorId}`,
        method: 'GET',
      }),
      providesTags: ['Doctors'],
    }),
    updateDoctorStatus: builder.mutation<DoctorStatusUpdateResponse, { doctorId: string; statusData: DoctorStatusUpdateRequest }>({
      query: ({ doctorId, statusData }) => ({
        url: `/admin/doctors/${doctorId}/status`,
        method: 'POST',
        body: statusData,
      }),
      invalidatesTags: ['Doctors'],
    }),
    updateInternalNotes: builder.mutation<InternalNotesResponse, { doctorId: string; notesData: InternalNotesRequest }>({
      query: ({ doctorId, notesData }) => ({
        url: `/admin/doctors/${doctorId}/internal-notes`,
        method: 'PUT',
        body: notesData,
      }),
      invalidatesTags: ['Doctors'],
    }),
  }),
});

export const { useGetDoctorsQuery, useGetDoctorDetailsQuery, useUpdateDoctorStatusMutation, useUpdateInternalNotesMutation } = doctorsApi;
