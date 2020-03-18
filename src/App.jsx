import React from 'react';
import {
  BrowserRouter as Router, Route, Link, Match, Redirect, Switch,
} from 'react-router-dom';
// import { ThemeProvider, Typography } from '@material-ui/core';
// import Theme from './theme';
import ChildrenDemo from './pages/TextFieldDemo/ChildrenDemo';
import TextFieldDemo from './pages/TextFieldDemo/TextFielddemo';
import Login from './pages/Login/Login';
import Trainee from './pages/Trainee/Trainee';
import InputDemo from './pages/TextFieldDemo/inputDemo';
import { AuthRoute, PrivateRoute } from './pages/routes/index';
import NoMatch from './pages/NoMatch/index';

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/">
            <Redirect to="/Trainee" />
          </Route>
          <AuthRoute path="/login" component={Login} />
          <PrivateRoute path="/ChildrenDemo" component={ChildrenDemo} />
          <PrivateRoute path="/Trainee" component={Trainee} />
          <PrivateRoute path="/TextFieldDemo" component={TextFieldDemo} />
          <PrivateRoute path="/InputDemo" component={InputDemo} />
          <PrivateRoute component={NoMatch} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
