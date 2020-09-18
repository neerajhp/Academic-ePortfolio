import React, { useState, useEffect } from 'react';
import API from '../../utils/API';
import { useAuth } from '../../context/auth';
import { makeStyles } from '@material-ui/core/styles';
import {
  CircularProgress,
  Paper,
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  Typography,
  Divider,
} from '@material-ui/core';
import AssignmentIcon from '@material-ui/icons/Assignment';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import FaceIcon from '@material-ui/icons/Face';
import CreateIcon from '@material-ui/icons/Create';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import FileExplorer from './FileExplorer';

/* ================ Styling ================ */
const useStyles = makeStyles((theme) => ({
  //Page container
  root: {
    height: '100vh',
    width: '100vw',
    position: 'fixed',
    display: 'flex',
  },
  navBar: {
    left: 0,
    height: '100%',
    width: '20%',
    background: theme.palette.primary.main,
  },
  navBarIcon: {
    fontSize: 30,
    color: '#FFFFFF',
  },
  profileContainer: {
    marginLeft: '2%',
    height: '100%',
    display: 'flex',
    flexGrow: 1,
    flexFlow: 'column nowrap',
    alignItems: 'stretch',
    justifyContent: 'space-between',
  },
  characterCard: {
    margin: '0.5%',
    flexGrow: 1,
    height: '20%',
    background: theme.palette.primary.light,
    padding: '5%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  profilePicture: {
    height: '5em',
    width: '5em',
  },
  bio: {
    marginLeft: '5%',
    flexGrow: 1,
    color: 'white !important ',
  },
  showcaseCard: {
    margin: '0.5%',
    flexGrow: 5,
    height: '20%',
    background: '#F7F5E7',
    padding: '5%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  fileCard: {
    height: '8em',
    width: '8em',
  },
  showcaseDescription: {
    margin: '2%',
    height: '100%',
    marginLeft: '5%',
    flexGrow: 1,
    display: 'flex',
    flexFlow: 'column nowrap',
    alignItems: 'flex-start',
  },
  fileExplorerCard: {
    margin: '0.5%',
    flexGrow: 5,
    height: '20%',
    background: '#F7F5E7',
    display: 'flex',
    alignItems: 'stretch',
    justifyContent: 'space-evenly',
    padding: '2%',
  },
  submit: {
    backgroundColor: theme.palette.secondary.main,
  },
}));

/* ================ Component ================ */

const ProfilePage = () => {
  // Styling
  const styles = useStyles();
  const [isLoading, setLoading] = useState(true);

  //Authentication Context
  const { setAuthTokens } = useAuth();

  //Log Out
  function logOut() {
    //Clears browser storage
    setAuthTokens(null);
  }

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
  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <div className={styles.root}>
      <div className={styles.navBar}>
        <List>
          <ListItem button>
            <ListItemIcon>
              <FaceIcon className={styles.navBarIcon} />
            </ListItemIcon>
            <ListItemText primary='My Profile'></ListItemText>
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <CreateIcon className={styles.navBarIcon} />
            </ListItemIcon>
            <ListItemText primary='My Blog'></ListItemText>
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <MenuBookIcon className={styles.navBarIcon} />
            </ListItemIcon>
            <ListItemText primary='My Projects'></ListItemText>
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <AccountBoxIcon className={styles.navBarIcon} />
            </ListItemIcon>
            <ListItemText primary='My CV'></ListItemText>
          </ListItem>
        </List>
        <Divider light />
        <ListItem button onClick={logOut}>
          Logout
        </ListItem>
      </div>
      <div className={styles.profileContainer}>
        <Paper className={styles.characterCard}>
          <Avatar className={styles.profilePicture} />
          <div className={styles.bio}>
            <Typography>This is {user.firstName}'s bio</Typography>
          </div>
        </Paper>
        <Paper className={styles.showcaseCard}>
          <Avatar variant='rounded' className={styles.fileCard}>
            <AssignmentIcon />
          </Avatar>
          <div className={styles.showcaseDescription}>
            <Typography variant='h3'>Showcase</Typography>
            <p>{user.bio}</p>
          </div>
        </Paper>
        <Paper className={styles.fileExplorerCard}>
          <FileExplorer />
        </Paper>
      </div>
    </div>
  );
};

export default ProfilePage;
