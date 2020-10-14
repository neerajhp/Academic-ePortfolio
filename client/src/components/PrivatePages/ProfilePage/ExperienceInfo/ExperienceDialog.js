import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import {
  Box,
  IconButton,
  Typography,
  Dialog,
  DialogTitle,
} from '@material-ui/core';
import ExperienceForm from './ExperienceForm';
import API from '../../../../api/API';

const useStyles = makeStyles((theme) => ({
  container: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
    position: 'relative',
  },
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
      background: `linear-gradient(175deg, white 75%, ${theme.palette.secondary.main} 25%)`,
    },
    '& .MuiDialogActions-root': {
      background: `linear-gradient(175deg, ${theme.palette.primary.main} 55%,  white 20%)`,
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
}));

const ExperienceDialog = ({ records, setRecords, type }) => {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    API.getAllExperience().then(({ data }) => {
      console.log(data);
      setRecords(data);
      setOpen(false);
    });
  };

  function capitaliseFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

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
        className={classes.dialog}
      >
        <Box boxShadow={2}>
          <DialogTitle disableTypography>
            <Typography variant='h2'>
              Edit Your {capitaliseFirstLetter(type)} Experience
            </Typography>
          </DialogTitle>
        </Box>

        <ExperienceForm
          records={records}
          handleClose={handleClose}
          open={open}
          expType={type}
        />
      </Dialog>
    </div>
  );
};

export default ExperienceDialog;
