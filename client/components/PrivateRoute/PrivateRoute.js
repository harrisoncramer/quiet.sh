import React from "react";
import { Route, Redirect } from "react-router-dom";
import auth from "../../utils/auth";

// Simulates Github login
const PrivateRoute = ({ children, ...rest }) => {
  return (
    <Route
      {...rest}
      render={() => {
        return auth.isLoggedIn() ? children : <Redirect to="/login" />;
      }}
    />
  );
};

export default PrivateRoute;
