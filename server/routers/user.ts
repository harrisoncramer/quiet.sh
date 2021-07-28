import express from "express";
import user from "../controllers/user";
import github from "./routes/github";

const router = express.Router();

// The callback from Github...
router.get(
  "/signin/callback",
  github.getToken,
  user.createSession,
  user.createCookieFromSession,
  github.getAccountInfo,
  user.saveUser,
  user.updateToken,
  (_req, res) => {
    // After login is complete and cookie is set, redirect them to the main page
    // of our React application. Upon hitting the "authenticate" function, they
    // should now pass and be directed to our private routes.
    // When this is served in production, just redirect to "/"
    res.status(200).redirect("http://localhost:8080/");
  }
);

router.get(
  "/logout",
  user.destroySession,
  user.expireCookie,
  (_req, res, _next) => {
    res.status(200).redirect("/");
  }
);

export default router;
