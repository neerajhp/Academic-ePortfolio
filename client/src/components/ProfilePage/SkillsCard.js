import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Chip, Typography } from '@material-ui/core';

/* ================ Styling ================ */
const useStyles = makeStyles((theme) => ({
  card: {
    margin: '0 0 1% 1%',
    width: '100%',
    height: '20%',
    background: theme.palette.primary.light,
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
const SkillsCard = ({ skills }) => {
  const classes = useStyles();

  const getSkills = (skills) => {
    if (!(Array.isArray(skills) && skills.length)) {
      return <Typography> Add Some of your skills!</Typography>;
    } else {
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
    }
  };

  return (
    <Paper className={classes.card}>
      <Typography className={classes.title} variant='h2'>
        What I'm Good At
      </Typography>
      {getSkills(skills)}
    </Paper>
  );
};

export default SkillsCard;
