import React from 'react';
import { Router , Switch, Route } from 'react-router-dom';
import { history } from './history';
import Main from './pages/main';

const Routes = () => (
  <Router history={history}>
    <Switch>
      <Route exact path="/" component={Main}/>
    </Switch>
  </Router>
);

export default Routes;