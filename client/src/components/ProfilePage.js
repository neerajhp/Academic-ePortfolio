import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Avatar } from '@material-ui/core';
import AssignmentIcon from '@material-ui/icons/Assignment';

// Styling
const useStyles = makeStyles(({}) => ({
  //Page container
  root: {
    height: '100vh',
    width: '100vw',
    position: 'fixed',
    display: 'flex',
    flexFlow: 'column nowrap',

    alignItems: 'center',
    justifyContent: 'space-between',
  },
  characterCard: {
    margin: '1%',
    flexGrow: 1,
    width: '70%',
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
    width: '70%',
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
    width: '70%',
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
  );
};

export default ProfilePage;
