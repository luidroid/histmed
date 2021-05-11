import { Grid, Typography } from "@material-ui/core";
import React from "react";
import QuestionForm from "../components/QuestionForm";

export default function _QuestionForm() {
  return (
    <React.Fragment>
      <Grid item xs={12} md={12} lg={12}>
        <QuestionForm></QuestionForm>
      </Grid>
    </React.Fragment>
  );
}
