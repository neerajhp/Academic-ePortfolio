import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../../context/auth';

function PrivateRoute({ component: Component, ...rest }) {
  const tokens = useAuth();
  return (
    <Route
      {...rest}
      render={(props) =>
        tokens.authTokens !== null ? (
          <Component {...props} />
        ) : (
          <Redirect to='/home' />
        )
      }
    />
  );
}

export default PrivateRoute;
