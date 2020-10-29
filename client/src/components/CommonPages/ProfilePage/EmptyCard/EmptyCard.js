import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Typography } from '@material-ui/core';

/* ================ Styling ================ */
const useStyles = makeStyles((theme) => ({
  card: {
    margin: '0 0 1% 1%',
    width: '100%',
    padding: theme.spacing(5),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  workSection: {
    margin: theme.spacing(2),
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  emptySection: {
    margin: theme.spacing(2),
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    order: 3,
  },
  title: {
    width: '100%',
    marginBottom: theme.spacing(3),
    display: 'flex',
    flexDirection: 'row',
  },
  prompt: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    background: theme.palette.neutral.light,
    padding: theme.spacing(2),
    borderRadius: theme.spacing(1),
  },
}));

/* ================ Component ================ */
const EmptyCard = ({ name, prompt }) => {
  const classes = useStyles();

  return (
    <Paper className={classes.card}>
      <Typography className={classes.title} variant='h2'>
        {prompt}{' '}
      </Typography>
      <div className={classes.prompt}>
        <Typography variant='h2'>
          {name} hasn't added any {prompt} info just yet!
        </Typography>
      </div>
    </Paper>
  );
};

export default EmptyCard;
