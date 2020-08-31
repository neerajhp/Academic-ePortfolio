import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import ProfilePage from './ProfilePage';
import LoginPage from './LoginPage';

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path='/' component={LoginPage} />
          <Route path='/profile' component={ProfilePage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
