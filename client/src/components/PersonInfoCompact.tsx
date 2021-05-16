import React from "react";

import { useGlobalStyles } from "../styles/globalStyles";
import { Patient } from "../models/patient";

import CakeIcon from "@material-ui/icons/Cake";
import EmojiPeopleIcon from "@material-ui/icons/EmojiPeople";
import NotesIcon from "@material-ui/icons/Notes";
import RecentActorsIcon from "@material-ui/icons/RecentActors";

import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import PatientGender from "./PatientGender";

type Props = {
  person: Patient;
};
export default function PersonInfoCompact({ person }: Props) {
  const globalClasses = useGlobalStyles();
  return (
    <Paper className={globalClasses.paper}>
      <Typography component="h2" variant="h6" color="primary">
        Datos personales
      </Typography>

      <Typography component="p" variant="h5">
        {person.firstname} {person.lastname}
      </Typography>

      <List dense disablePadding>
        <ListItem alignItems="flex-start">
          <ListItemIcon>
            <EmojiPeopleIcon />
          </ListItemIcon>
          <ListItemText
            primary=""
            secondary={
              <Typography
                component="span"
                variant="body2"
                color="textSecondary"
              >
                <PatientGender gender={person.gender}></PatientGender>
              </Typography>
            }
          />
        </ListItem>

        <ListItem alignItems="flex-start">
          <ListItemIcon>
            <CakeIcon />
          </ListItemIcon>
          <ListItemText
            primary=""
            secondary={
              <Typography
                component="span"
                variant="body2"
                color="textSecondary"
              >
                {person.birth} - 38 anios
              </Typography>
            }
          />
        </ListItem>

        <ListItem alignItems="flex-start">
          <ListItemIcon>
            <RecentActorsIcon />
          </ListItemIcon>
          <ListItemText
            primary=""
            secondary={
              <Typography
                component="span"
                variant="body2"
                color="textSecondary"
              >
                {person.dni}
              </Typography>
            }
          />
        </ListItem>

        <ListItem alignItems="flex-start">
          <ListItemIcon>
            <NotesIcon />
          </ListItemIcon>
          <ListItemText
            primary=""
            secondary={
              <Typography
                component="span"
                variant="body2"
                color="textSecondary"
              >
                {person.notes}
              </Typography>
            }
          />
        </ListItem>
      </List>
    </Paper>
  );
}
