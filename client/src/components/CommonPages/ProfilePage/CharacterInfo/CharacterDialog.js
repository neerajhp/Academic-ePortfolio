import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import EditIcon from "@material-ui/icons/Edit";
import {
  Box,
  Button,
  IconButton,
  Typography,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import CharacterForm from "./CharacterForm";
import API from "../../../../api/API";


const useStyles = makeStyles((theme) => ({
  dialog: {
    "& .MuiDialogTitle-root": {
      background: `linear-gradient(175deg, white 75%, ${theme.palette.secondary.overlay} 25%)`,
    },
    "& .MuiDialogActions-root": {
      background: `linear-gradient(175deg, ${theme.palette.primary.overlay} 55%,  white 20%)`,
    },
  },
  paper: {
    position: "absolute",
    width: "40%",
    backgroundColor: theme.palette.neutral.main,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  newBioButton: {
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


const CharacterDialog = ({ records, setRecords, empty }) => {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    API.getBio().then(({ data }) => {
      console.log(data);
      setRecords(data);
      console.log(records);
      setOpen(false);
    });
  };
  const openButton = empty ? (
    <Button onClick={handleOpen} className={classes.newBioButton}>
      <Typography variant="h2">
        <AddIcon /> Add Your Education
      </Typography>
    </Button>
  ) : (
    <IconButton onClick={handleOpen}>
      <EditIcon />
    </IconButton>
  );

  // const openButton = empty ? (
  //   <Button onClick={handleOpen} className={classes.newBioButton}>
  //     <Typography variant="h2">
  //       <AddIcon /> Add Bio
  //     </Typography>
  //   </Button>
  // ) : (
  //   <IconButton onClick={handleOpen}>
  //     <EditIcon />
  //   </IconButton>
  // );

  return (
    <React.Fragment>
      <div className={classes.container}>
        {openButton}
        <Dialog
          fullWidth={true}
          maxWidth={"md"}
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle disableTypography>
            <Typography variant="h2">Edit Bio</Typography>
          </DialogTitle>
          <DialogContent>
            <CharacterForm records={records} handleClose={handleClose} />
          </DialogContent>
        </Dialog>
      </div>
    </React.Fragment>
  );
};

export default CharacterDialog;
