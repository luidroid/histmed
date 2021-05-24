import React from "react";
import Patients from "../components/Patients";

import Grid from "@material-ui/core/Grid";

export default function _Patients() {
  return (
    <Grid item xs={12} md={12} lg={12}>
      <Patients></Patients>
    </Grid>
  );
}
