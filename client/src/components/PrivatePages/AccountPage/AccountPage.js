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
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns'; // choose your lib
import FaceIcon from '@material-ui/icons/Face';
import AccountInformationForm from './AccountInformationForm/AccountInformationForm';
import PersonalInformationForm from './PersonalInformationForm/PersonalInformationForm';
import ProfileSettingsForm from './ProfileSettingsForm/ProfileSettingsForm';

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
    API.getUserInfo().then(({ data }) => {
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
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
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
              <AccountInformationForm user={user} />
              <PersonalInformationForm user={user} />
              <ProfileSettingsForm user={user} />
            </div>
          </div>
        </div>
      </MuiPickersUtilsProvider>
    );
  }

  return pageContent;
};

export default AccountPage;
