import React, { useRef, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Typography } from '@material-ui/core';
import { Button, message, Form, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import axios from 'axios';
import API from '../../../../api/API';

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
  const inputEl = useRef(null);
  const [loading, setLoading] = useState(false);
  const [allFiles, setAllFiles] = useState([]);
  const [file, setFile] = useState('');
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
