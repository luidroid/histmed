import React from "react";
import { useParams, Link as RouterLink } from "react-router-dom";

import { useGlobalStyles } from "../styles/globalStyles";

import {
  Button,
  Divider,
  Icon,
  Link,
  List,
  ListSubheader,
  Paper,
  Typography,
} from "@material-ui/core";

import PatientAppointmentItem from "../components/PatientAppointmentItem";
import { Appointment } from "../models/patient";

type Props = {
  appointments: Appointment[];
};
export default function PatientAppointments({ appointments }: Props) {
  const globalClasses = useGlobalStyles();
  const { id } = useParams<{ id: string }>();

  return (
    <div>
      <Paper className={globalClasses.paper}>
        <Typography component="h3" variant="h6" color="primary" gutterBottom>
          Consultas{" "}
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          startIcon={<Icon>add</Icon>}
          component={RouterLink}
          to={`/patients/${id}/appointments/new`}
        >
          Iniciar consulta{" "}
        </Button>

        <List
          subheader={
            <ListSubheader component="div" id="nested-list-subheader">
              Consultas agendadas
            </ListSubheader>
          }
        >
          {appointments.map((appointment, index) => (
            <React.Fragment key={index}>
              <PatientAppointmentItem
                item={appointment}
              ></PatientAppointmentItem>
              <Divider variant="inset" component="li" />
            </React.Fragment>
          ))}
        </List>

        <div>
          <Link color="primary" href="#">
            Ver más{" "}
          </Link>
        </div>
      </Paper>
    </div>
  );
}
