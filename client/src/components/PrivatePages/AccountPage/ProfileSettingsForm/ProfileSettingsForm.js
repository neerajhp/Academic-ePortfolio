import React, { useState } from 'react';
import { Formik } from 'formik';
import { Paper, Typography, Button, Switch, FormControlLabel} from '@material-ui/core';

import CircularProgress from '@material-ui/core/CircularProgress';

import FormikField from '../../../utils/FormikField';
import validationSchema from './Validation';
import API from '../../../../api/API';

/* ================ Component ================ */



const ProfileSettingsForm = ({ user, globalClasses }) => {
  const [Submitted, setSubmitted] = useState(false);
  const [checked, setChecked] = useState(false);
  const fieldSubmitted = Submitted ? globalClasses.fieldSubmitted : '';


  // const handleChange = (event) => {
  // setChecked({ ...checked, [event.target.name]: event.target.checked });
  // };

  return (
    <Paper className={globalClasses.card}>
      <div className={globalClasses.title}>
        <Typography variant='h2'>Profile Settings</Typography>
      </div>
      <div className={globalClasses.formContainer}>
        <Formik
          initialValues={{
            url: user.url,
          }}
          onSubmit={(values, actions) => {
            setSubmitted(false);
            API.editUserInformation({
              url: values.url,
            })
              .then((res) => {
                setSubmitted(true);
                actions.setSubmitting(false);
              })
              .catch((err) => {
                console.log(err);
                actions.setFieldError('url', err.response.data);
                actions.setSubmitting(false);
              });
          }}
          validationSchema={validationSchema}
        >
          {(formikProps) => (
            <form
              className={globalClasses.form}
              onSubmit={formikProps.handleSubmit}
            >
              <FormikField
                label='Custom URL'
                formikProps={formikProps}
                formikKey='url'
                required
                value={user.url}
                className={`${globalClasses.field} ${fieldSubmitted}`}
              />

              <FormControlLabel
                      // control={<Switch checked={checked.checkedA} onChange={handleChange} name="checkedA" />}
                      control={<Switch checked={checked.checkedA} name="checkedA" />}
                      label="Set Profile To Private Mode" labelPlacement="start"
                    />
              {/* <Switch
                label = "Set Page To Private Mode"
                checked={checked}
                onChange={handleChange}
                color="primary"
                name="checked"
                inputProps={{ 'aria-label': 'primary checkbox' }}
              /> */}

              <div className={globalClasses.buttonWrapper}>
                <Button
                  type='Submit'
                  color='secondary'
                  fullWidth
                  variant='contained'
                  disabled={!formikProps.isValid || formikProps.isSubmitting}
                >
                  <Typography>Update</Typography>
                </Button>
                {formikProps.isSubmitting && (
                  <CircularProgress
                    size={24}
                    className={globalClasses.buttonProgress}
                  />
                )}
              </div>


            </form>
          )}
        </Formik>
      </div>
    </Paper>
  );
};

export default ProfileSettingsForm;
