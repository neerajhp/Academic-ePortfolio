import ReflectionDialog from './ReflectionDialog';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Typography } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import API from '../../../../api/API';


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
  reflection: {
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

const ReflectionCard= (reflection) => {
  const classes = useStyles();
  const [records, setRecords] = useState("");

  console.log(reflection);
  // useEffect(() => {
  //   API.getBlog(reflection)
  //     .then(({ data }) => {
  //       setRecords(data);
  //       console.log(records);
  //     })
  //     .catch();
  // });

  return (
    <Paper className={classes.card}>
      <Typography className={classes.title} variant='h2'>
        Reflection  
      </Typography>
      <div className={classes.reflection}>
        <Typography>{records}</Typography>
      </div>
      <div className={classes.editDialogContainer}>
        <ReflectionDialog
          records={records}
          setRecords={setRecords}
          empty={records === '' || records === undefined}
        />
      </div>
    </Paper>
  );
};

export default ReflectionCard;