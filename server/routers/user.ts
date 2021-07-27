import express from "express";
import user from "../controllers/user";
import github from "./routes/github";

const router = express.Router();

// The callback from Github...
router.get(
  "/signin/callback",
  github.getToken,
  user.createSession,
  github.getAccountInfo,
  (_req, res) => {
    res.status(200).send(res.locals.accountInfo);
  }
);

router.post("/logout", user.destroySession, (_req, res, _next) => {
  res.status(200).send("/");
});

export default router;
