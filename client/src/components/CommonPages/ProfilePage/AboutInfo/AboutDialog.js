import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import EditIcon from "@material-ui/icons/Edit";
import {
  Button,
  IconButton,
  Typography,
  Dialog,
  DialogTitle,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import API from "../../../../api/API";
import AboutForm from "./AboutForm";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-end",
    position: "relative",
  },
  dialog: {
    "& .MuiDialogTitle-root": {
      background: `linear-gradient(175deg, white 75%, ${theme.palette.secondary.overlay} 25%)`,
    },
    "& .MuiDialogActions-root": {
      background: `linear-gradient(175deg, ${theme.palette.primary.overlay} 55%,  white 20%)`,
    },
  },
  icon: {
    color: "rgba(255, 255, 255, 0.7)",
  },
  paper: {
    position: "absolute",
    width: "40%",
    backgroundColor: theme.palette.neutral.main,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  newButton: {
    "&.MuiButton-text": {
      textTransform: "none",
      padding: `${theme.spacing(4)}px ${theme.spacing(2)}px`,
    },
    "&.MuiButtonBase-root": {
      width: "100%",
      backgroundColor: theme.palette.neutral.light,
      "&:hover": {
        backgroundColor: theme.palette.neutral.main,
      },
    },
  },
}));

const AboutDialog = ({ records, setRecords, empty }) => {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    API.getAboutMe().then(({ data }) => {
      setRecords(data);
      setOpen(false);
    });
  };

  const openButton = empty ? (
    <Button onClick={handleOpen} className={classes.newButton}>
      <Typography variant="h2">
        <AddIcon /> Add a little paragraph about yourself
      </Typography>
    </Button>
  ) : (
    <IconButton onClick={handleOpen}>
      <EditIcon />
    </IconButton>
  );

  return (
    <React.Fragment>
      {openButton}
      <Dialog
        fullWidth={true}
        maxWidth={"md"}
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        className={classes.dialog}
      >
        <DialogTitle disableTypography>
          <Typography variant="h2">Edit About</Typography>
        </DialogTitle>

        <AboutForm records={records} handleClose={handleClose} />
      </Dialog>
    </React.Fragment>
  );
};

export default AboutDialog;
