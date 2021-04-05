import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

const MainRouter = () => (
  <Router>
    <Switch>
      <Route exact path="/">
        <h1>Hello world!</h1>
      </Route>
      <Route path="*">
        <h1>404 page</h1>
      </Route>
    </Switch>
  </Router>
);

export default MainRouter;
