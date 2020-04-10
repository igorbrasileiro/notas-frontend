import React, { ElementType } from "react";
import { Route, Redirect } from "react-router-dom";

interface AuthRouteProps {
  component: ElementType;
}

const AuthRoute = ({ component: Component, ...rest }: AuthRouteProps) => (
  <Route
    {...rest}
    render={(props) =>
      localStorage.getItem("token") &&
      localStorage.getItem("token") !== "undefined" ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/landing",
            state: { from: props.location },
          }}
        />
      )
    }
  />
);

export default AuthRoute;
