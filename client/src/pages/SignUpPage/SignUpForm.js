import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';

import {
  Avatar,
  TextField,
  FormControlLabel,
  Checkbox,
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
    width: '30%',
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

/* ================ Component ================ */

const SignUpForm = () => {
  const classes = useStyles();

  return (
    <div className={classes.formPaper}>
      <Avatar className={classes.avatar}>
        <MenuBookIcon className={classes.icon} />
      </Avatar>
      <Typography variant='h2'>Sign Up</Typography>
      <form className={classes.form} noValidate onSubmit={this.onSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <CssTextField
              variant='outlined'
              margin='dense'
              required
              fullWidth
              label='First Name'
              name='firstName'
              autoComplete=''
              onChange={this.onChange}
              error={this.state.errors.firstName}
              helperText={this.state.errors.firstName}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CssTextField
              variant='outlined'
              margin='dense'
              required
              fullWidth
              label='Last Name'
              name='lastName'
              onChange={this.onChange}
            />
          </Grid>
        </Grid>
        <CssTextField
          variant='outlined'
          margin='dense'
          required
          fullWidth
          label='Email Address'
          name='email'
          onChange={this.onChange}
          error={this.state.errors.email}
          helperText={
            this.state.errors.email ? 'Please enter a valid email' : ' '
          }
        />
        <CssTextField
          variant='outlined'
          margin='dense'
          required
          fullWidth
          name='password'
          label='Password'
          type='password'
          id='password'
          onChange={this.onChange}
          error={this.state.errors.password}
          helperText={
            this.state.errors.password
              ? 'Password must be 8 characters long!'
              : ' '
          }
        />
        <CssTextField
          variant='outlined'
          margin='dense'
          required
          fullWidth
          name='confirmpassword'
          label='Confirm Password'
          type='password'
          id='confirmpassword'
          onChange={this.onChange}
          error={this.state.errors.confirmpassword}
          helperText={
            this.state.errors.confirmpassword ? 'Passwords do not match' : ' '
          }
        />
        <Button
          type='submit'
          fullWidth
          variant='contained'
          color='primary'
          className={classes.submit}
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
