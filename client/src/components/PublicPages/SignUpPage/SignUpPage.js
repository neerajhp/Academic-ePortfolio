import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Formik } from 'formik';
import { Typography, Avatar, Grid, Link, Button } from '@material-ui/core';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import FormikField from '../../utils/FormikField';
import validationSchema from './Validation';
import API from '../../../api/API';
import Background from '../../../assets/bkg.svg';

/* ================ Styling ================ */

const useStyles = makeStyles((theme) => ({
  //Page container
  root: {
    height: '100vh',
    width: '100vw',
    position: 'fixed',
    backgroundImage: `url(${Background})`,
    backgroundSize: 'cover',
  },
  banner: {
    position: 'sticky',
    width: '100%',
    height: '40%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    width: '100%',
    height: '30%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  formPaper: {
    width: '40%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '2%',
  },
  successBoard: {
    width: '25%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '2%',
    background: theme.palette.primary.main,
    '& >*': { margin: '1em' },
  },
  inputField: {
    '& .MuiInputBase-input': {
      color: theme.palette.text.secondary,
    },
  },
  submit: {
    backgroundColor: theme.palette.secondary.main,
    '&:hover': {
      backgroundColor: theme.palette.secondary.light,
      borderColor: theme.palette.secondary.light,
      boxShadow: 'none',
    },
  },
}));

/* ================ Component ================ */

const SignUpPage = () => {
  const classes = useStyles();

  const [Submitted, setSubmitted] = useState(false);

  return (
    <div className={classes.root}>
      <div className={classes.banner}>
        <Typography variant='h1' color='textSecondary' display='flex'>
          Create Your New Portfolio
        </Typography>
      </div>
      <div className={classes.formContainer}>
        {Submitted && (
          <div className={classes.successBoard}>
            <Avatar className={classes.avatar}>
              <ThumbUpIcon className={classes.icon} />
            </Avatar>
            <Typography variant='h2'>Congratulations!</Typography>
            <Typography>
              You now have an academic ePorfolio, login and start editing!
            </Typography>
            <Button
              type='Submit'
              fullWidth
              variant='contained'
              className={classes.submit}
            >
              <Link href='./' variant='body2' color='inherit'>
                Click here to login
              </Link>
            </Button>
          </div>
        )}

        {!Submitted && (
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
                      <Link
                        href='./login'
                        variant='body2'
                        color='textSecondary'
                      >
                        Log In
                      </Link>
                    </Grid>
                  </Grid>
                </form>
              )}
            </Formik>
          </div>
        )}
      </div>
    </div>
  );
};

export default SignUpPage;
