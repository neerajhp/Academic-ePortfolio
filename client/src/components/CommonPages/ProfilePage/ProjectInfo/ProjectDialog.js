import React, { useState } from 'react';
import EditIcon from '@material-ui/icons/Edit';
import {
  Typography,
  Dialog,
  DialogContent,
  DialogTitle,
} from '@material-ui/core';
import ProjectForm from './ProjectForm';
import API from '../../../../api/API';

const ProjectDialog = ({ records, setRecords }) => {
  const [open, setOpen] = useState(false);

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
    <React.Fragment>
      <EditIcon onClick={handleOpen} />
      <Dialog
        fullWidth={true}
        maxWidth={'md'}
        open={open}
        onClose={handleClose}
        aria-labelledby='form-dialog-title'
      >
        <DialogTitle disableTypography>
          <Typography variant='h2'>Edit Project</Typography>
        </DialogTitle>
        <DialogContent>
          <ProjectForm records={records} handleClose={handleClose} />
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};

export default ProjectDialog;
