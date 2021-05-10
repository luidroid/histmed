import React from "react";
import { Status } from "../models/patient";
import Typography from "@material-ui/core/Typography";

type Props = {
  status: Status;
};
export default function AppointmentStatus({ status }: Props) {
  let result;

  switch (status) {
    case Status.InProgress:
      result = (
        <Typography component="h3" variant="h6" color="primary">
          En progreso
        </Typography>
      );
      break;

    case Status.Done:
      result = (
        <Typography component="h3" variant="h6" color="primary">
          Finalizada
        </Typography>
      );
      break;

    case Status.Pending:
      result = (
        <Typography component="h3" variant="h6" color="primary">
          Pendiente
        </Typography>
      );
      break;

    case Status.Canceled:
      result = (
        <Typography component="p" variant="subtitle1" color="error">
          Cancelada
        </Typography>
      );
      break;

    default:
      result = (
        <Typography component="p" variant="subtitle1" color="error">
          Abierta
        </Typography>
      );
      break;
  }

  return <div>{result}</div>;
}
