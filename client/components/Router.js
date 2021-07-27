import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Login from "./Login/Login";
import App from "./App";
import PrivateRoute from "./PrivateRoute/PrivateRoute";

const Router = () => {
  return (
    <BrowserRouter>
      <Route path="/login" component={Login} />
      <PrivateRoute path="/">
        <App />
      </PrivateRoute>
    </BrowserRouter>
  );
};

export default Router;
