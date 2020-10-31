import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Field, FieldArray, Formik } from 'formik';
import {
  Typography,
  Button,
  CircularProgress,
  DialogActions,
  DialogContent,
} from '@material-ui/core';

import API from '../../../../api/API';
import FormikField from '../../../utils/FormikField';
import RTE from '../../../utils/RTE';
import { DropzoneArea } from 'material-ui-dropzone';
import axios from 'axios';
import { Upload, message } from 'antd';

/* ================ Styling ================ */

// Form Styles
const useStyles = makeStyles((theme) => ({
  form: {
    flexGrow: 1,
    padding: '0 5% 0 5%',
    '& .MuiFormLabel-root': {
      color: theme.palette.text.primary,
    },
  },
  divider: {
    width: '100%',
    backgroundColor: theme.palette.secondary.main,
  },
  addButton: {
    marginTop: theme.spacing(3),
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  addButtonContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  inputField: {
    '& .MuiInputBase-input': {
      color: theme.palette.text.primary,
    },
    '& .MuiFormLabel-root': {
      color: theme.palette.text.primary,
    },
  },
  rteContainer: {
    marginBottom: theme.spacing(3),
  },
  buttonWrapper: {
    margin: theme.spacing(1),
    position: 'relative',
  },
  buttonProgress: {
    color: theme.palette.secondary.main,
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}));

/* ================ Component ================ */

const ProjectForm = ({ handleClose, records, newWork }) => {
  const classes = useStyles();

  //RTE
  const [rteValue, setRTEValue] = useState([]);

  // const [attachedFiles, setAttachedFiles] = useState([]);

  // remove
  const handleDel = () => {
    API.removeFeaturedWork(records._id).then((result) => {
      if (result.status === 200) {
        handleClose();
      }
    });
  };

  useEffect(() => {
    if (records.description === undefined || records.description.length === 0) {
      records.description = [
        {
          type: 'paragraph',
          children: [{ text: 'Describe your project here' }],
        },
      ];
    }
    setRTEValue(records.description);
  }, [records.description]);

  //upload files
  const handleChooseFile = (e) => {
    e.preventDefault();
    const attachedFiles = e.target.files;
    if (!attachedFiles.length) {
      return false;
    }
    if (attachedFiles.length < 6) {
      let param = new FormData();
      for (const key in attachedFiles) {
        if (attachedFiles.hasOwnProperty(key)) {
          const item = attachedFiles[key];
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
      API.uploadFiles(attachedFiles, records._id).then((result) => {
        if (result.status === 200) {
          console.log(result);
        }
      });
    }
  };

  //test console
  const attachedFiles = new File(['foo'], 'file', {
    type: '.PDF,.png,.jpeg.JPEG,.pdf,.mp4,.MP4,.DOCX,.docx',
  });

  return (
    <Formik
      initialValues={{
        title: records.title,
        description: rteValue,
        attachedFiles: records.attachedFiles,
        image: '',
        url: '',
      }}
      onSubmit={(values, actions) => {
        let featuredWork = {
          title: values.title,
          description: rteValue,
          attachedFiles: values.attachedFiles,
          image: values.image,
          url: values.url,
        };
        if (newWork) {
          API.createFeaturedWork(featuredWork).then(({ res }) => {
            console.log(res);
            handleClose();
          });
        } else {
          API.editFeaturedWork(featuredWork, records._id).then(({ res }) => {
            // console.log(res);
            handleClose();
          });
        }
      }}
    >
      {(formikProps) => (
        <form classes={classes.form} onSubmit={formikProps.handleSubmit}>
          <DialogContent dividers>
            <FormikField
              className={classes.inputField}
              label='Project Title'
              formikProps={formikProps}
              formikKey='title'
              defaultValue={records.title}
              required
            />

            <div className={classes.rteContainer}>
              <RTE defaultValue={rteValue} setValue={setRTEValue} />
            </div>

            <div className={classes.dropzoneContainer}>
              <DropzoneArea
                attachedFiles={attachedFiles}
                acceptedFiles={[
                  '.PDF,.png,.jpeg.JPEG,.pdf,.mp4,.MP4,.DOCX,.docx',
                ]}
                dropzoneText={'Drag and drop an image here or click'}
                filesLimit={5}
                onChange={(files) => console.log('Files:', files)}
              />
            </div>
          </DialogContent>
          <DialogActions>
            <div className={classes.buttonContainer}>
              <div className={classes.buttonWrapper}>
                <Button
                  type='Submit'
                  className={classes.button}
                  onClick={() => handleDel(records._id)}
                  color='primary'
                >
                  <Typography>Delete</Typography>
                </Button>
                {formikProps.isSubmitting && (
                  <CircularProgress
                    size={24}
                    className={classes.buttonProgress}
                  />
                )}
              </div>
              <div className={classes.buttonWrapper}>
                <Button
                  className={classes.button}
                  onClick={() => handleClose()}
                  color='primary'
                >
                  <Typography>Cancel</Typography>
                </Button>
              </div>
              <div className={classes.buttonWrapper}>
                <Button
                  type='Submit'
                  className={classes.button}
                  disabled={!formikProps.isValid}
                  onClick={() => formikProps.handleSubmit()}
                  color='primary'
                >
                  <Typography>Update</Typography>
                </Button>
                {formikProps.isSubmitting && (
                  <CircularProgress
                    size={24}
                    className={classes.buttonProgress}
                  />
                )}
              </div>
            </div>
          </DialogActions>
        </form>
      )}
    </Formik>
  );
};

export default ProjectForm;
