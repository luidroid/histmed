import React from "react";
import { Link as RouterLink } from "react-router-dom";

import { useGlobalStyles } from "../styles/globalStyles";

import {
  Avatar,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Typography,
} from "@material-ui/core";
import { BeachAccess, Edit, Image } from "@material-ui/icons";

type Props = {
  patientId?: number;
};
export default function PatientAttachments({ patientId }: Props) {
  const globalClasses = useGlobalStyles();
  return (
    <div>
      <Paper className={globalClasses.paper}>
        <Typography component="h2" variant="h6" color="primary" gutterBottom>
          Archivos{" "}
          <IconButton component={RouterLink} to={`/patients/${patientId}/edit`}>
            <Edit />
          </IconButton>
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
      </Paper>
    </div>
  );
}
