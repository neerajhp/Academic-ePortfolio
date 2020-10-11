import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import EditIcon from "@material-ui/icons/Edit";
import {
  IconButton,
  Typography,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import API from "../../../../api/API";
import AboutForm from "./AboutForm";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-end",
    position: "relative",
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
}));

const AboutDialog = ({ records, setRecords }) => {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    API.getAboutMe().then(({ data }) => {
      setRecords({ aboutMe: data });
      setOpen(false);
    });
  };

  return (
    <div className={classes.container}>
      <IconButton onClick={handleOpen}>
        <EditIcon className={classes.icon} />
      </IconButton>
      <Dialog
        fullWidth={true}
        maxWidth={"md"}
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle disableTypography>
          <Typography variant="h2">Edit About</Typography>
        </DialogTitle>
        <DialogContent>
          <AboutForm records={records} handleClose={handleClose} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AboutDialog;
