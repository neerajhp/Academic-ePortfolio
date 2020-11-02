import React, { useState } from 'react';
import {
  makeStyles,
  IconButton,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Slide,
} from '@material-ui/core';
import API from '../../../api/API';
import HelpIcon from '@material-ui/icons/Help';
import TutorialStepper from './TutorialStepper';

/* ================ Styling ================ */
const useStyles = makeStyles((theme) => ({
  tutorialButton: {
    position: 'fixed',
    bottom: 0,
    fontSize: 40,
  },
}));

/* ================ Component ================ */

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

const Tutorial = ({ firstVisit }) => {
  //Styling
  const classes = useStyles();

  const [open, setOpen] = useState(firstVisit);

  const handleClose = () => {
    API.updateTutorial().then(setOpen(false)).catch();
  };

  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    if (activeStep < 3) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }
  };

  return (
    <div>
      <IconButton
        className={classes.tutorialButton}
        onClick={() => setOpen(true)}
      >
        <HelpIcon style={{ fontSize: 40 }} />
      </IconButton>
      <Dialog
        fullWidth
        maxWidth='md'
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
      >
        <DialogContent>
          <TutorialStepper activeStep={activeStep} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Close
          </Button>
          <Button
            onClick={handleBack}
            color='primary'
            disabled={activeStep === 0}
          >
            Previous
          </Button>
          <Button
            onClick={handleNext}
            color='primary'
            disabled={activeStep === 3}
          >
            Next
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Tutorial;
