import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Link, Typography } from '@material-ui/core';
import Background from '../../../image/bg.png';

/* ================ Styling ================ */
const useStyles = makeStyles((theme) => {
  return {
    //Page container
    root: {
      height: '100vh',
      width: '100vw',
      position: 'fixed',
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

    background: {
      width: '100%',
      height: '100%',
      display: 'flex',
      backgroundSize: 'cover',
    },
    submit: {
      backgroundColor: theme.palette.secondary.main,
      marginTop: '5%',
      marginLeft: '10%',
      width: '30%',
    },
  };
});

/* ================ Component ================ */

const LandingPage = () => {
  const classes = useStyles();

  // const [isLoggedIn, setLoggedIn] = useState(false);
  // const { setAuthTokens } = useAuth();

  return (
    <div
      className='background'
      style={{ backgroundImage: `url(${Background})` }}
    >
      <div className={classes.root}>
        <img alt='background' src={Background} width='100%' />
      </div>
      <div className={classes.banner}>
        <Typography variant='h1' color='textSecondary'>
          Welcome to ePortfolio
        </Typography>
      </div>

      <Link href='./login'>
        <Button
          type='Submit'
          variant='contained'
          className={classes.submit}
          color='primary'
        >
          <Typography>Login to Your Portfolio</Typography>
        </Button>
      </Link>

      <Link href='./signup'>
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
