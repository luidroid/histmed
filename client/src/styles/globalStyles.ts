import { makeStyles } from "@material-ui/core";
import { deepOrange, pink, green, blue } from "@material-ui/core/colors";

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
  pink: {
    color: theme.palette.getContrastText(pink[500]),
    backgroundColor: pink[500],
  },
  green: {
    color: "#fff",
    backgroundColor: green[500],
  },
  blue: {
    color: "#fff",
    backgroundColor: blue[500],
  },
  textField: {
    width: "50ch",
  },
  fab: {
    margin: " 0 3ch",
    float: "right",
  },
  alignRight: {
    float: "right",
  },
}));
