import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Typography } from '@material-ui/core';

/* ================ Styling ================ */
const useStyles = makeStyles((theme) => ({
  card: {
    margin: '0 0 1% 1%',
    background: theme.palette.primary.light,
    padding: '5%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  description: {
    marginLeft: '5%',
    color: 'white !important ',
  },
}));
/* ================ Component ================ */
const ReflectionCard = () => {
  const classes = useStyles();
  return (
    <Paper className={classes.card}>
      <div className={classes.bio}>
        <Typography className={classes.title} variant='h2'>
          This is a Reflection
        </Typography>
        <Typography>This is the blog introduction</Typography>
      </div>
    </Paper>
  );
};

export default ReflectionCard;
