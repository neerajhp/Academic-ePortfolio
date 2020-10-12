import { makeStyles } from '@material-ui/core/styles';
import { Paper, Avatar, Typography } from '@material-ui/core';
import React, { useState } from 'react';

/* ================ Styling ================ */
const useStyles = makeStyles((theme) => ({
  searchCard: {
    width: '100%',
    background: theme.palette.neutral.main,
    color: theme.palette.tertiary.main,
    marginTop: theme.spacing(2),
    padding: '5%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  profilePicture: {
    height: '2.5em',
    width: '2.5em',
    cursor: 'pointer',
  },
  bio: {
    marginLeft: '5%',
    flexGrow: 1,
  },
}));
/* ================ Component ================ */

const SearchCard = ({ user }) => {
  const classes = useStyles();
  //   const [records, setRecords] = useState(user);

  return (
    <Paper className={classes.searchCard}>
      <Avatar className={classes.profilePicture} />

      <div className={classes.bio}>
        <Typography variant='h3'>Test Search Profile</Typography>
        <Typography>The Users bio will go here</Typography>
      </div>
    </Paper>
  );
};

export default SearchCard;
