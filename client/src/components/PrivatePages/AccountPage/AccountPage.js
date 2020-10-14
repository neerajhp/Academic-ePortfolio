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
import AccountInformationForm from './AccountInformationForm/AccountInformationForm';
import PersonalInformationForm from './PersonalInformationForm/PersonalInformationForm';
import ProfileSettingsForm from './ProfileSettingsForm/ProfileSettingsForm';
import Tutorial from '../Tutorial/Tutorial';

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

  card: {
    margin: '0 0 1% 1%',
    width: '100%',
    padding: '5%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    width: '100%',
    marginBottom: theme.spacing(3),
    display: 'flex',
    flexDirection: 'row',
    '&::after': {
      content: '""',
      flex: '1 1',
      borderColor: '#D9D7D7',
      borderBottom: '1px solid',
      margin: 'auto',
    },
  },
  formContainer: {
    width: '100%',
    height: '30%',
    display: 'flex',
    marginBottom: theme.spacing(2),
  },
  form: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  formTitle: {
    width: '25%',
  },

  field: {
    flexGrow: 1,
    '& .MuiFormLabel-root': {
      color: theme.palette.text.primary,
    },
  },
  fieldSubmitted: {
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: theme.palette.secondary.main,
      },
    },
  },
  buttonWrapper: {
    margin: theme.spacing(1),
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
          <Tutorial />
        </div>

        <div className={classes.sectionContainer}>
          <div className={classes.section}>
            <AccountInformationForm user={user} globalClasses={classes} />
            <PersonalInformationForm user={user} globalClasses={classes} />
            <ProfileSettingsForm user={user} globalClasses={classes} />
          </div>
        </div>
      </div>
    );
  }

  return pageContent;
};

export default AccountPage;
