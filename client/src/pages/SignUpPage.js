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
  Typography,
} from '@material-ui/core';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import API from '../utils/API';
import theme from '../components/theme';

/* ================ Styling ================ */

const styles = (theme) => ({
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
});

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

/* ================ Constants ================ */

const validEmailRegex = RegExp(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g);

/* ================ Component ================ */

class SignUpPage extends React.Component {
  constructor() {
    super();
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmpassword: '',
      errors: {
        firstName: false,
        lastName: false,
        email: false,
        password: false,
        confirmpassword: false,
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
        errors.firstName = value.length < 5 ? true : false;
        break;
      case 'email':
        errors.email = validEmailRegex.test(value) ? true : false;
        break;
      case 'password':
        errors.password = value.length < 8 ? true : false;
        break;
      case 'confirmpassword':
        errors.confirmpassword =
          this.state.password === this.state.confirmpassword ? true : false;
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
          <Typography variant='h1'>Welcome to ePortfolio</Typography>
        </div>
        <div className={classes.formContainer}>
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
                    helperText={
                      this.state.errors.firstName
                        ? 'Name must be longer than 5 characters'
                        : ' '
                    }
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
                  this.state.errors.confirmpassword
                    ? 'Passwords do not match'
                    : ' '
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
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(SignUpPage);
