export interface Patient {
  _id?: string;
  avatar: string;
  firstname: string;
  lastname: string;
  birth: Date;
  gender: Gender;
  dni: string;
  email: string;
  phone: string;
  mobile: string;
  address: string;
  historyList: History[];
  appointments: Appointment[];
  notes: string;
  createdAt: Date;
  updatedAt: Date;
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
  _id?: string;
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

export interface Attachment {
  name: string;
  size: string;
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

export interface Questionnaire {
  _id?: string;
  name: string;
  questions: string[];
}

export interface CustomError {
  status: string;
  message: string;
}
