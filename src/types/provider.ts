export interface ServiceDetail {
  serviceName: string;
  category: string | null;
  createdBy: {
    fName: string;
    lName: string;
    id: string;
  };
  updatedBy: {
    fName: string;
    lName: string;
    id: string;
  };
  id: string;
}

export interface Provider {
  providerName: string;
  email: string;
  phoneNumber: string;
  assignedServices: string[];
  registrationId: string;
  emailNotificationsEnabled: boolean;
  status: 'approved' | 'pending' | 'rejected' | 'inactive';
  isVerified: boolean;
  createdAt: string;
  id: string;
  serviceDetails: ServiceDetail[];
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

export interface ProvidersResponse {
  status: number;
  message: string;
  data: {
    providers: Provider[];
    pagination: Pagination;
  };
  timestamp: string;
}

export interface ProvidersListParams {
  page?: number;
  size?: number;
  status?: string;
  search?: string;
  service?: string;
}
