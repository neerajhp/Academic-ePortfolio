import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  Typography,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import ProjectForm from './ProjectForm';

import API from '../../../../api/API';

const useStyles = makeStyles((theme) => ({
  panelContainer: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: 224,
  },
  paper: {
    position: 'absolute',
    width: '40%',
    backgroundColor: theme.palette.neutral.main,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  dialog: {
    '& .MuiDialogTitle-root': {
      background: `linear-gradient(175deg, white 75%, ${theme.palette.secondary.overlay} 25%)`,
    },
    '& .MuiDialogActions-root': {
      background: `linear-gradient(175deg, ${theme.palette.primary.overlay} 55%,  white 20%)`,
    },
  },
  subTitle: {
    width: '100%',
    marginBottom: theme.spacing(3),
    display: 'flex',
    flexDirection: 'row',
    '&::after': {
      content: '""',
      flex: '1 1',
      borderColor: '#D9D7D7',
      borderBottom: '1px solid',
      margin: 'auto',
    },
  },
  newExperienceButton: {
    margin: '0 0 1% 1%',
    '&.MuiButton-text': {
      textTransform: 'none',
      padding: `${theme.spacing(4)}px ${theme.spacing(2)}px`,
    },
    '&.MuiButtonBase-root': {
      width: '100%',
      backgroundColor: theme.palette.neutral.light,
      '&:hover': {
        backgroundColor: theme.palette.neutral.main,
      },
    },
  },
}));

const ProjectDialog = ({ project, updateProfile, empty, exist}) => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    API.getUserProfile()
      .then(({ data }) => {
        updateProfile(data);
        setOpen(false);
      })
      .catch();
  };

  const openButton = empty ? (
    <Button onClick={handleOpen} className={classes.newExperienceButton}>
      <Typography variant='h2'>
        <AddIcon /> Add a Project to Showcase
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
        scroll={'paper'}
        onClose={handleClose}
        className={classes.dialog}
        aria-labelledby='form-dialog-title'
      >
        <DialogTitle disableTypography>
          <Typography variant='h2'>Edit Project</Typography>
        </DialogTitle>

        <ProjectForm
          records={project}
          handleClose={handleClose}
          newWork={empty}
        />
      </Dialog>
    </React.Fragment>
  );
};

export default ProjectDialog;
