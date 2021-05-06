import React, { useEffect, useState } from "react";
import { useParams, Link as RouterLink, useHistory } from "react-router-dom";
import axios from "../api/apiConfig";
import { useGlobalStyles } from "../styles/globalStyles";

import { Gender, Patient } from "../models/patient";
import { initPatient } from "../api/patientService";

import {
  createStyles,
  withStyles,
  makeStyles,
  Theme,
} from "@material-ui/core/styles";

import {
  FormControl,
  TextField,
  Select,
  InputLabel,
  Button,
  Box,
  Avatar,
  Badge,
  IconButton,
  Grid,
  Icon,
  Paper,
  Typography,
  Divider,
} from "@material-ui/core";

import { Delete as DeleteIcon } from "@material-ui/icons";

import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";

import DateFnsUtils from "@date-io/date-fns"; // choose your lib
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

import { Formik, Form, FieldArray } from "formik";
import * as yup from "yup";

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
  secondName: yup.string(),
  secondLastname: yup.string(),
  gender: yup.string(),
  dni: yup.string(),
  notes: yup.string(),
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
  lastModified: yup.string(),
});

type Props = {
  edit: boolean;
};

export default function PatientForm({ edit }: Props) {
  const globalClasses = useGlobalStyles();
  const classes = useStyles();
  const history = useHistory();

  const { id } = useParams<{ id: string }>();
  const urlPatient = `/patients/${id}`;
  const urlPatients = `/patients`;
  const gotoPage = edit ? urlPatient : urlPatients;

  const [patient, setPatient] = useState<Patient>(initPatient);

  useEffect(() => {
    if (edit) {
      (async () => {
        try {
          const { data } = await axios.get<Patient>(urlPatient);
          setPatient(data);
        } catch (error) {
          console.log(error);
        }
      })();
    } else {
      (async () => {
        try {
          const { data } = await axios.get<Patient>(`/patient`);
          setPatient(data);
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, [id, edit, urlPatient]);

  const [selectedDate, setSelectedDate] = React.useState<Date | null>(
    new Date("2014-08-18T21:11:54")
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

  return (
    <React.Fragment>
      <Formik
        initialValues={patient}
        validationSchema={validationSchema}
        enableReinitialize
        onSubmit={(values, actions) => {
          console.log(values);

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
                          <KeyboardDatePicker
                            disableToolbar
                            inputVariant="filled"
                            variant="inline"
                            format="MM/dd/yyyy"
                            margin="normal"
                            id="date-picker-inline"
                            label="Fecha de nacimiento"
                            value={selectedDate}
                            onChange={handleDateChange}
                            KeyboardButtonProps={{
                              "aria-label": "change date",
                            }}
                          />
                        </MuiPickersUtilsProvider>

                        <FormControl
                          variant="filled"
                          className={globalClasses.spacing}
                        >
                          <InputLabel htmlFor="outlined-age-native-simple">
                            Sexo
                          </InputLabel>
                          <Select
                            value={formik.values.gender}
                            label="Sexo"
                            inputProps={{
                              name: "gender",
                              id: "outlined-age-native-simple",
                            }}
                          >
                            <option value={Gender.Female}>Femenino</option>
                            <option value={Gender.Male}>Masculino</option>
                            <option value={Gender.Other}>Otro</option>
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
                              startIcon={<Icon>add</Icon>}
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
                </Paper>
              </Grid>
            </Grid>
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
                color="default"
                variant="outlined"
                size="large"
                component={RouterLink}
                to={gotoPage}
              >
                Cancelar
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </React.Fragment>
  );
}
