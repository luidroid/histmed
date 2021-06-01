import React, { useEffect, useState } from "react";
import { useParams, Link as RouterLink } from "react-router-dom";

import { useGlobalStyles } from "../styles/globalStyles";
import { Appointment } from "../models/patient";
import { APPOINTMENTS_URL } from "../constants/constants";
import PatientAppointmentItem from "../components/PatientAppointmentItem";

import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import Link from "@material-ui/core/Link";
import List from "@material-ui/core/List";
import ListSubheader from "@material-ui/core/ListSubheader";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";

type Props = {
  appointments: Appointment[];
};
export default function PatientAppointments({ appointments }: Props) {
  const globalClasses = useGlobalStyles();
  const { id } = useParams<{ id: string }>();
  const appointmentUrl = `${APPOINTMENTS_URL}/new/patient/${id}`;
  const maxCount = 25;
  const [filteredAappointments, setFilteredAappointments] = useState<
    Appointment[]
  >([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    if (showAll) {
      setFilteredAappointments(appointments);
    } else {
      const results = appointments.slice(0, maxCount);
      setFilteredAappointments(results);
    }
  }, [appointments, showAll, maxCount]);

  const handleShowAll = () => {
    setShowAll(!showAll);
  };

  return (
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
        to={appointmentUrl}
      >
        Iniciar consulta{" "}
      </Button>
      {appointments.length > 0 && (
        <div>
          <List
            subheader={
              <ListSubheader component="div" id="nested-list-subheader">
                Consultas agendadas
              </ListSubheader>
            }
          >
            {filteredAappointments.map((appointment, index) => (
              <React.Fragment key={index}>
                <PatientAppointmentItem
                  item={appointment}
                ></PatientAppointmentItem>
                <Divider variant="inset" component="li" />
              </React.Fragment>
            ))}
          </List>

          <div>
            {appointments.length > maxCount && (
              <Link color="primary" onClick={handleShowAll}>
                {showAll ? "Ver más" : "Ver menos"}
              </Link>
            )}
          </div>
        </div>
      )}
    </Paper>
  );
}
