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
import serialize from '../../../utils/serializer';

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

  const [record, setRecord] = useState(content);

  return (
    <Accordion className={classes.card}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        className={classes.summary}
      >
        <Typography variant='h2'>{record.title}</Typography>
      </AccordionSummary>
      <AccordionDetails className={classes.description}>
        {serialize(record.description)}
      </AccordionDetails>
      <ProjectDialog empty={false} project={record} setProject={setRecord} />
    </Accordion>
  );
};

const InitialValue = [
  {
    type: 'paragraph',
    children: [
      { text: 'body.description. ', bold: true },
      { text: 'Apppp. ' },
      { text: 'badfakcje', underlined: true },
    ],
  },
  { type: 'paragraph', children: [{ text: '', underlined: true }] },
  { type: 'paragraph', children: [{ text: 'adscaeca.', underlined: true }] },
  { type: 'paragraph', children: [{ text: '', underlined: true }] },
  {
    type: 'bulleted-list',
    children: [{ type: 'list-item', children: [{ text: 'asdcaec' }] }],
  },
];

export default ProjectCard;
