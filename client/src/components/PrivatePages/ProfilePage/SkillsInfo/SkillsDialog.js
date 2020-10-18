import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import {
  IconButton,
  Typography,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import API from "../../../../api/API";
import SkillsForm from "./SkillsForm";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-end",
    position: "absolute",
    top: "10px",
    right: "10px",
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

const AboutDialog = ({ getData, skills }) => {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    API.getAboutMe().then(({ data }) => {
      getData();
      setOpen(false);
    });
  };

  return (
    <div className={classes.container}>
      <IconButton onClick={handleOpen}>
        <AddIcon />
      </IconButton>
      <Dialog
        fullWidth={true}
        maxWidth={"md"}
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle disableTypography>
          <Typography variant="h2">Add Skills</Typography>
        </DialogTitle>
        <DialogContent>
          <SkillsForm skills={skills} handleClose={handleClose} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AboutDialog;
