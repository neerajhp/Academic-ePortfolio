import React from 'react';
import { useAuth } from '../../context/auth';
import { Switch, Route, Redirect, Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Button, Typography } from '@material-ui/core';
import ProfilePage from './ProfilePage/ProfilePage';
import AccountPage from './AccountPage/AccountPage';
import Background from '../../assets/bkg-private.svg';

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
  bkgContainer: {
    width: '100vw',
    height: '100vh',
    zIndex: -1,
    position: 'fixed',
    backgroundImage: `url(${Background})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
    overflowY: 'auto',
    overflowX: 'hidden',
  },
  contentContainer: {
    zIndex: 10,
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
    <div className={classes.bkgContainer}>
      <AppBar position='fixed'>
        <Toolbar>
          <Typography variant='h3' className={classes.title}>
            ePortfolio
          </Typography>
          <Link to='./myprofile' className={classes.link}>
            <Typography color='textSecondary'>My Profile</Typography>
          </Link>
          <Link to='./myaccount' className={classes.link}>
            <Typography color='textSecondary'>My Account</Typography>
          </Link>
          <Button color='inherit' onClick={logOut}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <div className={classes.banner}> </div>

      <div className={classes.contentContainer}>
        <Switch>
          <Route exact path='/'>
            <Redirect to='/myprofile' />
          </Route>
          <Route exact path='/myprofile' component={ProfilePage} />
          <Route exact path='/myaccount' component={AccountPage} />
        </Switch>
      </div>
    </div>
  );
};

export default PrivateLayout;
