import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import ProfilePage from './ProfilePage';
import LoginPage from './LoginPage';
import ResetPage from './ResetPage';
import SignUpPage from './SignUpPage';

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path='/' component={LoginPage} />
          <Route path='/profile' component={ProfilePage} />
          <Route path='/reset' component={ResetPage} />
          <Route path='/signup' component={SignUpPage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
