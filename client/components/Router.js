import React from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import SignIn from "./SignIn";
import App from "./App";

const Router = (props) => {
  return (
    <BrowserRouter>
      <Route exact path="/user/signin/callback" component={SignIn} />
      <Route path="/" component={App} />
    </BrowserRouter>
  );
};

export default Router;
