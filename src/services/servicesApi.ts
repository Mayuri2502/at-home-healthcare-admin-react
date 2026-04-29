import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface FormMapping {
  status: 'Mapped' | 'Unmapped';
  templateId: string | null;
  templateName: string | null;
  version: string | null;
}

export interface Service {
  id: string;
  serviceName: string;
  description: string;
  icon: string | null;
  formTemplateId: string | null;
  category: string | null;
  isActive: boolean;
  providers?: number;
  formMapping: FormMapping;
  createdBy?: {
    id: string;
  };
  updatedBy?: {
    id: string;
  };
}

export interface Pagination {
  total: number;
  page: number;
  size: number;
  totalPages: number;
  totalRange: string;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface ServiceResponse {
  status: number;
  message: string;
  data: Service;
  timestamp: string;
}

export interface ServicesListResponse {
  status: number;
  message: string;
  data: {
    services: Service[];
    pagination: Pagination;
  };
  timestamp: string;
}

export const servicesApi = createApi({
  reducerPath: 'servicesApi',
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
  tagTypes: ['Services'],
  endpoints: (builder) => ({
    getServices: builder.query<ServicesListResponse, { page?: number; size?: number }>({
      query: ({ page = 1, size = 10 }) => ({
        url: '/services/admin/form-mappings',
        params: { page, size },
      }),
      providesTags: ['Services'],
    }),
    getServiceById: builder.query<ServiceResponse, string>({
      query: (id) => ({
        url: `/services/${id}`,
      }),
      providesTags: ['Services'],
    }),
  }),
});

export const { useGetServicesQuery, useGetServiceByIdQuery } = servicesApi;
