export interface Doctor {
  name: string;
  specialty: string;
  avatar: string;
}

export interface RequestData {
  id: string;
  doctor: Doctor;
  patient: string;
  serviceType: string;
  status: 'pending' | 'completed' | 'inprogress' | 'returned';
  dateCreated: string;
  serviceColor: string;
}

export interface TimelineEvent {
  status: string;
  date: string;
  icon: string;
  color: string;
}
