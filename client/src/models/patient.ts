export interface Patient {
  id?: number;
  reference: string;
  avatar?: string;
  firstname: string;
  lastname: string;
  dateOfBirth?: string;
  gender: Gender;
  dni?: string;
  email?: string;
  phone?: string;
  mobile?: string;
  address?: string;
  historyList: History[];
  notes?: string;
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
  title: "";
  date: "";
  type: AppointmentType;
}

export enum AppointmentType {
  PreliminaryTalk = "P",
  Check = "C",
  Surgery = "S",
  Other = "O",
}
