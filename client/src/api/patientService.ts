import { Patient, Gender } from "../models/patient";

const initPatient: Patient = {
  avatar: "",
  reference: "",
  firstname: "init lui",
  lastname: "",
  dateOfBirth: "",
  gender: Gender.Other,
  dni: "",
  email: "",
  phone: "",
  mobile: "",
  address: "",
  historyList: [],
  appointments: [],
  notes: "",
  lastModified: "",
};

export { initPatient };
