import React from "react";

import { History } from "../models/patient";

import { Typography, Grid, Divider } from "@material-ui/core";

type Props = {
  title?: string;
  records: History[];
};
export default function PatientHistoryGeneric({ title, records }: Props) {
  return (
    <div>
      <Typography component="p" variant="h4">
        {title}
      </Typography>

      <Grid container spacing={1}>
        {records.map((record, index) => (
          <React.Fragment key={index}>
            <Grid item xs={12} md={12} lg={6}>
              <Typography component="span" variant="body1" color="textPrimary">
                {record.name}
              </Typography>
            </Grid>
            <Grid item xs={12} md={12} lg={6}>
              <Typography
                component="span"
                variant="body2"
                color="textSecondary"
              >
                {record.description}
              </Typography>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <Divider></Divider>
            </Grid>
          </React.Fragment>
        ))}
      </Grid>
    </div>
  );
}
