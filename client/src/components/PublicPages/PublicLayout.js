import React from 'react';
import { Switch, Route, Link, Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import PublicProfilePage from './ProfilePage/PublicProfilePage';
import ProfilePage from '../PrivatePages/ProfilePage/ProfilePage';
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

const PublicLayout = ({ match }) => {
  // Styling
  const classes = useStyles();

  return (
    <div className={classes.bkgContainer}>
      <AppBar position='fixed'>
        <Toolbar>
          <Link to='/home/landing' className={classes.link}>
            <Typography
              variant='h3'
              color='textSecondary'
              className={classes.title}
            >
              ePortfolio
            </Typography>
          </Link>
        </Toolbar>
      </AppBar>
      <div className={classes.banner}> </div>

      <div className={classes.contentContainer}>
        <Switch>
          <Route exact path='/view'>
            <Redirect to='/home/search' />
          </Route>
          <Route
            path={`/view/:userName`}
            render={(props) => <ProfilePage {...props} owner={false} />}
          />
        </Switch>
      </div>
    </div>
  );
};

export default PublicLayout;
