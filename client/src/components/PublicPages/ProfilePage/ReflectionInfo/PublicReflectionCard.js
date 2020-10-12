import React, { useRef, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Typography } from '@material-ui/core';

/* ================ Styling ================ */
const useStyles = makeStyles((theme) => ({
  card: {
    margin: '0 0 1% 1%',
    width: '100%',
    background: theme.palette.primary.light,
    color: theme.palette.text.secondary,
    padding: '5%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    position: 'relative',
  },
  description: {
    marginLeft: '5%',
    color: 'white !important ',
  },
  upload: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  hidden: {
    display: 'none',
  },
}));
/* ================ Component ================ */
const PublicReflectionCard = (reflection) => {
  const classes = useStyles();

  const [loading, setLoading] = useState(false);
  const [records, setRecords] = useState(reflection);

  const getRecord = () => {
    return <Typography> Add your reflection!</Typography>;
  };
  return (
    <Paper className={classes.card}>
      <div className={classes.bio}>
        <Typography className={classes.title} variant='h2'>
          This is a Reflection
        </Typography>
        <Typography>This is the blog introduction</Typography>

        {getRecord(records)}
      </div>
    </Paper>
  );
};

export default PublicReflectionCard;
