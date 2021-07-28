import express from "express";
import user from "../controllers/user";
import github from "./routes/github";

const router = express.Router();

router.get(
  "/signin/callback",
  github.getToken, // Set on res.locals.token
  github.getAccountInfo, // Gets account using token, sets on res.locals.accountInfo
  user.createCookieFromToken, // Sets "loggedIn" and "ssid" cookies using token
  user.saveUser, // Saves user to db
  user.updateToken, // Updates user's token field
  (_req, res) => {
    // After login is complete and cookie is set, redirect them to the main page
    // of our React application. The "authenticate" function sees "loggedIn" true
    // And redirects to private routes
    res.status(200).redirect("http://localhost:8080/");
  }
);

// Sends back user information and a list of their repositories
router.get("/info", user.getInfo, github.getRepos, (_req, res) => {
  res
    .status(200)
    .send({ userInfo: res.locals.userInfo, repos: res.locals.repos });
});

router.get("/logout", user.destroyToken, user.expireCookie, (_req, res) => {
  res.status(200).redirect("/");
});

export default router;
