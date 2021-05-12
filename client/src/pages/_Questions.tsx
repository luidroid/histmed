import React from "react";
import Questions from "../components/Questions";
import Grid from "@material-ui/core/Grid";

export default function _Questions() {
  return (
    <React.Fragment>
      <Grid item xs={12} md={12} lg={12}>
        <Questions></Questions>
      </Grid>
    </React.Fragment>
  );
}
