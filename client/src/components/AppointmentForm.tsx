import React, { useEffect, useState } from "react";
import { useParams, useHistory, Link as RouterLink } from "react-router-dom";
import axios from "../api/apiConfig";
import { Formik, Form } from "formik";
import * as yup from "yup";

import { useGlobalStyles } from "../styles/globalStyles";
import {
  Appointment,
  AppointmentType,
  CustomError,
  Patient,
  Status,
} from "../models/patient";
import {
  initAppointment,
  initCustomError,
  initPatient,
} from "../api/patientService";
import PersonInfoCompact from "../components/PersonInfoCompact";

import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";

import DateFnsUtils from "@date-io/date-fns"; // choose your lib
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
  TimePicker,
} from "@material-ui/pickers";

import { DropzoneArea } from "material-ui-dropzone";
import PatientHistoryGeneric from "./PatientHistoryGeneric";
import { APPOINTMENTS_URL, PATIENTS_URL } from "../constants/constants";
import MenuItem from "@material-ui/core/MenuItem";
import CustomAlertError from "./CustomAlertError";
import Loading from "./Loading";

const validationSchema = yup.object({
  category: yup.string(),
  scheduled: yup.date(),
  from: yup.date(),
  to: yup.date(),
  title: yup.string().required("Motivo es requerido"),
  description: yup.string(),
  analysis: yup.string(),
  plan: yup.string(),
  comment: yup.string(),
  recommendations: yup.string(),
  status: yup.string(),
});

type Props = {
  edit: boolean;
};
export default function AppointmentForm({ edit }: Props) {
  const globalClasses = useGlobalStyles();
  const history = useHistory();
  const { id } = useParams<{ id: string }>();
  const patientUrl = `${PATIENTS_URL}/${id}`;
  const appointmentsUrl = `${APPOINTMENTS_URL}`;
  const [patient, setPatient] = useState<Patient>(initPatient);
  const [appointment, setAppointment] = useState<Appointment>(initAppointment);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [customError, setCustomError] = useState<CustomError>(initCustomError);

  useEffect(() => {
    setLoading(true);
    (async () => {
      setError(false);
      try {
        const { data } = await axios.get<Patient>(patientUrl);
        setPatient(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setCustomError(error);
        setError(true);
        console.log(error);
      }
    })();
  }, [patientUrl]);

  useEffect(() => {
    if (edit) {
      setLoading(true);
      (async () => {
        try {
          const { data } = await axios.get<Appointment>(patientUrl);
          setAppointment(data);
          setLoading(false);
        } catch (error) {
          setLoading(false);
          setCustomError(error);
          setError(true);
          console.log(error);
        }
      })();
    }
  }, [edit, patientUrl]);

  return (
    <React.Fragment>
      {error && (
        <CustomAlertError message={customError.message}></CustomAlertError>
      )}
      {loading && <Loading></Loading>}
      <Formik
        initialValues={appointment}
        validationSchema={validationSchema}
        enableReinitialize
        onSubmit={(values, actions) => {
          if (!edit) {
            values.person = id;
          }
          if (edit) {
            (async () => {
              try {
                await axios.put<Appointment>(patientUrl, values);
                history.push(patientUrl);
              } catch (error) {
                console.log(error);
              }
            })();
          } else {
            (async () => {
              try {
                await axios.post<Appointment>(appointmentsUrl, values);
                history.push(patientUrl);
              } catch (error) {
                console.log(error);
              }
            })();
          }
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
                    <TextField
                      variant="filled"
                      id="title"
                      name="title"
                      label="Motivo *"
                      value={formik.values.title}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.title && Boolean(formik.errors.title)
                      }
                      helperText={formik.touched.title && formik.errors.title}
                    />

                    <FormControl
                      variant="filled"
                      className={globalClasses.spacing}
                    >
                      <InputLabel id="status-select-label">Tipo</InputLabel>
                      <Select
                        labelId="status-select-label"
                        id="status-select"
                        label="Estado"
                        name="status"
                        value={formik.values.status}
                        onChange={formik.handleChange}
                      >
                        <MenuItem value={Status.Open}>Abierta</MenuItem>
                        <MenuItem value={Status.InProgress}>
                          En progreso
                        </MenuItem>
                        <MenuItem value={Status.Done}>Finalizada</MenuItem>
                        <MenuItem value={Status.Pending}>Pendiente</MenuItem>
                        <MenuItem value={Status.Canceled}>Cancelada</MenuItem>
                      </Select>
                    </FormControl>

                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <KeyboardDatePicker
                        autoOk
                        id="scheduled"
                        name="scheduled"
                        inputVariant="filled"
                        variant="inline"
                        format="dd/MM/yyyy"
                        margin="normal"
                        label="Fecha"
                        placeholder="dd/mm/yyyy"
                        value={formik.values.scheduled}
                        onChange={(value) =>
                          formik.setFieldValue("scheduled", value)
                        }
                      />

                      <TimePicker
                        showTodayButton
                        todayLabel="Ahora"
                        minutesStep={5}
                        label="Desde:"
                        value={formik.values.from}
                        onChange={(value) => {
                          formik.setFieldValue("from", value);
                          formik.setFieldValue("to", value);
                        }}
                        inputVariant="filled"
                      />

                      <TimePicker
                        showTodayButton
                        todayLabel="Ahora"
                        minutesStep={5}
                        label="Hasta:"
                        value={formik.values.to}
                        onChange={(value) => formik.setFieldValue("to", value)}
                        inputVariant="filled"
                      />
                    </MuiPickersUtilsProvider>

                    <FormControl
                      variant="filled"
                      className={globalClasses.spacing}
                    >
                      <InputLabel id="category-select-label">Tipo</InputLabel>
                      <Select
                        labelId="category-select-label"
                        id="category-select"
                        label="Tipo"
                        name="category"
                        value={formik.values.category}
                        onChange={formik.handleChange}
                      >
                        <MenuItem value={AppointmentType.PreliminaryTalk}>
                          Charla preliminar
                        </MenuItem>
                        <MenuItem value={AppointmentType.Surgery}>
                          Cirugía
                        </MenuItem>
                        <MenuItem value={AppointmentType.Check}>
                          Revisión
                        </MenuItem>
                        <MenuItem value={AppointmentType.Other}>Otro</MenuItem>
                      </Select>
                    </FormControl>

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
                    disabled={formik.isSubmitting}
                  >
                    Guardar
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    component={RouterLink}
                    to={`/questionnaire`}
                    disabled={formik.isSubmitting}
                  >
                    Cancelar
                  </Button>
                </Box>
              </Grid>
              <Grid item xs={12} md={12} lg={4}>
                <PersonInfoCompact person={patient}></PersonInfoCompact>

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
    </React.Fragment>
  );
}
