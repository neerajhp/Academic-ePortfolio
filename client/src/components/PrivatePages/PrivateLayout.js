import React from 'react';
import { useAuth } from '../../context/auth';
import { Switch, Route, Redirect, Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Button, Typography } from '@material-ui/core';
import ProfilePage from './ProfilePage/ProfilePage';
import AccountPage from './AccountPage/AccountPage';

/* ================ Styling ================ */
const useStyles = makeStyles((theme) => ({
  //Page container
  title: {
    marginLeft: '5%',
    flexGrow: 1,
  },
  banner: theme.mixins.toolbar,
  link: {
    textDecoration: 'none',
    marginRight: theme.spacing(2),
  },
}));

/* ================ Component ================ */

const PrivateLayout = () => {
  // Styling
  const classes = useStyles();

  //Authentication Context
  const { setAuthTokens } = useAuth();

  //Log Out
  function logOut() {
    //Clears browser storage
    setAuthTokens(null);
  }

  return (
    <div>
      <AppBar position='fixed'>
        <Toolbar>
          <Typography variant='h3' className={classes.title}>
            ePortfolio
          </Typography>
          <Link to='./profile' className={classes.link}>
            <Typography color='textSecondary'>My Profile</Typography>
          </Link>
          <Link to='./account' className={classes.link}>
            <Typography color='textSecondary'>My Account</Typography>
          </Link>
          <Button color='inherit' onClick={logOut}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <div className={classes.banner}> </div>
      <Switch>
        <Route exact path='/'>
          <Redirect to='/profile' />
        </Route>
        <Route exact path='/profile' component={ProfilePage} />
        <Route exact path='/account' component={AccountPage} />
      </Switch>
    </div>
  );
};

export default PrivateLayout;
