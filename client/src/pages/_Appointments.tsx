import React from "react";
import { Grid } from "@material-ui/core";
import Appointments from "../components/Appointments";

export default function _Questions() {
  return (
    <React.Fragment>
      <Grid item xs={12} md={12} lg={12}>
        <Appointments></Appointments>
      </Grid>
    </React.Fragment>
  );
}
