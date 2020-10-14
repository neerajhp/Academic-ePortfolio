import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  DialogContent,
  DialogActions,
  Typography,
  Button,
} from '@material-ui/core';
import FormikField from '../../../utils/FormikField';
import { Formik } from 'formik';
import API from '../../../../api/API';
import CircularProgress from '@material-ui/core/CircularProgress';

/* ================ Styling ================ */

// Form Styles
const useStyles = makeStyles((theme) => ({
  buttonContainer: {
    textAlign: 'right',
  },
  button: {
    marginLeft: 8,
  },
}));

const AboutForm = ({ handleClose, records }) => {
  const classes = useStyles();

  return (
    <Formik
      initialValues={{
        aboutMe: records,
      }}
      onSubmit={(values, actions) => {
        API.editAboutMe(values.aboutMe).then(handleClose());
      }}
    >
      {(formikProps) => (
        <React.Fragment>
          <DialogContent dividers>
            <form classes={classes.form} onSubmit={formikProps.handleSubmit}>
              <FormikField
                label='Describe yourself'
                type='description'
                formikKey='aboutMe'
                formikProps={formikProps}
                multiline
                rows={6}
              />
            </form>
          </DialogContent>
          <DialogActions>
            <Button className={classes.button} onClick={() => handleClose()}>
              <Typography>Cancel</Typography>
            </Button>
            <div>
              <Button
                type='Submit'
                className={classes.button}
                onClick={() => formikProps.handleSubmit()}
                disabled={!formikProps.isValid}
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
          </DialogActions>
        </React.Fragment>
      )}
    </Formik>
  );
};

export default AboutForm;
