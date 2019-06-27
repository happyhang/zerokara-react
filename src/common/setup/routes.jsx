import * as React from 'react';
import { createBrowserHistory } from 'history';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';

import HomePage from '../../home/homePage';

export const history = createBrowserHistory();

const Routes = () => (
  <ConnectedRouter history={history}>
    <Switch>
      <Route exact path="/" component={HomePage} />
    </Switch>
  </ConnectedRouter>
);

export default Routes;
