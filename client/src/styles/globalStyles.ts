import { makeStyles } from "@material-ui/core";

export const useGlobalStyles = makeStyles((theme) => ({
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
  },
}));
