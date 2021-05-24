import React, { useEffect, useState } from "react";
import { useParams, Link as RouterLink, useHistory } from "react-router-dom";
import axios from "../api/apiConfig";
import { useGlobalStyles } from "../styles/globalStyles";
import { initCustomError } from "../api/patientService";
import Loading from "./Loading";
import { CustomError, History, Questionnaire } from "../models/patient";
import CustomAlertError from "./CustomAlertError";

import { Gender, Patient } from "../models/patient";
import { initPatient } from "../api/patientService";

import {
  createStyles,
  withStyles,
  makeStyles,
  Theme,
} from "@material-ui/core/styles";

import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Avatar from "@material-ui/core/Avatar";
import Badge from "@material-ui/core/Badge";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import Icon from "@material-ui/core/Icon";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";

import DeleteIcon from "@material-ui/icons/Delete";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";

import DateFnsUtils from "@date-io/date-fns"; // choose your lib
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";

import { Formik, Form, FieldArray } from "formik";
import * as yup from "yup";

import { DropzoneArea } from "material-ui-dropzone";
import { PATIENTS_URL, QUESTIONNAIRES_URL } from "../constants/constants";
import MenuItem from "@material-ui/core/MenuItem";
import ListIcon from "@material-ui/icons/List";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexWrap: "wrap",
      "& > *": {
        margin: theme.spacing(1),
        width: theme.spacing(16),
        height: theme.spacing(16),
      },
    },
    large: {
      width: theme.spacing(20),
      height: theme.spacing(20),
    },
    input: {
      display: "none",
    },
  })
);

const SmallAvatar = withStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 42,
      height: 42,
      border: `2px solid ${theme.palette.background.paper}`,
    },
  })
)(Avatar);

const validationSchema = yup.object({
  firstname: yup.string().required("Nombre es requerido"),
  lastname: yup.string().required("Apellido es requerido"),
  birth: yup.date(),
  gender: yup.string(),
  dni: yup.string(),
  email: yup.string().email("Ingrese un correo válido"),
  phone: yup.string(),
  mobile: yup.string(),
  adress: yup.string(),
  historyList: yup.array().of(
    yup.object({
      name: yup.string(),
      description: yup.string(),
    })
  ),
  notes: yup.string(),
  lastModified: yup.string(),
});

type Props = {
  edit: boolean;
};

export default function PatientForm({ edit }: Props) {
  const globalClasses = useGlobalStyles();
  const classes = useStyles();
  const history = useHistory();
  const [open, setOpen] = React.useState(false);

  const { id } = useParams<{ id: string }>();
  const patientUrl = `${PATIENTS_URL}/${id}`;
  const gotoPage = edit ? patientUrl : PATIENTS_URL;

  const [patient, setPatient] = useState<Patient>(initPatient);
  const [questionnaires, setQuestionnaires] = useState<Questionnaire[]>([]);
  const [filteredQuestionnaires, setFilteredQuestionnaires] = useState<
    Questionnaire[]
  >([]);
  const [selectedQuestionnaire, setSelectedQuestionnaire] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [customError, setCustomError] = useState<CustomError>(initCustomError);

  useEffect(() => {
    setLoading(true);
    if (edit) {
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
    } else {
      setLoading(false);
    }
  }, [id, edit, patientUrl]);

  useEffect(() => {
    (async () => {
      setError(false);
      try {
        const { data } = await axios.get(`${QUESTIONNAIRES_URL}`);
        setQuestionnaires(data);
      } catch (error) {
        setCustomError(error);
        setError(true);
        console.log(error);
      }
    })();
  }, []);

  const [selectedDate, setSelectedDate] = React.useState<Date | null>(
    new Date()
  );

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  const [selectedPhoto, setSelectedPhoto] = useState<File | null>();

  const handleUploadPhoto = (event: React.ChangeEvent<HTMLInputElement>) => {
    const photo = event.target.files;
    if (!photo) return;
    setSelectedPhoto(photo[0]);
  };

  const photoSection = (
    <Badge
      overlap="circle"
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      badgeContent={
        <SmallAvatar alt="Remy Sharp">
          <input
            accept=""
            className={classes.input}
            id="icon-button-file"
            type="file"
            onChange={handleUploadPhoto}
          />
          <label htmlFor="icon-button-file">
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="span"
            >
              <PhotoCameraIcon />
            </IconButton>
          </label>
        </SmallAvatar>
      }
    >
      <Avatar
        alt="Foto de perfil"
        src={selectedPhoto ? URL.createObjectURL(selectedPhoto) : ""}
        className={classes.large}
        variant="square"
      />
    </Badge>
  );

  const handleClickOpen = () => {
    setSelectedQuestionnaire("");
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAdd = () => {
    const historyList: History[] = [];
    const results = filteredQuestionnaires.map((q) => {
      q.questions.map((question) => {
        historyList.push({ name: question, description: "" });
      });
    });
    const p = patient;
    p.historyList = historyList;
    setPatient(p);
    setOpen(false);
  };

  const handleSelected = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedQuestionnaire(event.target.value as string);
  };

  useEffect(() => {
    const results = questionnaires.filter(
      (q) => q._id === selectedQuestionnaire
    );
    setFilteredQuestionnaires(results);
  }, [selectedQuestionnaire]);

  const questions = filteredQuestionnaires.map((q, index) => (
    <div key={index}>
      <ul>
        {q.questions.map((question, index) => (
          <li key={index}>{question}</li>
        ))}
      </ul>
    </div>
  ));

  const questionnarieDialog = (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"Elija un cuestionario"}
      </DialogTitle>
      <DialogContent>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Cuestionario</InputLabel>
          <Select
            defaultValue={""}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedQuestionnaire}
            onChange={handleSelected}
          >
            {questionnaires.map((q) => (
              <MenuItem value={q._id}>{q.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
        {questions}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancelar
        </Button>
        <Button onClick={handleAdd} color="primary" autoFocus>
          Aceptar
        </Button>
      </DialogActions>
    </Dialog>
  );

  return (
    <React.Fragment>
      {error && (
        <CustomAlertError
          status={customError.status}
          message={customError.message}
        ></CustomAlertError>
      )}
      {loading && <Loading></Loading>}
      <Formik
        initialValues={patient}
        validationSchema={validationSchema}
        enableReinitialize
        onSubmit={(values, actions) => {
          console.log(values);

          if (edit) {
            (async () => {
              setLoading(true);
              setError(false);
              try {
                await axios.put<Patient>(patientUrl, values);
                setLoading(false);
                history.push(patientUrl);
              } catch (error) {
                setLoading(false);
                setCustomError(error);
                setError(true);
                console.log(error);
              }
            })();
          } else {
            (async () => {
              setLoading(true);
              setError(false);
              try {
                await axios.post<Patient>(PATIENTS_URL, values);
                setLoading(false);
                history.push(PATIENTS_URL);
              } catch (error) {
                setLoading(false);
                setCustomError(error);
                setError(true);
                console.log(error);
              }
            })();
          }
        }}
      >
        {(formik) => (
          <Form autoComplete="off">
            <Grid container spacing={1}>
              <Grid item xs={12} md={8} lg={8}>
                <Paper className={globalClasses.paper}>
                  <Typography
                    component="h2"
                    variant="h6"
                    color="primary"
                    gutterBottom
                  >
                    Datos personales{" "}
                  </Typography>
                  <Grid container spacing={1}>
                    <Grid item xs={12} md={2} lg={3}>
                      {photoSection}
                    </Grid>
                    <Grid item xs={12} md={10} lg={9}>
                      <FormControl fullWidth className={globalClasses.root}>
                        <TextField
                          variant="filled"
                          id="firstname"
                          name="firstname"
                          label="Nombre *"
                          value={formik.values.firstname}
                          onChange={formik.handleChange}
                          error={
                            formik.touched.firstname &&
                            Boolean(formik.errors.firstname)
                          }
                          helperText={
                            formik.touched.firstname && formik.errors.firstname
                          }
                        />

                        <TextField
                          variant="filled"
                          id="lastname"
                          name="lastname"
                          label="Apellido *"
                          value={formik.values.lastname}
                          onChange={formik.handleChange}
                          error={
                            formik.touched.lastname &&
                            Boolean(formik.errors.lastname)
                          }
                          helperText={
                            formik.touched.lastname && formik.errors.lastname
                          }
                        />

                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                          <DatePicker
                            inputVariant="filled"
                            disableFuture
                            openTo="year"
                            format="dd/MMM/yyyy"
                            label="Fecha de nacimiento"
                            views={["year", "month", "date"]}
                            value={selectedDate}
                            onChange={handleDateChange}
                          />
                        </MuiPickersUtilsProvider>

                        <FormControl
                          variant="filled"
                          className={globalClasses.spacing}
                        >
                          <InputLabel id="demo-simple-select-label">
                            Sexo
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            name="gender"
                            value={formik.values.gender}
                            onChange={formik.handleChange}
                          >
                            <MenuItem value={Gender.Female}>Femenino</MenuItem>
                            <MenuItem value={Gender.Male}>Masculino</MenuItem>
                            <MenuItem value={Gender.Other}>Otro</MenuItem>
                          </Select>
                        </FormControl>

                        <TextField
                          variant="filled"
                          id="dni"
                          name="dni"
                          label="Documento de identidad"
                          value={formik.values.dni}
                          onChange={formik.handleChange}
                        />
                        <TextField
                          variant="filled"
                          id="address"
                          name="address"
                          label="Dirección"
                          multiline
                          rows={4}
                          value={formik.values.address}
                          onChange={formik.handleChange}
                        />
                      </FormControl>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>

              <Grid item xs={12} md={4} lg={4}>
                <Paper className={globalClasses.paper}>
                  <Typography
                    component="h2"
                    variant="h6"
                    color="primary"
                    gutterBottom
                  >
                    Contacto{" "}
                  </Typography>
                  <FormControl fullWidth className={globalClasses.root}>
                    <TextField
                      variant="filled"
                      id="email"
                      name="email"
                      label="E-Mail"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.email && Boolean(formik.errors.email)
                      }
                      helperText={formik.touched.email && formik.errors.email}
                    />
                    <TextField
                      variant="filled"
                      id="phone"
                      name="phone"
                      label="Teléfono"
                      value={formik.values.phone}
                      onChange={formik.handleChange}
                    />
                    <TextField
                      variant="filled"
                      id="mobile"
                      name="mobile"
                      label="Móvil"
                      value={formik.values.mobile}
                      onChange={formik.handleChange}
                    />
                  </FormControl>
                </Paper>

                <Paper className={globalClasses.paper}>
                  <Typography
                    component="h2"
                    variant="h6"
                    color="primary"
                    gutterBottom
                  >
                    Información adicional{" "}
                  </Typography>
                  <TextField
                    fullWidth
                    variant="filled"
                    id="notes"
                    name="notes"
                    label="Notas"
                    multiline
                    rows={8}
                    value={formik.values.notes}
                    onChange={formik.handleChange}
                  />
                </Paper>
              </Grid>

              <Grid item xs={12} md={8} lg={8}>
                <Paper className={globalClasses.paper}>
                  <Typography
                    component="h2"
                    variant="h6"
                    color="primary"
                    gutterBottom
                  >
                    Antecedentes{" "}
                    <Button
                      size="small"
                      color="secondary"
                      className={globalClasses.alignRight}
                      startIcon={<ListIcon />}
                      onClick={handleClickOpen}
                    >
                      Usar cuestionario
                    </Button>
                  </Typography>

                  <FormControl component="fieldset">
                    <FieldArray
                      name="historyList"
                      render={(arrayHelpers) => (
                        <div>
                          {formik.values.historyList?.map(
                            (historyItem, index) => (
                              <Grid container spacing={1} key={index}>
                                <Grid item xs={12} md={4} lg={6}>
                                  <TextField
                                    fullWidth
                                    className={globalClasses.spacing}
                                    variant="filled"
                                    name={`historyList.${index}.name`}
                                    label="Asunto"
                                    value={historyItem.name}
                                    onChange={formik.handleChange}
                                  />
                                </Grid>
                                <Grid item xs={12} md={4} lg={5}>
                                  <TextField
                                    fullWidth
                                    className={globalClasses.spacing}
                                    variant="filled"
                                    multiline
                                    rows={4}
                                    name={`historyList.${index}.description`}
                                    label="Observación"
                                    value={historyItem.description}
                                    onChange={formik.handleChange}
                                  />
                                </Grid>
                                <Grid item xs={12} md={4} lg={1}>
                                  <IconButton
                                    onClick={() => arrayHelpers.remove(index)}
                                  >
                                    <DeleteIcon />
                                  </IconButton>
                                </Grid>
                                <Grid item xs={12} md={12} lg={12}>
                                  <Divider></Divider>
                                </Grid>
                              </Grid>
                            )
                          )}
                          <FormControl className={globalClasses.spacing}>
                            <Button
                              variant="contained"
                              color="secondary"
                              size="small"
                              startIcon={<Icon>subdirectory_arrow_right</Icon>}
                              onClick={() =>
                                arrayHelpers.push({
                                  name: "",
                                  description: "",
                                })
                              }
                            >
                              Antecedente{" "}
                            </Button>
                          </FormControl>
                        </div>
                      )}
                    />
                  </FormControl>
                </Paper>
              </Grid>
              <Grid item xs={12} md={4} lg={4}>
                <Paper className={globalClasses.paper}>
                  <Typography
                    component="h2"
                    variant="h6"
                    color="primary"
                    gutterBottom
                  >
                    Archivos{" "}
                  </Typography>
                  <DropzoneArea
                    acceptedFiles={["image/*"]}
                    dropzoneText={"Drag and drop an image here or click"}
                    onChange={(files) => console.log("Files:", files)}
                    filesLimit={2}
                    showFileNames={true}
                  />
                </Paper>
              </Grid>
            </Grid>
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
                color="default"
                variant="outlined"
                size="large"
                component={RouterLink}
                to={gotoPage}
                disabled={formik.isSubmitting}
              >
                Cancelar
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
      {questionnarieDialog}
    </React.Fragment>
  );
}
