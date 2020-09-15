import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useAuth } from '../context/auth';
import API from '../utils/API';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {
  Paper,
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
    padding: '2em',
    background: theme.palette.primary.main,
  },
  avatar: { height: '70px', width: '70px', background: '#FFFFFF' },
  icon: { fontSize: 40, color: theme.palette.primary.main },
  submit: {
    backgroundColor: theme.palette.secondary.main,
  },
}));

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

const LoginPage = () => {
  // Styling
  const styles = useStyles();

  //Authentication
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isError, setIsError] = useState(false);
  const [userEmail, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setAuthTokens } = useAuth();

  function onSubmit(e) {
    e.preventDefault();

    // Submit login information
    API.userLogin({
      email: userEmail,
      password: password,
    })
      .then((result) => {
        if (result.status === 200) {
          //Login information matches records
          setAuthTokens(result.data.token);
          setLoggedIn(true);
        } else {
          //Login information does not match record
          setIsError(true);
        }
      })
      .catch((e) => {
        setIsError(true);
      });
  }

  //If logged in redirect to profile page
  if (isLoggedIn) {
    return <Redirect to='/profile' />;
  }

  return (
    <div className={styles.root}>
      <div className={styles.banner}>
        <Typography variant='h1'>Welcome to ePortfolio</Typography>
      </div>
      <div className={styles.formContainer}>
        <Paper elevation={1} className={styles.formPaper}>
          <Avatar className={styles.avatar}>
            <MenuBookIcon className={styles.icon} />
          </Avatar>
          <Typography variant='h2'>Sign In</Typography>
          <form className={styles.form} noValidate onSubmit={onSubmit}>
            <CssTextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              id='userEmail'
              label='Email Address'
              name='userEmail'
              autoComplete='email'
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              error={isError}
            />
            <CssTextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              name='password'
              label='Password'
              type='password'
              id='password'
              autoComplete='current-password'
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              error={isError}
              helperText={
                isError ? 'Password or email does not match our records' : ' '
              }
            />
            <FormControlLabel
              control={<Checkbox value='remember' />}
              label='Remember me'
            />
            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              className={styles.submit}
            >
              <Typography>Sign In</Typography>
            </Button>
            <Grid container className={styles.options}>
              <Grid item xs>
                <Link href='./reset' variant='body2' color='inherit'>
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href='./signup' variant='body2' color='inherit'>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </div>
    </div>
  );
};

export default LoginPage;
