import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom"
import Reset from './Reset';
import LoginPage from "./LoginPage";
import SignUp from "./SignUp";


                function App() {
                return (
                <div>
                <Router>
                <Switch>
                <Route exact path="/" component={LoginPage} />
                <Route path="/reset" component={Reset} />
                <Route path="/signup" component={SignUp} />
                </Switch>
                </Router>
                </div>
                )
            }

                export default App