import React, { useEffect, useRef, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Typography, IconButton } from '@material-ui/core';
import API from '../../../../api/API';
import ProjectDialog from './ProjectDialog';
import axios from 'axios';
import BackupIcon from '@material-ui/icons/Backup';
import DeleteIcon from '@material-ui/icons/Delete';
import AssignmentIcon from '@material-ui/icons/Assignment';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import mediumProjectPic from '../../../../assets/ProjectPic/mediumProPic.jpg';
import smallProjectPic from '../../../../assets/ProjectPic/smallProPic.png';
import Switch from '@material-ui/core/Switch';
import Collapse from '@material-ui/core/Collapse';
import FormControlLabel from '@material-ui/core/FormControlLabel';

/* ================ Styling ================ */
const useStyles = makeStyles((theme) => ({
  card: {
    margin: '0 0 1% 1%',
    width: '100%',
    height: 'fit-content',
    padding: theme.spacing(5),
    display: 'flex',
    flexDirection: 'column',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  title: {
    width: '100%',
    color: '#345719',
  },
  feature: {
    marginTop: theme.spacing(2),
    width: '100%',
    flexGrow: 1,
    display: 'flex',
    alignItems: 'flex-start',
  },
  editDialogContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
    position: 'relative',
  },
  fileTitle: {
    cursor: 'pointer',
    color: '#345719',
  },
  fileList: {
    display: 'flex',
    paddingTop: '10px',
  },
  fileItem: {
    textAlign: 'center',
    margin: '0 10px',
    fontWeight: 'bolder',
    fontSize: '1em',
  },
  fileLink: {
    color: '#345719',
    fontWeight: 'bolder',
    marginTop: '15px',
    paddingTop: '15px',
  },
  upload: {
    position: 'absolute',
    bottom: 40,
    right: 20,
  },
  hidden: {
    display: 'none',
  },
  img: {
    width: '100%',
    height: '100%',
  },
  pic: {
    marginTop: '10px',
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'center',
    width: '100%',
  },
}));

const ProjectCard = () => {
  const classes = useStyles();
  const inputEl = useRef(null);
  const [records, setRecords] = useState('');
  const [open, setOpen] = useState(false);
  const [allFiles, setAllFiles] = useState([]);
  const [allId, setAllId] = useState([]);
  const [checked, setChecked] = useState(false);

  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  const getRecord = () => {
    return <Typography> Add your project!</Typography>;
  };

  //file function
  const handleChoseFile = (e) => {
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
          param.append('document', item);
        }
      }
      axios({
        method: 'post',
        url: '/api/upload/files',
        data: param,
        headers: {
          Authorization: 'Bearer: ' + JSON.parse(localStorage.getItem('token')),
        },
        responseType: 'blob',
      }).then((result) => {});
    } else {
      alert('the max number is 5');
    }
  };

  const onFinish = () => {
    API.getAllFiles().then((result) => {
      if (result.status === 200) {
        setAllFiles(result.data);
      }
    });
  };

  const onIdFinish = () => {
    // test data
    // ['url1','url2','url3','url4']
    API.getAllFiles().then((result) => {
      if (result.status === 200) {
        setAllId(result.data);
        console.log(123, allFiles);
      }
    });
  };

  const handleDel = (recordID) => {
    API.removeFeaturedWork(recordID).then((result) => {
      if (result.status === 200) {
        API.getAllFeaturedWorks()
          .then(({ data }) => {
            setRecords(data);
          })
          .catch();
      }
    });
  };

  return (
    <Paper className={classes.card}>
      <FormControlLabel
        control={<Switch checked={checked} onChange={handleChange} />}
        label='Show'
      />
      <div className={classes.container}>
        <Collapse in={checked}>
          <Typography className={classes.title} variant='h2'>
            Project
          </Typography>
          <img alt='mediumPic' src={mediumProjectPic} className={classes.pic} />
          <div className={classes.feature}>
            <Typography>{records}</Typography>
          </div>
          <div className={classes.editDialogContainer}>
            <ProjectDialog
              records={records}
              setRecords={setRecords}
              empty={records === '' || records === undefined}
            />
          </div>
          <FormControlLabel
            control={<Switch checked={checked} onChange={handleChange} />}
            label='Show'
          />
          <div className={classes.container}>
            <Collapse in={checked}>
              <Paper elevation={4} className={classes.paper}>
                <Typography className={classes.title} variant='h2'>
                  Showcase
                </Typography>
                <div style={{ marginTop: 30 }}>
                  <Typography
                    onClick={() => onFinish()}
                    className={classes.fileTitle}
                    variant='h4'
                  >
                    Click here to see Uploaded Files
                  </Typography>
                  <div className={classes.fileList}>
                    {allFiles.map((item) => (
                      <div className={classes.fileItem} key={item.id}>
                        <AssignmentIcon style={{ fontSize: 30 }} />
                        <div>
                          {item.s3_key.replace(`user-${item.user_id}/`, '')}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{ marginTop: 50 }}>
                  <Typography
                    onClick={() => onIdFinish()}
                    className={classes.fileTitle}
                    variant='h4'
                  >
                    Click here and Choose to Download Uploaded Files
                  </Typography>
                  {allId &&
                    allId.map((item) => (
                      <div key={item._id}>
                        <a className={classes.fileLink} href={item.fileLink}>
                          {item.s3_key}
                        </a>
                      </div>
                    ))}
                </div>
                <div style={{ marginTop: 60 }}>
                  <input
                    className={classes.hidden}
                    type='file'
                    ref={inputEl}
                    accept='.PDF,.png,.jpeg.JPEG,.pdf,.mp4,.MP4,.DOCX,.docx'
                    multiple
                    onChange={handleChoseFile}
                  />

                  <div className={classes.upload}>
                    <ProjectDialog records={records} setRecords={setRecords} />
                    <IconButton onClick={() => inputEl.current.click()}>
                      <BackupIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDel(records?._id)}>
                      <DeleteIcon />
                    </IconButton>
                  </div>
                </div>
              </Paper>
            </Collapse>
          </div>
        </Collapse>
      </div>
    </Paper>
  );
};

export default ProjectCard;
