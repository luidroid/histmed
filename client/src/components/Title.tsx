import React from "react";
import { Link as RouterLink } from "react-router-dom";

import { useGlobalStyles } from "../styles/globalStyles";
import Typography from "@material-ui/core/Typography";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";

type Props = {
  title: string;
  route?: string;
};
export default function Title({ title, route }: Props) {
  const globalClasses = useGlobalStyles();

  return (
    <Typography component="h2" variant="h6" color="primary">
      {title}
      {route && (
        <Fab
          className={globalClasses.fab}
          color="primary"
          aria-label="add"
          size="large"
          component={RouterLink}
          to={route}
        >
          <AddIcon />
        </Fab>
      )}
    </Typography>
  );
}
