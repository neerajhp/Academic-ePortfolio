import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Formik } from 'formik';
import { Paper, Typography, Grid, Button } from '@material-ui/core';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns'; // choose your lib
import FormikField from '../../FormikField';
import validationSchema from './Validation';
import API from '../../../api/API';

/* ================ Styling ================ */

const useStyles = makeStyles((theme) => ({
  //Page container
  card: {
    margin: '0 0 1% 1%',
    width: '100%',
    background: theme.palette.primary.main,
    padding: '5%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: { width: '100%', marginBottom: theme.spacing(3) },
  formContainer: {
    width: '100%',
    height: '30%',
    display: 'flex',
  },

  submit: {
    marginTop: theme.spacing(2),
    backgroundColor: theme.palette.secondary.main,
  },
}));

/* ================ Component ================ */

const AccountForm = ({ user }) => {
  const classes = useStyles();

  const [Submitted, setSubmitted] = useState(false);

  return (
    <Paper className={classes.card}>
      <Typography className={classes.title} variant='h2' color='textSecondary'>
        Update your account information
      </Typography>
      <div className={classes.formContainer}>
        <Formik
          initialValues={{
            firstName: user.firstName,
            lastName: user.lastName,
            mobileNumber: user.mobileNumber,
            birthDate: user.birthDate,
          }}
          onSubmit={(values, actions) => {
            API.editUserInformation({
              firstName: values.firstName,
              lastName: values.lastName,
              mobileNumber: values.mobileNumber,
              birthDate: values.birthDate,
            })
              .then((res) => {
                setSubmitted(true);
              })
              .catch((err) => {
                actions.setFieldError('email', err.response.data);
                actions.setSubmitting(false);
              });
          }}
          validationSchema={validationSchema}
        >
          {(formikProps) => (
            <form className={classes.form} onSubmit={formikProps.handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <FormikField
                    label='FirstName'
                    formikProps={formikProps}
                    formikKey='firstName'
                    required
                    value={user.firstName}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormikField
                    label='LastName'
                    formikProps={formikProps}
                    formikKey='lastName'
                    required
                    value={user.lastName}
                  />
                </Grid>
              </Grid>
              <FormikField
                label='Mobile Number'
                formikProps={formikProps}
                formikKey='mobileNumber'
                required
                value={user.mobileNumber}
              />
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  inputVariant='outlined'
                  format='dd/MM/yyyy'
                  clearable
                  value={formikProps.values.birthDate}
                  onChange={(value) =>
                    formikProps.setFieldValue('birthDate', value)
                  }
                />
              </MuiPickersUtilsProvider>

              <Button
                type='Submit'
                fullWidth
                variant='contained'
                className={classes.submit}
                disabled={!formikProps.isValid}
                color='primary'
              >
                <Typography>Update</Typography>
              </Button>
            </form>
          )}
        </Formik>
      </div>
    </Paper>
  );
};

export default AccountForm;
