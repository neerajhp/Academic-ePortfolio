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
import ReflectionForm from "./ReflectionForm";
import API from "../../../../api/API";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-end",
    position: "relative",
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

const ReflectionDialog = ({ records, setRecords }) => {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    API.getAllBlogs().then(({ data }) => {
      setRecords(data);
      setOpen(false);
    });
  };

  return (
    <>
      <EditIcon onClick={handleOpen} />
      <Dialog
        fullWidth={true}
        maxWidth={"md"}
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle disableTypography>
          <Typography variant="h2">Edit Reflection</Typography>
        </DialogTitle>
        <DialogContent>
          <ReflectionForm records={records} handleClose={handleClose} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ReflectionDialog;
