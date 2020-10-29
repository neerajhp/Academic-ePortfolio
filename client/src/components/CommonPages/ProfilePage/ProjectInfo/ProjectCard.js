import React, { useRef, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Paper,
  Typography,
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Button,
  Divider,
} from '@material-ui/core';
import axios from 'axios';
import API from '../../../../api/API';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ProjectDialog from './ProjectDialog';

/* ================ Styling ================ */

const useStyles = makeStyles((theme) => ({
  card: {
    margin: '0 0 1% 1%',
    width: '100%',
    height: 'fit-content',
    '&.Mui-expanded': {
      margin: '1%',
      height: 'fit-content',
    },
  },
  summary: {
    '& .MuiAccordionSummary-content': {
      margin: `${theme.spacing(4)}px 0`,
      '& .Mui-expanded': {
        margin: `${theme.spacing(4)}px 0`,
      },
    },
  },
  description: {
    marginLeft: '5%',
    color: 'white !important ',
  },

  upload: {
    position: 'absolute',
    bottom: 40,
    right: 20,
  },
  hidden: {
    display: 'none',
  },
  titleLarge: {
    marginTop: '0px',
  },
  title: {
    marginBottom: '50px',
  },
  fileTitle: {
    cursor: 'pointer',
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
    color: '#fff',
    fontWeight: 'bolder',
    marginTop: '15px',
    paddingTop: '15px',
  },
  pic: {
    marginTop: '10px',
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  img: {
    width: '100%',
    height: '100%',
  },
  root: {
    height: 18,
  },
  container: {
    display: 'flex',
  },
  paper: {
    margin: theme.spacing(1),
  },
}));
/* ================ Component ================ */
const ProjectCard = ({ content }) => {
  const classes = useStyles();
  const inputEl = useRef(null);
  const [allFiles, setAllFiles] = useState([]);
  const [allId, setAllId] = useState([]);
  const [checked, setChecked] = React.useState(false);

  console.log(content);

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
        console.log(123);
      }
    });
  };

  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  return (
    <Accordion className={classes.card}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        className={classes.summary}
      >
        <Typography variant='h2'>{content.title}</Typography>
      </AccordionSummary>
      <AccordionDetails className={classes.details}>
        {content.description}
      </AccordionDetails>
      <ProjectDialog empty={false} project={content} />
    </Accordion>
  );
};

export default ProjectCard;
