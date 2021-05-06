import React from "react";

import { useGlobalStyles } from "../styles/globalStyles";
import { green, pink } from "@material-ui/core/colors";

import {
  Avatar,
  Button,
  Chip,
  createStyles,
  Divider,
  Icon,
  Link,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListSubheader,
  makeStyles,
  Paper,
  Theme,
  Typography,
} from "@material-ui/core";
import {
  BeachAccess,
  Image,
  ImportContacts,
  SettingsInputSvideo,
} from "@material-ui/icons";

import PatientAppointmentItem from "../components/PatientAppointmentItem";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      "& > *": {
        margin: theme.spacing(1),
      },
    },
    pink: {
      color: theme.palette.getContrastText(pink[500]),
      backgroundColor: pink[500],
    },
    green: {
      color: "#fff",
      backgroundColor: green[500],
    },
  })
);

type Props = {
  appointmentsId: number;
};
export default function PatientAppointments({ appointmentsId }: Props) {
  const globalClasses = useGlobalStyles();
  const classes = useStyles();

  return (
    <div>
      <Paper className={globalClasses.paper}>
        <Typography component="h3" variant="h6" color="primary" gutterBottom>
          Consultas{" "}
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          startIcon={<Icon>add</Icon>}
        >
          Iniciar consulta{" "}
        </Button>

        <List
          subheader={
            <ListSubheader component="div" id="nested-list-subheader">
              Agendadas
            </ListSubheader>
          }
        >
          <PatientAppointmentItem
            title="Dolor"
            date="27/apr/1980"
            type="O"
          ></PatientAppointmentItem>

          <Divider variant="inset" component="li" />
          <ListItem>
            <ListItemAvatar>
              <Avatar className={classes.green}>
                <ImportContacts />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Lipo" secondary="July 20, 2014" />
          </ListItem>
          <Divider variant="inset" component="li" />
        </List>
        <div>
          <Link color="primary" href="#">
            Ver más{" "}
          </Link>
        </div>
      </Paper>
    </div>
  );
}
