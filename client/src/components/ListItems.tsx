import React from "react";
import { Link as RouterLink } from "react-router-dom";

import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";

import { People, Settings, Today, Assignment } from "@material-ui/icons";

export const mainListItems = (
  <div>
    <ListItem button component={RouterLink} to={"/"}>
      <ListItemIcon>
        <People />
      </ListItemIcon>
      <ListItemText primary="Pacientes" />
    </ListItem>
    <ListItem button component={RouterLink} to={"/scheduler"}>
      <ListItemIcon>
        <Today />
      </ListItemIcon>
      <ListItemText primary="Calendario" />
    </ListItem>
    <ListItem button component={RouterLink} to={"/questionnaire"}>
      <ListItemIcon>
        <Assignment />
      </ListItemIcon>
      <ListItemText primary="Cuestionario" />
    </ListItem>
  </div>
);

export const secondaryListItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <Settings />
      </ListItemIcon>
      <ListItemText primary="Ajustes" />
    </ListItem>
  </div>
);
