import React from "react";
import { Alert, AlertTitle } from "@material-ui/lab";

type Props = {
  status: string;
  message: string;
};
export default function CustomAlertError({ status, message }: Props) {
  return (
    <Alert severity="error">
      <AlertTitle>Error</AlertTitle>
      <strong>{status}</strong> - {message}.
    </Alert>
  );
}
