export interface Service {
  id: string;
  name: string;
  description?: string;
  formName?: string;
  status: 'mapped' | 'unmapped';
  isActive?: boolean;
  category?: string | null;
  icon?: string | null;
  assignedProviders?: any[];
}

export interface FormData {
  title: string;
  description: string;
  fields: FormField[];
}

export interface FormField {
  id: string;
  label: string;
  type: 'text' | 'textarea' | 'checkbox' | 'select' | 'radio';
  required?: boolean;
  section?: string;
  options?: string[];
}

export interface ToastMessage {
  message: string;
  type: 'success' | 'error' | 'info';
}
