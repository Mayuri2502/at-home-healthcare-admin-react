export interface Doctor {
  id: string;
  fName: string;
  lName: string;
  email: string;
  rppsNumber: string;
  finessNumber: string;
  specialty: string;
  businessAddress: string;
  practiceType: 'private' | 'public' | 'other';
  status: 'pendingApproval' | 'approved' | 'rejected';
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
  country?: string;
  assignedServices: any[];
  emailNotificationsEnabled: boolean;
  digitalSignatureKey: null;
  submittedFormCount: number;
  roles: string[];
  isFirstLogin: boolean;
  isBlocked: boolean;
  deleted: {
    status: boolean;
    by: null;
    at: number;
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

export interface DoctorsResponse {
  status: number;
  message: string;
  data: {
    doctors: Doctor[];
    pagination: Pagination;
  };
  timestamp: string;
}

export interface DoctorDetailResponse {
  status: number;
  message: string;
  data: Doctor;
  timestamp: string;
}

export interface DoctorsListParams {
  page?: number;
  size?: number;
  specialty?: string;
  status?: string;
}
