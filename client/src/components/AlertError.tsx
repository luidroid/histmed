import React from "react";
import { Alert, AlertTitle } from "@material-ui/lab";

type Props = {
  message: string;
  recommendation: string;
};
export default function AlertError({ message, recommendation }: Props) {
  return (
    <Alert severity="error">
      <AlertTitle>Error</AlertTitle>
      {message} — <strong>{recommendation}!</strong>
    </Alert>
  );
}
