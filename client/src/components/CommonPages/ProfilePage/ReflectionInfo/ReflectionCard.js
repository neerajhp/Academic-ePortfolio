import ReflectionDialog from './ReflectionDialog';
import React, { useRef, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Typography, ButtonGroup, Button } from '@material-ui/core';
import axios from 'axios';
import API from '../../../../api/API';
import BackupIcon from '@material-ui/icons/Backup';
import DeleteIcon from '@material-ui/icons/Delete';

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
const ReflectionCard = (reflection) => {
  const classes = useStyles();

  // const [records, setRecords] = useState(reflection);

  const getRecord = () => {
    return <Typography> Add your reflection!</Typography>;
  };

  const inputEl = useRef(null);
  const [records, setRecords] = useState(reflection);

  const handleChoseImg = (e) => {
    e.preventDefault();
    const file = e.target.files;
    if (!file.length) {
      return false;
    }
    if (file.length < 6) {
      let param = new FormData();
      for (const key in file) {
        if (file.hasOwnProperty(key)) {
          const item = file[key];
          param.append('image', item);
        }
      }
      axios({
        method: 'post',
        url: '/api/upload/images',
        data: param,
        headers: {
          Authorization: 'Bearer: ' + JSON.parse(localStorage.getItem('token')),
        },
        responseType: 'blob',
      }).then((result) => {});
    } else {
      alert.info('the max number is 5');
    }
  };

  const handleDel = (recordID) => {
    API.removeBlog(recordID).then((result) => {
      if (result.status === 200) {
        console.log(123);
      }
    });
  };

  return (
    <Paper className={classes.card}>
      <div className={classes.bio}>
        <Typography className={classes.title} variant='h2'>
          This is a Reflection
        </Typography>
        <Typography>This is the blog introduction</Typography>
        <input
          className={classes.hidden}
          type='file'
          ref={inputEl}
          accept='image/*'
          multiple
          onChange={handleChoseImg}
        />
        {getRecord(records)}
        {/* <div className={classes.tableContainer}>{getRecord(records)}</div> */}
        {/* <ReflectionDialog records={records} setRecords={setRecords} /> */}
        <div className={classes.upload}>
          <ButtonGroup>
            <Button>
              <ReflectionDialog records={records} setRecords={setRecords} />
            </Button>
            <Button onClick={() => inputEl.current.click()}>
              <BackupIcon />
            </Button>
            <Button onClick={() => handleDel(records?.recordID)}>
              <DeleteIcon />
            </Button>
          </ButtonGroup>
        </div>
      </div>
    </Paper>
  );
};

export default ReflectionCard;
