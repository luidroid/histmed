import React from "react";
import { AppointmentType, Appointment } from "../models/patient";

import {
  Avatar,
  createStyles,
  ListItem,
  ListItemAvatar,
  ListItemText,
  makeStyles,
  Theme,
} from "@material-ui/core";
import {
  Image,
  ImportContacts,
  RecordVoiceOver,
  SettingsInputSvideo,
} from "@material-ui/icons";
import { blue, green, red } from "@material-ui/core/colors";
import { formatAppointmentDate } from "../helpers/formatter";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      "& > *": {
        margin: theme.spacing(1),
      },
    },
    blue: {
      color: theme.palette.getContrastText(blue[500]),
      backgroundColor: blue[500],
    },
    red: {
      color: theme.palette.getContrastText(red[500]),
      backgroundColor: red[500],
    },
    green: {
      color: "#fff",
      backgroundColor: green[500],
    },
  })
);

type Props = {
  item: Appointment;
};
export default function PatientAppointmentItem({ item }: Props) {
  const classes = useStyles();
  let avatar;
  const scheduled = formatAppointmentDate(item.scheduled);

  switch (item.category) {
    case AppointmentType.PreliminaryTalk:
      avatar = (
        <Avatar className={classes.green}>
          <RecordVoiceOver />
        </Avatar>
      );
      break;

    case AppointmentType.Surgery:
      avatar = (
        <Avatar className={classes.red}>
          <SettingsInputSvideo />
        </Avatar>
      );
      break;

    case AppointmentType.Check:
      avatar = (
        <Avatar className={classes.blue}>
          <ImportContacts />
        </Avatar>
      );
      break;

    default:
      avatar = (
        <Avatar>
          <Image />
        </Avatar>
      );
      break;
  }

  return (
    <ListItem>
      <ListItemAvatar>{avatar}</ListItemAvatar>
      <ListItemText primary={item.title} secondary={scheduled} />
    </ListItem>
  );
}
