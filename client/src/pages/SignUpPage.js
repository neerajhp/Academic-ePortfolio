import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import {
  Avatar,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Grid,
  Link,
} from '@material-ui/core';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import API from '../utils/API';

// Styling
const styles = () => ({
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
    width: '30%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '2%',
    background: '#333B55',
    color: '#FFFFFF ',
  },
  avatar: { height: '70px', width: '70px', background: '#FFFFFF' },
  icon: { fontSize: 40, color: '#333B55' },
  submit: {
    backgroundColor: '#F8C736',
  },
  options: {
    '& .MuiTypography-colorPrimary': {
      color: '#f0f2f6 !important',
    },
  },
});

// Input Fields
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

class SignUpPage extends React.Component {
  constructor() {
    super();
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    };
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const newUser = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      password: this.state.password,
    };

    API.userSignup(newUser).then((res) => {
      this.props.history.push(`/`);
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.banner}>
          <h1>Welcome to ePortfolio</h1>
        </div>
        <div className={classes.formContainer}>
          <div className={classes.formPaper}>
            <Avatar className={classes.avatar}>
              <MenuBookIcon className={classes.icon} />
            </Avatar>
            <h2> Sign Up</h2>
            <form className={classes.form} noValidate onSubmit={this.onSubmit}>
              <CssTextField
                variant='outlined'
                margin='dense'
                required
                fullWidth
                label='First Name'
                name='firstName'
                autoComplete='firstName'
                autoFocus
                onChange={this.onChange}
              />
              <CssTextField
                variant='outlined'
                margin='dense'
                required
                fullWidth
                label='Last Name'
                name='lastName'
                autoComplete='lastName'
                autoFocus
                onChange={this.onChange}
              />
              <CssTextField
                variant='outlined'
                margin='dense'
                required
                fullWidth
                label='Email Address'
                name='email'
                autoComplete='email'
                autoFocus
                onChange={this.onChange}
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
                autoComplete='current-password'
                onChange={this.onChange}
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
                autoComplete='current-password'
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
                className={classes.submit}
              >
                Sign Up
              </Button>
              <Grid container className={classes.options}>
                <Grid item xs>
                  <Link href='./' variant='body2'>
                    Login
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(SignUpPage);
