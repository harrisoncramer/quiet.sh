import React from "react";
import { Route, Redirect } from "react-router-dom";
import auth from "../../utils/auth";
import Header from "../Header/Header";

// Simulates Github login
const PrivateRoute = ({ children, ...rest }) => {
  return (
    <Route
      {...rest}
      render={() => {
        return auth.isLoggedIn() ? (
          <Header>{children}</Header>
        ) : (
          <Redirect to="/login" />
        );
      }}
    />
  );
};

export default PrivateRoute;
