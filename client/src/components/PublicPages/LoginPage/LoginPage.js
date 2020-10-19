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
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import API from '../../../api/API';
import FormikField from '../../utils/FormikField';
import validationSchema from './Validation';
import googleLogo from '../../../assets/Forms/googleLogo.svg';
import FacebookIcon from '@material-ui/icons/Facebook';

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
      backgroundColor: '#4168b1',
      '&:hover': {
        backgroundColor: '#3c5fa2',
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
  const [resendRqd, setResendRqd] = useState(false);
  const [resendMessage, setResendMessage] = useState('');

  const sendGoogleToken = (idToken) => {
    API.googleLogin(idToken)
      .then((res) => {
        console.log('Got it');
        console.log(res.data);
        authenticate(res.data.token);
        setLoggedIn(true);
      })
      .catch((err) => {
        console.log('GOOGLE SIGNIN ERROR', err.response);
      });
  };

  const responseGoogle = (response) => {
    // console.log(response);
    sendGoogleToken(response.tokenId);
  };

  const sendFacebookToken = (userID, accessToken) => {
    API.facebookLogin(userID, accessToken)
      .then((res) => {
        console.log(res.data);
        authenticate(res.data.token);
        setLoggedIn(true);
      })
      .catch((error) => {
        console.log('FACEBOOK SIGNIN ERROR', error.response);
      });
  };

  const responseFacebook = (response) => {
    sendFacebookToken(response.userID, response.accessToken);
  };

  const resendEmail = (email) => {
    API.resendToken(email)
      .then((res) => {
        if (res.status === 200) {
          setResendMessage(res.data);
        }
        setResendRqd(false);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

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
                    if (err.response.status === 401) {
                      setResendRqd(true);
                      actions.setErrors({
                        email: `${err.response.data} Or click below to resend a link to your email.`,
                      });
                    } else {
                      actions.setErrors({
                        email: err.response.data,
                        password: err.response.data,
                      });
                    }
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
                    disabled={resendRqd}
                    className={globalClasses.inputField}
                  />
                  <FormControlLabel
                    className={classes.rememberMe}
                    control={<Checkbox value='remember' color='default' />}
                    label='Remember me'
                  />

                  {!resendRqd && (
                    <Button
                      type='Submit'
                      fullWidth
                      variant='contained'
                      className={globalClasses.submit}
                      disabled={!formikProps.isValid}
                    >
                      <Typography>Log In</Typography>
                    </Button>
                  )}
                  {resendRqd && (
                    <Button
                      fullWidth
                      variant='contained'
                      className={globalClasses.submit}
                      onClick={() => resendEmail(formikProps.values.email)}
                    >
                      <Typography>Resend Token</Typography>
                    </Button>
                  )}
                  {resendMessage && (
                    <Typography variant='h4' color='secondary'>
                      {resendMessage}
                    </Typography>
                  )}

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
                  <Grid container spacing={1}>
                    <Grid item xs={6}>
                      <GoogleLogin
                        clientId={`${process.env.REACT_APP_GOOGLE_CLIENT}`}
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                        cookiePolicy={'single_host_origin'}
                        render={(renderProps) => (
                          <Button
                            fullWidth
                            variant='contained'
                            className={classes.googleButton}
                            startIcon={
                              <img
                                alt='google-logo'
                                src={googleLogo}
                                className={classes.buttonLogo}
                              />
                            }
                            onClick={renderProps.onClick}
                            disabled={renderProps.disabled}
                          >
                            Sign in with Google
                          </Button>
                        )}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <FacebookLogin
                        appId={`${process.env.REACT_APP_FACEBOOK_CLIENT}`}
                        autoLoad={false}
                        callback={responseFacebook}
                        render={(renderProps) => (
                          <Button
                            fullWidth
                            variant='contained'
                            className={classes.gitHubButton}
                            startIcon={
                              <FacebookIcon className={classes.buttonLogo} />
                            }
                            onClick={renderProps.onClick}
                          >
                            Sign in with Facebook
                          </Button>
                        )}
                      />
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
