import React from "react";

import { useGlobalStyles } from "../styles/globalStyles";

import {
  Avatar,
  Button,
  Divider,
  Icon,
  Link,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Typography,
} from "@material-ui/core";
import { BeachAccess, Image } from "@material-ui/icons";

type Props = {
  appointmentsId: number;
};
export default function PatientAppointments({ appointmentsId }: Props) {
  const globalClasses = useGlobalStyles();
  return (
    <div>
      <Paper className={globalClasses.paper}>
        <Typography component="h2" variant="h6" color="primary" gutterBottom>
          Consultas{" "}
          <Button
            variant="contained"
            color="secondary"
            size="medium"
            startIcon={<Icon>add</Icon>}
          >
            Iniciar consulta{" "}
          </Button>
        </Typography>
        <List>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <Image />
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
                <BeachAccess />
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
