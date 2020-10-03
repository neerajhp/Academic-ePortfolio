import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Link, Typography } from '@material-ui/core';
import Background from '../../../assets/bkg.svg';

/* ================ Styling ================ */
const useStyles = makeStyles((theme) => {
  return {
    //Page container
    root: {
      height: '100vh',
      width: '100vw',
      position: 'fixed',
      backgroundImage: `url(${Background})`,
      backgroundSize: 'cover',
    },
    banner: {
      position: 'sticky',
      width: '100%',
      height: '40%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: '20%',
    },
    formContainer: {
      width: '100%',
      height: '30%',
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
    },

    submit: {
      backgroundColor: theme.palette.secondary.main,
      marginTop: '5%',
      marginLeft: '10%',
      width: '30%',
      '&:hover': {
        backgroundColor: theme.palette.secondary.light,
        borderColor: theme.palette.secondary.light,
        boxShadow: 'none',
      },
    },
    login: {
      right: '2%',
    },
  };
});

/* ================ Component ================ */

const LandingPage = () => {
  const classes = useStyles();

  // const [isLoggedIn, setLoggedIn] = useState(false);
  // const { setAuthTokens } = useAuth();

  return (
    <div className={classes.root}>
      <div className={classes.banner}>
        <Typography variant='h1' color='textSecondary'>
          Welcome to ePortfolio
        </Typography>
      </div>
      <Link href='./login' underline='none'>
        <Button
          type='Submit'
          variant='contained'
          className={classes.submit}
          color='primary'
        >
          <Typography>Login To Your portfolio</Typography>
        </Button>
      </Link>
      <Link href='./signup' underline='none'>
        <Button
          type='Submit'
          variant='contained'
          className={classes.submit}
          color='primary'
        >
          <Typography>Create Your New Portfolio</Typography>
        </Button>
      </Link>
    </div>
  );
};

export default LandingPage;
