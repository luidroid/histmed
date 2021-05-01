import React from "react";
import clsx from "clsx";

import { History } from "../models/patient";

import { makeStyles, Typography, Grid, Divider, Box } from "@material-ui/core";
/**
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },

  fixedHeight: {
    height: 540, //240
  },
}));
 */
type Props = {
  title: string;
  records: History[];
};
export default function PatientHistoryGeneric({ title, records }: Props) {
  // const classes = useStyles();

  return (
    <Box>
      <Typography component="p" variant="h4">
        {title}
      </Typography>

      <Grid container spacing={1}>
        {records.map((record, index) => (
          <React.Fragment key={index}>
            <Grid item xs={12} md={12} lg={4}>
              <Typography component="span" variant="body1" color="textPrimary">
                {record.name}
              </Typography>
            </Grid>
            <Grid item xs={12} md={12} lg={8}>
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
    </Box>
  );
}
