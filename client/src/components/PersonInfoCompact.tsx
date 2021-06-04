import React from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { DATE_FORMAT } from "../constants/constants";
import { formatGender } from "../helpers/formatter";

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

type Props = {
  person: Patient;
};
export default function PersonInfoCompact({ person }: Props) {
  const globalClasses = useGlobalStyles();
  dayjs.extend(relativeTime);
  const dtBirth = dayjs(person.birth).format(DATE_FORMAT);
  const age = dayjs(person.birth).toNow(true);

  return (
    <Paper className={globalClasses.paper}>
      <Typography component="h2" variant="h6" color="primary">
        Datos personales
      </Typography>

      <Typography component="h3" variant="h5">
        {person.firstname} {person.lastname}
      </Typography>

      <List dense disablePadding component="div">
        <ListItem button>
          <ListItemIcon>
            <EmojiPeopleIcon />
          </ListItemIcon>
          <ListItemText primary={formatGender(person.gender)} />
        </ListItem>

        <ListItem button>
          <ListItemIcon>
            <CakeIcon />
          </ListItemIcon>
          <ListItemText primary={`${dtBirth} - ${age}`} />
        </ListItem>

        <ListItem button>
          <ListItemIcon>
            <RecentActorsIcon />
          </ListItemIcon>
          <ListItemText primary={person.dni} />
        </ListItem>

        <ListItem button>
          <ListItemIcon>
            <NotesIcon />
          </ListItemIcon>
          <ListItemText primary={person.notes} />
        </ListItem>
      </List>
    </Paper>
  );
}
