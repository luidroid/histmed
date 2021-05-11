import React from "react";
import { Alert, AlertTitle } from "@material-ui/lab";

export default function AlertError() {
  return (
    <Alert severity="error">
      <AlertTitle>Error</AlertTitle>
      No existe conexión con la base de datos—{" "}
      <strong>Reinicie la aplicación!</strong>
    </Alert>
  );
}
