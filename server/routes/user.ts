import express from "express";
import user from "../controllers/user";
import axios from "axios";

const router = express.Router();

// The callback from Github...
router.get("/signin/callback", async (req, res, next) => {
  const code = req.query.code;
  if (!code)
    return res.send({ status: 400, message: "No code provided from Github." });

  console.log("CODE IS", code);

  try {
    const body = {
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code,
    };

    // Make the post request to Github with the code and our application's secrets.
    const githubResponse = await axios.post(
      "https://github.com/login/oauth/access_token",
      body,
      {
        method: "POST",
        headers: { accept: "application/json" },
      }
    );
    const token = await githubResponse.data["access_token"];
    console.log("TOKEN IS: ", token);
    res.status(200).send(token);
  } catch (err) {
    next({
      status: 400,
      message:
        "Failed to authenticate with https://github.com/login/oauth/access_token",
    });
  }
});

router.post("/", user.signUp, (_req, res, _next) => {
  res.status(200).json(res.locals.games);
});

router.post("/", user.signIn, (_req, res, _next) => {
  res.status(200).json(res.locals.games);
});

export default router;
