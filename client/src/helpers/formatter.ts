import { AppointmentType, Gender, Status } from "../models/patient";

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

const formatGender = (key: Gender) => {
  let result = "";
  switch (key) {
    case Gender.Female:
      result = "Femenino";
      break;

    case Gender.Male:
      result = "Masculino";
      break;

    default:
      result = "Otro";
      break;
  }
  return result;
};

const formatStatus = (key: Status) => {
  let result = "";
  switch (key) {
    case Status.InProgress:
      result = "En progreso";
      break;

    case Status.Done:
      result = "Finalizada";
      break;
    case Status.Pending:
      result = "Pendiente";
      break;
    case Status.Canceled:
      result = "Cancelada";
      break;

    default:
      result = "Abierta";
      break;
  }
  return result;
};

export { formatAppointmentType, formatGender, formatStatus };
