import { makeStyles } from '@material-ui/core/styles';
import { Paper, Typography } from '@material-ui/core';
import ReflectionDialog from './ReflectionDialog';
import React, { useState } from 'react';


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
  },
  description: {
    marginLeft: '5%',
    color: 'white !important ',
  },
}));
/* ================ Component ================ */
const ReflectionCard = (reflection) => {
  const classes = useStyles();

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
        <Typography>{getRecord(records)}</Typography>
        {/* <div className={classes.tableContainer}>{getRecord(records)}</div> */}
        <ReflectionDialog records={records} setRecords={setRecords} />
      </div>
    </Paper>
  );
};

export default ReflectionCard;
