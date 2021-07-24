import React from "react";
import { Route, Redirect } from "react-router-dom";

export default function AuthRoute({
  component: Component,
  isAuthenticated,
  ...rest }) {
    return (
      <Route
        {...rest}
        render={(props) =>
          isAuthenticated ? (
            <Component {...props} > </Component>
          ) : (
            <Redirect to="/" />
          )
        }
      />
    );
}
