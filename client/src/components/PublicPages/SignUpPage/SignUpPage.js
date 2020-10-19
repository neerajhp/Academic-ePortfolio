import React, { useState } from 'react';
import { Formik } from 'formik';
import { Typography, Avatar, Grid, Link, Button } from '@material-ui/core';
import MailIcon from '@material-ui/icons/Mail';
import FormikField from '../../utils/FormikField';
import validationSchema from './Validation';
import API from '../../../api/API';

/* ================ Component ================ */

const SignUpPage = ({ globalClasses }) => {
  const classes = globalClasses;

  const [Submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState(
    'No email has been provided. Return to the signup page.'
  );
  const [resendMessage, setResendMessage] = useState(null);
  const [resendError, setResendError] = useState(null);

  const resendEmail = (email) => {
    API.resendToken(email)
      .then((res) => {
        if (res.status === 200) {
          setResendMessage(res.data);
        }
      })
      .catch((err) => {
        console.log(err.response.data);
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
          <Typography variant='h2'>Congratulations!</Typography>
          <Typography variant='h4' align='center'>
            You're on your way to getting started with your own academic
            ePorfolio!
          </Typography>
          <Typography variant='h5' align='center'>
            An email has been sent to {email}
          </Typography>
          <Typography variant='h4' align='center'>
            Verify your email and then{' '}
            <Link href='./login' variant='h4' color='textSecondary'>
              Log In!
            </Link>
          </Typography>
          <Button
            fullWidth
            variant='contained'
            className={classes.submit}
            color='primary'
            onClick={() => resendEmail(email)}
          >
            <Typography>
              Didn't recieve a token? Click Here to Resend.
            </Typography>
          </Button>
          {resendMessage && (
            <Typography color='secondary'>Email has been resent</Typography>
          )}
          {resendError && (
            <React.Fragment>
              <Typography color='error'>{resendError}</Typography>
              <Typography>
                <Link href='./landing' color='textSecondary'>
                  Click here to begin process agian{' '}
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
          Create your new Portfolio
        </Typography>
      </div>
      <div className={classes.formContainer}>
        <div className={classes.formPaper}>
          <Formik
            initialValues={{
              firstName: '',
              lastName: '',
              email: '',
              password: '',
              confirmPassword: '',
            }}
            onSubmit={(values, actions) => {
              API.userSignup({
                firstName: values.firstName,
                lastName: values.lastName,
                email: values.email,
                password: values.password,
              })
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
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <FormikField
                      label='FirstName'
                      formikProps={formikProps}
                      formikKey='firstName'
                      required
                      className={classes.inputField}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormikField
                      label='LastName'
                      formikProps={formikProps}
                      formikKey='lastName'
                      required
                      className={classes.inputField}
                    />
                  </Grid>
                </Grid>
                <FormikField
                  label='Email'
                  formikProps={formikProps}
                  formikKey='email'
                  required
                  className={classes.inputField}
                />
                <FormikField
                  label='Password'
                  formikProps={formikProps}
                  formikKey='password'
                  type='password'
                  required
                  className={classes.inputField}
                />
                <FormikField
                  label='Confirm Password'
                  formikProps={formikProps}
                  formikKey='confirmPassword'
                  type='password'
                  required
                  className={classes.inputField}
                />

                <Button
                  type='Submit'
                  fullWidth
                  variant='contained'
                  className={classes.submit}
                  disabled={!formikProps.isValid}
                  color='primary'
                >
                  <Typography>Sign Up</Typography>
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href='./login' variant='body2' color='textSecondary'>
                      Log In
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

export default SignUpPage;
