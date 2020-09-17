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
import MenuBookIcon from '@material-ui/icons/MenuBook';

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
  submit: {
    backgroundColor: theme.palette.secondary.main,
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

/* ================ Components ================ */

const FormikField = ({ label, formikProps, formikKey, ...rest }) => {
  return (
    <CssTextField
      variant='outlined'
      margin='dense'
      fullWidth
      label={label}
      helperText={
        formikProps.touched[formikKey] ? formikProps.errors[formikKey] : ''
      }
      onChange={formikProps.handleChange(formikKey)}
      onBlur={formikProps.handleBlur(formikKey)}
      error={
        formikProps.touched[formikKey] && Boolean(formikProps.errors[formikKey])
      }
      {...rest}
    />
  );
};

const SignUpForm = ({ formikProps }) => {
  const classes = useStyles();

  return (
    <div className={classes.formPaper}>
      <Avatar className={classes.avatar}>
        <MenuBookIcon className={classes.icon} />
      </Avatar>
      <Typography variant='h2'>Sign Up</Typography>
      <form className={classes.form}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <FormikField
              label='FirstName'
              formikProps={formikProps}
              formikKey='firstName'
              autoFocus
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormikField
              label='LastName'
              formikProps={formikProps}
              formikKey='lastName'
              autoFocus
            />
          </Grid>
        </Grid>
        <FormikField
          label='Email'
          formikProps={formikProps}
          formikKey='email'
          autoFocus
        />
        <FormikField
          label='Password'
          formikProps={formikProps}
          formikKey='password'
          autoFocus
        />
        <FormikField
          label='Confirm Password'
          formikProps={formikProps}
          formikKey='confirmPassword'
          autoFocus
        />

        <Button
          type='submit'
          fullWidth
          variant='contained'
          color='primary'
          className={classes.submit}
          disabled={!formikProps.isValid}
          onSubmit={formikProps.handleSubmit}
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
    </div>
  );
};

export default SignUpForm;
