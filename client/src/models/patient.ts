export interface Patient {
  id?: number;
  reference?: string;
  avatar?: string;
  firstname: string;
  lastname: string;
  secondName?: string;
  secondLastname?: string;
  dateOfBirth?: string;
  gender: Gender;
  dni?: string;
  email?: string;
  phone?: string;
  mobile?: string;
  address?: Address;
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

export interface Address {
  street: string;
  houseNumber: string;
  postalCode: string;
  city: string;
  country: string;
}

export interface History {
  name: string;
  description: string;
}
