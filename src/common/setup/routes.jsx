import * as React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from './history';

import HomePage from '../../home/homePage';

const Routes = () => (
  <Router history={history}>
    <Switch>
      <Route exact path="/" component={HomePage} />
    </Switch>
  </Router>
);

export default Routes;
