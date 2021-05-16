import {
  Patient,
  Gender,
  Appointment,
  AppointmentType,
  Status,
  Questionnaire,
} from "../models/patient";

const initPatient: Patient = {
  _id: "",
  avatar: "",
  reference: "",
  firstname: "init lui",
  lastname: "",
  birth: "",
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

const initAppointment: Appointment = {
  _id: "",
  person: initPatient,
  title: "",
  description: "",
  category: AppointmentType.PreliminaryTalk,
  scheduled: "",
  analysis: "",
  plan: "",
  comment: "",
  recommendation: "",
  attachments: [],
  status: Status.Open,
};

const initQuestionnaire: Questionnaire = {
  _id: "",
  name: "",
  questions: [],
};

export { initPatient, initAppointment, initQuestionnaire };
