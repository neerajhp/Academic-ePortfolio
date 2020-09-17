import React, { useState } from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from './theme';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import { AuthContext } from '../context/auth';
import ProfilePage from './ProfilePage/ProfilePage';
import LoginPage from './LoginPage/LoginPage';
import ResetPage from './ResetPage/ResetPage';
import SignUpPage from './SignUpPage/SignUpPage';

function App() {
  //Check login tokens
  const existingTokens = JSON.parse(localStorage.getItem('token'));
  const [authTokens, setAuthTokens] = useState(existingTokens);

  //Set local storage
  const setTokens = (data) => {
    localStorage.setItem('token', JSON.stringify(data));
    setAuthTokens(data);
  };

  return (
    <div>
      <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
        <ThemeProvider theme={theme}>
          <CssBaseline>
            <Router>
              <Switch>
                <Route exact path='/' component={LoginPage} />
                <Route path='/reset' component={ResetPage} />
                <Route path='/signup' component={SignUpPage} />
                <PrivateRoute path='/profile' component={ProfilePage} />
              </Switch>
            </Router>
          </CssBaseline>
        </ThemeProvider>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
