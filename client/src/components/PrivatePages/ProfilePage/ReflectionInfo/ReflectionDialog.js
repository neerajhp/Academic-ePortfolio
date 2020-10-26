import React from 'react';
import EditIcon from '@material-ui/icons/Edit';
import {
  Typography,
  Dialog,
  DialogContent,
  DialogTitle,
} from '@material-ui/core';
import ReflectionForm from './ReflectionForm';
import API from '../../../../api/API';

const ReflectionDialog = ({ records, setRecords }) => {
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
        maxWidth={'md'}
        open={open}
        onClose={handleClose}
        aria-labelledby='form-dialog-title'
      >
        <DialogTitle disableTypography>
          <Typography variant='h2'>Edit Reflection</Typography>
        </DialogTitle>
        <DialogContent>
          <ReflectionForm records={records} handleClose={handleClose} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ReflectionDialog;
