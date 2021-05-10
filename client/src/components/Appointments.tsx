import React, { useEffect, useState } from "react";
import { useParams, Link as RouterLink } from "react-router-dom";
import axios from "../api/apiConfig";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import MaterialTable from "material-table";

import { useGlobalStyles } from "../styles/globalStyles";
import { DATETIME_FORMAT } from "../helpers/constants";
import AppointmentStatus from "../components/AppointmentStatus";
import { Appointment } from "../models/patient";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";

//import { Alert } from "@material-ui/lab";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";

import VisibilityIcon from "@material-ui/icons/Visibility";
import EditIcon from "@material-ui/icons/Edit";
import { formatAppointmentType } from "../helpers/helpers";

type Props = {
  appointments: Appointment[];
};
export default function Appointments() {
  const globalClasses = useGlobalStyles();
  dayjs.extend(relativeTime);

  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`/appointments`);
        console.log("🚀 ~ file: Appointments.tsx ~ line 19 ~ data", data);
        setAppointments(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setError(true);
        setLoading(false);
      }
    })();
  }, []);

  return (
    <React.Fragment>
      <Grid container spacing={1}>
        <Grid item xs={12} md={12} lg={12}>
          <MaterialTable
            columns={[
              {
                title: "Fecha",
                field: "createdAt",
                type: "datetime",
                sorting: false,

                render: (rowData) =>
                  dayjs(rowData.createdAt).format(DATETIME_FORMAT),
              },
              {
                title: "Paciente",
                field: "patient",
                sorting: false,
                customSort: (a, b) =>
                  a.patient!.firstname.length - b.patient!.firstname.length,
                render: (rowData) => (
                  <RouterLink to={`/patients/${rowData.patient?.id}`}>
                    {rowData.patient?.firstname} {rowData.patient?.lastname}
                  </RouterLink>
                ),
              },
              { title: "Motivo", field: "title", sorting: false },
              {
                title: "Tipo",
                field: "type",
                sorting: false,
                render: (rowData) => formatAppointmentType(rowData.type),
              },
              {
                title: "Estado",
                field: "status",
                render: (rowData) => (
                  <AppointmentStatus
                    status={rowData.status}
                  ></AppointmentStatus>
                ),
              },
              {
                title: "Actions",
                field: "patientId",
                sorting: false,
                render: (rowData) => (
                  <div>
                    <IconButton
                      aria-label="view"
                      component={RouterLink}
                      to={`/appointments/${rowData.id}`}
                    >
                      <VisibilityIcon />
                    </IconButton>
                    <IconButton
                      aria-label="edit"
                      component={RouterLink}
                      to={`/appointments/${rowData.id}/edit`}
                    >
                      <EditIcon />
                    </IconButton>
                  </div>
                ),
              },
            ]}
            isLoading={loading}
            data={appointments}
            title={
              <Typography component="h2" variant="h6" color="primary">
                Consultas
              </Typography>
            }
            options={{
              search: false,
              pageSize: 10,
              pageSizeOptions: [10, 25, 50, 100],
            }}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
