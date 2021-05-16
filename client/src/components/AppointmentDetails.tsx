import React, { useEffect, useState } from "react";
import axios from "../api/apiConfig";

import { useParams, useHistory, Link as RouterLink } from "react-router-dom";

import { useGlobalStyles } from "../styles/globalStyles";
import PatientGender from "./PatientGender";
import PatientHistoryGeneric from "./PatientHistoryGeneric";
import { Appointment } from "../models/patient";
import { initAppointment } from "../api/patientService";

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ListItemIcon from "@material-ui/core/ListItemIcon";

import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import AppointmentStatus from "./AppointmentStatus";
import { formatAppointmentType } from "../helpers/helpers";
import PersonInfoCompact from "./PersonInfoCompact";

export default function AppointmentDetails() {
  const globalClasses = useGlobalStyles();
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const urlAppointment = `/appointments/${id}`;
  const [open, setOpen] = React.useState(false);
  const [appointment, setAppointment] = useState<Appointment>(initAppointment);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get<Appointment>(urlAppointment);
        console.log("🚀 ~ file: AppointmentDetails.tsx ~ line 36 ~ data", data);
        setAppointment(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [id, urlAppointment]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    handlePatientDelete(appointment.id!);
  };

  /** Delete patient */
  const handlePatientDelete = (appointmentId: number) => {
    (async () => {
      try {
        await axios.delete(`/appointments/${appointmentId}`);
        setOpen(false);
        history.push("/appointments");
      } catch (error) {
        console.log(error);
      }
    })();
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} md={12} lg={8}>
        <Paper className={globalClasses.paper}>
          {" "}
          <Typography component="h2" variant="h6" color="primary">
            Consulta
            <IconButton component={RouterLink} to={`/appointments/${id}/edit`}>
              <EditIcon />
            </IconButton>
            <IconButton onClick={handleClickOpen}>
              <DeleteIcon />
            </IconButton>
          </Typography>
          <Grid container spacing={1}>
            {/* Date */}
            <Grid item xs={12} md={12} lg={4}>
              <Typography component="span" variant="body1" color="textPrimary">
                Fecha
              </Typography>
            </Grid>
            <Grid item xs={12} md={12} lg={8}>
              <Typography
                component="span"
                variant="body2"
                color="textSecondary"
              >
                {appointment.scheduled}
              </Typography>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <Divider></Divider>
            </Grid>

            {/* Status */}
            <Grid item xs={12} md={12} lg={4}>
              <Typography component="span" variant="body1" color="textPrimary">
                Estado
              </Typography>
            </Grid>
            <Grid item xs={12} md={12} lg={8}>
              <AppointmentStatus
                status={appointment.status}
              ></AppointmentStatus>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <Divider></Divider>
            </Grid>

            {/* Type */}
            <Grid item xs={12} md={12} lg={4}>
              <Typography component="span" variant="body1" color="textPrimary">
                Tipo
              </Typography>
            </Grid>
            <Grid item xs={12} md={12} lg={8}>
              <Typography
                component="span"
                variant="body2"
                color="textSecondary"
              >
                {formatAppointmentType(appointment.category)}
              </Typography>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <Divider></Divider>
            </Grid>

            {/* Title */}
            <Grid item xs={12} md={12} lg={4}>
              <Typography component="span" variant="body1" color="textPrimary">
                Motivo
              </Typography>
            </Grid>
            <Grid item xs={12} md={12} lg={8}>
              <Typography
                component="span"
                variant="body2"
                color="textSecondary"
              >
                {appointment.title}
              </Typography>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <Divider></Divider>
            </Grid>

            {/* Description */}
            <Grid item xs={12} md={12} lg={4}>
              <Typography component="span" variant="body1" color="textPrimary">
                Descripción
              </Typography>
            </Grid>
            <Grid item xs={12} md={12} lg={8}>
              <Typography
                component="span"
                variant="body2"
                color="textSecondary"
              >
                {appointment.description}
              </Typography>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <Divider></Divider>
            </Grid>

            {/* Anaylis */}
            <Grid item xs={12} md={12} lg={4}>
              <Typography component="span" variant="body1" color="textPrimary">
                Exámen físico
              </Typography>
            </Grid>
            <Grid item xs={12} md={12} lg={8}>
              <Typography
                component="span"
                variant="body2"
                color="textSecondary"
              >
                {appointment.analysis}
              </Typography>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <Divider></Divider>
            </Grid>

            {/* Plan */}
            <Grid item xs={12} md={12} lg={4}>
              <Typography component="span" variant="body1" color="textPrimary">
                Plan
              </Typography>
            </Grid>
            <Grid item xs={12} md={12} lg={8}>
              <Typography
                component="span"
                variant="body2"
                color="textSecondary"
              >
                {appointment.plan}
              </Typography>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <Divider></Divider>
            </Grid>

            {/* Comment */}
            <Grid item xs={12} md={12} lg={4}>
              <Typography component="span" variant="body1" color="textPrimary">
                Observaciones
              </Typography>
            </Grid>
            <Grid item xs={12} md={12} lg={8}>
              <Typography
                component="span"
                variant="body2"
                color="textSecondary"
              >
                {appointment.comment}
              </Typography>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <Divider></Divider>
            </Grid>

            {/* Recommendation */}
            <Grid item xs={12} md={12} lg={4}>
              <Typography component="span" variant="body1" color="textPrimary">
                Recomendaciones
              </Typography>
            </Grid>
            <Grid item xs={12} md={12} lg={8}>
              <Typography
                component="span"
                variant="body2"
                color="textSecondary"
              >
                {appointment.recommendation}
              </Typography>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <Divider></Divider>
            </Grid>
          </Grid>
        </Paper>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            Desea eliminar esta consulta de {appointment.person.firstname}{" "}
            {appointment.person.lastname}?
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Esta consulta serán eliminada del sistema y no se podrá recuperar
              posteriormente.
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
        <Paper className={globalClasses.paper}>
          <Typography component="h2" variant="h6" color="primary">
            Fotos (Antes)
          </Typography>
        </Paper>
        <Paper className={globalClasses.paper}>
          <Typography component="h2" variant="h6" color="primary">
            Fotos (Después)
          </Typography>
        </Paper>
        <Paper className={globalClasses.paper}>
          <Typography component="h2" variant="h6" color="primary">
            Archivos{" "}
          </Typography>
        </Paper>
      </Grid>

      <Grid item xs={12} md={12} lg={4}>
        <PersonInfoCompact person={appointment.person}></PersonInfoCompact>
        <Paper className={globalClasses.paper}>
          <Typography component="h2" variant="h6" color="primary">
            Antecedentes
          </Typography>
          <PatientHistoryGeneric
            records={appointment.person.historyList}
          ></PatientHistoryGeneric>
        </Paper>
      </Grid>
    </Grid>
  );
}
