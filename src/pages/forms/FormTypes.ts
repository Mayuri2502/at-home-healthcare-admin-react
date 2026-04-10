export interface Service {
  id: string;
  name: string;
  formName?: string;
  status: 'mapped' | 'unmapped';
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
