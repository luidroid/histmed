import React from "react";
import { Grid, Typography } from "@material-ui/core";
import Questions from "./Questions";

export default function _Questions() {
  return (
    <React.Fragment>
      <Grid item xs={12} md={12} lg={12}>
        <Typography component="h1" variant="h4">
          Cuestionario{" "}
        </Typography>
      </Grid>
      <Grid item xs={12} md={12} lg={12}>
        <Questions></Questions>
      </Grid>
    </React.Fragment>
  );
}
