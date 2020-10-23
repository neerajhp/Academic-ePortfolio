import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from './theme';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PrivateRoute from './Routes/PrivateRoute';
import { isAuth } from '../helpers/auth';

import PrivateLayout from './PrivatePages/PrivateLayout';
import PublicLayout from './PublicPages/PublicLayout';
import HomeLayout from './PublicPages/HomeLayout';

function App() {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <CssBaseline>
          <Router>
            <Switch>
              {!isAuth() && <Route path='/home' component={HomeLayout} />}
              {!isAuth() && <Route path='/view' component={PublicLayout} />}
              <PrivateRoute path='/' component={PrivateLayout} />
            </Switch>
          </Router>
        </CssBaseline>
      </ThemeProvider>
    </div>
  );
}

export default App;
