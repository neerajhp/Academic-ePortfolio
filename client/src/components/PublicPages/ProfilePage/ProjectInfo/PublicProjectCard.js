import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Typography } from '@material-ui/core';

/* ================ Styling ================ */

const useStyles = makeStyles((theme) => ({
  card: {
    margin: '0 0 1% 1%',
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
const ProjectCard = ({ type }) => {
  const classes = useStyles();
  // const inputEl = useRef(null);
  // const [loading, setLoading] = useState(false);
  // const [allFiles, setAllFiles] = useState([]);
  // const [file, setFile] = useState('');
  //Default  card size is large


  return (
    <Paper className={classes.card}>
      <div className={classes.bio}>
        <Typography className={classes.title} variant='h2'>
          This is a Project Card
        </Typography>
        <Typography>This is the project description</Typography>
        <Typography className={classes.title} variant='h2'>
          Showcase
        </Typography>
      </div>
    </Paper>
  );
};

export default ProjectCard;
