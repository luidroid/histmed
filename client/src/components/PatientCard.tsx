import React from "react";
import { Link as RouterLink } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import Link from "@material-ui/core/Link";

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";

import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import EditIcon from "@material-ui/icons/Edit";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import DeleteIcon from "@material-ui/icons/Delete";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import { Patient } from "../models/patient";
import PatientGender from "./PatientGender";

const useStyles = makeStyles(() => ({
  rootCard: {
    maxWidth: 345,
  },
  avatar: {
    backgroundColor: red[500],
  },
  cardContent: {
    paddingTop: 4,
    paddingBottom: 4,
  },
  expand: {
    marginLeft: "auto",
  },
}));

export default function PatientCard(props: {
  patient: Patient;
  onPatientDelete?: any;
}) {
  const classes = useStyles();
  dayjs.extend(relativeTime);
  const dtBirth = dayjs(props.patient.dateOfBirth).format("DD/MMM/YYYY");
  //const age = dayjs(dateOfBirth).toNow(true).trim().replace("years", "años");
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    props.onPatientDelete(props.patient.id);
    setOpen(false);
  };

  return (
    <div>
      <Card className={classes.rootCard}>
        <CardHeader
          avatar={
            <Avatar
              alt={props.patient.firstname}
              src="/broken-image.jpg"
              className={classes.avatar}
            ></Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={`${props.patient.firstname} ${props.patient.lastname}`}
          subheader={dtBirth}
        />
        <CardContent
          classes={{
            root: classes.cardContent, // class name, e.g. `classes-nesting-root-x`
          }}
        >
          <Typography variant="body2" color="textSecondary" component="p">
            <b>DNI:</b> {props.patient.dni}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            <b>Sexo:</b>{" "}
            <PatientGender gender={props.patient.gender}></PatientGender>
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            <b>Correo:</b>{" "}
            <Link href={`mailto:${props.patient.email}`}>
              {props.patient.email}
            </Link>
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            <b>Teléfono:</b>{" "}
            <Link href={`tel:${props.patient.phone?.phone}`}>
              {props.patient.phone?.phone}
            </Link>
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton
            component={RouterLink}
            to={`/patients/${props.patient.id}`}
          >
            <AssignmentIndIcon />
          </IconButton>
          <IconButton>
            <EditIcon />
          </IconButton>
          <IconButton className={classes.expand} onClick={handleClickOpen}>
            <DeleteIcon />
          </IconButton>
        </CardActions>
      </Card>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Desea borrar los datos de {props.patient.firstname}{" "}
          {props.patient.lastname}?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Los datos de {props.patient.firstname} {props.patient.lastname}{" "}
            serán borrados del sistema y no se podrán recuperar posteriormente.
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
    </div>
  );
}
