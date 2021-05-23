import { makeStyles } from "@material-ui/core";
import { deepOrange } from "@material-ui/core/colors";

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
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
  textField: {
    width: "50ch",
  },
  fab: {
    margin: " 0 3ch",
    float: "right",
  },
}));
