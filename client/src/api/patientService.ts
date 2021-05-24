import {
  Patient,
  Gender,
  Appointment,
  AppointmentType,
  Status,
  Questionnaire,
  CustomError,
  History,
} from "../models/patient";

const initHistory: History = {
  name: "",
  description: "",
};

const initPatient: Patient = {
  _id: "",
  avatar: "",
  firstname: "",
  lastname: "",
  birth: new Date(),
  gender: Gender.Female,
  dni: "",
  email: "",
  phone: "",
  mobile: "",
  address: "",
  historyList: [initHistory],
  appointments: [],
  notes: "",
  createdAt: new Date(),
  updatedAt: new Date(),
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
  questions: [""],
};

const initCustomError: CustomError = {
  status: "",
  message: "",
};

export { initPatient, initAppointment, initQuestionnaire, initCustomError };
