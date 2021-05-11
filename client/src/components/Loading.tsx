import React from "react";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";

export default function Loading() {
  return (
    <Grid container spacing={1} justify="center">
      <CircularProgress />
    </Grid>
  );
}
