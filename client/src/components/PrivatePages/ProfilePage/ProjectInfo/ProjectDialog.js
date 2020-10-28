import React, { useRef, useState } from 'react';
import EditIcon from '@material-ui/icons/Edit';
import {
  Typography,
  Dialog,
  DialogContent,
  DialogTitle,
  Button,
  IconButton,
  ButtonGroup,
} from '@material-ui/core';
import ProjectForm from './ProjectForm';
import API from '../../../../api/API';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';
import Collapse from '@material-ui/core/Collapse';
import FormatListBulletedIcon from '@material-ui/icons/List';
import BackupIcon from '@material-ui/icons/Backup';
import DeleteIcon from '@material-ui/icons/Delete';
import GetAppIcon from '@material-ui/icons/GetApp';
import AboutForm from '../AboutInfo/AboutForm';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  container: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
    position: 'relative',
  },
  dialog: {
    '& .MuiDialogTitle-root': {
      background: `linear-gradient(175deg, white 75%, ${theme.palette.secondary.overlay} 25%)`,
    },
    '& .MuiDialogActions-root': {
      background: `linear-gradient(175deg, ${theme.palette.primary.overlay} 55%,  white 20%)`,
    },
  },
  upload: {
    position: 'absolute',
    bottom: 40,
    right: 20,
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.7)',
  },
  paper: {
    position: 'absolute',
    width: '40%',
    backgroundColor: theme.palette.neutral.main,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  newButton: {
    '&.MuiButton-text': {
      textTransform: 'none',
      padding: `${theme.spacing(4)}px ${theme.spacing(2)}px`,
    },
    '&.MuiButtonBase-root': {
      width: '100%',
      backgroundColor: theme.palette.neutral.light,
      '&:hover': {
        backgroundColor: theme.palette.neutral.main,
      },
    },
  },
}));

const ProjectDialog = ({ records, setRecords, empty }) => {
  const classes = useStyles();
  const inputEl = useRef(null);
  const [open, setOpen] = React.useState(false);
  const [allFiles, setAllFiles] = useState([]);
  const [allId, setAllId] = useState([]);
  const [checked, setChecked] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
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
  //getAllFeatureWork instead of getAboutMe
  const handleClose = () => {
    API.getAboutMe().then(({ data }) => {
      setRecords(data);
      setOpen(false);
    });
  };

  const openButton = empty ? (
    <Button onClick={handleOpen} className={classes.newButton}>
      <Typography variant='h2'>
        <AddIcon /> Add Project
      </Typography>
    </Button>
  ) : (
    <IconButton onClick={handleOpen}>
      <EditIcon />
    </IconButton>
  );

  return (
    <React.Fragment>
      {openButton}
      <Dialog
        fullWidth={true}
        maxWidth={'md'}
        open={open}
        onClose={handleClose}
        aria-labelledby='form-dialog-title'
        className={classes.dialog}
      >
        <ProjectForm
          records={records}
          setRecords={setRecords}
          handleClose={handleClose}
        />
      </Dialog>
    </React.Fragment>
  );
};

export default ProjectDialog;
