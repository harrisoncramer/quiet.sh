import db from "../db";
import { RequestHandler } from "express";

const createCookieFromToken: RequestHandler = (_req, res, next) => {
  const { token } = res.locals;

  res.cookie("ssid", token, {
    expires: new Date(Date.now() + 1200000),
    httpOnly: true,
  });

  res.cookie("loggedIn", true, {
    expires: new Date(Date.now() + 1200000),
    httpOnly: false,
  });

  res.cookie("github_username", res.locals.accountInfo.login, {
    expires: new Date(Date.now() + 1200000),
    httpOnly: false,
  });

  res.cookie("user_id", res.locals.accountInfo.id, {
    expires: new Date(Date.now() + 1200000),
    httpOnly: false,
  });

  return next();
};

const saveUser: RequestHandler = async (_req, res, next) => {
  const { accountInfo } = res.locals;
  const { avatar_url, id, login, repos_url } = accountInfo;
  const query = `INSERT INTO users (avatar_url, github_id, login, repos_url) VALUES ($1, $2, $3, $4) ON CONFLICT (github_id) DO NOTHING; `; // PSQL Save Query...
  try {
    await db.query(query, [avatar_url, id, login, repos_url]);
    return next();
  } catch (err) {
    console.log("FAILED TO SAVE USER TO DB: ", err.message);
    return next({ status: 500, message: "Failed to save user to database." });
  }
};

const updateToken: RequestHandler = async (_req, res, next) => {
  const { accountInfo } = res.locals;
  const { token } = res.locals;
  const { id } = accountInfo;
  const query = `UPDATE users SET token = $1 WHERE github_id = $2`; // PSQL Save Query...
  try {
    await db.query(query, [token, id]);
    return next();
  } catch (err) {
    console.log("FAILED TO SAVE TOKEN TO DB: ", err.message);
    return next({ status: 500, message: "Failed to save token to database." });
  }
};

const destroyToken: RequestHandler = async (req, _res, next) => {
  const { ssid } = req.cookies; // Grab the cookie (which is the Github token)
  const query = `UPDATE users SET token = NULL WHERE token=$1`;
  try {
    await db.query(query, [ssid]);
    return next();
  } catch (err) {
    console.log("UNABLE TO DESTROY TOKEN FOR USER: ", err.message);
    return next({ status: 500, message: "Failed to destroy token for user." });
  }
};

const expireCookie: RequestHandler = (_req, res, next) => {
  res.cookie("loggedIn", "", { maxAge: 0 });
  res.cookie("ssid", "", { maxAge: 0 });
  res.cookie("user_id", "", { maxAge: 0 });
  res.cookie("github_username", "", { maxAge: 0 });
  return next();
};

const getInfo: RequestHandler = async (req, res, next) => {
  const { ssid } = req.cookies;
  const query = `SELECT users.avatar_url, users.login FROM users WHERE users.token=$1`;
  try {
    const { rows } = await db.query(query, [ssid]);
    res.locals.userInfo = { ...rows[0] };
    return next();
  } catch (err) {
    console.log("UNABLE TO FETCH USER INFO: ", err.message);
    return next({ status: 400, message: "Failed to get user info." });
  }
};

export default {
  createCookieFromToken,
  saveUser,
  updateToken,
  destroyToken,
  expireCookie,
  getInfo,
};
