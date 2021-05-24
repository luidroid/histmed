import React from "react";
import { Link as RouterLink, useHistory } from "react-router-dom";
import axios from "../api/apiConfig";
import { useGlobalStyles } from "../styles/globalStyles";

import { Patient } from "../models/patient";
import { red } from "@material-ui/core/colors";

import {
  makeStyles,
  Grid,
  Typography,
  Paper,
  Link,
  IconButton,
  Avatar,
  List,
  ListItem,
  ListItemText,
  Divider,
  ListItemIcon,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@material-ui/core/";

import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Cake as CakeIcon,
  RecentActors as RecentActorsIcon,
  Mail as MailIcon,
  Phone as PhoneIcon,
  PhoneIphone as PhoneIphoneIcon,
  Home as HomeIcon,
  Notes as NotesIcon,
  EmojiPeople as EmojiPeopleIcon,
} from "@material-ui/icons";
import PatientGender from "./PatientGender";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: "46ch",
  },
  avatar: {
    backgroundColor: red[500],
    width: theme.spacing(9),
    height: theme.spacing(9),
  },
}));

export default function PatientInfo(patient: Patient) {
  const globalClasses = useGlobalStyles();
  const classes = useStyles();

  const history = useHistory();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    handlePatientDelete(patient._id!);
  };

  /** Delete patient */
  const handlePatientDelete = (patientId: string) => {
    (async () => {
      try {
        await axios.delete(`/patients/${patientId}`);
        setOpen(false);
        history.push("/");
      } catch (error) {
        console.log(error);
      }
    })();
  };

  return (
    <Box>
      <Paper className={globalClasses.paper}>
        <Typography component="h2" variant="h6" color="primary" gutterBottom>
          Datos personales
          <IconButton
            component={RouterLink}
            to={`/patients/${patient._id}/edit`}
          >
            <EditIcon />
          </IconButton>
          <IconButton onClick={handleClickOpen}>
            <DeleteIcon />
          </IconButton>
        </Typography>
        <Grid container spacing={1} direction="row">
          <Grid item>
            <Avatar className={classes.avatar} src={patient?.avatar} />
          </Grid>
          <Grid item xs={12} md={12} lg={6}>
            <Typography component="p" variant="h4">
              {patient?.firstname} {patient?.lastname}
            </Typography>
          </Grid>
          <Grid item xs={12} md={12} lg={6}>
            <List dense disablePadding className={classes.root}>
              <ListItem alignItems="flex-start">
                <ListItemIcon>
                  <EmojiPeopleIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Sexo"
                  secondary={
                    <Typography
                      component="span"
                      variant="body2"
                      color="textSecondary"
                    >
                      <PatientGender gender={patient?.gender}></PatientGender>
                    </Typography>
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" />
              <ListItem alignItems="flex-start">
                <ListItemIcon>
                  <CakeIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Fecha de nacimiento"
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
              <Divider variant="inset" component="li" />
              <ListItem alignItems="flex-start">
                <ListItemIcon>
                  <RecentActorsIcon />
                </ListItemIcon>
                <ListItemText
                  primary="DNI"
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
              <Divider variant="inset" component="li" />

              <ListItem alignItems="flex-start">
                <ListItemIcon>
                  <PhoneIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Teléfono"
                  secondary={
                    <Link href={`tel:${patient?.phone}`}>{patient?.phone}</Link>
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" />
              <ListItem alignItems="flex-start">
                <ListItemIcon>
                  <PhoneIphoneIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Móvil"
                  secondary={
                    <Link href={`tel:${patient?.mobile}`}>
                      {patient?.mobile}
                    </Link>
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" />
            </List>
          </Grid>
          <Grid item xs={12} md={12} lg={6}>
            <List dense disablePadding className={classes.root}>
              <ListItem alignItems="flex-start">
                <ListItemIcon>
                  <MailIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Email"
                  secondary={
                    <Link href={`mailto:${patient?.email}`}>
                      {patient?.email}
                    </Link>
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" />
              <ListItem alignItems="flex-start">
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Dirección"
                  secondary={
                    <Typography
                      component="span"
                      variant="body2"
                      color="textSecondary"
                    >
                      {patient?.address}
                    </Typography>
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" />
              <ListItem alignItems="flex-start">
                <ListItemIcon>
                  <NotesIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Notas"
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
              <Divider variant="inset" component="li" />
            </List>
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
          Desea borrar los datos de {patient.firstname} {patient.lastname}?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Los datos de {patient.firstname} {patient.lastname} serán borrados
            del sistema y no se podrán recuperar posteriormente.
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
    </Box>
  );
}
