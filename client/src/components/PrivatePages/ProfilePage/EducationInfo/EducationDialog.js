import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import {
  IconButton,
  Typography,
  Dialog,
  DialogContent,
  DialogTitle,
} from '@material-ui/core';
import EducationForm from './EducationForm';
import API from '../../../../api/API';

const useStyles = makeStyles((theme) => ({
  container: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
    position: 'relative',
  },
  paper: {
    position: 'absolute',
    width: '40%',
    backgroundColor: theme.palette.neutral.main,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const EducationDialog = ({ records, setRecords }) => {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    API.getEducation().then(({ data }) => {
      setRecords(data);
      setOpen(false);
    });
  };

  return (
    <div className={classes.container}>
      <IconButton onClick={handleOpen}>
        <EditIcon />
      </IconButton>
      <Dialog
        fullWidth={true}
        maxWidth={'md'}
        scroll={'paper'}
        open={open}
        onClose={handleClose}
      >
        <DialogTitle disableTypography>
          <Typography variant='h2'>Edit Education Information</Typography>
        </DialogTitle>
        <EducationForm records={records} handleClose={handleClose} />
      </Dialog>
    </div>
  );
};

export default EducationDialog;
