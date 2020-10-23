import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import {
  Button,
  IconButton,
  Typography,
  Dialog,
  DialogTitle,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import API from '../../../../api/API';
import ReflectionForm from './ReflectionForm';

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


const ReflectionDialog = ({ records, setRecords, empty }) => {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    // API.getAMe().then(({ data }) => {
    //   setRecords(data);
    //   setOpen(false);
    // });
  };

  const openButton = empty ? (
    <Button onClick={handleOpen} className={classes.newButton}>
      <Typography variant='h2'>
        <AddIcon /> Add a Reflection
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
        maxWidth={'md'}
        open={open}
        onClose={handleClose}
        aria-labelledby='form-dialog-title'
        className={classes.dialog}
      >
        <DialogTitle disableTypography>
          <Typography variant='h2'>Edit Reflection</Typography>
        </DialogTitle>

        <ReflectionForm records={records} handleClose={handleClose} />
      </Dialog>
    </React.Fragment>
  );
};

export default ReflectionDialog;