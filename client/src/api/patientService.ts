import { Patient, Gender } from "../models/patient";

const initPatient: Patient = {
  avatar: "",
  firstname: "init lui",
  lastname: "",
  secondName: "",
  secondLastname: "",
  dateOfBirth: "",
  gender: Gender.Other,
  dni: "",
  email: "",
  phone: "",
  mobile: "",
  adress: {
    street: "",
    houseNumber: "",
    postalCode: "",
    city: "",
    country: "",
  },
  alergies: [],
  pathologicalHistory: [],
  nonPathologicalHistory: [],
  hereditaryFamilyHistory: [],
  notes: "",
  lastModified: "",
};

export { initPatient };
