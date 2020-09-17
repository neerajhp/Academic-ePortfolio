import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {
  Avatar,
  TextField,
  Button,
  Grid,
  Link,
  Typography,
} from '@material-ui/core';
import FormikField from '../../components/FormikField';

/* ================ Styling ================ */

const useStyles = makeStyles((theme) => ({
  submit: {
    backgroundColor: theme.palette.secondary.main,
  },
}));

const SignUpForm = ({ formikProps }) => {
  const classes = useStyles();

  return (
    <form className={classes.form} onSubmit={formikProps.handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <FormikField
            label='FirstName'
            formikProps={formikProps}
            formikKey='firstName'
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormikField
            label='LastName'
            formikProps={formikProps}
            formikKey='lastName'
            required
          />
        </Grid>
      </Grid>
      <FormikField
        label='Email'
        formikProps={formikProps}
        formikKey='email'
        required
      />
      <FormikField
        label='Password'
        formikProps={formikProps}
        formikKey='password'
        required
      />
      <FormikField
        label='Confirm Password'
        formikProps={formikProps}
        formikKey='confirmPassword'
        required
      />

      <Button
        type='Submit'
        fullWidth
        variant='contained'
        className={classes.submit}
        disabled={!formikProps.isValid}
      >
        <Typography>Sign Up</Typography>
      </Button>
      <Grid container>
        <Grid item xs>
          <Link href='./' variant='body2' color='inherit'>
            Login
          </Link>
        </Grid>
      </Grid>
    </form>
  );
};

export default SignUpForm;
