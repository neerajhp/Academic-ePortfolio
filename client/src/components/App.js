import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import { AuthContext } from '../context/auth';
import ProfilePage from '../pages/ProfilePage';
import LoginPage from '../pages/LoginPage';
import ResetPage from '../pages/ResetPage';
import SignUpPage from '../pages/SignUpPage';

function App() {
  //Check login tokens
  const existingTokens = JSON.parse(localStorage.getItem('tokens'));
  const [authTokens, setAuthTokens] = useState(existingTokens);

  //Set local storage
  const setTokens = (data) => {
    localStorage.setItem('tokens', JSON.stringify(data));
    setAuthTokens(data);
  };

  return (
    <div>
      <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
        <Router>
          <Switch>
            <Route exact path='/' component={LoginPage} />
            <Route path='/reset' component={ResetPage} />
            <Route path='/signup' component={SignUpPage} />
            <PrivateRoute path='/profile' component={ProfilePage} />
          </Switch>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
