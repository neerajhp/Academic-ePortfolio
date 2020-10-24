import React, { useState } from 'react';
import { Formik } from 'formik';
import { Typography, Avatar, Grid, Link, Button } from '@material-ui/core';
import MailIcon from '@material-ui/icons/Mail';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormikField from '../../utils/FormikField';
import { validationSchema } from './Validation';
import API from '../../../api/API';

/* ================ Component ================ */

const ResetPage = ({ globalClasses }) => {
  const classes = globalClasses;

  const [Submitted, setSubmitted] = useState(false);
  const [resubmitting, setResubmitting] = useState(false);
  const [email, setEmail] = useState('');
  const [resendMessage, setResendMessage] = useState(false);
  const [resendError, setResendError] = useState(false);

  const resendEmail = (email) => {
    setResubmitting(true);
    API.emailresetPassword(email)
      .then((res) => {
        setResubmitting(false);
        setResendMessage(true);
      })
      .catch((err) => {
        console.log(err);
        setResendError(err.response.data);
      });
  };

  if (Submitted) {
    return (
      <div className={classes.formContainer}>
        <div className={classes.successBoard}>
          <Avatar className={classes.avatar}>
            <MailIcon className={classes.icon} />
          </Avatar>
          <Typography variant='h5' align='center'>
            An email has been sent to <br />
            {email}
          </Typography>
          <Typography variant='h4' align='center'>
            Click the link in your email to reset your password
          </Typography>

          <div className={globalClasses.buttonWrapper}>
            <Button
              type='Submit'
              fullWidth
              variant='contained'
              className={classes.submit}
              disabled={resubmitting}
              color='secondary'
              onClick={() => resendEmail(email)}
            >
              <Typography>
                Didn't recieve an email? Click here to resend.
              </Typography>
            </Button>
            {resubmitting && (
              <CircularProgress
                size={24}
                className={globalClasses.buttonProgress}
              />
            )}
          </div>
          {resendMessage && (
            <Typography color='secondary'>Email has been resent</Typography>
          )}
          {resendError && (
            <React.Fragment>
              <Typography color='error'>{resendError}</Typography>
              <Typography>
                <Link href='./signup' color='textSecondary'>
                  Click here to signup{' '}
                </Link>
              </Typography>
            </React.Fragment>
          )}
        </div>
      </div>
    );
  }

  return (
    <React.Fragment>
      <div className={globalClasses.banner}>
        <Typography variant='h1' color='textSecondary'>
          Reset your new Portfolio
        </Typography>
      </div>
      <div className={classes.formContainer}>
        <div className={classes.formPaper}>
          <Formik
            initialValues={{
              email: '',
            }}
            onSubmit={(values, actions) => {
              API.emailresetPassword(values.email)
                .then((res) => {
                  setSubmitted(true);
                  setEmail(values.email);
                })
                .catch((err) => {
                  actions.setFieldError('email', err.response.data);
                  actions.setSubmitting(false);
                });
            }}
            validationSchema={validationSchema}
          >
            {(formikProps) => (
              <form
                className={classes.form}
                onSubmit={formikProps.handleSubmit}
              >
                <FormikField
                  label='Email'
                  formikProps={formikProps}
                  formikKey='email'
                  required
                  className={classes.inputField}
                />

                <div className={globalClasses.buttonWrapper}>
                  <Button
                    type='Submit'
                    fullWidth
                    variant='contained'
                    disabled={!formikProps.isValid || formikProps.isSubmitting}
                    color='secondary'
                  >
                    <Typography>Reset</Typography>
                  </Button>
                  {formikProps.isSubmitting && (
                    <CircularProgress
                      size={24}
                      className={globalClasses.buttonProgress}
                    />
                  )}
                </div>
                <Grid container>
                  <Grid item xs>
                    <Link href='./login' variant='body2' color='textSecondary'>
                      Back to Log In
                    </Link>
                  </Grid>
                </Grid>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ResetPage;
