import React, { useEffect, useState } from "react";
import { useHistory, useParams, Link as RouterLink } from "react-router-dom";
import axios from "../api/apiConfig";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import MaterialTable from "material-table";

import { useGlobalStyles } from "../styles/globalStyles";
import { DATETIME_FORMAT } from "../constants/constants";
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
import DeleteIcon from "@material-ui/icons/Delete";
import { formatAppointmentType } from "../helpers/helpers";

type Props = {
  appointments: Appointment[];
};
export default function Appointments() {
  const globalClasses = useGlobalStyles();
  dayjs.extend(relativeTime);

  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState(-1);
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    setDeleteId(-1);
    (async () => {
      try {
        const { data } = await axios.get(`/appointments`);
        console.log("🚀 ~ file: Appointments.tsx ~ line 19 ~ data", data);
        setAppointments(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        // setError(true);
        setLoading(false);
      }
    })();
  }, []);

  const handleClickOpen = (id: number) => {
    console.log("del", id);
    setDeleteId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setDeleteId(-1);
    setOpen(false);
  };

  const handleDelete = () => {
    handlePatientDelete(deleteId);
  };

  /** Delete patient */
  const handlePatientDelete = (appointmentId: number) => {
    (async () => {
      try {
        await axios.delete(`/appointments/${appointmentId}`);
        // history.push("/appointments");
      } catch (error) {
        console.log(error);
      }
      handleClose();
    })();
  };

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
                  dayjs(rowData.scheduled).format(DATETIME_FORMAT),
              },
              {
                title: "Paciente",
                field: "patient",
                sorting: false,
                render: (rowData) => (
                  <RouterLink to={`/patients/${rowData.person._id}`}>
                    {rowData.person.firstname} {rowData.person.lastname}
                  </RouterLink>
                ),
              },
              { title: "Motivo", field: "title", sorting: false },
              {
                title: "Tipo",
                field: "type",
                sorting: false,
                render: (rowData) => formatAppointmentType(rowData.category),
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
                      to={`/appointments/${rowData._id}`}
                    >
                      <VisibilityIcon />
                    </IconButton>
                    <IconButton
                      aria-label="edit"
                      component={RouterLink}
                      to={`/appointments/${rowData._id}/edit`}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      onClick={() => handleClickOpen(Number(rowData._id))}
                    >
                      <DeleteIcon />
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
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              Desea eliminar esta consulta?
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Esta consulta serán eliminada del sistema y no se podrá
                recuperar posteriormente.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancelar
              </Button>
              <Button onClick={handleDelete} color="primary" autoFocus>
                OK
              </Button>
            </DialogActions>
          </Dialog>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
