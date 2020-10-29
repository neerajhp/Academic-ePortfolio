import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Field, FieldArray, Formik } from 'formik';
import { Typography, Button, Divider, TextField } from '@material-ui/core';
import API from '../../../../api/API';
import FormikField from '../../../utils/FormikField';
import RTE from '../../../utils/RTE';

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
}));

/* ================ Component ================ */

const ProjectForm = ({ handleClose, records }) => {
  const classes = useStyles();

  //RTE
  const [rteValue, setRTEValue] = useState([]);

  useEffect(() => {
    if (records.description === undefined || records.description.length === 0) {
      setRTEValue([
        {
          type: 'paragraph',
          children: [{ text: 'Describe your project here' }],
        },
      ]);
    } else
      setRTEValue([
        {
          type: 'paragraph',
          children: [{ text: `${records.description}` }],
        },
      ]);
  }, [records.description]);

  return (
    <Formik
      initialValues={{
        title: records.title,
        description: rteValue,
      }}
      onSubmit={(values, actions) => {
        console.log(rteValue);
        // API.editFeaturedWork(values, records.recordID).then(({ data }) => {
        //   handleClose();
        // });
      }}
    >
      {(formikProps) => (
        <form classes={classes.form} onSubmit={formikProps.handleSubmit}>
          <FormikField
            className={classes.inputField}
            label='Project Title'
            formikProps={formikProps}
            formikKey='title'
            defaultValue={records.title}
            required
          />

          <RTE defaultValue={rteValue} setValue={setRTEValue} />

          <div className={classes.buttonContainer}>
            <Button
              className={classes.button}
              onClick={() => handleClose()}
              color='primary'
            >
              <Typography>Cancel</Typography>
            </Button>
            <Button
              type='Submit'
              className={classes.button}
              disabled={!formikProps.isValid}
              color='primary'
            >
              <Typography>Update</Typography>
            </Button>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default ProjectForm;
