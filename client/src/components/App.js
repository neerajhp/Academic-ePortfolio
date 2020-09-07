import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ProfilePage from '../pages/ProfilePage';
import LoginPage from '../pages/LoginPage';
import ResetPage from '../pages/ResetPage';
import SignUpPage from '../pages/SignUpPage';

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
