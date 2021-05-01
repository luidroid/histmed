import React from "react";
import { Link as RouterLink } from "react-router-dom";

import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";

import PeopleIcon from "@material-ui/icons/People";
import SettingsIcon from "@material-ui/icons/Settings";
import TodayIcon from "@material-ui/icons/Today";
import AssignmentIcon from "@material-ui/icons/Assignment";

export const mainListItems = (
  <div>
    <ListItem button component={RouterLink} to={"/patients"}>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Pacientes" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Consultas" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <TodayIcon />
      </ListItemIcon>
      <ListItemText primary="Calendario" />
    </ListItem>
  </div>
);

export const secondaryListItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <SettingsIcon />
      </ListItemIcon>
      <ListItemText primary="Ajustes" />
    </ListItem>
  </div>
);
