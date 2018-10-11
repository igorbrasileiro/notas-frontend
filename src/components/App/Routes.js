import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Loadable from 'react-loadable';
import LoadingPage from '../LoadingPage';

const AsyncLandingPage = Loadable({
  loader: () => import('../UserInfo/SubjectTable'),
  loading: LoadingPage,
});

export default () => (
  <Switch>
    <Route path="/" exact component={AsyncLandingPage} />
  </Switch>
);
