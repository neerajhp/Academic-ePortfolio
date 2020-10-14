import { makeStyles } from '@material-ui/core/styles';
import { Paper, Avatar, Typography } from '@material-ui/core';

import React from 'react';

/* ================ Styling ================ */
const useStyles = makeStyles((theme) => ({
  characterCard: {
    margin: '0 0 1% 1%',
    width: '100%',
    background: theme.palette.primary.light,
    padding: '5%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  profilePicture: {
    height: '5em',
    width: '5em',
    cursor: 'pointer',
  },
  bio: {
    marginLeft: '5%',
    flexGrow: 1,
    color: 'white !important ',
  },
}));
/* ================ Component ================ */

const PublicCharacterCard = ({ user }) => {
  const classes = useStyles();

  return (
    <Paper className={classes.characterCard}>
      <Avatar className={classes.profilePicture} />

      <div className={classes.bio}>
        <Typography variant='h2'>
          {user.firstName} {user.lastName}
        </Typography>
        <Typography>{user.bio}</Typography>
      </div>
    </Paper>
  );
};

export default PublicCharacterCard;
