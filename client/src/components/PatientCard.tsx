import React from "react";
import { Link as RouterLink } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";

import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";

import MoreVertIcon from "@material-ui/icons/MoreVert";

import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import { Gender, Patient } from "../models/patient";
import { useGlobalStyles } from "../styles/globalStyles";

import { DATE_FORMAT, PATIENTS_URL } from "../constants/constants";

const useStyles = makeStyles(() => ({
  rootCard: {
    maxWidth: 345,
  },

  cardContent: {
    paddingTop: 4,
    paddingBottom: 4,
  },
  expand: {
    marginLeft: "auto",
  },
}));

export default function PatientCard(props: { patient: Patient }) {
  const globalClasses = useGlobalStyles();

  const classes = useStyles();
  dayjs.extend(relativeTime);
  const dtBirth = dayjs(props.patient.birth).format(DATE_FORMAT);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  function GenderAvatar() {
    let result;

    switch (props.patient.gender) {
      case Gender.Male:
        result = (
          <Avatar
            className={globalClasses.blue}
            component={RouterLink}
            to={`${PATIENTS_URL}/${props.patient._id}`}
          ></Avatar>
        );
        break;
      case Gender.Female:
        result = (
          <Avatar
            className={globalClasses.pink}
            component={RouterLink}
            to={`${PATIENTS_URL}/${props.patient._id}`}
          ></Avatar>
        );
        break;

      default:
        result = (
          <Avatar
            className={globalClasses.green}
            component={RouterLink}
            to={`${PATIENTS_URL}/${props.patient._id}`}
          ></Avatar>
        );

        break;
    }
    return result;
  }

  return (
    <Card className={classes.rootCard}>
      <CardHeader
        avatar={<GenderAvatar></GenderAvatar>}
        action={
          <div>
            <IconButton aria-label="settings" onClick={handleClick}>
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleCloseMenu}
            >
              <MenuItem
                component={RouterLink}
                to={`${PATIENTS_URL}/${props.patient._id}`}
              >
                Vista previa
              </MenuItem>
              <MenuItem
                component={RouterLink}
                to={`${PATIENTS_URL}/${props.patient._id}/edit`}
              >
                Editar
              </MenuItem>
            </Menu>
          </div>
        }
        title={
          <Link
            component={RouterLink}
            to={`${PATIENTS_URL}/${props.patient._id}`}
          >
            <Typography component="h6" variant="body1">
              {props.patient.firstname} {props.patient.lastname}
            </Typography>
          </Link>
        }
        subheader={dtBirth}
      />
      <CardContent
        classes={{
          root: classes.cardContent,
        }}
      >
        <Typography variant="body2" color="textSecondary" component="p">
          <strong>Correo:</strong>{" "}
          <Link href={`mailto:${props.patient.email}`}>
            {props.patient.email}
          </Link>
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          <strong>Teléfono:</strong>{" "}
          <Link href={`tel:${props.patient.phone}`}>{props.patient.phone}</Link>
        </Typography>
      </CardContent>
    </Card>
  );
}
