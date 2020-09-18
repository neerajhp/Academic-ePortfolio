import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Formik } from 'formik';
import { Typography, Avatar, Grid, Link, Button } from '@material-ui/core';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import FormikField from '../FormikField';
import validationSchema from './Validation';
import API from '../../utils/API';

/* ================ Styling ================ */

const useStyles = makeStyles((theme) => ({
  //Page container
  root: {
    height: '100vh',
    width: '100vw',
    position: 'fixed',
  },
  banner: {
    position: 'sticky',
    width: '100%',
    height: '20%',
    background: theme.palette.primary.main,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '-1px -9px 15px 10px rgba(0,0,0,0.75);',
  },
  formContainer: {
    width: '100%',
    height: '80%',
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
    background: theme.palette.primary.main,
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
  avatar: { height: '70px', width: '70px', background: '#FFFFFF' },
  icon: { fontSize: 40, color: theme.palette.primary.main },
  submit: {
    backgroundColor: theme.palette.secondary.main,
  },
}));

/* ================ Component ================ */

const SignUpPage = () => {
  const classes = useStyles();

  const [Submitted, setSubmitted] = useState(false);

  return (
    <div className={classes.root}>
      <div className={classes.banner}>
        <Typography variant='h1'>Welcome to ePortfolio</Typography>
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
            <Avatar className={classes.avatar}>
              <MenuBookIcon className={classes.icon} />
            </Avatar>

            <Typography variant='h2'>Sign Up</Typography>
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
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormikField
                        label='LastName'
                        formikProps={formikProps}
                        formikKey='lastName'
                        required
                      />
                    </Grid>
                  </Grid>
                  <FormikField
                    label='Email'
                    formikProps={formikProps}
                    formikKey='email'
                    required
                  />
                  <FormikField
                    label='Password'
                    formikProps={formikProps}
                    formikKey='password'
                    type='password'
                    required
                  />
                  <FormikField
                    label='Confirm Password'
                    formikProps={formikProps}
                    formikKey='confirmPassword'
                    type='password'
                    required
                  />

                  <Button
                    type='Submit'
                    fullWidth
                    variant='contained'
                    className={classes.submit}
                    disabled={!formikProps.isValid}
                  >
                    <Typography>Sign Up</Typography>
                  </Button>
                  <Grid container>
                    <Grid item xs>
                      <Link href='./' variant='body2' color='inherit'>
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
