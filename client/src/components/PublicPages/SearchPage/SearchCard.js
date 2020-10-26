import { makeStyles } from '@material-ui/core/styles';
import { Paper, Avatar, Typography, CircularProgress } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import API from '../../../api/API';

/* ================ Styling ================ */
const useStyles = makeStyles((theme) => ({
  searchCard: {
    width: '100%',
    background: '#FFFFF',
    color: theme.palette.tertiary.main,
    marginTop: theme.spacing(2),
    padding: '5%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  clickable: {
    '&:hover': {
      background: theme.palette.secondary.main,
    },
    '&:active': {
      background: theme.palette.secondary.overlay,
    },
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
  const [records, setRecords] = useState(null);
  const history = useHistory();
  var card;

  useEffect(() => {
    API.viewerGetProfile(user.userName)
      .then(({ data }) => {
        setRecords(data);
      })
      .catch((err) => {
        if (err.response.status === 404) {
          console.log('Not Found');
          // setProfileNotFound(true);
        } else if (err.response.status === 403) {
          // setProfilePrivate(true);
        }
      });
  }, [user]);

  function handleClick(userName) {
    history.push(`/view/${userName}`);
  }

  if (records === null) {
    card = (
      <Paper className={classes.searchCard}>
        <CircularProgress />
      </Paper>
    );
  } else {
    card = (
      <Paper
        className={` ${classes.searchCard} ${classes.clickable} `}
        onClick={() => handleClick(user.userName)}
      >
        <Avatar
          src={records.profilePic.fileLink}
          alt='avatar'
          className={classes.profilePicture}
        />

        <div className={classes.bio}>
          <Typography variant='h3'>
            {records.firstName} {records.lastName}
          </Typography>
          <Typography>{records.bio}</Typography>
        </div>
      </Paper>
    );
  }

  return <React.Fragment key={user.userName}>{card} </React.Fragment>;
};

export default SearchCard;
