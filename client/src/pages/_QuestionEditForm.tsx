import React from "react";
import QuestionForm from "../components/QuestionForm";
import Grid from "@material-ui/core/Grid";

export default function _QuestionForm() {
  return (
    <React.Fragment>
      <Grid item xs={12} md={12} lg={12}>
        <QuestionForm></QuestionForm>
      </Grid>
    </React.Fragment>
  );
}
