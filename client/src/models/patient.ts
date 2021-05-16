export interface Patient {
  _id: string;
  id?: number;
  reference: string;
  avatar: string;
  firstname: string;
  lastname: string;
  birth: string;
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
  _id: string;
  id?: number;
  person: Patient;
  title: string;
  description: string;
  category: AppointmentType;
  scheduled: string;
  analysis: string;
  plan: string;
  comment: string;
  recommendation: string;
  attachments: Attachment[];
  status: Status;
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
  PreliminaryTalk = "T",
  Check = "C",
  Surgery = "S",
  Other = "O",
  Paid = "P",
}

export enum Status {
  Open = "O",
  InProgress = "I",
  Done = "D",
  Pending = "P",
  Canceled = "C",
}

export interface Questionnarie {
  _id: string;
  questions: string[];
}

export interface CustomError {
  status: string;
  message: string;
}
