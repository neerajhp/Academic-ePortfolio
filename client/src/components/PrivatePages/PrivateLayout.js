import React from 'react';
import { Switch, useHistory, Redirect, Link, Route } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Button, Typography } from '@material-ui/core';
import { logout } from '../../helpers/auth';
import PrivateRoute from '../Routes/PrivateRoute';
import ProfilePage from '../CommonPages/ProfilePage/ProfilePage';
import AccountPage from './AccountPage/AccountPage';
import Background from '../../assets/Background/bkg-private.svg';

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

const PrivateLayout = ({ match }) => {
  const history = useHistory();

  // Styling
  const classes = useStyles();

  return (
    <div className={classes.bkgContainer}>
      <AppBar position='fixed'>
        <Toolbar>
          <Typography variant='h3' className={classes.title}>
            ePortfolio
          </Typography>
          <Link to='/myprofile' className={classes.link}>
            <Typography color='textSecondary'>My Profile</Typography>
          </Link>
          <Link to='/myaccount' className={classes.link}>
            <Typography color='textSecondary'>My Account</Typography>
          </Link>
          <Button
            color='inherit'
            onClick={() => {
              logout(() => history.push('/home/login'));
            }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <div className={classes.banner}> </div>

      <div className={classes.contentContainer}>
        <Switch>
          <PrivateRoute exact path='/myprofile' component={ProfilePage} />
          <PrivateRoute exact path='/myaccount' component={AccountPage} />
          <Route
            path='/view/:userId'
            render={(props) => <ProfilePage {...props} isOwner={false} />}
          />
          <PrivateRoute path='/'>
            <Redirect to='/myprofile' />
          </PrivateRoute>
        </Switch>
      </div>
    </div>
  );
};

export default PrivateLayout;
