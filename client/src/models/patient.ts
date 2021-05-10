export interface Patient {
  id?: number;
  reference: string;
  avatar?: string;
  firstname: string;
  lastname: string;
  dateOfBirth: string;
  gender: Gender;
  dni: string;
  email: string;
  phone: string;
  mobile: string;
  address: string;
  historyList: History[];
  appointments: Appointment[];
  notes: string;
  created?: string;
  lastModified: string;
}

export enum Gender {
  Male = "M",
  Female = "F",
  Other = "O",
}

export interface History {
  name: string;
  description: string;
}

export interface Appointment {
  id?: number;
  patientId?: string;
  title: string;
  description: string;
  type: AppointmentType;
  createdAt: string;
  analysis: string;
  plan: string;
  comment: string;
  recommendation: string;
  attachments: Attachment[];
}

export interface Surgery {
  patientId?: string;
  title: string;
  description: string;
  date: string;
  comment: string;
  attachmentsBefore: Attachment[];
  attachmentsAfter: Attachment[];
  status: string;
}

export interface Attachment {
  name: string;
  size: string;
  modified: string;
}

export enum AppointmentType {
  PreliminaryTalk = "P",
  Check = "C",
  Surgery = "S",
  Other = "O",
}
