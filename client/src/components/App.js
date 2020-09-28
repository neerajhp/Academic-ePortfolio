import React, { useState } from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from './theme';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PrivateRoute from './utils/PrivateRoute';
import { AuthContext } from '../context/auth';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import PrivateLayout from './PrivatePages/PrivateLayout';
import LoginPage from './PublicPages/LoginPage/LoginPage';
import SignUpPage from './PublicPages/SignUpPage/SignUpPage';
import LandingPage from './PublicPages/LandingPage/LandingPage';

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
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <ThemeProvider theme={theme}>
            <CssBaseline>
              <Router>
                <Switch>
                  <Route exact path='/home' component={LandingPage} />
                  <Route exact path='/login' component={LoginPage} />
                  <Route exact path='/signup' component={SignUpPage} />
                  <PrivateRoute path='/' component={PrivateLayout} />
                </Switch>
              </Router>
            </CssBaseline>
          </ThemeProvider>
        </MuiPickersUtilsProvider>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
