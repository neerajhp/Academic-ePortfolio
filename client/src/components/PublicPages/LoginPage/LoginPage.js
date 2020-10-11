import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Formik } from 'formik';
import { makeStyles } from '@material-ui/core/styles';
import {
  Divider,
  Button,
  Grid,
  Link,
  Typography,
  FormControlLabel,
  Checkbox,
} from '@material-ui/core';
import { authenticate } from '../../../helpers/auth';
import API from '../../../api/API';
import FormikField from '../../utils/FormikField';
import validationSchema from './Validation';
import googleLogo from '../../../assets/Forms/googleLogo.svg';
import githubLogo from '../../../assets/Forms/githubLogo.svg';

const useStyles = makeStyles((theme) => {
  return {
    rememberMe: {
      color: theme.palette.text.secondary,
    },
    loginDivider: {
      margin: `${theme.spacing(2)}px 0`,
      backgroundColor: '#FFFFFF',
    },
    signupButton: {
      margin: `${theme.spacing(1)}px 0`,
      color: theme.palette.text.secondary,
      backgroundColor: theme.palette.secondary.main,
    },
    googleButton: {
      marginTop: `${theme.spacing(1)}px`,
      color: '#FFFFFF',
      backgroundColor: '#4285F4',
      '&:hover': {
        color: '#FFFFFF',
        backgroundColor: '#1A4d94',
      },
    },
    gitHubButton: {
      marginTop: `${theme.spacing(1)}px`,
      color: '#FFFFFF',
      backgroundColor: '#313131',
      '&:hover': {
        color: '#313131',
        backgroundColor: '#FFFFFF',
      },
      '&:hover img': {
        filter: 'invert(1)',
      },
    },
    buttonLogo: {
      width: `${theme.spacing(3)}px`,
      height: `${theme.spacing(3)}px`,
    },
  };
});

/* ================ Component ================ */

const LoginPage = ({ globalClasses }) => {
  const classes = useStyles();

  const [isLoggedIn, setLoggedIn] = useState(false);

  return (
    <React.Fragment>
      <div className={globalClasses.banner}>
        <Typography variant='h1'>Login to your Profile</Typography>
      </div>
      <div className={globalClasses.formContainer}>
        {isLoggedIn && <Redirect to='/' />}
        {!isLoggedIn && (
          <div className={globalClasses.formPaper}>
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
                      authenticate(result.data.token);
                      setLoggedIn(true);
                    }
                  })
                  .catch((err) => {
                    console.log(err);
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
                  className={globalClasses.form}
                  onSubmit={formikProps.handleSubmit}
                >
                  <FormikField
                    label='Email'
                    formikProps={formikProps}
                    formikKey='email'
                    required
                    className={globalClasses.inputField}
                  />
                  <FormikField
                    label='Password'
                    formikProps={formikProps}
                    formikKey='password'
                    type='password'
                    required
                    className={globalClasses.inputField}
                  />
                  <FormControlLabel
                    className={classes.rememberMe}
                    control={<Checkbox value='remember' color='default' />}
                    label='Remember me'
                  />

                  <Button
                    type='Submit'
                    fullWidth
                    variant='contained'
                    className={globalClasses.submit}
                    disabled={!formikProps.isValid}
                  >
                    <Typography>Log In</Typography>
                  </Button>

                  <Divider className={classes.loginDivider} />
                  <Link href='./signup' underline='none'>
                    <Button
                      fullWidth
                      variant='contained'
                      className={globalClasses.submit}
                    >
                      Signup for a Portfolio
                    </Button>
                  </Link>
                  <Button
                    fullWidth
                    variant='contained'
                    className={classes.googleButton}
                    startIcon={
                      <img src={googleLogo} className={classes.buttonLogo} />
                    }
                  >
                    Sign in with Google
                  </Button>
                  <Button
                    fullWidth
                    variant='contained'
                    className={classes.gitHubButton}
                    startIcon={
                      <img src={githubLogo} className={classes.buttonLogo} />
                    }
                  >
                    Sign in with GitHub
                  </Button>
                </form>
              )}
            </Formik>
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default LoginPage;
