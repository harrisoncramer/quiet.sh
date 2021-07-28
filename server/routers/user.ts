import express from "express";
import user from "../controllers/user";
import github from "./routes/github";

const router = express.Router();

router.get(
  "/signin/callback",
  github.getToken, // Set on res.locals.token
  github.getAccountInfo, // Gets account, sets on res.locals.accountInfo
  // user.createSession, // Hashes and saves token into database, adds to res.locals.hashedToken
  user.createCookieFromToken, // Sets "loggedIn" and "ssid" cookies using hashed token
  user.saveUser, // Saves user to database if not exists
  user.updateToken, // Updates new/old user's "token" field
  (_req, res) => {
    // After login is complete and cookie is set, redirect them to the main page
    // of our React application. The "authenticate" function sees "loggedIn" true
    // And redirects to private routes
    res.status(200).redirect("http://localhost:8080/");
  }
);

router.get("/info", user.getInfo, (_req, res) => {
  res.status(200).send(res.locals.userInfo);
});

router.get("/logout", user.destroyToken, user.expireCookie, (_req, res) => {
  res.status(200).redirect("/");
});

export default router;
