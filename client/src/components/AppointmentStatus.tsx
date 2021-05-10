import React from "react";
import { Status } from "../models/patient";
import Typography from "@material-ui/core/Typography";
import { Chip } from "@material-ui/core";
import { blue, green, pink, orange, grey } from "@material-ui/core/colors";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { Theme } from "@material-ui/core";
import createStyles from "@material-ui/core/styles/createStyles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    blue: {
      color: blue[500],
    },
    pink: {
      color: pink[500],
    },
    green: {
      color: green[500],
    },
    orange: {
      color: orange[500],
    },
    grey: {
      color: grey[500],
    },
  })
);

type Props = {
  status: Status;
};
export default function AppointmentStatus({ status }: Props) {
  const classes = useStyles();

  let result;

  switch (status) {
    case Status.InProgress:
      result = (
        <Typography component="p" variant="subtitle2" className={classes.blue}>
          En progreso
        </Typography>
      );
      break;

    case Status.Done:
      result = (
        <Typography component="p" variant="subtitle2" className={classes.green}>
          Finalizada
        </Typography>
      );
      break;

    case Status.Pending:
      result = (
        <Typography component="p" variant="subtitle2" className={classes.grey}>
          Pendiente
        </Typography>
      );
      break;

    case Status.Canceled:
      result = (
        <Typography component="p" variant="subtitle2" color="error">
          Cancelada
        </Typography>
      );
      break;

    default:
      result = (
        <Typography
          component="p"
          variant="subtitle2"
          className={classes.orange}
        >
          Abierta
        </Typography>
      );
      break;
  }

  return <div>{result}</div>;
}
