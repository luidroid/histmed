import { AppointmentType } from "../models/patient";

const formatAppointmentType = (key: AppointmentType) => {
  let result = "";
  switch (key) {
    case AppointmentType.PreliminaryTalk:
      result = "Charla preliminar";
      break;
    case AppointmentType.Surgery:
      result = "Cirugía";
      break;
    case AppointmentType.Check:
      result = "Revisión";
      break;

    case AppointmentType.Paid:
      result = "Pagada";
      break;

    default:
      result = "Normal";
      break;
  }
  return result;
};

export { formatAppointmentType };
