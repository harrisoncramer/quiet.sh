import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Login from "./views/Login";
import Main from "./views/Main";
import Reports from "./views/Reports";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

import global from "./styles/global.scss";
import normalize from "normalize.css";
import "@fontsource/lato";
import "@fontsource/open-sans";

const Router = () => {
  return (
    <BrowserRouter>
      <Route path="/login" component={Login} />
      <PrivateRoute path="/reports">
        <Reports />
      </PrivateRoute>
      <PrivateRoute path="/" exact>
        <Main />
      </PrivateRoute>
    </BrowserRouter>
  );
};

export default Router;
