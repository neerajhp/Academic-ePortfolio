import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Formik } from 'formik';
import * as yup from 'yup';
import { TextField, Typography } from '@material-ui/core';
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
}));

// Input Fields
const CssTextField = withStyles((theme) => ({
  root: {
    '& label.Mui-focused': {
      color: 'white',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'white',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: theme.palette.primary.light,
      },
      '&:hover fieldset': {
        borderColor: 'white',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'white',
      },
    },
  },
}))(TextField);

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

const signUp = ({ email }) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === 'a@a.com') {
        reject(new Error("You playin' with that fake email address."));
      }
      resolve(true);
    }, 1000);
  });

const SignUpPage = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.banner}>
        <Typography variant='h1'>Welcome to ePortfolio</Typography>
      </div>
      <div className={classes.formContainer}>
        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
          }}
          onSubmit={(values, actions) => {
            signUp({ email: values.email })
              .then(() => {
                alert(JSON.stringify(values));
              })
              .catch((error) => {
                actions.setFieldError('general', error.message);
              })
              .finally(() => {
                actions.setSubmitting(false);
              });
          }}
          validationSchema={validationSchema}
        >
          {(formikProps) => <SignUpForm formikProps={formikProps} />}
        </Formik>
      </div>
    </div>
  );
};

export default SignUpPage;
