import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Formik } from 'formik';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Grid, Link, Typography } from '@material-ui/core';
import { useAuth } from '../../context/auth';
import API from '../../utils/API';
import FormikField from '../FormikField';
import validationSchema from './Validation';
import Background from '../../image/bg.png';

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
    width: '30%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '2em',
  },
  background: {
    width: '100%',
    height: '100%',
    display: 'flex',
    backgroundSize: 'cover',
  },
  avatar: { height: '70px', width: '70px', background: '#FFFFFF' },
  icon: { fontSize: 40, color: theme.palette.primary.main },
  submit: {
    backgroundColor: theme.palette.secondary.main,
  },
}));

/* ================ Component ================ */

const LoginPage = () => {
  const classes = useStyles();

  const [isLoggedIn, setLoggedIn] = useState(false);
  const { setAuthTokens } = useAuth();

  return (
    <div
      className='background'
      style={{ backgroundImage: `url(${Background})` }}
    >
      <div className={classes.root}>
        <div className={classes.banner}>
          <Typography variant='h1' color='textSecondary'>
            Login to Your Portfolio
          </Typography>
        </div>
        <div className={classes.formContainer}>
          {isLoggedIn && <Redirect to='/profile' />}
          {!isLoggedIn && (
            <div className={classes.formPaper}>
              <Formik
                initialValues={{
                  email: '',
                  password: '',
                }}
                onSubmit={(values, actions) => {
                  // Submit login information
                  API.userLogin({
                    email: values.email,
                    password: values.password,
                  })
                    .then((result) => {
                      if (result.status === 200) {
                        //Login information matches records
                        setAuthTokens(result.data.token);
                        setLoggedIn(true);
                      }
                    })
                    .catch((err) => {
                      actions.setErrors({
                        email: err.response.data,
                        password: err.response.data,
                      });
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
                    />
                    <FormikField
                      label='Password'
                      formikProps={formikProps}
                      formikKey='password'
                      type='password'
                      required
                    />

                    <Button
                      type='Submit'
                      fullWidth
                      variant='contained'
                      className={classes.submit}
                      disabled={!formikProps.isValid}
                      color='primary'
                    >
                      <Typography>Log In</Typography>
                    </Button>
                    <Grid container className={classes.options}>
                      <Grid item>
                        <Link href='./signup' variant='body2' color='white'>
                          {"Don't have an account? Sign Up"}
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
      <img alt='background' src={Background} width='100%' height='100%' />
    </div>
  );
};

export default LoginPage;
