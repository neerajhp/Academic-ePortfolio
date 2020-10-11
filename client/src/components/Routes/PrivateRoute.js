import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuth } from '../../helpers/auth';

function PrivateRoute({ component: Component, ...rest }) {
  console.log(isAuth());
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuth() ? <Component {...props} /> : <Redirect to='/home/login' />
      }
    />
  );
}

export default PrivateRoute;
