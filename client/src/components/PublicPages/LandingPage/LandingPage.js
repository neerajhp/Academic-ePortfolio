import React from 'react';
import { Button, Link, Typography } from '@material-ui/core';

/* ================ Component ================ */

const AccountVerifiedPage = ({ globalClasses }) => {
  // const [isLoggedIn, setLoggedIn] = useState(false);
  // const { setAuthTokens } = useAuth();

  return (
    <React.Fragment>
      <div className={globalClasses.banner}>
        <Typography variant='h1' color='textSecondary'>
          Welcome to ePortfolio
        </Typography>
      </div>
      <div className={globalClasses.landingButtonContainer}>
        <Link href='./login' underline='none'>
          <Button
            type='Submit'
            variant='contained'
            className={globalClasses.landingButton}
            color='primary'
          >
            <Typography>Get Started With Your portfolio</Typography>
          </Button>
        </Link>
        <Link href='./search' underline='none'>
          <Button
            type='Submit'
            variant='contained'
            className={globalClasses.landingButton}
            color='primary'
          >
            <Typography>Search for a Portfolio</Typography>
          </Button>
        </Link>
      </div>
    </React.Fragment>
  );
};

export default AccountVerifiedPage;
