import React, { useEffect, useState } from "react";
import { useParams, Link as RouterLink } from "react-router-dom";
import axios from "../api/apiConfig";
import { useStyles } from "../styles/globalStyles";
import clsx from "clsx";

import { Gender, Patient } from "../models/patient";
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
  Container,
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

const useCustomStyles = makeStyles((theme: Theme) =>
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
    formControl: {
      margin: theme.spacing(2),
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
  const globalClasses = useStyles();
  const classes = useCustomStyles();
  // const combinePaper = clsx(globalClasses.spacing, globalClasses.paper);

  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient>(initPatient);

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
                    Notas{" "}
                  </Typography>
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
                          <FormControl className={classes.formControl}>
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
                to={{ edit } ? `/patients/${id}` : `/patients`}
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
