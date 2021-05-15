import React, { useEffect, useState } from "react";
import { useParams, useHistory, Link as RouterLink } from "react-router-dom";
import axios from "../api/apiConfig";

import { useGlobalStyles } from "../styles/globalStyles";

import { Appointment, AppointmentType, Patient } from "../models/patient";

import { Formik, Form } from "formik";
import * as yup from "yup";
import { initAppointment, initPatient } from "../api/patientService";

import {
  Box,
  Button,
  Paper,
  Typography,
  Grid,
  FormControl,
  TextField,
  InputLabel,
  Select,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
} from "@material-ui/core";

import DateFnsUtils from "@date-io/date-fns"; // choose your lib
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

import { DropzoneArea } from "material-ui-dropzone";
import PatientHistoryGeneric from "./PatientHistoryGeneric";
import { Cake, EmojiPeople, Notes, RecentActors } from "@material-ui/icons";
import PatientGender from "./PatientGender";

const validationSchema = yup.object({
  type: yup.string(),
  createdAt: yup.string(),
  title: yup.string().required("Motivo es requerido"),
  description: yup.string(),
  analysis: yup.string(),
  plan: yup.string(),
  comment: yup.string(),
  recommendations: yup.string(),
});

type Props = {
  edit: boolean;
};
export default function AppointmentForm({ edit }: Props) {
  const globalClasses = useGlobalStyles();

  const { id } = useParams<{ id: string }>();
  const urlPatient = `/patients/${id}`;

  const [patient, setPatient] = useState<Patient>(initPatient);
  const [appointment] = useState<Appointment>(initAppointment);

  // Datepicker
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(
    new Date("2014-08-18T21:11:54")
  );
  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get<Patient>(urlPatient);
        setPatient(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [id, edit, urlPatient]);

  return (
    <Formik
      initialValues={appointment}
      validationSchema={validationSchema}
      enableReinitialize
      onSubmit={(values, actions) => {
        console.log(values);
        /**
    if (edit) {
      (async () => {
        try {
          await axios.put<Patient>(urlPatient, values);
          history.push(urlPatient);
        } catch (error) {
          console.log(error);
        }
      })();
    } else {
      (async () => {
        try {
          await axios.post<Patient>(urlPatients, values);
          history.push(urlPatients);
        } catch (error) {
          console.log(error);
        }
      })();
    }
     */
      }}
    >
      {(formik) => (
        <Form className={globalClasses.root} autoComplete="off">
          <Grid container spacing={1}>
            <Grid item xs={12} md={12} lg={8}>
              <Paper className={globalClasses.paper}>
                <Typography component="h2" variant="h6" color="primary">
                  {edit ? "Editar" : "Nueva"} consulta
                </Typography>
                <FormControl fullWidth className={globalClasses.root}>
                  <FormControl
                    variant="filled"
                    className={globalClasses.spacing}
                  >
                    <InputLabel htmlFor="outlined-age-native-simple">
                      Tipo
                    </InputLabel>
                    <Select
                      value={formik.values.reason}
                      label="Tipo"
                      name="type"
                      onChange={formik.handleChange}
                    >
                      <option value={AppointmentType.PreliminaryTalk}>
                        Charla preliminar
                      </option>
                      <option value={AppointmentType.Surgery}>Cirugía</option>
                      <option value={AppointmentType.Check}>Revisión</option>
                      <option value={AppointmentType.Other}>Otro</option>
                    </Select>
                  </FormControl>

                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      disableToolbar
                      inputVariant="filled"
                      variant="inline"
                      format="MM/dd/yyyy"
                      margin="normal"
                      id="date-picker-inline"
                      label="Fecha"
                      value={selectedDate}
                      onChange={handleDateChange}
                      KeyboardButtonProps={{
                        "aria-label": "change date",
                      }}
                    />
                  </MuiPickersUtilsProvider>

                  <TextField
                    variant="filled"
                    id="title"
                    name="title"
                    label="Motivo *"
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    error={formik.touched.title && Boolean(formik.errors.title)}
                    helperText={formik.touched.title && formik.errors.title}
                  />
                  <TextField
                    variant="filled"
                    id="description"
                    name="description"
                    label="Description"
                    multiline
                    rows={4}
                    value={formik.values.description}
                    onChange={formik.handleChange}
                  />
                  <TextField
                    variant="filled"
                    id="analysis"
                    name="analysis"
                    label="Exámen físico"
                    multiline
                    rows={4}
                    value={formik.values.analysis}
                    onChange={formik.handleChange}
                  />
                  <TextField
                    variant="filled"
                    id="plan"
                    name="plan"
                    label="Plan"
                    multiline
                    rows={10}
                    value={formik.values.plan}
                    onChange={formik.handleChange}
                  />
                  <TextField
                    variant="filled"
                    id="comment"
                    name="comment"
                    label="Observaciones"
                    multiline
                    rows={4}
                    value={formik.values.comment}
                    onChange={formik.handleChange}
                  />
                  <TextField
                    variant="filled"
                    id="recommendation"
                    name="recommendation"
                    label="Recomendaciones"
                    multiline
                    rows={4}
                    value={formik.values.recommendation}
                    onChange={formik.handleChange}
                  />
                </FormControl>
              </Paper>
              <Paper className={globalClasses.paper}>
                <Typography component="h2" variant="h6" color="primary">
                  Fotos (Antes)
                </Typography>
                <DropzoneArea
                  acceptedFiles={["image/*"]}
                  dropzoneText={"Drag and drop an image here or click"}
                  onChange={(files) => console.log("Files:", files)}
                  filesLimit={1}
                />
              </Paper>
              <Paper className={globalClasses.paper}>
                <Typography component="h2" variant="h6" color="primary">
                  Fotos (Después)
                </Typography>
                <DropzoneArea
                  acceptedFiles={["image/*"]}
                  dropzoneText={"Drag and drop an image here or click"}
                  onChange={(files) => console.log("Files:", files)}
                  filesLimit={2}
                />
              </Paper>
              <Paper className={globalClasses.paper}>
                <Typography component="h2" variant="h6" color="primary">
                  Archivos
                </Typography>
                ^{" "}
                <DropzoneArea
                  acceptedFiles={["image/*"]}
                  dropzoneText={"Drag and drop an image here or click"}
                  onChange={(files) => console.log("Files:", files)}
                  filesLimit={4}
                  showFileNames={true}
                />
              </Paper>
              <Box className={globalClasses.spacing}>
                <Button
                  color="primary"
                  variant="contained"
                  size="large"
                  type="submit"
                >
                  Guardar
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  component={RouterLink}
                  to={`/questionnaire`}
                >
                  Cancelar
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={12} lg={4}>
              <Paper className={globalClasses.paper}>
                <Typography component="h2" variant="h6" color="primary">
                  Datos personales
                </Typography>

                <Typography component="p" variant="h5">
                  {patient?.firstname} {patient?.lastname}
                </Typography>

                <List dense disablePadding>
                  <ListItem alignItems="flex-start">
                    <ListItemIcon>
                      <EmojiPeople />
                    </ListItemIcon>
                    <ListItemText
                      primary=""
                      secondary={
                        <Typography
                          component="span"
                          variant="body2"
                          color="textSecondary"
                        >
                          <PatientGender
                            gender={patient?.gender}
                          ></PatientGender>
                        </Typography>
                      }
                    />
                  </ListItem>

                  <ListItem alignItems="flex-start">
                    <ListItemIcon>
                      <Cake />
                    </ListItemIcon>
                    <ListItemText
                      primary=""
                      secondary={
                        <Typography
                          component="span"
                          variant="body2"
                          color="textSecondary"
                        >
                          {patient?.birth} - 38 anios
                        </Typography>
                      }
                    />
                  </ListItem>

                  <ListItem alignItems="flex-start">
                    <ListItemIcon>
                      <RecentActors />
                    </ListItemIcon>
                    <ListItemText
                      primary=""
                      secondary={
                        <Typography
                          component="span"
                          variant="body2"
                          color="textSecondary"
                        >
                          {patient?.dni}
                        </Typography>
                      }
                    />
                  </ListItem>

                  <ListItem alignItems="flex-start">
                    <ListItemIcon>
                      <Notes />
                    </ListItemIcon>
                    <ListItemText
                      primary=""
                      secondary={
                        <Typography
                          component="span"
                          variant="body2"
                          color="textSecondary"
                        >
                          {patient?.notes}
                        </Typography>
                      }
                    />
                  </ListItem>
                </List>
              </Paper>
              <Paper className={globalClasses.paper}>
                <Typography component="h2" variant="h6" color="primary">
                  Antecedentes
                </Typography>
                <PatientHistoryGeneric
                  records={patient.historyList}
                ></PatientHistoryGeneric>
              </Paper>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
}
