import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "../api/apiConfig";
import clsx from "clsx";

import { makeStyles } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";
import Divider from "@material-ui/core/Divider";

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import Avatar from "@material-ui/core/Avatar";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ImageIcon from "@material-ui/icons/Image";
import WorkIcon from "@material-ui/icons/Work";
import BeachAccessIcon from "@material-ui/icons/BeachAccess";

import { Patient } from "../models/patient";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 540, //240
  },
  depositContext: {
    flex: 1,
  },
  avatar: {
    backgroundColor: red[500],
    width: theme.spacing(8),
    height: theme.spacing(8),
  },
}));

export default function PatientDetails() {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const { id } = useParams<{ id: string }>();
  const [patientInfo, setPatientInfo] = useState<Patient>();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get<Patient>(`/patients/${id}`);
        setPatientInfo(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [id]);

  return (
    <React.Fragment>
      <Grid item xs={12} md={8} lg={9}>
        <Paper className={fixedHeightPaper}>
          <Typography component="h2" variant="h6" color="primary" gutterBottom>
            Detalles
            <IconButton>
              <EditIcon />
            </IconButton>
            <IconButton>
              <DeleteIcon />
            </IconButton>
          </Typography>
          <Avatar
            className={classes.avatar}
            alt="Remy Sharp"
            src="/static/images/avatar/1.jpg"
          />
          <Typography component="p" variant="h4">
            Luis Amoroso
          </Typography>
          <Typography color="textSecondary" className={classes.depositContext}>
            15/March/2019 - 38 anios
          </Typography>
          <Typography color="textSecondary" className={classes.depositContext}>
            DNI: 123{" "}
          </Typography>
          <Typography color="textSecondary" className={classes.depositContext}>
            Sexo: Masculino
          </Typography>
          <Typography color="textSecondary" className={classes.depositContext}>
            Correo: test@c.com
          </Typography>
          <Typography color="textSecondary" className={classes.depositContext}>
            Telefono: 123
          </Typography>
          <Typography color="textSecondary" className={classes.depositContext}>
            Móvil: 123
          </Typography>
          <Typography color="textSecondary" className={classes.depositContext}>
            Direccion: 123
          </Typography>
          <Typography color="textSecondary" className={classes.depositContext}>
            Paciente desde: 12/mar/2020
          </Typography>
          <Typography color="textSecondary" className={classes.depositContext}>
            Informacion adicional
          </Typography>
          <div>
            <Link color="primary" href="#">
              Ver más{" "}
            </Link>
          </div>
        </Paper>
      </Grid>
      {/* Consultas */}
      <Grid item xs={12} md={4} lg={3}>
        <Paper className={fixedHeightPaper}>
          <Typography component="h2" variant="h6" color="primary" gutterBottom>
            Consultas
            <Fab size="medium" color="primary" aria-label="add">
              <AddIcon />
            </Fab>
          </Typography>
          <Typography component="p" variant="h4">
            Planeadas
          </Typography>
          <Typography color="textSecondary" className={classes.depositContext}>
            Futuras
          </Typography>
          <List className={classes.root}>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <ImageIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Gripe" secondary="Jan 9, 2014" />
            </ListItem>
            <Divider variant="inset" component="li" />

            <ListItem>
              <ListItemText
                inset={true}
                primary="Dolor"
                secondary="Jan 7, 2014"
              />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <BeachAccessIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Lipo" secondary="July 20, 2014" />
            </ListItem>
            <Divider variant="inset" component="li" />
          </List>

          <Typography color="textSecondary" className={classes.depositContext}>
            Anteriores
          </Typography>
          <div>
            <Link color="primary" href="#">
              Ver más{" "}
            </Link>
          </div>
        </Paper>
      </Grid>
      {/* Recent Orders */}
      <Grid item xs={12}>
        <Paper className={fixedHeightPaper}>
          <Typography component="h2" variant="h6" color="primary" gutterBottom>
            Antecedentes
          </Typography>
          <Typography component="p" variant="h4">
            Planeadas
          </Typography>
          <Typography color="textSecondary" className={classes.depositContext}>
            Futuras
          </Typography>
          <Typography color="textSecondary" className={classes.depositContext}>
            Anteriores
          </Typography>
          <div>
            <Link color="primary" href="#">
              Ver más{" "}
            </Link>
          </div>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper className={fixedHeightPaper}>
          <Typography component="h2" variant="h6" color="primary" gutterBottom>
            Operaciones
          </Typography>
          <Typography component="p" variant="h4">
            Planeadas
          </Typography>
          <Typography color="textSecondary" className={classes.depositContext}>
            Futuras
          </Typography>
          <Typography color="textSecondary" className={classes.depositContext}>
            Anteriores
          </Typography>
          <div>
            <Link color="primary" href="#">
              Ver más{" "}
            </Link>
          </div>
        </Paper>
      </Grid>
    </React.Fragment>
  );
}
