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
import ExperienceForm from './ExperienceForm';
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

const ExperienceDialog = ({ records, setRecords }) => {
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

  return (
    <div className={classes.container}>
      <IconButton onClick={handleOpen}>
        <EditIcon />
      </IconButton>
      <Dialog
        fullWidth={true}
        maxWidth={'md'}
        open={open}
        onClose={handleClose}
        aria-labelledby='form-dialog-title'
      >
        <DialogTitle disableTypography>
          <Typography variant='h2'>Edit Experience Information</Typography>
        </DialogTitle>
        <DialogContent>
          <div className={classes.formSection}>
            <Typography className={classes.subTitle} variant='h3'>
              Professional
            </Typography>
            <ExperienceForm
              records={records.employment}
              handleClose={handleClose}
            />
          </div>
          <div className={classes.formSection}>
            <Typography className={classes.subTitle} variant='h3'>
              Volunteering
            </Typography>
            <ExperienceForm
              records={records.volunteering}
              handleClose={handleClose}
            />
          </div>
          <div className={classes.formSection}>
            <Typography className={classes.subTitle} variant='h3'>
              Extracurricular
            </Typography>
            <ExperienceForm
              records={records.extracurricular}
              handleClose={handleClose}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ExperienceDialog;
