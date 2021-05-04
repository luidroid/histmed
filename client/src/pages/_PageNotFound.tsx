import React from "react";
import { Button, Grid, Typography } from "@material-ui/core";
import { useHistory, useLocation } from "react-router-dom";

export default function _PageNotFound() {
  const location = useLocation();
  const history = useHistory();

  return (
    <div>
      <Typography
        component="h1"
        variant="h2"
        align="center"
        color="textPrimary"
        gutterBottom
      >
        404 Page not found
      </Typography>
      <Typography variant="h5" align="center" color="textSecondary" paragraph>
        La página con la dirección "{location.pathname}" no existe. Por favor
        intente otra dirección.
      </Typography>
      <div>
        <Grid container spacing={2} justify="center">
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              onClick={() => history.push("/")}
            >
              Ir a inicio
            </Button>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
