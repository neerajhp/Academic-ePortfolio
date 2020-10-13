import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Formik } from 'formik';
import { Paper, Typography, Button } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormikField from '../../../utils/FormikField';
import validationSchema from './Validation';

/* ================ Styling ================ */

const useStyles = makeStyles((theme) => ({
  //Page container
  card: {
    margin: '0 0 1% 1%',
    width: '100%',
    padding: '5%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    width: '100%',
    marginBottom: theme.spacing(3),
    display: 'flex',
    flexDirection: 'row',
    '&::after': {
      content: '""',
      flex: '1 1',
      borderColor: '#D9D7D7',
      borderBottom: '1px solid',
      margin: 'auto',
    },
  },
  formContainer: {
    width: '100%',
    height: '30%',
    display: 'flex',
  },
  form: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  field: {
    '& .MuiFormLabel-root': {
      color: theme.palette.text.primary,
    },
  },
  fieldSubmitted: {
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: theme.palette.secondary.main,
      },
    },
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
  submit: {
    marginTop: theme.spacing(2),
    backgroundColor: theme.palette.secondary.main,
  },
}));

/* ================ Component ================ */

const AccountInformationForm = ({ user }) => {
  const classes = useStyles();

  const [Submitted, setSubmitted] = useState(false);
  const fieldSubmitted = Submitted ? classes.fieldSubmitted : '';

  return (
    <Paper className={classes.card}>
      <div className={classes.title}>
        <Typography variant='h2'>Account information</Typography>
      </div>
      <div className={classes.formContainer}>
        <Formik
          initialValues={{
            email: user.email,
            password: '',
            confirmpassword: '',
          }}
          onSubmit={(values, actions) => {
            setSubmitted(false);
            // API.editUserInformation({
            //   email: values.email,
            //   password: values.password,
            //   confirmpassword: values.confirmpassword,
            // })
            //   .then((res) => {
            //     setSubmitted(true);
            //     actions.setSubmitting(false);
            //   })
            //   .catch((err) => {
            //     console.log(err);
            //     actions.setFieldError('mobileNumber', err.response.data);
            //     actions.setSubmitting(false);
            //   });
          }}
          validationSchema={validationSchema}
        >
          {(formikProps) => (
            <form className={classes.form} onSubmit={formikProps.handleSubmit}>
              <FormikField
                label='Email'
                formikProps={formikProps}
                formikKey='email'
                required
                className={`${classes.field} ${fieldSubmitted}`}
              />
              <FormikField
                label='Password'
                formikProps={formikProps}
                formikKey='password'
                type='password'
                required
                className={`${classes.field} ${fieldSubmitted}`}
              />
              <FormikField
                label='Confirm Password'
                formikProps={formikProps}
                formikKey='confirmPassword'
                type='password'
                required
                className={`${classes.field} ${fieldSubmitted}`}
              />
              <div className={classes.buttonWrapper}>
                <Button
                  type='Submit'
                  fullWidth
                  variant='contained'
                  className={classes.submit}
                  disabled={!formikProps.isValid || formikProps.isSubmitting}
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
            </form>
          )}
        </Formik>
      </div>
    </Paper>
  );
};

export default AccountInformationForm;
