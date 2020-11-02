import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  stepper: {
    width: '100%',
    '& .MuiStepLabel-label': {
      color: '#9e9e9e',
    },
    '& .MuiStepLabel-active': {
      color: theme.palette.text.primary,
    },
  },
  pageContainer: {
    height: '60vh',
    width: '100%',
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center',
  },
  pageTitle: {
    marginBottom: theme.spacing(1),
    width: '100%',
  },
  pageDescription: {
    display: 'flex',
    flexGrow: 1,
    alignItems: 'center',
  },

  pageImage: {
    width: '50%',
    margin: theme.spacing(1),
    alignSelf: 'center',
  },
}));

const TutorialStepper = ({ activeStep }) => {
  const classes = useStyles();

  const steps = getSteps();

  function getSteps() {
    return ['Welcome', 'Editing your Portfolio', 'Your Account', 'Get Started'];
  }

  function getTutorialPage(step) {
    switch (step) {
      case 0:
        return (
          <React.Fragment>
            <Typography variant='h1' className={classes.pageTitle}>
              Welcome to ePortfolio!
            </Typography>
            <div className={classes.pageDescription}>
              <Typography>
                Congratulations on creating your new portfolio, this tutorial
                will provide you with a brief overview of the features of our
                platform and how to make the most of your new portfolio.
              </Typography>
              <img
                alt='Welcome-page'
                className={classes.pageImage}
                src={require('../../../assets/Tutorial/WelcomePage.png')}
              />
            </div>
          </React.Fragment>
        );
      case 1:
        return (
          <React.Fragment>
            <Typography variant='h1' className={classes.pageTitle}>
              Editing your Profile
            </Typography>
            <div className={classes.pageDescription}>
              <Typography>
                Get started with your portfolio by editing what is displayed.
                <br />
                <br />
                You can display your experience, education, key skills, projects
                and even write short reflections!
                <br />
                <br />
                Click the <EditIcon /> next to the content you wish to edit.
              </Typography>
              <img
                alt='Editing-Account-gif'
                className={classes.pageImage}
                src={require('../../../assets/Tutorial/EditPage.gif')}
              />
            </div>
          </React.Fragment>
        );
      case 2:
        return (
          <React.Fragment>
            <Typography variant='h1' className={classes.pageTitle}>
              Update your Account Details
            </Typography>
            <div className={classes.pageDescription}>
              <Typography>
                You can edit account information in the 'My Account' section
                <br />
                <br />
                Here you can update your personal information, contact details
                and information related to your ePortfolio account.
                <br />
                <br />
                Upcoming features include editing your privacy settings.
              </Typography>
              <img
                alt='Editing-PersonalInfo-gif'
                className={classes.pageImage}
                src={require('../../../assets/Tutorial/AccountEditPage.gif')}
              />
            </div>
          </React.Fragment>
        );
      case 3:
        return (
          <React.Fragment>
            <div className={classes.pageDescription}>
              <Typography variant='h1' className={classes.pageTitle}>
                Get Started with your Profile now!
              </Typography>
            </div>
          </React.Fragment>
        );
      default:
        return (
          <React.Fragment>
            <Typography variant='h1' className={classes.pageTitle}>
              Get Started with your Profile now!
            </Typography>
          </React.Fragment>
        );
    }
  }

  return (
    <div className={classes.root}>
      <div className={classes.pageContainer}>
        {getTutorialPage(activeStep)}{' '}
      </div>
      <Stepper className={classes.stepper} activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};

          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
    </div>
  );
};

export default TutorialStepper;
