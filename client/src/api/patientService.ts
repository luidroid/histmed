import { Patient, Gender, History } from "../models/patient";

const initHistory: History[] = [
  { name: "Peso", description: "" },
  { name: "Estatura", description: "" },
  {
    name:
      "¿Cuántos hijos tienes y de qué forma nacieron? (Parto normal o cesárea) ",
    description: "",
  },
  { name: "¿Planificás tener más hijos?", description: "" },
  { name: "¿Fumas? ¿Con cuánta frecuencia?", description: "" },
  { name: "¿Consumís alguna medicación?", description: "" },
  { name: "¿Tienes alergia a algún medicamento? ¿Cuál?", description: "" },
  {
    name:
      "¿Tienes alergia a alguna sustancia irritante? (Ej. Pelo de animales, Plantas, Polvo, etc.)",
    description: "",
  },
  {
    name:
      "¿Tuviste o tienes enfermedades graves? (Ej. Presión alta, Diabetes, Tiroides, etc.)",
    description: "",
  },
  {
    name:
      "¿Tienes cicatrización patológica? (Ej. Queloide o cicatriz hipertrofica)",
    description: "",
  },
  {
    name:
      "¿Tuviste alguna cirugía anterior? (Ej. Apéndice, Vesícula, Hernia, Cirugía Plástica o Estética, etc..)",
    description: "",
  },
  { name: "Procedimientos Estéticos realizados", description: "" },
  { name: "¿En qué procedimiento estás interesado/a?", description: "" },
];

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
  address: {
    street: "",
    houseNumber: "",
    postalCode: "",
    city: "",
    country: "",
  },
  historyList: [],
  notes: "",
  lastModified: "",
};

export { initHistory, initPatient };
