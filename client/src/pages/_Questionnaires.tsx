import React from "react";
import Questionnaires from "../components/Questionnaires";
import Grid from "@material-ui/core/Grid";

export default function _Questionnaires() {
  return (
    <React.Fragment>
      <Grid item xs={12} md={12} lg={12}>
        <Questionnaires></Questionnaires>
      </Grid>
    </React.Fragment>
  );
}
