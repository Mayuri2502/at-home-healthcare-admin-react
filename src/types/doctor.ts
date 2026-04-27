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
  status: 'pendingApproval' | 'approved' | 'rejected' | 'inactive';
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
  data: {
    profile: Doctor;
    verification: {
      assignedAt: null;
      assignedTo: null;
      automatedChecks: any;
      createdAt: string;
      currentStatus: string;
      decisionReason: string;
      reviewCompletedAt: null;
      reviewStartedAt: null;
      timeline: any[];
      updatedAt: string;
    };
  };
  timestamp: string;
}

export interface DoctorsListParams {
  page?: number;
  size?: number;
  specialty?: string;
  status?: string;
}

export interface DoctorStatusUpdateRequest {
  status: 'approved' | 'rejected' | 'inactive';
  reason?: string;
  comment?: string;
}

export interface DoctorStatusUpdateResponse {
  status: number;
  message: string;
  data: {
    status: 'approved' | 'rejected' | 'inactive';
    updatedBy: string;
    updatedAt: number;
    isVerified: boolean;
  };
  timestamp: string;
}
