import React from "react";
import QuestionnaireForm from "../components/QuestionnaireForm";
import Grid from "@material-ui/core/Grid";

export default function _QuestionnaireCreateForm() {
  return (
    <React.Fragment>
      <Grid item xs={12} md={12} lg={12}>
        <QuestionnaireForm edit={false}></QuestionnaireForm>
      </Grid>
    </React.Fragment>
  );
}
