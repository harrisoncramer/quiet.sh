import axios from "axios";
import { RequestHandler } from "express";

// The main login route. Makes a GET request to Github using the user's
// provided token, which they just got from Github, and uses the
// application's CLIENT_ID and CLIENT_SECRET.
const getToken: RequestHandler = async (req, res, next) => {
  const code = req.query.code;
  if (!code)
    return res.send({
      status: 400,
      message: "No code provided from Github.",
    });

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

    // Pass token to the next middleware, which is createSession
    res.locals.token = token;

    return next();
  } catch (err) {
    next({
      status: 400,
      message:
        "Failed to authenticate with https://github.com/login/oauth/access_token",
    });
  }
};

// Make a GET request to the Github API to fetch information about the logged-in user.
const getAccountInfo: RequestHandler = async (_req, res, next) => {
  const { token } = res.locals;
  try {
    const response = await axios.get("https://api.github.com/user", {
      headers: {
        Authorization: `token ${token}`,
      },
    });

    res.locals.accountInfo = await response.data;
    console.log("USER DATA IS: ", res.locals);
    return next();
  } catch (err) {
    next({
      status: 500,
      message: "Failed to get logged-in user details from Github.",
    });
  }
};

export default {
  getToken,
  getAccountInfo,
};
