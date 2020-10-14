import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Chip, Typography } from '@material-ui/core';

/* ================ Styling ================ */
const useStyles = makeStyles((theme) => ({
  card: {
    margin: '0 0 1% 1%',
    width: '100%',
    height: '20%',
    // background: theme.palette.primary.light,
    // color: theme.palette.text.secondary,
    padding: '5%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: { width: '100%' },

  skillsContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
}));

/* ================ Constants ================ */

const COLOURS = ['primary', 'secondary'];

/* ================ Component ================ */
const PublicSkillsCard = ({ skills, globalClasses }) => {
  const classes = useStyles();

  const getSkills = (skills) => {
    return (
      <div
        className={classes.skillsContainer}
        style={{ height: 10 * skills.length }}
      >
        {skills.map((skill, i) => (
          <Chip
            key={i}
            label={skill}
            color={COLOURS[Math.floor(Math.random() * COLOURS.length)]}
          />
        ))}
      </div>
    );
  };

  return (
    <Paper className={globalClasses.card}>
      <Typography className={globalClasses.title} variant='h2'>
        What I'm Good At
      </Typography>
      {getSkills(skills)}
    </Paper>
  );
};

export default PublicSkillsCard;
