import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Paper,
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import AssignmentIcon from '@material-ui/icons/Assignment';
import FaceIcon from '@material-ui/icons/Face';

// Styling
const useStyles = makeStyles(({}) => ({
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
    background: '#333B55',
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
    margin: '1%',
    flexGrow: 1,
    height: '20%',
    background: '#536684',
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
    margin: '1%',
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
    margin: '1%',
    flexGrow: 5,
    height: '20%',
    background: '#F7F5E7',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
}));

const ProfilePage = () => {
  // Styling
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <div className={styles.navBar}>
        <List>
          <ListItem button>
            <ListItemIcon>
              <FaceIcon />
            </ListItemIcon>
            <ListItemText primary='My Profile'></ListItemText>
          </ListItem>
          <ListItem button>
            <ListItemIcon></ListItemIcon>
            <ListItemText primary='My Blog'></ListItemText>
          </ListItem>
          <ListItem button>
            <ListItemIcon></ListItemIcon>
            <ListItemText primary='My Projects'></ListItemText>
          </ListItem>
          <ListItem button>
            <ListItemIcon></ListItemIcon>
            <ListItemText primary='My CV'></ListItemText>
          </ListItem>
        </List>{' '}
      </div>
      <div className={styles.profileContainer}>
        <Paper className={styles.characterCard}>
          <Avatar className={styles.profilePicture} />
          <div className={styles.bio}>
            <p>This is my bio</p>
          </div>
        </Paper>
        <Paper className={styles.showcaseCard}>
          <Avatar variant='rounded' className={styles.fileCard}>
            <AssignmentIcon />
          </Avatar>
          <div className={styles.showcaseDescription}>
            <h3>Showcase</h3>
            <p>Project description goes here</p>
          </div>
        </Paper>
        <Paper className={styles.fileExplorerCard}>File Explorer</Paper>
      </div>
    </div>
  );
};

export default ProfilePage;
