import React from "react";
import QuestionnaireDetails from "../components/QuestionnaireDetails";
import Grid from "@material-ui/core/Grid";

export default function _QuestionnaireDetails() {
  return (
    <React.Fragment>
      <Grid item xs={12} md={12} lg={12}>
        <QuestionnaireDetails></QuestionnaireDetails>
      </Grid>
    </React.Fragment>
  );
}
