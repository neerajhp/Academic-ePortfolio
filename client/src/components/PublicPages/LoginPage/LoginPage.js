import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Formik } from 'formik';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Grid, Link, Typography } from '@material-ui/core';
import { useAuth } from '../../../context/auth';
import API from '../../../api/API';
import FormikField from '../../utils/FormikField';
import validationSchema from './Validation';
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
    width: '30%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '2em',
  },

  avatar: { height: '70px', width: '70px', background: '#FFFFFF' },
  icon: { fontSize: 40, color: theme.palette.primary.main },
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

const LoginPage = () => {
  const classes = useStyles();

  const [isLoggedIn, setLoggedIn] = useState(false);
  const { setAuthTokens } = useAuth();

  return (
    <div className={classes.root}>
      <div className={classes.banner}>
        <Typography variant='h1' color='textSecondary'>
          Login to Your Portfolio
        </Typography>
      </div>
      <div className={classes.formContainer}>
        {isLoggedIn && <Redirect to='/' />}
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
                      <Link
                        href='./signup'
                        variant='body2'
                        color='textSecondary'
                      >
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
  );
};

export default LoginPage;
