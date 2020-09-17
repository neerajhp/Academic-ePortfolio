import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Typography, Avatar, Grid, Link } from '@material-ui/core';

import MenuBookIcon from '@material-ui/icons/MenuBook';
import API from '../../utils/API';
import SignUpForm from './SignUpForm';
/* ================ Styling ================ */

const useStyles = makeStyles((theme) => ({
  //Page container
  root: {
    height: '100vh',
    width: '100vw',
    position: 'fixed',
  },
  banner: {
    position: 'sticky',
    width: '100%',
    height: '20%',
    background: theme.palette.primary.main,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '-1px -9px 15px 10px rgba(0,0,0,0.75);',
  },
  formContainer: {
    width: '100%',
    height: '80%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  formPaper: {
    width: '40%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '2%',
    background: theme.palette.primary.main,
  },
  avatar: { height: '70px', width: '70px', background: '#FFFFFF' },
  icon: { fontSize: 40, color: theme.palette.primary.main },
}));

/* ================ Validation ================ */

const validationSchema = yup.object().shape({
  firstName: yup.string().required().label('First Name'),
  lastName: yup.string().required().label('Last Name'),
  email: yup.string().label('Email').email().required(),
  password: yup
    .string()
    .label('Password')
    .required()
    .min(2, 'Seems a bit short...')
    .max(10, 'We prefer insecure system, try a shorter password.'),
  confirmPassword: yup
    .string()
    .required()
    .label('Confirm password')
    .test('passwords-match', 'Passwords must match ya fool', function (value) {
      return this.parent.password === value;
    }),
});

/* ================ Component ================ */

const SignUpPage = () => {
  const classes = useStyles();

  const [Submitted, setSubmitted] = useState(false);

  return (
    <div className={classes.root}>
      <div className={classes.banner}>
        <Typography variant='h1'>Welcome to ePortfolio</Typography>
      </div>
      <div className={classes.formContainer}>
        <div className={classes.formPaper}>
          <Avatar className={classes.avatar}>
            <MenuBookIcon className={classes.icon} />
          </Avatar>

          <Typography variant='h2'>Sign Up</Typography>

          {Submitted && <div> Submitted!</div>}
          {!Submitted && (
            <Formik
              initialValues={{
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                confirmPassword: '',
              }}
              onSubmit={(values, actions) => {
                API.userSignup({
                  firstName: values.firstName,
                  lastName: values.lastName,
                  email: values.email,
                  password: values.password,
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
              {(formikProps) => <SignUpForm formikProps={formikProps} />}
            </Formik>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
