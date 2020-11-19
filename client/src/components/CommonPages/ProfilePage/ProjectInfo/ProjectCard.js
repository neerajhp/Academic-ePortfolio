import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Typography,
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from '@material-ui/core';
import axios from 'axios';
import API from '../../../../api/API';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ProjectDialog from './ProjectDialog';
import serialize from '../../../utils/serializer';
import AssignmentIcon from '@material-ui/icons/Assignment';

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
    display: 'block',
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
    fontSize: '2em',
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
    color: '#112940',
    fontWeight: 'bolder',
    marginTop: '15px',
    paddingTop: '15px',
  },
}));
/* ================ Component ================ */
const ProjectCard = ({ content, updateProfile, editable }) => {
  const classes = useStyles();
  const [records, setRecords] = useState(content);
  const [allFiles, setAllFiles] = useState([]);
  const [allId, setAllId] = useState([]);

  //showFiles
  const onFinish = () => {
    API.getFile(records._id).then((result) => {
      if (result.status === 200) {
        setAllFiles(result.data);
      }
    });
  };

  //download files
  const onIdFinish = () => {
    API.getFile(records._id).then((result) => {
      if (result.status === 200) {
        setAllId(result.data);
        console.log(123, allFiles);
      }
    });
  };
  console.log(content);
  return (
    <Accordion className={classes.card}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        className={classes.summary}
      >
        <Typography variant='h2'>{records.title}</Typography>
      </AccordionSummary>
      <AccordionDetails className={classes.description}>
        {serialize(records.description)}
      </AccordionDetails>
      <AccordionSummary className={classes.titleLarge}>Files</AccordionSummary>
      <AccordionDetails className={classes.description}>
        <div style={{ marginTop: 50 }}>
          <Typography
            onClick={() => onFinish(records._id)}
            className={classes.fileTitle}
            variant='h4'
          >
            File List
          </Typography>
          <div className={classes.fileList}>
            {allFiles.map((item) => (
              <div className={classes.fileItem} key={item.id}>
                <AssignmentIcon style={{ fontSize: 30 }} />

                <div>{item.s3_key.replace(`user-${item.user_id}/`, '')}</div>
              </div>
            ))}
          </div>
        </div>
        <Typography
          onClick={() => onIdFinish(records._id)}
          className={classes.fileTitle}
          variant='h4'
        >
          Load File
        </Typography>
        {allId &&
          allId.map((item) => (
            <div key={item._id}>
              <a className={classes.fileLink} href={item.fileLink}>
                {item.s3_key}
              </a>
            </div>
          ))}
      </AccordionDetails>
      {editable && (
        <ProjectDialog
          empty={false}
          project={records}
          updateProfile={updateProfile}
        />
      )}
    </Accordion>
  );
};

export default ProjectCard;
