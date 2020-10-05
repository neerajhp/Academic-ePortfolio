import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { Switch, Route, Redirect } from 'react-router-dom';
import { Button, Link, Typography } from '@material-ui/core';
import Background from '../../assets/bkg-alt.jpg';
import LoginPage from './LoginPage/LoginPage';
import SignupPage from './SignUpPage/SignUpPage';
import LandingPage from './LandingPage/LandingPage';

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
      height: '100vh',
      width: '100vw',
      display: 'flex',
      flexDirection: 'column',
      alignContent: 'center',
      justifyContent: 'center',
      paddingLeft: theme.spacing(5),
    },
    banner: {
      color: theme.palette.text.secondary,
    },
    contentContainer: {},
    formContainer: {
      paddingLeft: theme.spacing(3),
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
      color: theme.palette.text.secondary,
      backgroundColor: theme.palette.secondary.main,
      '&:hover': {
        backgroundColor: theme.palette.secondary.light,
        borderColor: theme.palette.secondary.light,
        boxShadow: 'none',
      },
    },

    login: {
      right: '2%',
    },
  };
});

/* ================ Component ================ */

const PublicLayout = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {/* <div className={classes.contentContainer}> */}
      <Switch>
        <Route
          exact
          path='/home/landing'
          render={(props) => <LandingPage {...props} globalClasses={classes} />}
        />

        <Route
          exact
          path='/home/login'
          render={(props) => <LoginPage {...props} globalClasses={classes} />}
        />
        <Route
          exact
          path='/home/signup'
          render={(props) => <SignupPage {...props} globalClasses={classes} />}
        />
      </Switch>
      {/* </div> */}
    </div>
  );
};

export default PublicLayout;
