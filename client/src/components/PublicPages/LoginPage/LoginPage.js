import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Formik } from 'formik';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  Grid,
  Link,
  Typography,
  FormControlLabel,
  Checkbox,
} from '@material-ui/core';
import { useAuth } from '../../../context/auth';
import API from '../../../api/API';
import FormikField from '../../utils/FormikField';
import validationSchema from './Validation';

const useStyles = makeStyles((theme) => {
  return {
    rememberMe: {
      color: theme.palette.text.secondary,
    },
  };
});

/* ================ Component ================ */

const LoginPage = ({ globalClasses }) => {
  const classes = useStyles();

  const [isLoggedIn, setLoggedIn] = useState(false);
  const { setAuthTokens } = useAuth();

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
                    control={<Checkbox value='remember' color='#FFFFFF' />}
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
                  <Grid container className={globalClasses.options}>
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
                  <Grid container className={globalClasses.options}>
                    <Grid item>
                      <Link
                          href="./reset"
                          variant="body2"
                          color="textSecondary"
                      >
                        {"Forget your password?Reset"}
                      </Link>
                    </Grid>
                  </Grid>
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
