import React from 'react';
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
} from '@material-ui/core';
import MenuBookIcon from '@material-ui/icons/MenuBook';

// Styling
const useStyles = makeStyles(({}) => ({
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
    background: '#333B55',
    color: '#FFFFFF',
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
    height: '80%',
    width: '30%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '5%',
    background: '#333B55',
    color: '#FFFFFF ',
  },
  avatar: {
    height: '70px',
    width: '70px',
    background: '#FFFFFF',
    margin: '5%',
  },
  icon: { fontSize: 40, color: '#333B55' },
  submit: {
    backgroundColor: '#F8C736',
  },
  options: {
    '& .MuiTypography-colorPrimary': {
      color: '#f0f2f6 !important',
    },
  },
}));

const CssTextField = withStyles({
  root: {
    '& .MuiInputBase-input': {
      color: 'white',
    },
    '& label.Mui-focused': {
      color: 'white',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        color: 'white',
        borderColor: '#8894b6',
      },
      '&:hover fieldset': {
        borderColor: 'white',
      },
    },
  },
})(TextField);

const ResetPage = () => {
  // Styling
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <div className={styles.banner}>
        <h1>Welcome to ePortfolio</h1>
      </div>
      <div className={styles.formContainer}>
        <Paper elevation={1} className={styles.formPaper}>
          <Avatar className={styles.avatar}>
            <MenuBookIcon className={styles.icon} />
          </Avatar>
          <h2> Reset Your Password</h2>
          <form className={styles.form} noValidate>
            <CssTextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              id='email'
              label='Email Address'
              name='email'
              autoComplete='email'
              autoFocus
            />
            <FormControlLabel
              control={<Checkbox value='remember' color='white' />}
              label='Remember me'
            />
            <Button
              type='reset'
              fullWidth
              variant='contained'
              color='primary'
              className={styles.submit}
            >
              Confirm
            </Button>
            <Grid container className={styles.options}>
              <Grid item xs>
                <Link href='./' variant='body2'>
                  Login
                </Link>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </div>
    </div>
  );
};

export default ResetPage;
