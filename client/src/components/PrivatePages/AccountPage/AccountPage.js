import React, { useState, useEffect } from 'react';
import API from '../../../api/API';
import { makeStyles } from '@material-ui/core/styles';
import {
  CircularProgress,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@material-ui/core';
import FaceIcon from '@material-ui/icons/Face';
import AccountForm from './AccountForm';

/* ================ Styling ================ */
const useStyles = makeStyles((theme) => ({
  //Page container

  loading: {
    height: '90vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  navSection: {
    position: 'fixed',
    width: '25vw',
    marginTop: '1%',
    zIndex: '100',
  },
  container: {
    maxWidth: '100%',
    overflowX: 'hidden',
  },
  navBar: {
    marginLeft: '0.5em',
    background: theme.palette.primary.main,
    color: theme.palette.text.secondary,
  },
  navBarIcon: {
    fontSize: 30,
    color: '#FFFFFF',
  },
  sectionContainer: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'row',
    zIndex: '-1',
    marginTop: '1%',
  },
  section: {
    width: '100vw',
    minHeight: '100vh',
    display: 'flex',
    flexGrow: 1,
    paddingLeft: '25vw',
    paddingRight: '0.5em',
    flexFlow: 'row wrap',
    alignItems: 'stretch',
    transition: 'all 700ms',
  },
}));

/* ================ Component ================ */

const AccountPage = () => {
  // Styling
  const classes = useStyles();
  const [isLoading, setLoading] = useState(true);

  //Profile Information
  //!! NEED TO MANAGE ERROR MESSAGE AT SOME POINT
  const [user, setUser] = useState(null);

  useEffect(() => {
    API.getUserProfile().then(({ data }) => {
      setUser(data);
      setLoading(false);
    });
  }, []);

  //If profile hasn't been fetched yet
  var pageContent;
  if (isLoading) {
    pageContent = (
      <div className={classes.loading}>
        <CircularProgress />
        <Typography variant='h2'>Fetching User Data</Typography>
      </div>
    );
  } else {
    pageContent = (
      <div className={classes.container}>
        <div className={classes.navSection}>
          <Paper className={classes.navBar}>
            <List>
              <ListItem button>
                <ListItemIcon>
                  <FaceIcon className={classes.navBarIcon} />
                </ListItemIcon>
                <ListItemText primary='My Information'></ListItemText>
              </ListItem>
            </List>
          </Paper>
        </div>

        <div className={classes.sectionContainer}>
          <div className={classes.section}>
            <AccountForm user={user} />
          </div>
        </div>
      </div>
    );
  }

  return pageContent;
};

export default AccountPage;
