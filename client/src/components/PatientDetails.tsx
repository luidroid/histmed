import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "../api/apiConfig";
import clsx from "clsx";

import { Patient } from "../models/patient";
import { initPatient } from "../api/patientService";
import PatientInfo from "../components/PatientInfo";

import { red } from "@material-ui/core/colors";

import {
  makeStyles,
  Grid,
  Typography,
  Paper,
  Link,
  Divider,
  Fab,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
} from "@material-ui/core/";

import AddIcon from "@material-ui/icons/Add";
import ImageIcon from "@material-ui/icons/Image";
import BeachAccessIcon from "@material-ui/icons/BeachAccess";
import PatientHistory from "./PatientHistory";

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
    width: theme.spacing(9),
    height: theme.spacing(9),
  },
}));

export default function PatientDetails() {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const { id } = useParams<{ id: string }>();
  const [info, setPatientInfo] = useState<Patient>(initPatient);

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
      <Grid item xs={12} md={8} lg={8}>
        <PatientInfo {...info}></PatientInfo>
      </Grid>

      {/* Appointments */}
      <Grid item xs={12} md={4} lg={4}>
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

      {/* Alergies */}
      <Grid item xs={12} md={8} lg={8}>
        <PatientHistory historyList={info.historyList}></PatientHistory>
      </Grid>

      {/* Surgery */}
      <Grid item xs={12} md={4} lg={4}>
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
