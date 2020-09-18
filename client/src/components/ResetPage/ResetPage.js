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
    height: '80%',
    width: '30%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '5%',
    background: theme.palette.primary.main,
  },
  avatar: {
    height: '70px',
    width: '70px',
    background: '#FFFFFF',
    margin: '5%',
  },
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

const ResetPage = () => {
  // Styling
  const styles = useStyles();

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
          <Typography variant='h2'>Reset Password</Typography>
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
              <Typography>Confirm</Typography>
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href='./' variant='body2' color='inherit'>
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
