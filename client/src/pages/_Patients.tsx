import React from "react";
import Patients from "../components/Patients";
import { useGlobalStyles } from "../styles/globalStyles";

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

export default function _Patients() {
  const globalClasses = useGlobalStyles();

  return (
    <Grid item xs={12} md={12} lg={12}>
      <Paper className={globalClasses.paper}>
        <Patients></Patients>
      </Paper>
    </Grid>
  );
}
