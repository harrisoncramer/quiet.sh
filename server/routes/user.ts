import express from "express";
import user from "../controllers/user";

const router = express.Router();

router.post("/", user.signUp, (_req, res, _next) => {
  res.status(200).json(res.locals.games);
});

router.post("/", user.signIn, (_req, res, _next) => {
  res.status(200).json(res.locals.games);
});

export default router;
