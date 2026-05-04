export interface Doctor {
  name: string;
  specialty: string;
  avatar: string;
}

export interface RequestData {
  id: string;
  requestId: string;
  doctorName: string;
  doctorSpeciality: string;
  doctorProfileImage: string | null;
  patientName: string;
  serviceName: string;
  status: 'pending' | 'completed' | 'inprogress' | 'returned' | 'draft';
  createdAt: string;
  updatedAt: string;
  priorityLevel: string;
  requestedDate: string;
  requestedTime: string;
  assignedProviderName: string;
  digitalSignature: {
    signatureData: string | null;
    signedAt: string | null;
    signedBy: string | null;
  } | null;
  formData: any | null;
  providerFormData: any | null;
  signedPdfUrl: string | null;
  isReadyForDoctorReview: boolean;
  statusDuration: number;
  statusDurationDays: number;
  statusHistory: any[];
  // Computed properties for backward compatibility
  doctor?: Doctor;
  patient?: string;
  serviceType?: string;
  dateCreated?: string;
  lastUpdated?: string;
  serviceColor?: string;
  formStatus?: string;
}

export interface TimelineEvent {
  status: string;
  date: string;
  icon: string;
  color: string;
}
