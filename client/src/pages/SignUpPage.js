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
    '& input:+ fieldset': {
      borderColor: '#FFFFFF',
      borderWidth: 2,
    },
  },
})(TextField);

const validEmailRegex = RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g);

class SignUpPage extends React.Component {
  constructor() {
    super();
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      errors: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
      },
    };
  }

  validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
    return valid;
  };

  onChange = (e) => {
    //Validate Field
    const { name, value } = e.target;
    let errors = this.state.errors;

    switch (name) {
      case 'firstName':
        errors.firstName =
          value.length < 5 ? 'Full Name must be 5 characters long!' : '';
        break;
      case 'email':
        errors.email = validEmailRegex.test(value) ? '' : 'Email is not valid!';
        break;
      case 'password':
        errors.password =
          value.length < 8 ? 'Password must be 8 characters long!' : '';
        break;
      default:
        break;
    }

    this.setState({ errors, [name]: value }, () => {
      console.log(errors);
    });
  };

  onSubmit = (e) => {
    e.preventDefault();

    if (this.validateForm(this.state.errors)) {
      console.info('Valid Form');
      const newUser = {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        password: this.state.password,
      };

      API.userSignup(newUser).then((res) => {
        this.props.history.push(`/`);
      });
    } else {
      console.error('Invalid Form');
    }
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