import React, { useState, useEffect } from 'react';

import { Formik } from 'formik';
import { Paper, Typography, Button, Switch, FormControlLabel} from '@material-ui/core';

import CircularProgress from '@material-ui/core/CircularProgress';

import FormikField from '../../../utils/FormikField';
import validationSchema from './Validation';
import API from '../../../../api/API';


/* ================ Component ================ */



const ProfileSettingsForm = ({ user, globalClasses }) => {
  const [Submitted, setSubmitted] = useState(false);
  const [checked, setChecked] = useState(true);
  const fieldSubmitted = Submitted ? globalClasses.fieldSubmitted : '';

  

  console.log(user.firstName);
  console.log(user.email);
  console.log(user.private);
  console.log(user.isVerified);
  console.log(user);


  // const handleToggle = () => {
  //   console.log('hello')
  //   API.getSkills().then(({data}) => {
  //     console.log(data);
  //     if(data){
  //       setChecked(false);
  //     }
  //     else{
  //       setChecked(true);
  //     }
  //   })
  // };

  const handleToggle = (data) => {
    if(data){
      console.log('true');
      setChecked(false);
      console.log(checked);
      return false;
    }
    else{
      setChecked(true);
      console.log(checked);
      return true;
    }
  }

  return (
    <Paper className={globalClasses.card}>
      <div className={globalClasses.title}>
        <Typography variant='h2'>Profile Settings</Typography>
      </div>
      <div className={globalClasses.formContainer}>
        <Formik
          initialValues={{
            url: user.url,
            private: user.private,
          }}
          onSubmit={(values, actions) => {
            setSubmitted(false);
            console.log(values);
            console.log(checked);
            API.changePrivacy({
              private: values.private,
            })
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
                // required
                value={user.url}
                className={`${globalClasses.field} ${fieldSubmitted}`}
              />
              <FormControlLabel
                      control={<Switch
                        checked={checked}
                        onClick={() => handleToggle()}
                        value="privacy"
                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                    />}
                      // control={<Switch checked={checked} name = 'private' formikKey='private' onchange={handleChange}/>}
                      label="Set Profile To Private Mode" labelPlacement="start"
                    />

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
