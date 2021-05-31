import React from "react";
import { Alert, AlertTitle } from "@material-ui/lab";

type Props = {
  message: string;
};
export default function CustomAlertError({ message }: Props) {
  return (
    <Alert severity="error">
      <AlertTitle>Error</AlertTitle>
      {message}.
    </Alert>
  );
}
