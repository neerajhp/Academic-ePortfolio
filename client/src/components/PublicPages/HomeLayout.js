import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { Switch, Route, Redirect } from 'react-router-dom';
import Background from '../../assets/Background/bkg-alt.jpg';
import LoginPage from './LoginPage/LoginPage';
import ResetPage from './ResetPage/ResetPage';
import ResetPasswordPage from './ResetPage/ResetPasswordPage';
import SignupPage from './SignUpPage/SignUpPage';
import LandingPage from './LandingPage/LandingPage';
import AccountVerifiedPage from './AccountVerifiedPage/AccountVerifiedPage.js';
import SearchPage from './SearchPage/SearchPage';
import { Fade } from '@material-ui/core';

/* ================ Styling ================ */
const useStyles = makeStyles((theme) => {
  return {
    //Page container
    root: {
      height: '100vh',
      width: '100vw',
      position: 'fixed',
      backgroundImage: `url(${Background})`,
      backgroundSize: 'cover',

      display: 'flex',
      flexDirection: 'column',
      alignContent: 'center',
      justifyContent: 'center',
      paddingLeft: theme.spacing(5),
    },
    banner: {
      color: theme.palette.text.secondary,
    },
    form: { width: '100%' },
    formContainer: {
      paddingLeft: theme.spacing(3),
    },
    formPaper: {
      width: '40%',
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
      '& .MuiFormLabel-root.Mui-focused': {
        color: theme.palette.text.secondary,
      },
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: '#FFFFFF',
        },
        '&.Mui-focused fieldset': {
          borderColor: '#FFFFFF',
        },
      },
    },
    submit: {
      color: theme.palette.text.secondary,
      backgroundColor: theme.palette.secondary.main,
      '&:hover': {
        backgroundColor: theme.palette.secondary.light,
        borderColor: theme.palette.secondary.light,
        boxShadow: 'none',
      },
    },

    landingButtonContainer: {
      marginTop: theme.spacing(2),
      display: 'flex',
      width: '40vw',
      justifyContent: 'space-around',
    },
    landingButton: {
      marginRight: theme.spacing(2) + 'px',
      color: theme.palette.text.secondary,
      backgroundColor: theme.palette.secondary.main,
      '&:hover': {
        backgroundColor: theme.palette.secondary.light,
        borderColor: theme.palette.secondary.light,
        boxShadow: 'none',
      },
    },
    successBoard: {
      color: theme.palette.text.secondary,
      width: '30%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '2%',
      '& >*': { margin: '1em' },
    },
    buttonWrapper: {
      position: 'relative',
      alignSelf: 'flex-end',
    },
    buttonProgress: {
      color: theme.palette.secondary.main,
      position: 'absolute',
      top: '50%',
      left: '50%',
      marginTop: -12,
      marginLeft: -12,
    },
  };
});

/* ================ Component ================ */

const HomeLayout = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Fade>
        <Switch>
          <Route exact path='/home'>
            <Redirect to='/home/landing' />
          </Route>
          <Route
            exact
            path='/home/landing'
            render={(props) => (
              <LandingPage {...props} globalClasses={classes} />
            )}
          />

          <Route
            exact
            path='/home/login'
            render={(props) => <LoginPage {...props} globalClasses={classes} />}
          />
          <Route
            exact
            path='/home/signup'
            render={(props) => (
              <SignupPage {...props} globalClasses={classes} />
            )}
          />
          <Route
            exact
            path='/home/reset'
            render={(props) => <ResetPage {...props} globalClasses={classes} />}
          />
          <Route
            exact
            path='/home/reset/:token'
            render={(props) => (
              <ResetPasswordPage {...props} globalClasses={classes} />
            )}
          />
          <Route
            exact
            path='/home/signup/confirmation/:token'
            render={(props) => (
              <AccountVerifiedPage {...props} globalClasses={classes} />
            )}
          />
          <Route
            exact
            path='/home/search'
            render={(props) => (
              <SearchPage {...props} globalClasses={classes} />
            )}
          />
        </Switch>
      </Fade>
    </div>
  );
};

export default HomeLayout;
