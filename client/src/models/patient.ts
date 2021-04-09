export interface Patient {
  id?: number;
  dni?: string;
  avatar?: string;
  firstname: string;
  lastname: string;
  dateOfBirth?: string;
  gender: Gender;
  email?: string;
  phone?: Phone;
  address?: Address;
  created?: string;
  lastModified: string;
}

export enum Gender {
  Male = "M",
  Female = "F",
  Other = "O",
}

interface Phone {
  phone: string;
  emergency?: string;
  other?: string;
}

interface Address {
  street: string;
  houseNumber: string;
  additional: string;
  postalCode: string;
  city: string;
  country: string;
}
