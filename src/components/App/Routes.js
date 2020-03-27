import React from "react";
import Loadable from "react-loadable";
import { Switch, Route } from "react-router-dom";

import LoadingPage from "../LoadingPage";
import AuthRoute from "../utils/AuthRoute";

const AsyncLandingPage = Loadable({
  loader: () => import("../LandingPage"),
  loading: LoadingPage,
});

const AsyncHome = Loadable({
  loader: () => import("../Home"),
  loading: LoadingPage,
});

const routes = () => (
  <Switch>
    <Route path="/landing" exact component={AsyncLandingPage} />
    <AuthRoute component={AsyncHome} />
  </Switch>
);

export default routes;
