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
  person: "",
  title: "",
  description: "",
  category: AppointmentType.PreliminaryTalk,
  scheduled: new Date(),
  from: new Date(),
  to: new Date(),
  analysis: "",
  plan: "",
  comment: "",
  recommendation: "",
  attachments: [],
  status: Status.Pending,
};

const initQuestionnaire: Questionnaire = {
  name: "",
  questions: [""],
};

const initCustomError: CustomError = {
  message: "",
};

export { initPatient, initAppointment, initQuestionnaire, initCustomError };
