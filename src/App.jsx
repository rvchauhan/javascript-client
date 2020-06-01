import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import ChildrenDemo from './pages/ChildrenDemo/ChildrenDemo';
import TextFieldDemo from './pages/TextFieldDemo/TextFielddemo';
import Login from './pages/Login/Login';
import Trainee from './pages/Trainee/Trainee';
import InputDemo from './pages/InputDemo/InputDemo';
import { AuthRoute, PrivateRoute } from './pages/routes/index';
import NoMatch from './pages/NoMatch/index';
import { SnackBarProvider } from './Context/SnackBarProvider/index';

function App() {
  return (
    <div>
      <SnackBarProvider>
        <Router>
          <Switch>
            <Route exact path="/">
              <Redirect to="/Trainee" />
            </Route>
            <AuthRoute path="/login" component={Login} />
            <PrivateRoute path="/ChildrenDemo" component={ChildrenDemo} />
            <PrivateRoute path="/TextFieldDemo" component={TextFieldDemo} />
            <PrivateRoute path="/InputDemo" component={InputDemo} />
            <PrivateRoute path="/trainee" component={Trainee} />
            <PrivateRoute component={NoMatch} />
          </Switch>
        </Router>
      </SnackBarProvider>
    </div>

  );
}

export default App;
