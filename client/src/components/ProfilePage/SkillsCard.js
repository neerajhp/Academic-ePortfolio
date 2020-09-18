import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Chip, Typography } from '@material-ui/core';

/* ================ Styling ================ */
const useStyles = makeStyles((theme) => ({
  card: {
    margin: '0.5%',
    flexGrow: 1,
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

/* ================ Component ================ */
const SkillsCard = ({ skills }) => {
  const classes = useStyles();

  const getSkills = (skills) => {
    if (skills === null || skills === undefined) {
      return <Typography> Add Some of your skills!</Typography>;
    } else {
      return skills.map((skill) => <Chip label={skill} />);
    }
  };

  return (
    <Paper className={classes.card}>
      <Typography className={classes.title} variant='h2'>
        What I'm Good At
      </Typography>
      <div className={classes.skillsContainer}>{getSkills(skills)}</div>
    </Paper>
  );
};

export default SkillsCard;
