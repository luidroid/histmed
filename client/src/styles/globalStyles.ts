import { makeStyles } from "@material-ui/core";

export const useGlobalStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      //width: "50ch",
    },
  },
  spacing: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
    marginBottom: theme.spacing(2),
  },
}));
