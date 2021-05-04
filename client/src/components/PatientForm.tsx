import React, { useEffect, useState } from "react";
import axios from "../api/apiConfig";
import clsx from "clsx";

import { Gender, Patient } from "../models/patient";
import { useParams } from "react-router-dom";
import { initPatient } from "../api/patientService";

import {
  createStyles,
  withStyles,
  makeStyles,
  Theme,
} from "@material-ui/core/styles";

import {
  FormGroup,
  FormControl,
  TextField,
  Select,
  InputLabel,
  Button,
  Box,
  Avatar,
  FormLabel,
  Badge,
  IconButton,
  Grid,
  FormHelperText,
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
      "& .MuiTextField-root": {
        margin: theme.spacing(1),
        //width: "50ch",
      },
    },
    formControl: {
      margin: theme.spacing(1),
    },
    large: {
      width: theme.spacing(20),
      height: theme.spacing(20),
    },
    input: {
      display: "none",
    },
    spacing: {
      "& > *": {
        margin: theme.spacing(1),
      },
    },
    paper: {
      padding: theme.spacing(2),
      display: "flex",
      overflow: "auto",
      flexDirection: "column",
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
  adress: yup.object({
    street: yup.string(),
    houseNumber: yup.string(),
    postalCode: yup.string(),
    city: yup.string(),
    country: yup.string(),
  }),
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
  const classes = useStyles();
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient>(initPatient);
  const fixedHeightPaper = clsx(classes.paper);

  useEffect(() => {
    if (edit) {
      (async () => {
        try {
          const { data } = await axios.get<Patient>(`/patients/${id}`);
          setPatient(data);
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, [id, edit]);

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
        }}
      >
        {(formik) => (
          <Form className={classes.root} autoComplete="off">
            <Grid container spacing={1}>
              <Grid item xs={12} md={12} lg={12}>
                <Paper className={fixedHeightPaper}>
                  <Typography
                    component="h2"
                    variant="h6"
                    color="primary"
                    gutterBottom
                  >
                    Datos personales
                  </Typography>
                  <Grid container spacing={1}>
                    <Grid item xs={12} md={2}>
                      {photoSection}
                    </Grid>
                    <Grid item xs={12} md={10}>
                      <FormControl component="fieldset">
                        <FormLabel component="legend">
                          Datos personales
                        </FormLabel>
                        <FormGroup row>
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
                              formik.touched.firstname &&
                              formik.errors.firstname
                            }
                          />
                          <TextField
                            variant="filled"
                            id="secondName"
                            name="secondName"
                            label="Segundo nombre"
                            value={formik.values.secondName}
                            onChange={formik.handleChange}
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

                          <TextField
                            variant="filled"
                            id="secondLastname"
                            name="secondLastname"
                            label="Segundo apellido"
                            value={formik.values.secondLastname}
                            onChange={formik.handleChange}
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

                          <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="outlined-age-native-simple">
                              Sexo
                            </InputLabel>
                            <Select
                              fullWidth
                              variant="filled"
                              native
                              value={formik.values.gender}
                              label="Sexo"
                              inputProps={{
                                name: "age",
                                id: "outlined-age-native-simple",
                              }}
                            >
                              <option value={Gender.Female}>Femenino</option>
                              <option value={Gender.Male}>Masculino</option>
                              <option value={Gender.Other}>Otro</option>
                            </Select>
                          </FormControl>

                          <TextField
                            fullWidth
                            variant="filled"
                            id="dni"
                            name="dni"
                            label="DNI"
                            value={formik.values.dni}
                            onChange={formik.handleChange}
                          />

                          <TextField
                            fullWidth
                            variant="filled"
                            id="notes"
                            name="notes"
                            label="Notas"
                            multiline
                            rows={4}
                            value={formik.values.notes}
                            onChange={formik.handleChange}
                          />
                        </FormGroup>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <FormControl component="fieldset">
                        <FormLabel component="legend">Contacto</FormLabel>
                        <FormGroup row>
                          <TextField
                            fullWidth
                            variant="filled"
                            id="email"
                            name="email"
                            label="E-Mail"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            error={
                              formik.touched.email &&
                              Boolean(formik.errors.email)
                            }
                            helperText={
                              formik.touched.email && formik.errors.email
                            }
                          />
                          <TextField
                            fullWidth
                            variant="filled"
                            id="phone"
                            name="phone"
                            label="Teléfono"
                            value={formik.values.phone}
                            onChange={formik.handleChange}
                          />
                          <TextField
                            fullWidth
                            variant="filled"
                            id="mobile"
                            name="mobile"
                            label="Móvil"
                            value={formik.values.mobile}
                            onChange={formik.handleChange}
                          />
                        </FormGroup>
                        <FormHelperText></FormHelperText>
                      </FormControl>

                      <FormControl component="fieldset">
                        <FormLabel component="legend">Dirección</FormLabel>
                        <FormGroup row>
                          <TextField
                            fullWidth
                            variant="filled"
                            id="adress.street"
                            name="adress.street"
                            label="calle"
                            value={formik.values.adress?.street}
                            onChange={formik.handleChange}
                          />
                          <TextField
                            fullWidth
                            variant="filled"
                            id="adress.houseNumber"
                            name="adress.houseNumber"
                            label="Número"
                            value={formik.values.adress?.houseNumber}
                            onChange={formik.handleChange}
                          />
                          <TextField
                            fullWidth
                            variant="filled"
                            id="adress.postalCode"
                            name="adress.postalCode"
                            label="Código postal"
                            value={formik.values.adress?.postalCode}
                            onChange={formik.handleChange}
                          />
                          <TextField
                            fullWidth
                            variant="filled"
                            id="adress.city"
                            name="adress.city"
                            label="Ciudad"
                            value={formik.values.adress?.city}
                            onChange={formik.handleChange}
                          />
                          <TextField
                            fullWidth
                            variant="filled"
                            id="adress.country"
                            name="adress.country"
                            label="País"
                            value={formik.values.adress?.country}
                            onChange={formik.handleChange}
                          />
                        </FormGroup>
                        <FormHelperText></FormHelperText>
                      </FormControl>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>

              <Grid item xs={12} md={12} lg={12}>
                <Paper className={fixedHeightPaper}>
                  <Typography
                    component="h2"
                    variant="h6"
                    color="primary"
                    gutterBottom
                  >
                    Antecedentes{" "}
                  </Typography>
                  <Grid container spacing={1}>
                    <Grid item xs={12} md={12} lg={12}>
                      <FormControl component="fieldset">
                        <FieldArray
                          name="historyList"
                          render={(arrayHelpers) => (
                            <FormGroup row>
                              {formik.values.historyList?.map(
                                (historyItem, index) => (
                                  <div key={index}>
                                    <TextField
                                      fullWidth
                                      variant="filled"
                                      name={`historyList.${index}.name`}
                                      label="Nombre"
                                      value={historyItem.name}
                                      onChange={formik.handleChange}
                                    />
                                    <TextField
                                      fullWidth
                                      variant="filled"
                                      multiline
                                      rows={4}
                                      name={`historyList.${index}.description`}
                                      label="Description"
                                      value={historyItem.description}
                                      onChange={formik.handleChange}
                                    />
                                    <IconButton
                                      onClick={() => arrayHelpers.remove(index)}
                                    >
                                      <DeleteIcon />
                                    </IconButton>
                                    <Divider></Divider>
                                  </div>
                                )
                              )}
                              <FormControl>
                                <Button
                                  variant="outlined"
                                  color="default"
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
                            </FormGroup>
                          )}
                        />
                      </FormControl>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            </Grid>

            <Box className={classes.spacing}>
              <Button
                color="primary"
                variant="contained"
                size="large"
                type="submit"
              >
                Guardar
              </Button>
              <Button variant="contained" size="large" type="submit">
                Cancelar
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </React.Fragment>
  );
}
