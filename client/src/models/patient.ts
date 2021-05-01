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
  adress?: Address;
  alergies: History[];
  pathologicalHistory: History[];
  nonPathologicalHistory: History[];
  hereditaryFamilyHistory: History[];
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

export interface Alergy {
  name: string;
  description: string;
}

export interface PathologicalList {
  name: string;
  description: string;
}

export interface NonPathologicalList {
  name: string;
  description: string;
}

export interface HereditaryFamilyList {
  name: string;
  description: string;
}
