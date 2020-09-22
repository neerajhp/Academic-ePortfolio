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
  large: {
    background: theme.palette.secondary.light,
    width: '100%',
    height: '60%',
  },
  medium: {
    width: '100%',
    height: '30%',
  },
  small: {
    width: '49%',
    height: '30%',
  },
}));
/* ================ Component ================ */
const ProjectCard = ({ type }) => {
  const classes = useStyles();
  //Default  card size is large
  var cardSize;

  switch (type) {
    case 'large':
      cardSize = classes.large;
      break;
    case 'medium':
      cardSize = classes.medium;
      break;
    case 'small':
      cardSize = classes.small;
      break;
    default:
      cardSize = classes.large;
  }
  return (
    <Paper className={`${classes.card}  ${cardSize}`}>
      <div className={classes.bio}>
        <Typography className={classes.title} variant='h2'>
          This is a {type} Project Card
        </Typography>
        <Typography>This is the project description</Typography>
      </div>
    </Paper>
  );
};

export default ProjectCard;
